const pickRelevantValues = ({
    errors,
    isSubmitting,
    isValid,
    isValidating,
    touched,
    values
}, name) => ({
    error   : errors[name],
    isSubmitting,
    isValid,
    isValidating,
    touched : touched[name],
    value   : values[name]
})

const valuesToArray = ({
    error,
    isSubmitting,
    isValid,
    isValidating,
    touched,
    value
}) => [
    value,
    error,
    touched,
    isSubmitting,
    isValidating,
    isValid
]

const checkRelevantValues = ({
    name,
    nextProps,
    prevProps
}) => {
    const prev = valuesToArray(pickRelevantValues(prevProps, name)),
        next = valuesToArray(pickRelevantValues(nextProps, name))
    return next.some((value, i) => value !== prev[i])
}

export {
    checkRelevantValues,
    pickRelevantValues,
    valuesToArray
}
