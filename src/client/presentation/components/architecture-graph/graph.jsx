'use client'
import cn from 'classnames'
import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import { useEffect, useState, useRef } from "react";
import GraphSettingsForm from './graph-settings-form';
import data from "@/../imports.json";

const getDataByGroup = (groupBy, options) => {
  return {
    nodes: data[groupBy].nodes,
    links: data[groupBy].links.filter((link) => {
      return options.showInternalLinks || link.source !== link.target
    })
  }
}

const nodeLayerColorByModule = (id) => {
  if (id.match(/core/)) {
    return "#1d4ed8"
  }
  if (id.match(/ecommerce/)) {
    return '#eab308'
  }
  if (id.match(/client/)) {
    return '#16a34a'
  }
  if (id.match(/server/)) {
    return '#be123c'
  }
  return 'white'
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
    groupBy: 'modules',
    options: {
      showInternalLinks: true,
    }
  })
  const {
    vision,
    groupBy,
    options: {
      showInternalLinks
    }
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
          return 3;
        }
        return 1
      })())
      .nodeColor(node => {
        if (groupBy === 'layers') {
          if (node.id.match(/domain/)) {
            return '#60a5fa'
          }
          if (node.id.match(/application/)) {
            return '#fde047'
          }
          if (node.id.match(/infrastructure/)) {
            return '#ef4444'
          }
          return 'white'
        }
        if (groupBy === 'modules') {
          return nodeLayerColorByModule(node.id)
        }
        if (groupBy === 'layersAndModules' || groupBy === 'imports' || groupBy === 'files') {
          return nodeLayerColorById(node.id)
        }
        })
        .nodeLabel(node => `${node.name}${node.external?' (external)':''}`)
        .nodeVal(node => node.value)
        .backgroundColor('#000000')
        .linkColor((link) =>{
          const target = link.target.id || link.target || ''
          const source = link.source.id || link.source || ''
          if (groupBy === 'modules') {
            return nodeLayerColorByModule(source)
          }
          if (groupBy === 'layers' || groupBy === 'imports') {
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
  }, [groupBy, showInternalLinks, vision]);
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