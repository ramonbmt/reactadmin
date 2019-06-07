/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled'
import flexCenter from '../styles/emotion/flexCenter'

const ItemText = styled.div`
    ${flexCenter}
    flex-basis: ${({ size }) => size};
`

export {
    ItemText
}
