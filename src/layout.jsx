import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import { componentTypes } from './utils/propTypes'
import AppBar from './mui/AppBar'
import Drawer from './mui/ClippedDrawer'
import flexCenter from './styles/emotion/flexCenter'
// import AdminRouter, { drawerObj } from '../routes/Admins'

const Container = styled.div`
    ${flexCenter}
    align-items: flex-start;
`

const Layout = styled.div`
    display: grid;
    grid-template: 
        "appBar" 80px
        "content" calc(100vh - 80px)
        / 100%;
    height: 100%;
    width: 100%;
`

const AppBarContainer = styled(AppBar)`
    grid-area: appBar;
`

const Content = styled.div`
    grid-area: content;
    display: grid;
    grid-template: 
        "drawer main" 100%
        / 256px 1fr;
    height: 100%;
    width: 100%;
`

const Main = styled.main`
    align-self: stretch;
    grid-area: main;
    display: inline-grid;
    max-width: calc(100vw - 256px);
    width: 100%;
    justify-self: stretch;
    overflow-y: auto;
`

const AdminLayout = ({
    history,
    match,
    location,
    AdminRouter,
    drawerObj,
    title
}) => (
    <Container>
        <Helmet>
            <title>{ title }</title>
        </Helmet>
        <Layout>
            <AppBarContainer
                history={ history }
                match={ match }
            />
            <Content>
                <Drawer
                    drawerObj={ drawerObj }
                    match={ match }
                    location={ location }
                />
                <Main>
                    { AdminRouter }
                </Main>
            </Content>
        </Layout>
    </Container>
)

AdminLayout.propTypes = {
    history     	    : PropTypes.object.isRequired,
    match       	    : PropTypes.object.isRequired,
    location    	    : PropTypes.object.isRequired,
    drawerObj		    : PropTypes.array.isRequired,
    AdminRouter  	    : PropTypes.oneOfType(componentTypes).isRequired,
    title  			    : PropTypes.string
}

AdminLayout.defaultProps = {
    title: ''
}

export default AdminLayout
