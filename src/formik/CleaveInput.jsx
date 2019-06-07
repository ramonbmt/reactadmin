import React from 'react'
import PropTypes from 'prop-types'
import Cleave from 'cleave.js/react'

const CleaveInput = ({
    formatProps,
    inputRef,
    ...rest
}) => (
    <Cleave
        options={ formatProps }
        ref={ inputRef }
        { ...rest }
    />
)

CleaveInput.propTypes = {
    formatProps : PropTypes.object.isRequired,
    inputRef    : PropTypes.func.isRequired
}

export default CleaveInput
