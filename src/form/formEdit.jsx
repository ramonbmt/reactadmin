import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
// import Collapse from '@material-ui/core/Collapse'
import styled from '@emotion/styled'
// import _ from 'lodash'
// import { ModuleContext } from '../context'
// import { Query } from 'react-apollo'
import BMTEditDetail from './edit/index'
// import checkUserInfo from '../../../lib/schemas/checkUserInfo'
import { ModuleContext } from '../context'

const FormWrapper = styled.form`
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    margin-bottom: 80px;
`

class BMTEdit extends PureComponent {
    static propTypes = {
        module      : PropTypes.object.isRequired,
        // module      : PropTypes.object.isRequired,
        // onSubmit    : PropTypes.func,
        schema      : PropTypes.object.isRequired,
        // formRef     : PropTypes.object,
        query       : PropTypes.string,
        mutation    : PropTypes.strng
        // title       : PropTypes.string,
        // checkboxes  : PropTypes.bool,
        // where       : PropTypes.object
    }

    static defaultProps = {
        // onSubmit    : this,
        // formRef     : this,
        query       : '',
        mutation    : ''
        // title       : '',
        // checkboxes  : false,
        // where       : {}
    }

    constructor (props) {
        super(props)
        this.state = {
            formRef: createRef()
        }
    }

    _handleSubmit = (value, actions) => {

    } 

    render () {
        const { schema } = this.props
        const { formRef } = this.state
        return (
            <Formik
                initialValues={ schema.default() }
                onSubmit={ this.handleSubmit }
                ref={ formRef }
                validateOnChange={ false }
                validationSchema={ schema }
            >
                { ({ handleSubmit, isSubmitting, values, errors }) => (
                    <FormWrapper
                        onSubmit={ handleSubmit }
                    >
                        {/* <BMTEditDetail
                            handleSubmit={ handleSubmit }
                            isSubmitting={ isSubmitting }
                            values={ values }
                            errors={ errors }
                            title={ title }
                            checkboxes={ checkboxes }
                            // module={ module }
                            query={ query }
                            where={ where }
                            schema={ schema }
                        /> */}
                    </FormWrapper>
                )}
            </Formik>
        )
    }
}

export default props => (
    <ModuleContext.Consumer>
        {module => <BMTEdit { ...props } module={ module } />}
    </ModuleContext.Consumer>
)
