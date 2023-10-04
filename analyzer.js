const path =require('path');
const fs = require('fs');
const _ = require('lodash');
const { builtinModules } =require('module');
const ts = require('typescript');
const config =require('./tsconfig.json');


const entries = [
  './src/client/infrastructure/context/ecommerce-application-context.tsx',
  './src/server/infrastructure/graphql/graphql-application.ts',
  './src/app/products/page.tsx',
]

const links = []
const nodes = entries.map(filenameToNode)
const importing = [];

const tsHost = ts.createCompilerHost(
  config,
  true,
);

const idToType = (id) => {
  if (id.match('use-cases')) return 'use-case'
  if (id.match('entities')) return 'entity'
  if (id.match('repositories')) return 'repository'
  if (id.endsWith('application')) return 'application'
  if (id.match('mappers')) return 'mapper'
  if (id.match('components')) return 'component'
  if (id.match('page')) return 'page'
  if (id.match('graphql')) return 'graphql'
  return 'other'
}

const filenameToNode = (filename) => {
  const id =  filename.replace('./src/', '@/').split('.')[0]
  const external = !id.startsWith('@/') && !id.startsWith('.')
  return {
    id,
    filename: filename,
    group: id.split('/')[1],
    name: _.upperFirst(_.camelCase(id.split('/').reverse()[0])),
    module: external ?  'external': id.split('/')[1],
    layer: external ? 'external' : id.startsWith('@/app') ? 'presentation' : id.split('/')[2],
    type: idToType(id),
    value: 1,
    external
  }
}


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

        const moduleNode = filenameToNode(moduleName)
        nodes.push(moduleNode)
        links.push({
          target: name,
          source: moduleNode.id,
          external: moduleNode.module === 'external',
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

  nodes.forEach((node) => {
    getImports(node.filename, node.id)
  })
} catch (e) {
  console.log(e)
  throw 'error'
}

const groupByIds = _.groupBy(nodes, 'id')

const uniqLinks = _.uniqBy(links, (link) => link.source + link.target)

const uniqNodes = _.uniqBy(nodes, 'id')

const getNodeByNodeId = (id) => uniqNodes.find((node) => node.id === id)

const linksModule = uniqLinks.map((link) => ({
  target: getNodeByNodeId(link.target).module,
  source: getNodeByNodeId(link.source).module,
}))

const linksByModule = _.uniqBy(linksModule, (link) => link.source + link.target)

const linksLayer = uniqLinks.map((link) => ({
  target: getNodeByNodeId(link.target).layer,
  source: getNodeByNodeId(link.source).layer,
}))

const linksByLayer = _.uniqBy(linksLayer, (link) => link.source + link.target)

const linksModuleLayer = uniqLinks.map((link) => {
  const targetNode = getNodeByNodeId(link.target)
  const sourceNode = getNodeByNodeId(link.source)
  return{
    target: targetNode.module + '/' + targetNode.layer,
    source: sourceNode.module + '/' + sourceNode.layer,
  }
})

const linksByModuleLayer = _.uniqBy(linksModuleLayer, (link) => link.source + link.target)

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

const getProperty = (property) => (node) => node[property]

console.log(`modules: ${_.uniqBy(nodes, 'module').map(getProperty('module')).join(', ')}`)
console.log(`layers: ${_.uniqBy(nodes, 'layer').map(getProperty('layer')).join(', ')}`)
console.log(`types: ${_.uniqBy(nodes, 'type').map(getProperty('type')).join(', ')}`)

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
          if (fileNodes[i].module === 'external') continue
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
        id: moduleLayer.endsWith('external') ?  `external/external` : moduleLayer,
        name:  moduleLayer,
        layer: moduleLayer.split('/')[1],
        module: moduleLayer.split('/')[0],
        value: nodes.reduce((acc, node) => acc + node.value, 0),
      })),
      links: linksByModuleLayer
    },
  }, null, 2),
);