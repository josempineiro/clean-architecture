const fs = require('fs');
const path = require('path');
const parser = require('ts-migrate-parser');

function extractImportsExports(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedContent = parser(fileContent);

    const imports = [];
    const exports = [];

    if (parsedContent.imports) {
        parsedContent.imports.forEach(importStatement => {
            imports.push(importStatement.source);
        });
    }

    if (parsedContent.exports) {
        parsedContent.exports.forEach(exportStatement => {
            exports.push(exportStatement.export);
        });
    }

    return {
        filePath: filePath,
        imports: imports,
        exports: exports
    };
}

function readFilesRecursively(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    const result = [];

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            result.push(...readFilesRecursively(filePath));
        } else if (path.extname(filePath) === '.ts') {
            result.push(extractImportsExports(filePath));
        }
    });

    return result;
}

const directoryPath = './src'; // Reemplaza con la ruta de tu directorio
const extractedInfo = readFilesRecursively(directoryPath);
console.log(extractedInfo);