import * as React from 'react'

interface Field {
    keyName: string
    values: Array<Object>
}

interface SimpleTableProps {
    classes: Object<string>
    fields: Array<Field>
    nodes: Array<Object>
}

declare const SimpleTable: React.FunctionComponent<SimpleTableProps>

export default SimpleTable
