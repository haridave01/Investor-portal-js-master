import React from "react"
import { ApplicationInputType, ApplicationInput } from "../validations"
import { Form, FormProps } from "app/components/Form"
import LabelledTextField from "app/components/LabelledTextField"
import LabelledNumberField from "app/components/LabelledNumberField"

type ApplicationFormProps = {
  initialValues: ApplicationInputType
  onSubmit: FormProps<ApplicationInputType>["onSubmit"]
}

const ApplicationForm = ({ initialValues, onSubmit }: ApplicationFormProps) => {
  return (
    <Form<ApplicationInputType>
      submitText="Create Application"
      schema={ApplicationInput}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <LabelledTextField name="name" label="Name" placeholder="Name" />
      <LabelledNumberField
        name="accountId"
        label="Account ID"
        placeholder="Account ID"
        type="number"
      />
    </Form>
  )
}

export default ApplicationForm
