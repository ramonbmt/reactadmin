import * as React from 'react'

interface Field {
    id: string
    values: Array<JSX.Element>
}

interface ExpansionListSummaryProps {
    fields: Array<Field>
}

declare const ExpansionListSummary: React.FunctionComponent<ExpansionListSummaryProps>

export default ExpansionListSummary
