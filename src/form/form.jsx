import React, { PureComponent, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import _ from 'lodash'
// import { Query } from 'react-apollo'
import styled from '@emotion/styled'
import Snackbar from '@material-ui/core/Snackbar'
import FormikField from '../formik/Field'
import FormikButton from '../formik/Button'
import FormikSelect from '../formik/Select'
import RenderFields from '../formik/RenderFields2'
import { ModuleContext } from '../context'
import { FormWrapper, FormTitle, StyledFields, FormContainer } from './StyledFormElements'

const InputsWrapper = styled.div`
    grid-area: form;
`

class BMTForm extends PureComponent {
    static propTypes = {
        module      : PropTypes.object.isRequired,
        // onSubmit    : PropTypes.func,
        schema      : PropTypes.object.isRequired,
        // formRef     : PropTypes.object,
        title       : PropTypes.string,
        mutation    : PropTypes.string
    }

    static defaultProps = {
        // onSubmit    : this,
        // formRef     : this,
        title       : '',
        mutation    : ''
    }

    constructor (props) {
        super(props)
        const { schema } = props
        const inputs = []
        // console.log(schema)
        _.each(schema.fields, v => {
            const field = v._cms
            if (_.isObject(field)) {
                if (!field.fieldProps) {
                    field.fieldProps = {
                        name    : '',
                        type    : 'text'
                    }
                }
                if (!field.formatProps) {
                    field.formatProps = {}
                }
                if (!field.childProps) {
                    if (field.fieldProps.type === 'text') {
                        field.childProps = classes => ({
                            className  : classes.root,
                            InputProps : {
                                classes: { input: classes.input }
                            },
                            formatProps: field.formatProps
                        })
                    } else {
                        field.childProps = classes => ({
                            className: classes.root
                        })
                    }
                }
                if (!field.dataProps) {
                    field.dataProps = {}
                }
                if (!field.dataProps.data) {
                    field.dataProps.data = []
                }
                if (!field.dataProps.getValue) {
                    field.dataProps.getValue = this._handleUpdateQuery
                }
                if (!field.dataProps.loading) {
                    field.dataProps.loading = false
                }
                inputs.push(field)
                // console.log(field)
            }
        })
        this.state = {
            inputs,
            formRef         : createRef(),
            openSnack       : false,
            snackMessage    : ''
        }
    }

    _handleSubmit = async (args, actions) => {
        const { mutation, module: { api }, schema } = this.props
        const info = `{
            id
        }`
        try {
            const result = await api[mutation]({
                data: schema.cast(args)
            }, info)
            console.log(result)
            this.setState({
                openSnack       : true,
                snackMessage    : 'Se agrego el registro'
            })
            actions.resetForm(schema.default())
        } catch (error) {
            console.log(error)
            this.setState({
                openSnack       : true,
                snackMessage    : error.toString()
            })
            actions.setSubmitting(false)
        }
        // console.log('enviar formulario', mutation, args, result)
    }

    _determineInputType = (type, props) => {
        let resultType
        switch (type) {
            case 'text':
                resultType = <FormikField { ...props } />
                break
            case 'select':
                resultType = <FormikSelect { ...props } />
        }
        return resultType
    }

    _defaultHandlerSubmit = () => {
        this.current.submitForm()
    }

    _handleUpdateQuery = ({ name, value }) => {
        this.setState({ [name]: value })
    }

    _handleCloseSnack = () => {
        this.setState({
            openSnack       : false,
            snackMessage    : ''
        })
    }

    render () {
        const {
            schema,
            title
        } = this.props
        const {
            inputs,
            formRef,
            openSnack,
            snackMessage
        } = this.state
        return (
            <Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical    : 'top',
                        horizontal  : 'right'
                    }}
                    autoHideDuration={ 3000 }
                    open={ openSnack }
                    onClose={ this._handleCloseSnack }
                    message={ <span>{ snackMessage }</span> }
                />
                <Formik
                    initialValues={ schema.default() }
                    onSubmit={ this._handleSubmit }
                    ref={ formRef }
                    validateOnChange={ false }
                    validationSchema={ schema }
                >
                    { ({ handleSubmit, isSubmitting, errors }) => (
                        <FormWrapper
                            onSubmit={ handleSubmit }
                        >
                            <FormContainer>
                                <FormTitle>{ title }</FormTitle>
                                <StyledFields>
                                    { ({ classes }) => (
                                        <Fragment>
                                            <InputsWrapper>
                                                <RenderFields
                                                    inputs={ inputs }
                                                    classes={ classes }
                                                />
                                            </InputsWrapper>
                                            <FormikButton
                                                formProps={{
                                                    isSubmitting,
                                                    errors
                                                }}
                                                btnProps={{
                                                    classes: {

                                                    },
                                                    className: classes.saveButton
                                                }}
                                            >
                                                Guardar
                                            </FormikButton>
                                        </Fragment>
                                    ) }
                                </StyledFields>
                            </FormContainer>
                        </FormWrapper>
                    ) }
                </Formik>
            </Fragment>

        )
    }
}

export default props => (
    <ModuleContext.Consumer>
        {module => <BMTForm { ...props } module={ module } />}
    </ModuleContext.Consumer>
)
