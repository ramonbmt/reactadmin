import React, { createRef, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Clear from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import FormHelperText from '@material-ui/core/FormHelperText'
import createS3Object from '../utils/S3'

const setNativeValue = (element, value) => {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
    const prototype = Object.getPrototypeOf(element)
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value)
    } else {
        valueSetter.call(element, value)
    }
}

const FileInput = styled.div`
    cursor: pointer;
    position: absolute;
    height: 32px;
    left: 0;
    top: 0;
    width: ${({ file }) => (file ? '90%' : '100%')};
    > input[type=file] {
        position: absolute;
        left: -120vw;
        top: 0;
    }
`

class MUIFileField extends PureComponent {
    fileInput = createRef()

    static propTypes = {
        formProps   : PropTypes.object.isRequired,
        name        : PropTypes.string.isRequired,
        onBlur      : PropTypes.func.isRequired,
        onChange    : PropTypes.func.isRequired,
        childProps  : PropTypes.object,
        placeholder : PropTypes.string,
        value       : PropTypes.shape({
            name : PropTypes.string,
            size : PropTypes.number,
            type : PropTypes.string
        })
    }

    static defaultProps = {
        childProps  : null,
        placeholder : '',
        value       : {}
    }

    state = {
        currentFile: null
    }

    setViewInput = el => {
        this.viewInput = el
    }

    _handleKeyPress = e => {
        if (e.which === 13) {
            const { formProps } = this.props
            formProps.submitForm()
        }
    }

    _handleFileInputClick = () => {
        const { formProps, name } = this.props
        this.fileInput.current.click()
        formProps.setFieldTouched(name, true)
    }

    _handleFileInputChange = ({ target: { files: [file = null] } }) => {
        const { childProps, formProps, name } = this.props
        const currentFile = createS3Object(file, childProps.type || null)
        this.setState({ currentFile }, () => {
            formProps.setFieldValue(name, currentFile || {})
            this.triggerChangeInput(file ? file.name : null)
        })
    }

    clearInput = () => {
        this.setState({ currentFile: null }, () => {
            const { formProps, name } = this.props
            this.fileInput.current.value = ''
            formProps.setFieldValue(name, {})
            this.triggerChangeInput()
        })
    }

    triggerChangeInput = (val = '') => {
        setNativeValue(this.viewInput, val)
        this.viewInput.dispatchEvent(new Event('input', { bubbles: true }))
    }

    renderAdornment = () => {
        const { currentFile } = this.state
        if (!currentFile) {
            return null
        }
        return (
            <InputAdornment
                onClick={ this.clearInput }
                position="end"
            >
                <IconButton>
                    <Clear />
                </IconButton>
            </InputAdornment>
        )
    }

    render () {
        const {
            childProps: {
                className,
                InputProps,
                type,
                ...restChildProps
            },
            formProps,
            name,
            onBlur,
            placeholder
        } = this.props
        const touched = formProps.touched[name],
            error = Boolean(touched && formProps.errors[name])
        const { currentFile } = this.state
        return (
            <FormControl
                className={ className }
                error={ error }
            >
                <Input
                    { ...InputProps }
                    { ...restChildProps }
                    endAdornment={ this.renderAdornment() }
                    inputRef={ this.setViewInput }
                    name={ name }
                    onBlur={ onBlur }
                    placeholder={ placeholder }
                    readOnly
                />
                <FileInput
                    onClick={ this._handleFileInputClick }
                    file={ Boolean(currentFile) }
                >
                    <input
                        onChange={ this._handleFileInputChange }
                        ref={ this.fileInput }
                        type="file"
                    />
                </FileInput>
                { error && <FormHelperText>{ formProps.errors[name] }</FormHelperText> }
            </FormControl>
        )
    }
}

export default MUIFileField
