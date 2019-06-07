import React from 'react'
import styled from '@emotion/styled'
import { MUITablePropTypes, MUITableDefaultProps } from '../utils/propTypes'
import MUITableHeaderStyles from '../styles/reactTable/mui/header'
import MUITableBodyStyles from '../styles/reactTable/mui/body'

const StyledTable = styled.div`
    &.rt-mui-table {
        ${MUITableHeaderStyles}
        ${MUITableBodyStyles}
    }
`

const MUITable = ({
    children,
    className,
    ...rest
}) => (
    <StyledTable
        className={ `rt-table rt-mui-table ${className}` }
        role="grid"
        { ...rest }
    >
        { children }
    </StyledTable>
)

MUITable.propTypes = MUITablePropTypes

MUITable.defaultProps = MUITableDefaultProps

export default MUITable
