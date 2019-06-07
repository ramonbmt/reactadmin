import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { componentTypes } from './utils/propTypes'
import { ModuleContext } from './context'
import AdminLayout from './layout'
import GraphqlOrmCreate from './graphqlORM'

const apiTypes = [
    PropTypes.string,
    PropTypes.func
]

const AdminRouter = ({
    routes
}) => (
    <Switch>
        {
            routes.map(route => <Route key={ route.match } path={ route.match } component={ route.component } exact={ route.exact } />)
        }
    </Switch>
)

AdminRouter.propTypes = {
    routes: PropTypes.array
}

AdminRouter.defaultProps = {
    routes: []
}

class BMTModule extends PureComponent {
    static propTypes = {
        history     	    : PropTypes.object.isRequired,
        match       	    : PropTypes.object.isRequired,
        location    	    : PropTypes.object.isRequired,
        children  	        : PropTypes.oneOfType(componentTypes).isRequired,
        api                 : PropTypes.oneOfType(apiTypes),
        apiAuth             : PropTypes.string,
        apollo              : PropTypes.object
    }

    static defaultProps = {
        api             : '',
        apiAuth         : '',
        apollo          : {}
    }

    constructor (props) {
        super(props)
        this.state = {
            routes    	: [],
            drawerObj 	: [],
            /* eslint-disable react/no-unused-state */
            addRoute    : this._addRoute,
            api         : {}
            /* eslint-enable */
        }
    }

    async componentWillMount () {
        let graphqlApi = {}
        const { api, apiAuth, apollo } = this.props
        if (typeof api === 'string') {
            // api = GraphqlOrmCreate(props.api, props.apiAuth)
            // console.log(api)
            graphqlApi = await GraphqlOrmCreate(api, apiAuth, apollo)
            /* eslint-disable react/no-unused-state */
            this.setState({
                api: graphqlApi
            })
            /* eslint-enable */
        }
    }

    _addRoute = route => {
        const { path, title, component, exact, hidden } = route
        const { match } = this.props
        this.setState(prevState => ({
            routes: [...prevState.routes, {
                match: `${match.path}/${path}`,
                component,
                exact
            }],
            drawerObj: [...prevState.drawerObj, {
                name        : title,
                to          : `/${path}`,
                hidden
            }],
            title
        }))
    }

    render () {
        const {
            routes,
            drawerObj,
            title: routeTitle
        } = this.state
        const {
            history,
            match,
            location,
            children
        } = this.props
        return (
            <ModuleContext.Provider value={ this.state }>
                { children }
                {
                    <BrowserRouter>
                        <AdminLayout
                            AdminRouter={ <AdminRouter match={ match } routes={ routes } /> }
                            drawerObj={ drawerObj }
                            title={ routeTitle }
                            history={ history }
                            match={ match }
                            location={ location }
                        />
                    </BrowserRouter>
                }
            </ModuleContext.Provider>
        )
    }
}

export default BMTModule
