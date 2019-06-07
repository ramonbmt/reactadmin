import PropTypes from 'prop-types'
import { routerStoreProps } from '../mobx/stores/router'

const collectionPropType = PropTypes.arrayOf(PropTypes.object)

const signupFormPropTypes = {
    formRef  : PropTypes.object.isRequired,
    onSubmit : PropTypes.func.isRequired,
    schema   : PropTypes.object.isRequired
}

const MUITablePropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        collectionPropType
    ]),
    className: PropTypes.string
}

const MUITableDefaultProps = {
    children  : [],
    className : ''
}

const componentPropTypes = PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.string
])

const location = PropTypes.shape({
    hash     : PropTypes.string.isRequired,
    key      : PropTypes.string, // only in createBrowserHistory and createMemoryHistory
    pathname : PropTypes.string.isRequired,
    search   : PropTypes.string.isRequired,
    state    : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.object,
        PropTypes.string
    ]) // only in createBrowserHistory and createMemoryHistory
}).isRequired

const history = PropTypes.shape({
    action     : PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
    block      : PropTypes.func.isRequired,
    canGo      : PropTypes.func, // only in createMemoryHistory
    createHref : PropTypes.func.isRequired,
    entries    : PropTypes.arrayOf(location), // only in createMemoryHistory
    go         : PropTypes.func.isRequired,
    goBack     : PropTypes.func.isRequired,
    goForward  : PropTypes.func.isRequired,
    index      : PropTypes.number, // only in createMemoryHistory
    length     : PropTypes.number,
    listen     : PropTypes.func.isRequired,
    location   : location.isRequired,
    push       : PropTypes.func.isRequired,
    replace    : PropTypes.func.isRequired
}).isRequired

const match = PropTypes.shape({
    isExact : PropTypes.bool,
    params  : PropTypes.object.isRequired,
    path    : PropTypes.string.isRequired,
    url     : PropTypes.string.isRequired
}).isRequired

const routerPropTypes = {
    history,
    location,
    match
}

const RouteType = [
    'FREE',
    'PRIVATE',
    'PUBLIC'
]

const BMTRoutePropTypes = {
    ...routerPropTypes,
    ...routerStoreProps,
    component          : PropTypes.func.isRequired,
    firstAllowedModule : PropTypes.func.isRequired,
    permissions        : PropTypes.func.isRequired,
    refreshToken       : PropTypes.func.isRequired,
    children           : PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    computedMatch      : PropTypes.object, // private, from <Switch>
    exact              : PropTypes.bool,
    location           : PropTypes.object,
    module             : PropTypes.string,
    path               : PropTypes.string,
    render             : PropTypes.func,
    sensitive          : PropTypes.bool,
    strict             : PropTypes.bool,
    type               : PropTypes.oneOf(RouteType)
}

const transformDataPropType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
])

const componentTypes = [
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.string,
    PropTypes.symbol
]

export {
    componentTypes,
    BMTRoutePropTypes,
    collectionPropType,
    componentPropTypes,
    MUITableDefaultProps,
    MUITablePropTypes,
    routerPropTypes,
    signupFormPropTypes,
    transformDataPropType
}
