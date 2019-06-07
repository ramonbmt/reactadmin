import * as React from 'react'

interface Field {
    component?: (value: any, node?: Object) => JSX.Element
    name: string | string[]
    transform?: (value: any, node?: Object) => any
}

interface SimpleTableRowProps {
    fields: Array<Field>
    node: Object
}

declare const SimpleTableRow: React.FunctionComponent<SimpleTableRowProps>

export default SimpleTableRow
