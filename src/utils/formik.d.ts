import {
    FormikBag,
    FormikValues
} from 'formik'

interface BaseArgs {
    isSubmitting: boolean
    isValid: boolean
    isValidating: boolean
}

interface RelevantValues extends BaseArgs {
    errors: FormikValues
    touched: FormikValues
    values: FormikValues
}

interface ToArrayValues extends BaseArgs {
    error: string
    touched: string
    value: any
}

interface CheckValues {
    name: string
    nextProps: FormikBag
    prevProps: FormikBag
}

declare const pickRelevantValues: (values: RelevantValues, name: string) => ToArrayValues

declare const valuesToArray: (values: ToArrayValues) => Array<string | boolean | any>

declare const checkRelevantValues: (values: CheckValues) => boolean

export {
    checkRelevantValues,
    pickRelevantValues,
    valuesToArray
}
