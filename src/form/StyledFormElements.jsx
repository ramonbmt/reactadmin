import styled from '@emotion/styled'
import flexCenter from '../styles/emotion/flexCenter'
import createStyled from '../utils/MUIStyled'
import styledFields from '../styles/mui/styledFields'

export const FormWrapper = styled.form`
    ${flexCenter}
    flex-flow: column nowrap;
    :last-child {
        margin-bottom: 1rem;
    }
`

export const StyledFields = createStyled({
    input: {
        ...styledFields.input
    },
    root: {
        minHeight       : '36px',
        width           : '100%',
        '&:first-child' : {
            marginTop: 8
        },
        '&:not(:last-child)': {
            marginBottom: 8
        }
    },
    halfFields: {
        display : 'inline-flex',
        width   : 'calc(50% - 8px)'
    },
    padRight: {
        paddingRight: '8px'
    },
    padLeft: {
        paddingLeft: '8px'
    },
    select: {
        '& .mui-formal-select-placeholder': {
            color      : 'var(--placeholder-text-color)',
            fontSize   : 13,
            fontStyle  : 'italic',
            fontWeight : 400
        }
    },
    saveButton: {
        'grid-area': 'guardar'
    }
})

export const FormContainer = styled.div`
    align-items: stretch;
    display: grid;
    grid-column-gap: 2rem;
    grid-template-columns:
        1fr;
    grid-template-areas:
        "title"
        "form"
        "guardar";
    grid-template-rows:
        auto 1fr auto;
    height: inherit;
    margin-top: 2rem;
    width: 90%;
    justify-items: stretch;
`

export const FormTitle = styled.span`
    font-size: 14px;
    grid-area: title;
`

export const FormLeft = styled.div`
    grid-area: left;
`

export const FormRight = styled.div`
    grid-area: right;
`
