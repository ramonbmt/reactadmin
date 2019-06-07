import styled from '@emotion/styled'
import flexCenter from '../styles/emotion/flexCenter'

const ContentArea = styled.div`
    display: grid;
    grid-template:
        "info date search" 125px
        "content content content" 1fr
        / 1fr 1fr 1fr;
    height: 100%;
    width: 100%;
`

const ContentInfo = styled.div`
    align-items: center;
    display: flex;
    grid-area: info;
    justify-content: space-around;
    > span {
        font-size: 1.375rem;
    }
    > div {
        align-items: flex-end;
        display: flex;
        height: 15%;
        span {
            font-size: 0.875rem;
        }
    }
`

const ContentDateFilter = styled.div`
    ${flexCenter}
    flex-flow: row wrap;
    grid-area: date;
    justify-content: space-evenly;
`

const ContentBody = styled.div`
    ${flexCenter}
    flex-flow: column nowrap;
    grid-area: content;
    height: calc(100% - 32px);
    justify-content: flex-start;
    overflow: auto;
    padding: 16px 0 16px;
    > div {
        max-width: 1600px;
        min-width: 0;
        width: 90%;
        &:first-of-type {
            margin-top: 2px;
        }
    }
`

const TableContainer = styled.div`
    grid-area: content;
    padding-bottom: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    ${({ theme }) => theme.breakpoints.down('md')} {
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

const ContentAreaCreate = styled.div`
    display: grid;
    grid-template:
        "info date search" 125px
        "action action action" 50px
        "content content content" 1fr
        / 1fr 1fr 1fr;
    height: 100%;
    width: 100%;
`

const ContentAction = styled.div`
    grid-area: action;
    display: flex;
    padding: 0 32px;
`

export {
    ContentAction,
    ContentArea,
    ContentAreaCreate,
    ContentBody,
    ContentDateFilter,
    ContentInfo,
    TableContainer
}
