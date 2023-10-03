const path =require('path');
const fs = require('fs');
const _ = require('lodash');
const { builtinModules } =require('module');
const ts = require('typescript');
const config =require('./tsconfig.json');

const tsHost = ts.createCompilerHost(
  config,
  true,
);
const entries = [
  './src/client/infrastructure/context/ecommerce-application-context.tsx',
  './src/server/infrastructure/graphql/graphql-application.ts',
  './src/app/products/page.tsx',
]

const filenameToNode = (filename) => {
  const id =  filename.replace('./src', '@/').split('.')[0]
  return {
    id,
    group: id.split('/')[1],
    name: id.split('/').reverse()[0],
    module: id.split('/')[2],
    layer: id.startsWith('@/app') ? 'presentation' : id.split('/')[2],
    type: id.split('/')[4],
  }
}

const entryClientFile = './src/client/infrastructure/context/ecommerce-application-context.tsx'
const entryClientId = '@/client/infrastructure/context/ecommerce-application-context'
const entryServerFile = './src/server/infrastructure/graphql/graphql-application.ts'
const entryServerId = '@/server/infrastructure/graphql/graphql-application'

const links = []
const nodes = entries.map()[{
  "group": "client",
  "id": entryClientId,
  "name": 'ClientApplication',
  "module": "client",
  "layer": "infrastructure",
  "type": "application",
  "value": 1
},{
  "group": "server",
  "id": entryServerId,
  "name": 'ServerApplication',
  "module": "server",
  "layer": "infrastructure",
  "type": "application",
  "value": 1
}]


const importing = [];

