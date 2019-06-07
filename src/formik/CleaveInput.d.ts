import * as React from 'react'
import { Props } from 'cleave.js/react/props'
import { CleaveOptions } from 'cleave.js/options'

interface CleaveInputProps extends Props {
    formatProps: CleaveOptions
    inputRef: React.Ref
}

declare const CleaveInput: React.FunctionComponent<CleaveInputProps>

export default CleaveInput
