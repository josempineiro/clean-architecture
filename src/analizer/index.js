const ts = require("typescript");
const config = require('../../tsconfig.json')

const tsHost = ts.createCompilerHost(config, true)

function parseTSXFile(filePath) {

  const sourceFile = tsHost.getSourceFile(
    filePath,
    ts.ScriptTarget.ESNext,
    (msg) => {
      console.log(msg)
      throw new Error(`Failed to parse ${fileName}: ${msg}`)
    },
  )

  // Recopila información sobre las importaciones, exportaciones y definiciones.
  const importDeclarations = [];
  const exportDeclarations = [];
  const typeDeclarations = [];

  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      console.log(node.getText ? node.getText() : undefined)
      importDeclarations.push(node.getText());
    } else if (ts.isExportDeclaration(node)) {
      exportDeclarations.push(node.getText());
    } else if (
      (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
      !ts.isExportAssignment(node)
    ) {
      typeDeclarations.push(node.getText());
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return {
    importDeclarations,
    exportDeclarations,
    typeDeclarations,
  };
}
// Ruta del archivo TSX a analizar.
const filePath = "/Users/jmpineiro/workspace/dev/leman/ecommerce/src/core/presentation/components/navigation/sidebar.tsx";

const result = parseTSXFile(filePath);

console.log("Importaciones:");
console.log(result.importDeclarations);

console.log("\nExportaciones:");
console.log(result.exportDeclarations);

console.log("\nDefiniciones TypeScript:");
console.log(result.typeDeclarations);