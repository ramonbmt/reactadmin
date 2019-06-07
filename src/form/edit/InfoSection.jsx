import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import FormikSelectionControl from '../../formik/FormikSelectionControl'
import createStyled from '../../utils/MUIStyled'

const Section = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    margin-bottom: 48px;
    width: 100%;
`

const InfoTitle = styled.div`
    display: flex;
    flex: 0 1 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
`

const TitleWrapper = styled.div`
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    min-width: 234px;
    border-bottom: 3px solid #FDC100;
    > span {
        font-size: 14px;
        font-weight: 600;
        color: #575656;
        margin: 0px 58px;
    }
`

const InfoDetail = styled.div`
    display: flex;
    flex: 1 1 auto;
    >:nth-child(2) {
        margin-left: 115px;
    }
`

const DetailWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-shrink: 0;
    align-items: flex-start;
    max-width: ${({ column }) => (column ? '50%' : '100%')};
`

const CheckboxWrapper = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    margin-right: 41px;
`

const InputWrapper = styled.div`
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    margin-right: 41px;
`

const InputLabel = styled.div`
    display: flex;
    height: 48px;
    align-items: center;
    > span {
        font-size: 14px;
        color: #4D4F5C;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const SubmittedWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`

const SubmittedItem = styled.div`
    display: flex;
    height: 48px;
    align-items: center;
    > span {
        font-size: 14px;
        color: #4D4F5C;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const ItemIcon = styled.a`
    color: inherit;
    > svg {
        width: 20px !important;
        height: 20px;
        margin-left: 16px;
    }
`

const StyledCheckbox = createStyled({
    rootLabel: {
        marginRight: 0
    },
    label: {
        fontSize    : 14,
        color       : '#4D4F5C'
    }
})

class InfoSection extends PureComponent {
    static propTypes = {
        name    : PropTypes.string,
        info    : PropTypes.oneOfType([
            PropTypes.shape({
                left    : PropTypes.array,
                right   : PropTypes.array
            }),
            PropTypes.array
        ]).isRequired,
        column      : PropTypes.bool,
        checkboxes  : PropTypes.bool,
        disabled    : PropTypes.bool
    }

    static defaultProps = {
        name        : null,
        column      : false,
        checkboxes  : false,
        disabled    : false
    }

    render () {
        const {
            name,
            column,
            info,
            checkboxes,
            disabled
        } = this.props
        // console.log('render info section')
        return (
            <Section>
                { name && (
                    <InfoTitle>
                        <TitleWrapper>
                            <span> { name } </span>
                        </TitleWrapper>
                    </InfoTitle>
                ) }
                { column
                    ? (
                        <InfoDetail>
                            <DetailWrapper
                                column
                            >
                                { checkboxes ? (
                                    <StyledCheckbox>
                                        {({ classes }) => (
                                            <CheckboxWrapper>
                                                { info.left.map(({ key, label }) => (
                                                    <FormikSelectionControl
                                                        key={ `${key}-checkbox` }
                                                        fieldProps={{
                                                            type : 'checkbox',
                                                            name : key
                                                        }}
                                                        childProps={{
                                                            color           : 'primary',
                                                            controlLabel    : {
                                                                disabled,
                                                                label,
                                                                // disabled    : value === '',
                                                                classes: {
                                                                    root    : classes.rootLabel,
                                                                    label   : classes.label
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )) }
                                            </CheckboxWrapper>
                                        )}
                                    </StyledCheckbox>
                                ) : (
                                    <InputWrapper>
                                        { info.left.map(({ key, label }) => (
                                            <InputLabel
                                                key={ `${key}-field` }
                                            >
                                                <span> { label } </span>
                                            </InputLabel>
                                        )) }
                                    </InputWrapper>
                                ) }
                                <SubmittedWrapper>
                                    { info.left.map(({ key, value, type, icon, file }) => (
                                        <SubmittedItem
                                            key={ `${key}-item` }
                                        >
                                            { type === 'file' && value !== '' ? (
                                                <Fragment>
                                                    <span>
                                                        <a href={ file } target="_blank" rel="noopener noreferrer">
                                                            { value }
                                                        </a>
                                                    </span>
                                                    <ItemIcon href={ file } target="_blank" rel="noopener noreferrer">
                                                        { icon() }
                                                    </ItemIcon>
                                                </Fragment>
                                            )
                                                : <span> { value } </span>
                                            }
                                        </SubmittedItem>
                                    )) }
                                </SubmittedWrapper>
                            </DetailWrapper>
                            <DetailWrapper
                                column
                            >
                                { checkboxes ? (
                                    <StyledCheckbox>
                                        {({ classes }) => (
                                            <CheckboxWrapper>
                                                { info.right.map(({ key, label }) => (
                                                    <FormikSelectionControl
                                                        key={ `${key}-checkbox` }
                                                        fieldProps={{
                                                            type : 'checkbox',
                                                            name : key
                                                        }}
                                                        childProps={{
                                                            color           : 'primary',
                                                            controlLabel    : {
                                                                disabled,
                                                                label,
                                                                // disabled    : value === '',
                                                                classes: {
                                                                    root    : classes.rootLabel,
                                                                    label   : classes.label
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )) }
                                            </CheckboxWrapper>
                                        )}
                                    </StyledCheckbox>
                                ) : (
                                    <InputWrapper>
                                        { info.right.map(({ key, label }) => (
                                            <InputLabel
                                                key={ `${key}-field` }
                                            >
                                                <span> { label } </span>
                                            </InputLabel>
                                        )) }
                                    </InputWrapper>
                                ) }
                                <SubmittedWrapper>
                                    { info.right.map(({ key, value, type, icon, file }) => (
                                        <SubmittedItem
                                            key={ `${key}-item` }
                                        >
                                            { type === 'file' && value !== '' ? (
                                                <Fragment>
                                                    <span>
                                                        <a href={ file } target="_blank" rel="noopener noreferrer">
                                                            { value }
                                                        </a>
                                                    </span>
                                                    <ItemIcon href={ file } target="_blank" rel="noopener noreferrer">
                                                        { icon() }
                                                    </ItemIcon>
                                                </Fragment>
                                            )
                                                : <span> { value } </span>
                                            }
                                        </SubmittedItem>
                                    )) }
                                </SubmittedWrapper>
                            </DetailWrapper>
                        </InfoDetail>
                    )
                    : (
                        <InfoDetail>
                            <DetailWrapper>
                                { checkboxes ? (
                                    <StyledCheckbox>
                                        {({ classes }) => (
                                            <CheckboxWrapper>
                                                { info.map(({ key, label }) => (
                                                    <FormikSelectionControl
                                                        key={ `${key}-checkbox` }
                                                        fieldProps={{
                                                            type : 'checkbox',
                                                            name : key
                                                        }}
                                                        childProps={{
                                                            color           : 'primary',
                                                            controlLabel    : {
                                                                disabled,
                                                                label,
                                                                // disabled    : value === '',
                                                                classes: {
                                                                    root    : classes.rootLabel,
                                                                    label   : classes.label
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )) }
                                            </CheckboxWrapper>
                                        )}
                                    </StyledCheckbox>
                                ) : (
                                    <InputWrapper>
                                        { info.map(({ key, label }) => (
                                            <InputLabel
                                                key={ `${key}-field` }
                                            >
                                                <span> { label } </span>
                                            </InputLabel>
                                        )) }
                                    </InputWrapper>
                                ) }
                                <SubmittedWrapper>
                                    { info.map(({ key, value, type, icon, file }) => (
                                        <SubmittedItem
                                            key={ `${key}-item` }
                                        >
                                            { type === 'file' && value !== '' ? (
                                                <Fragment>
                                                    <span>
                                                        <a href={ file } target="_blank" rel="noopener noreferrer">
                                                            { value }
                                                        </a>
                                                    </span>
                                                    <ItemIcon href={ file } target="_blank" rel="noopener noreferrer">
                                                        { icon() }
                                                    </ItemIcon>
                                                </Fragment>
                                            )
                                                : <span> { value } </span>
                                            }
                                        </SubmittedItem>
                                    )) }
                                </SubmittedWrapper>
                            </DetailWrapper>
                        </InfoDetail>
                    )
                }
            </Section>
        )
    }
}

export default InfoSection
