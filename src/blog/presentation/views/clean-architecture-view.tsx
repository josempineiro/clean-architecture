'use client'
import { ArchitectureGraphSettings } from '@/blog/domain'
import { ArchitectureGraphSettingsForm } from '@/blog/presentation/components/architecture-graph-settings-form'
import { ArchitectureGraph } from '@/blog/presentation/components/architecture-graph'
import { AutoSizer } from '@/core/presentation'

export function CleanArchitectureView({
  settings,
  onChangeSettings,
}: {
  settings: ArchitectureGraphSettings
  onChangeSettings: (settings: ArchitectureGraphSettings) => void
}) {
  return (
    <div className={'h-full flex-1 overflow-hidden relative'}>
      <header className="absolute top-0 left-0 w-full z-10 flex py-4 px-4 md:px-10 lg:px-20 gap-20">
        <ArchitectureGraphSettingsForm
          values={settings}
          onChange={onChangeSettings}
          onSubmit={onChangeSettings}
        />
      </header>
      <AutoSizer className="w-full h-full">
        {({ width, height }) => (
          <ArchitectureGraph
            settings={settings}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </div>
  )
}
