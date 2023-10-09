'use client'
import { useEffect, useState, useRef } from 'react'
import GraphSettingsForm from '@/shop/presentation/components/architecture-graph/graph-settings-form'
import { ArchitectureGraph } from '@/shop/presentation/components/architecture-graph/architecture-graph'
import { AutoSizer } from '@/core/presentation'

const Graph = () => {
  const [graphMeasures, setGraphMeasures] = useState({
    width: 0,
    height: 0,
  })
  const wrapperRef = useRef(null)
  const [settings, setSettings] = useState({
    vision: '3d',
    groupBy: 'layers',
    options: {
      showInternalLinks: false,
    },
    palette: 'layers',
  })

  useEffect(() => {
    if (wrapperRef.current) {
      setGraphMeasures({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
      })
    }
  }, [])

  return (
    <div className={'h-full flex-1 overflow-hidden relative'} ref={wrapperRef}>
      <header className="absolute top-0 left-0 w-full z-10 flex py-4 px-4 md:px-10 lg:px-20 gap-20">
        <GraphSettingsForm values={settings} onChange={setSettings} />
      </header>
      <AutoSizer className="w-full aspect-square mx-auto">
        {({ width, height }) => (
          <ArchitectureGraph settings={settings} {...setGraphMeasures} />
        )}
      </AutoSizer>
    </div>
  )
}

export default Graph
