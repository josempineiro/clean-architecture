export interface ArchitectureGraphSettings {
  vision: '3d' | '2d'
  groupBy: 'layers' | 'modules'
  options: {
    showInternalLinks: boolean
  }
  palette: 'layers' | 'modules'
}
