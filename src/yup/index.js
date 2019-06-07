import {
    mixed,
    string,
    number,
    bool,
    boolean,
    date,
    object,
    array,
    ref,
    lazy,
    reach,
    isSchema,
    addMethod,
    setLocale,
    ValidationError
} from 'yup'

addMethod(string, 'cms', function func (params) {
    this._cms = params
    return this
})

export default {
    mixed,
    string,
    number,
    bool,
    boolean,
    date,
    object,
    array,
    ref,
    lazy,
    reach,
    isSchema,
    addMethod,
    setLocale,
    ValidationError
}
