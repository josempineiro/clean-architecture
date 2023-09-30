'use client'
import cn from 'classnames'
import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';
import { useEffect, useState, useRef } from "react";
import data from "@/../imports.json";

const Graph = () => {
  const [vision, setVision] = useState('3d')
  const [groupBy, setGroupBy] = useState('layers')
  const ref = useRef(null);
  const wrapperRef = useRef(null);

  

useEffect(() => {
  const Force = vision === '2d' ? ForceGraph : ForceGraph3D
  Force()(ref.current)
    .width(wrapperRef.current.offsetWidth)
    .height(wrapperRef.current.offsetHeight)
      .graphData(data[groupBy])
      .nodeColor(node => {
        if (groupBy === 'layers') {
          if (node.layer.match(/domain/)) {
              return 'yellow'
          }
          if (node.layer.match(/infrastructure/)) {
              return 'green'
          }
          if (node.layer.match(/application/)) {
              return 'red'
          }
          return 'blue'
        }
        if (groupBy === 'modules') {
          if (node.id.match(/client/)) {
              return 'yellow'
          }
          if (node.id.match(/core/)) {
              return 'green'
          }
          if (node.id.match(/ecommerce/)) {
              return 'red'
          }
          return 'blue'
        }
        if (groupBy === 'layersAndModules' || groupBy === 'imports' || groupBy === 'files') {
          if (node.id.match(/client/)) {
              if (node.id.match(/domain/)) {
                  return 'rgba(255,255,127,0.33)'
              }
              if (node.id.match(/infrastructure/)) {
                  return 'rgba(38, 194, 129, 0.33)'
              }
              if (node.id.match(/application/)) {
                return 'rgba(255, 76, 48, 0.33)'
              }
              return 'rgba(76, 48, 255, 0.33)'
          }
          if (node.id.match(/core/)) {
              if (node.id.match(/domain/)) {
                return 'rgba(255,255,127,1)'
              }
              if (node.id.match(/infrastructure/)) {
                return 'rgba(38, 194, 129, 1)'
              }
              if (node.id.match(/application/)) {
                return 'rgba(255, 76, 48, 1)'
              }
              return 'rgba(76, 48, 255, 1)'
          }
          if (node.id.match(/ecommerce/)) {
              if (node.id.match(/domain/)) {
                return 'rgba(255,255,127,0.66)'
              }
              if (node.id.match(/infrastructure/)) {
                return 'rgba(38, 194, 129, 0.66)'
              }
              if (node.id.match(/application/)) {
                return 'rgba(255, 76, 48, 0.66)'
              }
              return 'rgba(76, 48, 255, 0.66)'
          }
          return 'rgba(76, 48, 255, 1)'
        }
      })
      .nodeLabel(node => `${node.name}${node.external?' (external)':''}`)
      .nodeVal(node => node.value)
      .backgroundColor('#000000')
      .linkCurvature((link) => {
        if (link.source.id === link.target.id) {
          return 1
        }
        return 0
      })
      .linkColor((link) =>{
        const target = link.target.id || link.target || ''

        if (target.match(/domain/)) {
          return 'rgba(255,255,127,0.66)'
        }
        if (target.match(/infrastructure/)) {
          return 'rgba(38, 194, 129, 0.66)'
        }
        if (target.match(/application/)) {
          return 'rgba(255, 76, 48, 0.66)'
        }
        return 'blue'
      })
      .linkDirectionalArrowLength(3)
      .linkWidth(2)
      .linkDirectionalParticles(() => 1)
      .linkDirectionalParticleSpeed=(d => 0.005)

}, [groupBy, vision]);
  
  return <div className={"h-full flex-1 overflow-hidden"} ref={wrapperRef}>
    <header className="absolute top-0 left-0 w-full z-10 flex py-4 px-20 gap-20">
      <select defaultValue={groupBy} onChange={(event) => setGroupBy(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="imports">Imports</option>
        <option value="layers">Layers</option>
        <option value="files">Files</option>
        <option value="modules">Modules</option>
        <option value="layersAndModules">Layers and modules</option>
      </select>

      <select defaultValue={vision} onChange={(event) => setVision(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="2d">2D</option>
        <option value="3d">3D</option>
      </select>
    </header>
    <div ref={ref} className={cn('graph')}></div>
  </div>
  

};

export default Graph