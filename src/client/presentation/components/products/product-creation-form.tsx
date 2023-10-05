import { Product } from "@/ecommerce/domain";
import { Form, Field, FormProps, NumberField, TextField } from "@/core/presentation/components/forms";
import { CreateProductVariables } from "@/ecommerce/application";

export const ProductCreationForm = ({ children, ...rest }: FormProps<CreateProductVariables>) => {
  return (
    <Form<CreateProductVariables> {...rest} className={"flex flex-col gap-4 flex-1"}>
      <div className="flex-1 flex justify-center flex-col gap-5">
        <Field<string> field="name" label="Name">
          <TextField />
        </Field>
        <Field<string> field="description" label="Description">
          <TextField />
        </Field>
      </div>
      {children}
    </Form>
  )
};

export default ProductCreationForm