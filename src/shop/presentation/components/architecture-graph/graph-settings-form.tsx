import {
  Form,
  BaseField,
  RadioGroupField,
  SelectField,
  CheckboxesField,
  FormProps,
} from '@/core/presentation'

export interface GraphSettings {
  vision: '2d' | '3d'
  groupBy: 'layers' | 'modules' | 'layersAndModules' | 'imports' | 'files'
  options: {
    showInternalLinks: boolean
    palette: 'layers' | 'modules'
  }
}

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

const GraphSettingsForm = ({ onChange, values }: FormProps<GraphSettings>) => {
  return (
    <Form<GraphSettings>
      values={values}
      onChange={onChange}
      onSubmit={() => {}}
      className={'flex gap-4'}
    >
      <BaseField<string> field="groupBy" label="Group">
        <SelectField options={groups} />
      </BaseField>
      <BaseField<string> field="vision" label="Vision">
        <SelectField options={visions} />
      </BaseField>
      <BaseField<Record<string, boolean>> field="options" label="Options">
        <CheckboxesField options={options} />
      </BaseField>
      <BaseField<Record<string, boolean>> field="palette" label="Palette">
        <RadioGroupField options={palette} />
      </BaseField>
    </Form>
  )
}

export default GraphSettingsForm