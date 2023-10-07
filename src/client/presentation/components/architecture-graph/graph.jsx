'use client'
import { useEffect, useState, useRef } from "react";
import GraphSettingsForm from '@/client/presentation/components/architecture-graph/graph-settings-form';
import { ArchitectureGraph } from "@/client/presentation/components/architecture-graph/architecture-graph";

const Graph = () => {
  const [graphMeasures, setGraphMeasures] = useState({
    width: 0,
    height: 0
  })
  const wrapperRef = useRef(null);
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
    options: {
      showInternalLinks
    },
    palette,
  } = settings
  
  useEffect(() => {
    if (wrapperRef.current) {
      setGraphMeasures({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight
      })
    }
  }, [])


  return <div className={"h-full flex-1 overflow-hidden relative"} ref={wrapperRef}>
    <header className="absolute top-0 left-0 w-full z-10 flex py-4 px-4 md:px-10 lg:px-20 gap-20">
      <GraphSettingsForm values={settings} onChange={setSettings} />
    </header>
    {graphMeasures.width && graphMeasures.height && <ArchitectureGraph settings={settings} {...setGraphMeasures} />}
  </div>
  

};

export default Graph