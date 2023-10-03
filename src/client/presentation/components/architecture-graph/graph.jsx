'use client'
import cn from 'classnames'
import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import { useEffect, useState, useRef } from "react";
import GraphSettingsForm from '@/client/presentation/components/architecture-graph/graph-settings-form';

import data from "@/../imports.json";
import { withRouter } from 'next/router';

const colors = {
  domain: '#ef4444',
  application: '#fde047',
  infrastructure: '#60a5fa',
  presentation: '#65a30d',
  client: '#3178c6',
  ecommerce: '#65a30d',
  server: '#f6069e',
  core: '#f1dd35',
  app: '#61DBFB'
}

const colorByLayer = (layer) => {
  console.log(layer)
  return colors[layer] || 'white'
}

const colorByModule = (module) => {
  console.log(module)
  return colors[module] || 'white'
}

const getModuleColorFromNodeId = (id) => {
  if (id.match(/client/)) {
    return colors.client
  }
  if (id.match(/ecommerce/)) {
    return colors.ecommerce
  }
  if (id.match(/server/)) {
    return colors.server
  }
  if (id.match(/core/)) {
    return colors.core
  }
  if (id.match(/app/)) {
    return colors.app
  }
  return 'white'
}

const getLayerColorFromNodeId = (id) => {
  if (id.match(/domain/)) {
    return '#ef4444'
  }
  if (id.match(/application/)) {
    return '#fde047'
  }
  if (id.match(/infrastructure/)) {
    return '#60a5fa'
  }
  if (id.match(/presentation/)) {
    return '#65a30d'
  }
  return 'white'
}


const getDataByGroup = (groupBy, options) => {
  return {
    nodes: data[groupBy].nodes,
    links: data[groupBy].links.filter((link) => {
      return options.showInternalLinks || link.source !== link.target
    })
  }
}

const nodeLayerColorById = (id) => {
  if (id.match(/domain/)) {
    if (id.match(/core/)) {
      return "#60a5fa"
    }
    if (id.match(/ecommerce/)) {
      return "#1d4ed8"
    }
    if (id.match(/server/)) {
      return '#7e22ce'
    }
    if (id.match(/client/)) {
      return '#0f766e'
    }
    if (id.match(/app/)) {
      return '#0f766e'
    }
    return "#1d4ed8"
  }
  if (id.match(/application/)) {
    if (id.match(/core/)) {
      return '#fef08a'
    }
    if (id.match(/ecommerce/)) {
      return '#eab308'
    }
    if (id.match(/server/)) {
      return '#ea580c'
    }
    if (id.match(/client/)) {
      return '#16a34a'
    }
    return '#eab308'
  }
  if (id.match(/infrastructure/)) {
    if (id.match(/core/)) {
      return '#fda4af'
    }
    if (id.match(/ecommerce/)) {
      return '#be123c'
    }
    if (id.match(/server/)) {
      return '#c026d3'
    }
    if (id.match(/client/)) {
      return '#c2410c'
    }
    return '#be123c'
  }
  return 'white'
}

const nodeColorById = (id) => {
  if (id.match(/client/)) {
    if (id.match(/domain/)) {
      return '#7f1d1d'
    }
    if (id.match(/application/)) {
      return '#dc2626'
    }
    if (id.match(/infrastructure/)) {
      return '#fca5a5'
    }
    return '#dc2626'
  }
  if (id.match(/core/)) {
    if (id.match(/domain/)) {
      return '#365314'
    }
    if (id.match(/application/)) {
      return '#65a30d'
    }
    if (id.match(/infrastructure/)) {
      return '#bef264'
    }
    return '#65a30d'
  }
  if (id.match(/ecommerce/)) {
    if (id.match(/domain/)) {
      return '#ca8a04'
    }
    if (id.match(/application/)) {
      return '#eab308'
    }
    if (id.match(/infrastructure/)) {
      return '#fef08a'
    }
    return '#eab308'
  }
  if (id.match(/server/)) {
    if (id.match(/domain/)) {
      return '#1e3a8a'
    }
    if (id.match(/application/)) {
      return '#4f46e5'
    }
    if (id.match(/server/)) {
      return '#93c5fd'
    }
    return '#4f46e5'
  }
  return 'white'
}

const getLegendByGroup = (groupBy) => {
  if (groupBy === 'layers') {
    return [{
      label: 'domain',
      color: 'blue'
    }, {
      label: 'application',
      color: 'yellow'
    }, {
      label: 'infrastructure',
      color: 'red'
    }, {
      label: 'presentation',
      color: 'green'
    }, {
      label: 'external',
      color: 'gray'
    }]
  }
  if (groupBy === 'modules') {
    return [{
      label: 'server',
      color: 'red'
    }, {
      label: 'ecommerce',
      color: 'yellow'
    }, {
      label: 'core',
      color: 'blue'
    }, {
      label: 'client',
      color: 'green'
    }, {
      label: 'external',
      color: 'gray'
    }]
  }
  return [{
    label: 'domain',
    color: 'blue'
  }, {
    label: 'application',
    color: 'yellow'
  }, {
    label: 'infrastructure',
    color: 'red'
  }, {
    label: 'external',
    color: 'gray'
  }]
}

