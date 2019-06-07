import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class FormatedDate extends Component {
    static propTypes = {
        update  : PropTypes.bool,
        format  : PropTypes.string,
        date    : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    }

    static defaultProps = {
        update  : false,
        format  : '',
        date    : {}
    }

    constructor (props) {
        super(props)
        const { format, date } = this.props
        this.state = {
            time: moment(date).format(format)
        }
    }

    state = {
        time: ''
    }

    componentWillMount () {
        const { update } = this.props
        if (update) {
            const { format, date } = this.props
            this.interval = setInterval(() => {
                const time = moment(date).format(format)
                this.setState({ time })
            }, 1000)
        }
    }

    componentWillUnmount () {
        const { update } = this.props
        if (update) {
            clearInterval(this.interval)
        }
    }

    render () {
        const { time } = this.state
        return (
            <span> { time } </span>
        )
    }
}

export default FormatedDate
