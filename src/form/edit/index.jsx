import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
// import Collapse from '@material-ui/core/Collapse'
import styled from '@emotion/styled'
// import { Query } from 'react-apollo'
import FormikButton from '../../formik/FormikButton'
import createStyled from '../../utils/MUIStyled'
import flexCenter from '../../styles/emotion/flexCenter'
import InfoSection from './InfoSection'
import FetchData from './fetchData'
// import checkUserInfo from '../../../lib/schemas/checkUserInfo'

const Info = styled(Paper)`
    display: flex;
    flex: 1 auto;
    padding: 37px 91px;
    margin-bottom: 40px;
    flex-direction: column;
`

const Btn = styled.div`
    ${flexCenter}
    margin: auto;
`

const StyledBtn = createStyled({
    root: {
        height          : 40,
        width           : 170,
        backgroundColor : '#02A00E',
        color           : '#FFF',
        borderRadius    : 2,
        fontSize        : 16
    },
    btnReject: {
        backgroundColor: 'var(--main-color)'
    },
    colorPrimary: {
        color: '#868686'
    },
    btnDisabled: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
})

class BMTEditDetails extends PureComponent {
    static propTypes = {
        schema          : PropTypes.object.isRequired,
        query           : PropTypes.string,
        title           : PropTypes.string,
        checkboxes      : PropTypes.bool,
        where           : PropTypes.object,
        isSubmitting    : PropTypes.bool.isRequired,
        errors          : PropTypes.object
    }

    static defaultProps = {
        query       : '',
        title       : '',
        checkboxes  : false,
        where       : {},
        errors      : {}
    }

    state = {
        data        : [],
        column      : false
    }

    _saveData = data => {
        this.setState(
            () => ({
                data    : data.data,
                column  : data.column
            })
        )
    }

    render () {
        const {
            isSubmitting,
            checkboxes,
            title,
            errors,
            schema,
            query,
            where
        } = this.props
        const {
            data,
            column
        } = this.state
        return (
            <Fragment>
                <FetchData
                    schema={ schema }
                    query={ query }
                    where={ where }
                    saveData={ this._saveData }
                >
                    <Fragment>
                        <Info
                            elevation={ 2 }
                        >
                            <InfoSection
                                name={ title }
                                info={ data }
                                column={ column }
                                checkboxes={ checkboxes }
                            />
                        </Info>
                        <Btn>
                            <StyledBtn>
                                {({ classes }) => (
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
                                )}
                            </StyledBtn>
                        </Btn>
                    </Fragment>
                </FetchData>
            </Fragment>
        )
    }
}

export default BMTEditDetails
