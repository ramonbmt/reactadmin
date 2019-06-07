import * as React from 'react'

interface Field {
    keyName: string
    values: Array<Object>
}

interface SimpleTableBodyProps {
    fields: Array<Field>
    nodes: Array<Object>
}

declare const SimpleTableBody: React.FunctionComponent<SimpleTableBodyProps>

export default SimpleTableBody
