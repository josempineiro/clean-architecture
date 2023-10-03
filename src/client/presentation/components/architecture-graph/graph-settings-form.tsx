import {  useState } from "react";
import { Form, Field, TextField, SelectField, CheckboxesField, FormProps } from "@/core/presentation/components/forms";

interface GraphSettings {
  vision: '2d' | '3d'
  groupBy: 'layers' | 'modules' | 'layersAndModules' | 'imports' | 'files',
  options: ['showInternalLinks']
}

const visions = [{
  label: '2D',
  value: '2d'
}, {

  label: '3D',
  value: '3d'
}]


const groups = [{
  label: 'Layers',
  value: 'layers'
}, {

  label: 'Modules',
  value: 'modules'
}, {

  label: 'Imports',
  value: 'imports'
}, {

  label: 'Modules and layers',
  value: 'layersAndModules'
}, {

  label: 'Files',
  value: 'files'
}]

const options = [{
  label: 'Show internal links',
  value: 'showInternalLinks'
}]


const GraphSettingsForm = ({ onChange, values}: FormProps<GraphSettings>) => {
  return (
    <Form<GraphSettings> values={values} onChange={onChange} onSubmit={() => {}} className={"flex gap-4"}>
      <Field<string> field="groupBy" label="Group">
        <SelectField options={groups} />
      </Field>
      <Field<string> field="vision" label="Vision">
        <SelectField options={visions} />
      </Field>
      <Field<Record<string, boolean>> field="options" label="Options">
        <CheckboxesField options={options} />
      </Field>
    </Form>
  )
};

export default GraphSettingsForm