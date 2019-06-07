import { Formik, Field, Form, withFormik, FieldArray, utils, FastField, types, connect } from 'formik'
import form from './form'
import edit from './formEdit'
import FormikField from '../formik/FormikField'
import FormikSelect from '../formik/FormikSelect'

export default {
    form,
    edit,
    Formik: { Formik, Field, Form, withFormik, FieldArray, utils, FastField, types, connect },
    FormikField,
    FormikSelect
}
