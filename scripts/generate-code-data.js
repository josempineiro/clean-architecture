const fs = require('fs-extra')
const path = require('path')

const targetFile = 'src/code/infrastructure/mocks/data.json'

fs.readJson('coverage/coverage-summary.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const code = Object.entries(data).filter(([key]) => key !== 'total' && !key.endsWith('index.ts')).map(([key, value]) => ({
      path: key.split('src/')[1].split('.')[0],
      coverage: value
    }))
    fs.ensureDirSync(path.dirname(targetFile))
    fs.writeJson(targetFile, code, { spaces: 2 })
});