const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')

function createTestReportPageFile(report, targetPath) {
  const fileContent = `'use client'\n\nimport { CodeCoverageChart } from '@/code/presentation'

  export default function Page() {\n  return (<CodeCoverageChart data={${JSON.stringify(report, null, 2)}} />)\n}`
  const targetPagePath = path.join(targetPath.split('.')[0], 'page.tsx')
  fs.ensureDirSync(path.dirname(targetPagePath))
  fs.writeFileSync(targetPagePath, fileContent)
}

// Read the JSON file
fs.readJson('coverage/coverage-summary.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    Object.entries(data).filter(([key, value]) => key !== 'total' && !key.endsWith('index.ts')).forEach(([key, value]) => {
      createTestReportPageFile(value, `src/app/code/coverage/${key.split('src/')[1]}`)
    })
});