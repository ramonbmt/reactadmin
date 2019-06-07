import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
// import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import createStyled from '../utils/MUIStyled'
import DrawerItem from './DrawerItem'

const Container = styled.div`
    display: grid;
    height: 100%;
    grid-template: 
        "header" auto
        "content" 1fr
        / 100%;
`
const Header = styled.div`
    grid-area: header;
    display: flex;
    flex-direction: column;
    > div {
        margin-bottom: 15px;
    }
    padding-top: 12px;
    padding-bottom: 12px;
    position: relative;
`

const Content = styled.div`
    display: flex;
    grid-area: content;
    width: 100%;
`

const StyledContent = createStyled(theme => ({
    gutters: {
        ...theme.mixins.gutters()
    },
    toolbar : theme.mixins.toolbar,
    icon    : {
        fontSize: 42
    }
}), { withTheme: true })

class ResponsiveDrawer extends Component {
    static propTypes = {
        drawerOpen          : PropTypes.bool.isRequired,
        drawerToggle        : PropTypes.func.isRequired,
        match               : PropTypes.object.isRequired,
        location            : PropTypes.object.isRequired,
        drawerObj           : PropTypes.arrayOf(PropTypes.object).isRequired
    }

    constructor (props) {
        super()
        this.state = {
            selectedItem: props.location.pathname.split('/')[2] !== undefined ? `/${props.location.pathname.split('/')[2]}` : ''
        }
    }

    _handleMenuItemClick = name => {
        const { drawerToggle } = this.props
        this.setState({ selectedItem: name })
        drawerToggle()
    }

    render () {
        const {
            drawerOpen,
            drawerToggle,
            drawerObj,
            match
        } = this.props
        const { selectedItem } = this.state
        const drawerContent = (
            <StyledContent>
                { ({ classes }) => (
                    <Container>
                        <Header
                            className={ `${classes.gutters} ${classes.toolbar}` }
                        >
                            <div>
                                <AccountCircle
                                    className={ classes.icon }
                                />
                            </div>
                            <div>
                                <Typography
                                    variant="title"
                                >
                                    Nombre
                                </Typography>
                                <Typography
                                    variant="subheading"
                                >
                                    Correo
                                </Typography>
                            </div>
                            <Divider
                                absolute
                            />
                        </Header>
                        <Content>
                            <List
                                component="nav"
                            >
                                { drawerObj.map(route => (
                                    <DrawerItem
                                        key={ route.key || route.to }
                                        route={ route }
                                        match={ match }
                                        selectedItem={ selectedItem }
                                        handleClick={ this._handleMenuItemClick }
                                    />
                                ))}
                            </List>
                        </Content>
                    </Container>
                ) }
            </StyledContent>
        )
        return (
            <Fragment>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={ drawerOpen }
                        onClose={ drawerToggle }
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        { drawerContent }
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer
                        variant="permanent"
                        open
                    >
                        { drawerContent }
                    </Drawer>
                </Hidden>
            </Fragment>
        )
    }
}

ResponsiveDrawer.propTypes = {
    drawerOpen          : PropTypes.bool.isRequired,
    drawerToggle        : PropTypes.func.isRequired,
    match               : PropTypes.object.isRequired,
    drawerObj           : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ResponsiveDrawer
