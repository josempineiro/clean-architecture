'use client'

import { useRouter } from 'next/navigation'
import { ArchitectureGraphSettings } from '@/blog/domain'
import { CleanArchitectureView } from '@/blog/presentation'

function useSettingsearchParams(searchParams: any): ArchitectureGraphSettings {
  return {
    vision: searchParams.vision || '2d',
    groupBy: searchParams.groupBy || 'modules',
    options: {
      showInternalLinks: searchParams.showInternalLinks || false,
    },
    palette: searchParams.palette || 'modules',
  }
}

export default function Page({ searchParams }: any) {
  const router = useRouter()
  const settings = useSettingsearchParams(searchParams)

  function handleChangeSettings(settings: ArchitectureGraphSettings) {
    const settingsParams = new URLSearchParams({
      vision: settings.vision,
      groupBy: settings.groupBy,
      palette: settings.palette,
      showInternalLinks: settings.options.showInternalLinks.toString(),
    })
    router.push(`?${settingsParams}`)
  }
  return (
    <CleanArchitectureView
      settings={settings}
      onChangeSettings={handleChangeSettings}
    />
  )
}
