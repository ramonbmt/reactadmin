import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
// import createStyled from '../../../lib/utils/client/MUIStyled'
import DrawerItem from './DrawerItem'

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`

const StyledList = styled(List)`
    padding-top: 16px;
`

class ResponsiveDrawer extends PureComponent {
    static propTypes = {
        match     : PropTypes.object.isRequired,
        location  : PropTypes.object.isRequired,
        drawerObj : PropTypes.arrayOf(PropTypes.object).isRequired
    }

    render () {
        const {
            drawerObj,
            match,
            location: { pathname }
        } = this.props
        const selectedItem = pathname.split('/')[2] !== undefined ? `/${pathname.split('/')[2]}` : ''
        const drawerContent = (
            <Container>
                <StyledList
                    component="nav"
                >
                    { drawerObj.map(route => {
                        if (route.hidden) {
                            return ''
                        }
                        return (
                            <DrawerItem
                                key={ route.key || route.to }
                                route={ route }
                                match={ match }
                                selectedItem={ selectedItem }
                            />
                        )
                    })}
                </StyledList>
            </Container>
        )
        return (
            <Fragment>
                <Drawer
                    variant="permanent"
                    open
                >
                    { drawerContent }
                </Drawer>
            </Fragment>
        )
    }
}

export default ResponsiveDrawer
