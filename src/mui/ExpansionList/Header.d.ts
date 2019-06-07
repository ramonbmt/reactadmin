import * as React from 'react'

interface Title {
    key: string
    title: string
}

interface ExpansionListHeaderProps {
    titles: Array<Title>
}

declare const ExpansionListHeader: React.FunctionComponent<ExpansionListHeaderProps>

export default ExpansionListHeader
