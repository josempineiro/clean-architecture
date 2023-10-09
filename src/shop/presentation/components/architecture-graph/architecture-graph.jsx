'use client'
import { useEffect, useRef } from 'react'
import ForceGraph from 'force-graph'
import cn from 'classnames'
import ForceGraph3D from '3d-force-graph'
import data from '@/../imports.json'

const colors = {
  layers: {
    domain: '#ef4444',
    application: '#fde047',
    presentation: '#60a5fa',
    infrastructure: '#65a30d',
    external: '#9ca3af',
  },
  modules: {
    core: '#f1dd35',
    ecommerce: '#65a30d',
    shop: '#3178c6',
    server: '#f6069e',
    app: '#61DBFB',
    admin: '#4f46e5',
    external: '#9ca3af',
  },
}

const colorByLayer = (layer) => {
  return colors.layers[layer] || 'white'
}

const colorByModule = (module) => {
  return colors.modules[module] || 'white'
}

const getModuleColorFromNodeId = (id) => {
  if (id.match(/core/)) {
    return colors.modules.core
  }
  if (id.match(/shop/)) {
    return colors.modules.shop
  }
  if (id.match(/admin/)) {
    return colors.modules.admin
  }
  if (id.match(/ecommerce/)) {
    return colors.modules.ecommerce
  }
  if (id.match(/external/)) {
    return colors.modules.external
  }
  if (id.match(/app/)) {
    return colors.modules.app
  }
  if (id.match(/server/)) {
    return colors.modules.server
  }
  return 'white'
}

const getLayerColorFromNodeId = (id) => {
  if (id.match(/infrastructure/)) {
    return colors.layers.infrastructure
  }
  if (id.match(/presentation/)) {
    return colors.layers.presentation
  }
  if (id.match(/domain/)) {
    return colors.layers.domain
  }
  if (id.match(/application/)) {
    return colors.layers.application
  }
  return 'white'
}

const getDataByGroup = (groupBy, options) => {
  return {
    nodes: data[groupBy].nodes,
    links: data[groupBy].links.filter((link) => {
      return options.showInternalLinks || link.source !== link.target
    }),
  }
}

const getLegendByGroup = (groupBy, palette) => {
  if (groupBy === 'files') {
    return Object.entries(colors.modules)
      .concat(Object.entries(colors.layers))
      .map(([label, value]) => ({
        label,
        value,
      }))
  }
  if (groupBy === 'layers') {
    return Object.entries(colors.layers).map(([label, value]) => ({
      label,
      value,
    }))
  }
  if (groupBy === 'modules') {
    return Object.entries(colors.modules).map(([label, value]) => ({
      label,
      value,
    }))
  }
  return Object.entries(colors[palette]).map(([label, value]) => ({
    label,
    value,
  }))
}

export const ArchitectureGraph = ({ settings, width, height }) => {
  const {
    vision,
    groupBy,
    options: { showInternalLinks },
    palette,
  } = settings

  const ref = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const Force =
        vision === '2d'
          ? ForceGraph()(ref.current)
          : ForceGraph3D()(ref.current).linkOpacity(0.5).nodeResolution(8)
      Force.width(width)
        .height(height)
        .linkCurvature((link) => {
          if (link.target === link.source) {
            return 1
          }
          return 0
        })
        .graphData(
          getDataByGroup(groupBy, {
            showInternalLinks,
          }),
        )
        .nodeRelSize(
          (() => {
            return 2
          })(),
        )
        .nodeColor((node) => {
          if (groupBy === 'layers') {
            return colorByLayer(node.layer)
          }
          if (groupBy === 'modules') {
            return colorByModule(node.id)
          }
          if (groupBy === 'files') {
            if (palette === 'layers') {
              if (Object.keys(colors.modules).includes(node.name)) {
                return getModuleColorFromNodeId(node.id)
              }
              return getLayerColorFromNodeId(node.id)
            }
            return getModuleColorFromNodeId(node.id)
          }
          if (groupBy === 'imports') {
            if (palette === 'layers') {
              if (Object.keys(colors.modules).includes(node.name)) {
                return getModuleColorFromNodeId(node.id)
              }
              return getLayerColorFromNodeId(node.id)
            }
            return getModuleColorFromNodeId(node.id)
          }
          if (groupBy === 'layersAndModules') {
            if (palette === 'layers') {
              return getLayerColorFromNodeId(node.id)
            }
            return getModuleColorFromNodeId(node.id)
          }
        })
        .nodeLabel((node) => node.name)
        .nodeVal((node) => 4)
        .backgroundColor('#00000000')
        .linkColor((link) => {
          const target = (link.target.id || link.target || '').replace('@/', '')
          const source = (link.source.id || link.source || '').replace('@/', '')
          if (groupBy === 'modules') {
            return getModuleColorFromNodeId(source)
          }
          if (groupBy === 'layers') {
            return getLayerColorFromNodeId(source)
          }
          if (groupBy === 'files') {
            if (palette === 'layers') {
              if (Object.keys(colors.modules).includes(target)) {
                return getModuleColorFromNodeId(target)
              }
              if (Object.keys(colors.modules).includes(source)) {
                return getModuleColorFromNodeId(source)
              }
              return getLayerColorFromNodeId(target)
            }
            return getModuleColorFromNodeId(target)
          }
          if (groupBy === 'layersAndModules') {
            if (palette === 'layers') {
              return getLayerColorFromNodeId(source)
            }
            return getModuleColorFromNodeId(source)
          }
          if (groupBy === 'imports') {
            if (palette === 'layers') {
              if (Object.keys(colors.modules).includes(target)) {
                return getModuleColorFromNodeId(target)
              }
              if (Object.keys(colors.modules).includes(source)) {
                return getModuleColorFromNodeId(source)
              }
              return getLayerColorFromNodeId(target)
            }
            return getModuleColorFromNodeId(target)
          }
          return 'white'
        })
        .linkDirectionalArrowLength(3)
        .linkWidth(1)
        .linkDirectionalParticles(1).linkDirectionalParticleSpeed = (d) => 0.001
    }
  }, [groupBy, height, palette, showInternalLinks, vision, width])
  return (
    <div className="relative w-full h-full">
      <div ref={ref} className={cn('graph')}></div>
      <div className="absolute bottom-10 left-10 flex flex-col">
        {getLegendByGroup(groupBy, palette).map((group) => (
          <div key={group.label} className="inline-flex items-center">
            <span
              style={{
                backgroundColor: group.value,
              }}
              className={`w-2 h-2 inline-block rounded-full mr-2`}
            ></span>
            <span className="text-gray-600 dark:text-gray-400">
              {group.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
