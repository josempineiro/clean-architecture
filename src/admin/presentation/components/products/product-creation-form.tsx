import {
  Form,
  TextareaField,
  FormProps,
  FormField,
  TextField,
  Button,
} from '@/core/presentation'
import { CreateProductVariables } from '@/ecommerce/application'

export const ProductCreationForm = ({
  children,
  values,
  ...rest
}: FormProps<CreateProductVariables>) => {
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="flex justify-center items-center w-full h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
          </div>
          <Form<CreateProductVariables>
            values={values}
            className="grid gap-4 mb-4 sm:grid-cols-2"
            {...rest}
          >
            <FormField<string> field="name">
              <TextField label="Name" role="name-input" />
            </FormField>

            <FormField<string> field="description">
              <TextareaField label="Description" className="sm:col-span-2" />
            </FormField>
            {children}
          </Form>
        </div>
      </div>
    </div>
  )
}
