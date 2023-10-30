const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')

const sourceFolder = 'src'
const targetBaseFolder = 'src/app/docs'

const routes = []

function createPageFile(file, sourcePath, targetPath) {
  const fileContent = `'use client'\n\nimport Docs from '${sourcePath.replace(
    /^src\b/,
    '@',
  )}'\n\nexport default function Page() {\n  return (<article className="mx-auto prose dark:prose-invert"><Docs /></article>)\n}`
  const targetPagePath = targetPath.replace(file, 'page.tsx')
  fs.ensureDirSync(path.dirname(targetPagePath))
  fs.writeFileSync(targetPagePath, fileContent)
}

function createRoutesFile(routes) {
  const targetPagePath = 'src/docs/infrastructure/mocks/data.json'
  fs.ensureDirSync(path.dirname(targetPagePath))
  fs.writeFileSync(targetPagePath, JSON.stringify(routes, null, 2))
}

function traverseAndCreatePages(source, targetBase, pattern) {
  const files = fs.readdirSync(source)

  files.forEach((file) => {
    const sourcePath = path.join(source, file)
    const relativePath = path.relative(sourceFolder, sourcePath)
    const targetPath = path.join(targetBase, relativePath)

    if (fs.statSync(sourcePath).isDirectory()) {
      traverseAndCreatePages(sourcePath, targetBase, pattern)
    } else {
      if (file.match(pattern) && !sourcePath.match(/^src\/app\b/)) {
        createPageFile(file, sourcePath, targetPath)
        routes.push({
          name: _.upperFirst(_.camelCase(file.replace(pattern, ''))),
          path: sourcePath.replace(/^src\b/, 'docs').replace(`/${file}`, ''),
        })
      }
    }
  })
}

const pattern = /docs\.mdx$/

if (!sourceFolder || !targetBaseFolder) {
  console.log('Por favor, proporciona las rutas de origen y destino.')
} else {
  try {
    traverseAndCreatePages(sourceFolder, targetBaseFolder, pattern)
    console.log('¡Archivos de página creados exitosamente!')
  } catch (error) {
    console.error('Error al crear archivos de página:', error)
  }
}
createRoutesFile(routes)
