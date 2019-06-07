import * as React from 'react'

interface MUITableProps extends React.HTMLAttributes<HTMLElement> {
    children?: Object | Array<Object>
    className?: string
}

declare const MUITable: React.FunctionComponent<MUITableProps>

export default MUITable
