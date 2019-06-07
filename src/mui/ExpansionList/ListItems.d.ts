import * as React from 'react'

interface Field {
    id: string
    node: Object
    values: Array<string | Object>
}

interface ExpansionListItemsProps {
    content: JSX.Element
    fields: Array<Field>
}

declare const ExpansionListItems: React.FunctionComponent<ExpansionListItemsProps>

export default ExpansionListItems
