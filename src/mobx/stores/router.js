import PropTypes from 'prop-types'
import {
    action,
    observable
} from 'mobx'

const routerStoreInject = ({
    router: {
        redirect,
        setRedirect
    }
}) => ({
    redirect,
    setRedirect
})

const redirects = [
    'LOGOUT',
    'NONE',
    'PRIVATE',
    'PUBLIC'
]

const routerStoreProps = {
    redirect: PropTypes.shape({
        path        : PropTypes.string,
        permissions : PropTypes.shape({
            read  : PropTypes.bool,
            write : PropTypes.bool
        }),
        type: PropTypes.oneOf(redirects).isRequired
    })
}

class RouterStore {
    @observable redirect = {
        path        : null,
        permissions : null,
        type        : 'NONE'
    }

    @action setRedirect = redirect => { this.redirect = redirect }
}

export {
    routerStoreInject,
    routerStoreProps
}

export default RouterStore
