import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import createStyled from '../utils/MUIStyled'

const StyledContent = createStyled(theme => ({
    item: {
        ...theme.mixins.gutters(),
        height          : 64,
        paddingTop      : 0,
        paddingBottom   : 0,
        fontSize        : 14,
        color           : '#575656',
        '&:hover'       : {
            backgroundColor: '#F4F2EC'
        }
    },
    itemSelected: {
        color           : 'rgba(0, 0, 0, 0.87)',
        borderRight     : '4px solid var(--main-color)',
        fontWeight      : 600,
        backgroundColor : 'transparent !important'
    },
    noIconPadding: {
        paddingLeft: 60
    },
    iconPadding: {
        paddingLeft: 0
    },
    iconMargin: {
        marginRight: 12
    },
    text: {
        fontWeight: 'inherit'
    }
}), { withTheme: true })

const DrawerItem = ({
    route,
    match,
    selectedItem,
    itemProps
}) => (
    <StyledContent>
        { ({ classes }) => (
            <MenuItem
                component={ Link }
                to={ `${match.url}${route.to}` }
                className={ `${classes.item} ${!route.icon && classes.noIconPadding}` }
                classes={{
                    selected: classes.itemSelected
                }}
                selected={ route.to === selectedItem }
                { ...itemProps }
            >
                <ListItemIcon
                    className={ `${route.icon && classes.iconMargin}` }
                >
                    { route.icon
                        ? route.icon()
                        : <Fragment />
                    }
                </ListItemIcon>
                <ListItemText
                    className={ `${route.icon && classes.iconPadding}` }
                    primary={ route.name }
                    primaryTypographyProps={{
                        color       : 'inherit',
                        classes     : {
                            root: classes.text
                        }
                    }}
                />
            </MenuItem>
        ) }
    </StyledContent>
)

DrawerItem.propTypes = {
    route           : PropTypes.object.isRequired,
    match           : PropTypes.object.isRequired,
    selectedItem    : PropTypes.string.isRequired,
    itemProps       : PropTypes.object
}

DrawerItem.defaultProps = {
    itemProps: {}
}

export default DrawerItem