const Graph = () => {

  const [settings, setSettings] = useState({
    vision: '3d',
    groupBy: 'layers',
    options: {
      showInternalLinks: false,
    },
    palette: 'layers'
  })
  const {
    vision,
    groupBy,
    options: {
      showInternalLinks
    },
    palette,
  } = settings
  
  const ref = useRef(null);
  const wrapperRef = useRef(null);

  

useEffect(() => {
  if(typeof window !== 'undefined') {
    const Force = vision === '2d' ? ForceGraph()(ref.current) : ForceGraph3D()(ref.current).linkOpacity(0.5).nodeResolution(8)
    Force
      .width(wrapperRef.current.offsetWidth)
      .height(wrapperRef.current.offsetHeight)
      .linkCurvature(link => {
        if (link.target === link.source) {
          return 1
        }
        return 0
      })
      .graphData(getDataByGroup(groupBy, {
        showInternalLinks
      }))
      .nodeRelSize((() => {
        if (groupBy === 'files') {
          return 1;
        }
        return 1
      })())
      .nodeColor(node => {
        if (groupBy === 'layers') {
          return colorByLayer(node.layer)
        }
        if (groupBy === 'modules'){
          return colorByModule(node.id)
        }
        if (groupBy === 'files') {
          return getModuleColorFromNodeId(node.id)
        }
        if (groupBy === 'imports') {
          return getModuleColorFromNodeId(node.id)
        }
        if (groupBy === 'layersAndModules') {
          if (palette === 'layers') {
            return getLayerColorFromNodeId(node.id)
          }
          return getModuleColorFromNodeId(node.id)
        }
      })
        .nodeLabel(node => `${node.name}${node.external?' (external)':''}`)
        .nodeVal(node => 4)
        .backgroundColor('#000000')
        .linkColor((link) =>{
          const target = link.target.id || link.target || ''
          const source = link.source.id || link.source || ''
          if (groupBy === 'modules') {
            return getModuleColorFromNodeId(source)
          }
          if (groupBy === 'layers') {
            return getLayerColorFromNodeId(source)
          }
          if (groupBy === 'files') {
            return getModuleColorFromNodeId(source)
          }
          if (groupBy === 'layersAndModules') {
            if (palette === 'layers') {
              return getLayerColorFromNodeId(source)
            }
            return getModuleColorFromNodeId(source)
          }
          if (groupBy === 'imports') {
            if (target.match(/client/)) {
              if (target.match(/domain/)) {
                return '#60a5fa'
              }
              if (target.match(/application/)) {
                return '#a3e635'
              }
              if (target.match(/infrastructure/)) {
                if (source.match(/domain/)) {
                  return '#c026d3'
                }
                if (source.match(/application/)) {
                  return '#fb923c'
                }
              }
            }
            if (target.match(/core/)) {
              if (target.match(/domain/)) {
                return '#60a5fa'
              }
              if (target.match(/application/)) {
                return '#a3e635'
              }
              if (target.match(/infrastructure/)) {
                if (source.match(/domain/)) {
                  return '#c026d3'
                }
                if (source.match(/application/)) {
                  return '#fb923c'
                }
              }
            }
            if (target.match(/ecommerce/)) {
              if (target.match(/domain/)) {
                return '#60a5fa'
              }
              if (target.match(/application/)) {
                return '#a3e635'
              }
              if (target.match(/infrastructure/)) {
                if (source.match(/ecommerce/)) {
                  if (source.match(/domain/)) {
                    return '#0f766e'
                  }
                  if (source.match(/application/)) {
                    return '#fb923c'
                  }
                }
                if (source.match(/application/)) {
                  return '#fb923c'
                }
              }
            }
            if (target.match(/server/)) {
              if (target.match(/domain/)) {
                return '#60a5fa'
              }
              if (target.match(/application/)) {
                return '#a3e635'
              }
              if (target.match(/infrastructure/)) {
                if (source.match(/domain/)) {
                  return '#c026d3'
                }
                if (source.match(/application/)) {
                  return '#fb923c'
                }
              }
            }
            return 'white'
          }
          return nodeLayerColorById(source)
        })
        .linkDirectionalArrowLength(3)
        .linkWidth(1)
        .linkDirectionalParticles(1)
        .linkDirectionalParticleSpeed=(d => 0.001)
        
    }
  }, [groupBy, palette, showInternalLinks, vision]);
  return <div className={"h-full flex-1 overflow-hidden"} ref={wrapperRef}>
    <header className="absolute top-0 left-0 w-full z-10 flex py-4 px-20 gap-20">
      <GraphSettingsForm values={settings} onChange={setSettings} />
    </header>
    <div ref={ref} className={cn('graph')}></div>
    <div className="absolute bottom-10 left-10 flex flex-col">
      {getLegendByGroup(groupBy).map((group) => (
        <div key={group.label} className="inline-flex items-center">
          <span className={`w-2 h-2 inline-block bg-${group.color}-500 rounded-full mr-2`}></span>
          <span className="text-gray-600 dark:text-gray-400">{group.label}</span>
        </div>
      ))}
    </div>
  </div>
  

};

export default Graph