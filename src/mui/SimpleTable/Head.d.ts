import * as React from 'react'

interface SimpleTableHeadProps {
    classes: Object<string>
    keys: string[]
    values: Array<Object>
}

declare const SimpleTableHead: React.FunctionComponent<SimpleTableHeadProps>

export default SimpleTableHead
