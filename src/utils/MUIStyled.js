import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

/**
 * Creates component with render prop for style override of MUI components
 *
 * @param {Object} styles styles object
 * @param {Object} options options object
 * @returns {Component} component with render prop
 */
const createStyled = (styles, options) => {
    const Styled = ({ children, ...rest }) => children(rest)
    Styled.propTypes = {
        children : PropTypes.func.isRequired,
        classes  : PropTypes.object.isRequired
    }
    return withStyles(styles, options)(Styled)
}

export default createStyled
