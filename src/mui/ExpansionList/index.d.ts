import * as React from 'react'

interface Field {
    component?: (value: any, node?: Object) => JSX.Element
    item: string | string[]
    title: string
    transform?: (value: any, node?: Object) => any
}

interface ExpansionListProps {
    classes: Object<string>
    content: JSX.Element
    loading: boolean
    fields: Array<Field>
    edges?: Array<Object>
}

declare const ExpansionList: React.FunctionComponent<ExpansionListProps>

export default ExpansionList
