import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { componentTypes } from './utils/propTypes'
import { ModuleContext, PathContext } from './context'

class BMTPath extends PureComponent {
    static propTypes = {
        title       	: PropTypes.string,
        children      	: PropTypes.oneOfType(componentTypes).isRequired,
        path  			: PropTypes.string.isRequired,
        exact 			: PropTypes.bool,
        hidden          : PropTypes.bool,
        module          : PropTypes.object.isRequired
    }

    static defaultProps = {
        title		: '',
        exact		: false,
        hidden      : false
    }

    componentWillMount () {
        const { module, path, children, title, exact, hidden } = this.props
        module.addRoute({
            path,
            component: () => <Fragment>{ children }</Fragment>,
            title,
            exact,
            hidden
        })
    }

    render () {
        return (
            <PathContext.Provider>
                <Fragment />
            </PathContext.Provider>
        )
    }
}

export default props => (
    <ModuleContext.Consumer>
        {module => <BMTPath { ...props } module={ module } />}
    </ModuleContext.Consumer>
)
