const path =require('path');
const fs = require('fs');
const _ = require('lodash');
const { builtinModules } =require('module');
const ts = require('typescript');
const config =require('./tsconfig.json');

const tsHost = ts.createCompilerHost(
  {...config,
  },
  true,
);

const entryFile = './src/client/application/index.ts'
const entryId = '@/client/application'

const links = []
const nodes = [{
  "group": "client",
  "id": entryId,
  "name": 'ClientApplication',
  "module": "client",
  "layer": "application",
  "type": "application",
  "value": 1
}]


function getImports(fileName, name) {
  const importing = [];
    const sourceFile = tsHost.getSourceFile(
      fileName,
      ts.ScriptTarget.Latest,
      (msg) => {
        console.log(msg);
        throw new Error(`Failed to parse ${fileName}: ${msg}`);
      },
    );
    if (!sourceFile) {
      
    return importing;
    }
    delintNode(sourceFile);
    return importing;

    function delintNode(node) {
      if (ts.isImportDeclaration(node)) {
        const moduleName = node.moduleSpecifier.getText().replace(/['"]/g, '');
        if (
          !moduleName.startsWith('node:') &&
          !builtinModules.includes(moduleName)
        )
        importing.push(moduleName);

        const mod = moduleName.split('/')[1]
        const external = !moduleName.startsWith('@/')
        const layer = moduleName.split('/')[2]
        const type = moduleName.split('/')[3]
        nodes.push({
          id: moduleName,
          name: _.upperFirst(_.camelCase(moduleName.split('/').reverse()[0])),
          module: mod,
          layer: layer,
          type: type,
          external: external,
        })
        links.push({
          target: name,
          source: moduleName,
        });
        if (moduleName.startsWith('@/')) {
          try {
            getImports(moduleName.replace('@/', './src/') + '.ts', moduleName);
          } catch (e) {
            try {
              getImports(moduleName.replace('@/', './src/') + '.tsx', moduleName);
            } catch (e) {            try {
              getImports(moduleName.replace('@/', './src/') + '/index.ts', moduleName);
            } catch (e) {
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

getImports(entryFile, entryId)

const groupByIds = _.groupBy(nodes, 'id')


fs.writeFileSync(
  path.join(__dirname, 'imports.json'),
  JSON.stringify({
    nodes: _.uniqBy(nodes, 'id').map((node) => ({
      ...node,
      value: groupByIds[node.id].length,
    })),
    links: _.uniqBy(links, (link) => link.source + link.target)
  }, null, 2),
);