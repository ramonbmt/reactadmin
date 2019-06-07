import styled from '@emotion/styled'

const Container = styled.div`
    display: grid;
    padding-top: 56px;
    grid-template:
        'title' 48px
        'content' 1fr
        / 1fr;
`

const Title = styled.div`
    grid-area: title;
    display: flex;
    justify-content: center;
    font-size: 32px;
`

const Content = styled.div`
    grid-area: content;
    padding-top: 32px;
    display: grid;
    grid-template:
        'inputs' auto
        'actions' 1fr
        / 1fr;
`

const InputContainer = styled.div`
    grid-area: inputs;
    display: flex;
    flex-direction: column;
    align-items: center;
    > :not(:last-child) {
        margin-bottom: 16px;
    }
`

const ActionContainer = styled.div`
    grid-area: actions;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 32px;
`

const MUIStyles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        width: '500px'
    },
    inputRoot: {
        backgroundColor : '#E0E0E0',
        marginTop       : `${theme.spacing.unit * 4}px !important`,
        borderRadius    : 4,
        height          : 40
    },
    inputLabel: {
        color       : 'var(--p-white)',
        fontSize    : 25,
        lineHeight  : '34px'
    },
    label: {
        color: 'var(--p-black) !important'
    },
    baseInput: {
        paddingLeft: 8
    },
    icon: {
        fontSize: 20
    },
    selectInput: {
        width    : '500px',
        '&> div' : {
            marginTop: 0
        }
    },
    select: {
        paddingLeft : 8,
        height      : 'calc(100% - 16px)',
        paddingTop   : 9
    },
    selectIcon: {
        top: 'calc(50% - 14px)'
    }
})

export {
    ActionContainer,
    Container,
    Content,
    InputContainer,
    MUIStyles,
    Title
}