function getImports(fileName, name) {
    const sourceFile = tsHost.getSourceFile(
      fileName,
      ts.ScriptTarget.Latest,
      (msg) => {
        console.log(msg);
        throw new Error(`Failed to parse ${fileName}: ${msg}`);
      },
    );
    if (!sourceFile) {
      throw new Error(`Failed to parse ${fileName}: ${msg}`);
    }
    delintNode(sourceFile);
    return importing;

    function delintNode(node) {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        if (!node.moduleSpecifier.getText) {
          console.log(node)
          return
        }
        const moduleName = node.moduleSpecifier.getText().replace(/['"]/g, '');
        if (
          !moduleName.startsWith('node:') &&
          !builtinModules.includes(moduleName) &&
          importing.indexOf(moduleName) === -1
        ) {
          importing.push(moduleName);
        }

        const mod = moduleName.split('/')[1]
        const external = !moduleName.startsWith('@/')
        const layer = moduleName.split('/')[2]
        const type = moduleName.split('/')[3]
        nodes.push({
          id: (external ? 'external/' : '') + moduleName ,
          name: _.upperFirst(_.camelCase(moduleName.split('/').reverse()[0])),
          module: external ? moduleName : mod,
          layer: external ? 'external' : layer,
          type: type,
        })
        links.push({
          target: name,
          source: (external ? 'external/' : '') + moduleName,
          external
        });
        if (moduleName.startsWith('@/')) {
          try {
            getImports(moduleName.replace('@/', './src/') + '.ts', moduleName);
          } catch (e) {
            try {
              getImports(moduleName.replace('@/', './src/') + '.tsx', moduleName);
            } catch (e) {
              try {
                getImports(moduleName.replace('@/', './src/') + '/index.ts', moduleName);
              } catch (e) {
                console.log('NOT FOUND', moduleName)
                getImports(moduleName.replace('@/', './src/'), moduleName);
              }
            }
          }
        }
      } else {
        ts.forEachChild(node, delintNode)
      };
    }
}
try {

  getImports(entryClientFile, entryClientId)
  getImports(entryServerFile, entryServerId)
} catch (e) {
  console.log(e)
  throw 'error'
}

const groupByIds = _.groupBy(nodes, 'id')

const uniqLinks = _.uniqBy(links, (link) => link.source + link.target)
const uniqNodes = _.uniqBy(nodes, 'id').map((node) => ({
  ...node,
  value: groupByIds[node.id].length,
}))

const linksModule = uniqLinks.map((link) => ({
  target: link.target.split('/').slice(1, 2).join('/'),
  source: link.external ? link.source.split('/').slice(1, 3).join('/') : link.source.split('/').slice(1, 2).join('/'),
}))

const linksByModule = _.uniqBy(linksModule, (link) => link.source + link.target).map((link) => ({
  ...link,
  value: uniqLinks.filter((l) => l.target.split('/').slice(1, 2).join('/') === link.target && l.source.split('/').slice(1, 2).join('/') === link.source).length,
}))


const linksLayer = uniqLinks.map((link) => ({
  target: link.target.split('/').slice(2, 3).join('/'),
  source: link.external ? 'external' : link.source.split('/').slice(2, 3).join('/')
}))
const linksByLayer = _.uniqBy(linksLayer, (link) => link.source + link.target).map((link) => ({
  ...link,
  value: uniqLinks.filter((l) => l.target.split('/').slice(2, 3).join('/') === link.target && l.source.split('/').slice(2, 3).join('/') === link.source).length,
}))

const linksModuleLayer = uniqLinks.map((link) => ({
  ...link,
  target: link.target.split('/').slice(1, 3).join('/'),
  source: link.source.split('/').slice(link.external? 0: 1, 3).join('/'),
}))
const linksByModuleLayer = _.uniqBy(linksModuleLayer, (link) => link.source + link.target).map((link) => ({
  ...link,
  value: uniqLinks.filter((l) => l.target.split('/').slice(1, 3).join('/') === link.target && l.source.split('/').slice(1, 3).join('/') === link.source).length,
}))

const fileNodes = (function () {
  const outputPaths = new Set();

  for (const inputPath of uniqNodes) {
    const parts = inputPath.id.split('/');

    for (let i = 1; i <= parts.length; i++) {
      const subPath = parts.slice(0, i).join('/');
      outputPaths.add(subPath);
    }
  }

  return Array.from(outputPaths).map((path) => ({
    id: path,
    name: path.split('/').reverse()[0],
    value: 1,
  }));
})()

fs.writeFileSync(
  path.join(__dirname, 'imports.json'),
  JSON.stringify({
    base: {
      importing,
      nodes,
      links,
    },
    files: {
      nodes: fileNodes,
      links: (function () {
        const result = [];

        for (let i = 0; i < fileNodes.length; i++) {
          const sourceParts = fileNodes[i].id.split('/');
          
          for (let j = i + 1; j < fileNodes.length; j++) {
            const targetParts = fileNodes[j].id.split('/');
            
            if (
              sourceParts.length < targetParts.length &&
              targetParts.join('/').startsWith(sourceParts.join('/')) &&
              sourceParts.length + 1 === targetParts.length
            ) {
              result.push({
                source: fileNodes[i].id,
                target: fileNodes[j].id
              });
            }
          }
        }
        return result
      })(),
    },
    imports: {
      nodes: uniqNodes.map((node) => ({
        ...node,
        name: node.module + '/' + node.layer + '/' + node.name,
      })),
      links: uniqLinks,
    },
    modules: {
      nodes: Object.entries(_.groupBy(uniqNodes, 'module')).map(([module, nodes]) => ({
        id: module,
        name:  module,
        value: nodes.reduce((acc, node) => acc + node.value, 0),
      })),
      links: linksByModule
    },
    layers: {
      nodes: Object.entries(_.groupBy(uniqNodes, 'layer')).map(([layer, nodes]) => ({
        id: layer,
        name:  layer,
        layer: layer,
        value: nodes.reduce((acc, node) => acc + node.value, 0),
      })),
      links: linksByLayer
    },
    layersAndModules: {
      nodes: Object.entries(_.groupBy(uniqNodes, (node) => node.module + '/' + node.layer)).map(([moduleLayer, nodes]) => ({
        id: moduleLayer.endsWith('external') ?  `external/` + moduleLayer.split('/').filter(path => path !== 'external').join('/') : moduleLayer,
        name:  moduleLayer,
        layer: moduleLayer.split('/')[1],
        module: moduleLayer.split('/')[0],
        value: nodes.reduce((acc, node) => acc + node.value, 0),
      })),
      links: linksByModuleLayer
    },
  }, null, 2),
);