import cn from 'classnames'
import ForceGraph3D from '3d-force-graph';
import ForceGraph from 'force-graph';

import { useEffect, useState, useRef } from "react";
import data from "@/../imports.json";

const Graph = () => {
  const [vision, setVision] = useState('2d')
  const [groupBy, setGroupBy] = useState('layer')
  const ref = useRef(null);
  const wrapperRef = useRef(null);

  

useEffect(() => {
  ForceGraph3D()(ref.current)
    .width(wrapperRef.current.offsetWidth - 100)
    .height(wrapperRef.current.offsetHeight - 100)
      .graphData(data)
      .nodeColor(node => {
        if (groupBy === 'layer') {

          switch (node.layer) {
            case 'domain':
              return 'yellow'
            case 'infrastructure':
                return 'green'
            case 'application':
              return 'red'
            default:
              return 'blue'
          }
        }
      })
      .nodeLabel(node => `${node.name}${node.external?' (external)':''}`)
      .nodeVal(node => node.value)
      .linkWidth(2)
      .linkDirectionalParticles(() => 1)
      .linkDirectionalParticleSpeed=(d => 0.005)

}, [groupBy, vision]);
  
  return <div className={"h-full flex-1"} ref={wrapperRef}>
    <select onChange={(event) => setGroupBy(event.target.value)}>
      <option value="layer">Layer</option>
      <option value="module">Module</option>
      <option value="type">Type</option>
    </select>
    <select onChange={(event) => setVision(event.target.value)}>
      <option value="2d">2D</option>
      <option value="3d">3D</option>
    </select>
    <div ref={ref} className={cn('graph')}></div>
  </div>
  

};

export default Graph