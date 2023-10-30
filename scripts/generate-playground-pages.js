const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')

const sourceFolder = 'src'
const targetBaseFolder = 'src/app/docs'

const routes = []

function createPlaygroundPageFile(file, sourcePath, targetPath) {
  const fileContent = `'use client'\n\nimport Playground from '${sourcePath
    .replace(/^src\b/, '@')
    .replace(
      /.tsx$/,
      '',
    )}'\n\nexport default function PlaygroundPage() {\n  return <Playground />\n}`
  const targetPagePath = targetPath.replace(file, 'playground/page.tsx')
  fs.ensureDirSync(path.dirname(targetPagePath))
  fs.writeFileSync(targetPagePath, fileContent)
}

function traverseAndCreatePlaygroundPages(source, targetBase, pattern) {
  const files = fs.readdirSync(source)

  files.forEach((file) => {
    const sourcePath = path.join(source, file)
    const relativePath = path.relative(sourceFolder, sourcePath)
    const targetPath = path.join(targetBase, relativePath)

    if (fs.statSync(sourcePath).isDirectory()) {
      traverseAndCreatePlaygroundPages(sourcePath, targetBase, pattern)
    } else {
      if (file.match(pattern) && !sourcePath.match(/^src\/app\b/)) {
        createPlaygroundPageFile(file, sourcePath, targetPath)
        routes.push({
          name: _.upperFirst(_.camelCase(file.replace(pattern, ''))),
          path: sourcePath.replace(/^src\b/, '/docs').replace(file, ''),
        })
      }
    }
  })
}

const pattern = /playground\.tsx$/

if (!sourceFolder || !targetBaseFolder) {
  console.log('Por favor, proporciona las rutas de origen y destino.')
} else {
  try {
    traverseAndCreatePlaygroundPages(sourceFolder, targetBaseFolder, pattern)
    console.log('¡Archivos de página creados exitosamente!')
  } catch (error) {
    console.error('Error al crear archivos de página:', error)
  }
}
