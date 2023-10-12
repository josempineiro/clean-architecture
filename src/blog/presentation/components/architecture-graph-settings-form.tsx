import {
  Form,
  FormField,
  RadioGroupField,
  SelectField,
  CheckboxesField,
  FormProps,
} from '@/core/presentation'
import { ArchitectureGraphSettings } from '@/blog/domain'

const visions = [
  {
    label: '2D',
    value: '2d',
  },
  {
    label: '3D',
    value: '3d',
  },
]

const groups = [
  {
    label: 'Layers',
    value: 'layers',
  },
  {
    label: 'Modules',
    value: 'modules',
  },
  {
    label: 'Imports',
    value: 'imports',
  },
  {
    label: 'Modules and layers',
    value: 'layersAndModules',
  },
  {
    label: 'Files',
    value: 'files',
  },
]

const options = [
  {
    label: 'Internals',
    value: 'showInternalLinks',
  },
]

const palette = [
  {
    label: 'Layer',
    value: 'layers',
  },
  {
    label: 'Module',
    value: 'modules',
  },
]

export function ArchitectureGraphSettingsForm({
  onChange,
  values,
}: FormProps<ArchitectureGraphSettings>) {
  return (
    <Form<ArchitectureGraphSettings>
      values={values}
      onChange={onChange}
      onSubmit={() => {}}
      className={'flex gap-4 w-full'}
    >
      <FormField<string> field="groupBy">
        <SelectField options={groups} label="Group" className="flex-1" />
      </FormField>
      <FormField<string> field="vision">
        <SelectField options={visions} label="Vision" className="flex-1" />
      </FormField>
      <FormField<Record<string, boolean>> field="options">
        <CheckboxesField options={options} label="Options" />
      </FormField>
      <FormField<string> field="palette">
        {(props, form) => {
          const groupBy =
            form.getFieldValue<ArchitectureGraphSettings['groupBy']>('groupBy')
          const value = (() => {
            if (groupBy === 'layers') {
              return 'layers'
            }
            if (groupBy === 'modules') {
              return 'modules'
            }
            return props.value
          })()
          debugger
          return (
            <RadioGroupField
              label="Palette"
              {...props}
              value={value}
              options={palette}
              disabled={['modules', 'layers'].includes(groupBy)}
            />
          )
        }}
      </FormField>
    </Form>
  )
}
