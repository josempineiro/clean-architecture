import {
  Form,
  BaseField,
  FormProps,
  TextField,
} from '@/core/presentation'
import { CreateProductVariables } from '@/ecommerce/application'

export const ProductCreationForm = ({
  children,
  ...rest
}: FormProps<CreateProductVariables>) => {
  return (
    <Form<CreateProductVariables>
      {...rest}
      className={'flex flex-col gap-4 flex-1'}
    >
      <div className="flex-1 flex justify-center flex-col gap-5">
        <BaseField<string> field="name" label="Name">
          <TextField />
        </BaseField>
        <BaseField<string> field="description" label="Description">
          <TextField />
        </BaseField>
      </div>
      {children}
    </Form>
  )
}

export default ProductCreationForm
