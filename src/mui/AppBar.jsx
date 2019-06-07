import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import { faBell } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Badge from '@material-ui/core/Badge'
import ExpansionProfile from './ExpansionProfile'
import logo from '../assets/images/logo.png'
// import help from '../../../assets/images/help.png'
// import settings from '../../../assets/images/settings.png'
// import createStyled from '../utils/MUIStyled'
import Time from '../moment/FormatedDate'

const ToolbarContainer = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template: 
        "logo header" 100%
        /  256px 1fr;
`

const LogoContainer = styled.div`
    grid-area: logo;
    display: flex;
    align-items: center;
`

const LogoWrapper = styled.div`
    margin-left: 38px;
    margin-top: 8px;
    > img {
        height: 65px;
        // width: 84px;
        cursor: pointer;
    }
`

const HeaderContainer = styled.div`
    grid-area: header;
    display: flex;
`

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`

const DateWrapper = styled.div`
    flex: 0 1 auto;
    > span {
        color: #C4C0C0
    }
`

const ActionsWrapper = styled.div`
    flex: 1 1 auto;
    display: flex;
    height: 100%;
    justify-content: flex-end;
`

// const IconContainer = styled.div`
//     display: flex;
//     >:nth-child(odd) {
//         border-left: 1px solid #C4C0C0;
//         border-right: 1px solid #C4C0C0;
//     }
// `

// const IconWrapper = styled.div`
//     display: flex;
//     height: 100%;
//     width: 70px;
//     color: #C4C0C0;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//     &:hover {
//         background-color: #F4F2EC;
//     }
//     > img {
//         margin-top: 12px;
//     }
//     svg {
//         height: 29px !important;
//         width: 29px !important;
//         padding: 0 8px;
//     }
// `

// const StyledIcon = createStyled(() => ({
//     badge: {
//         top     : -10,
//         right   : -7,
//         width   : 20,
//         height  : 20
//     },
//     badgeColor: {
//         backgroundColor: '#FF0045'
//     }
// }))

class MUIAppBar extends Component {
    static propTypes = {
        history         : PropTypes.object.isRequired,
        expansionObj    : PropTypes.arrayOf(PropTypes.object),
        match           : PropTypes.object.isRequired
    }

    static defaultProps = {
        expansionObj: []
    }

    _handleLogout = () => {
        const { history: { push } } = this.props
        push('/logout')
    }

    _handleGoHome = () => {
        const { history: { push } } = this.props
        push('/admins')
    }

    _handleNotifications = () => {
        console.log('notifications')
    }

    _handleHelp = () => {
        console.log('help')
    }

    _handleSettings = () => {
        console.log('settings')
    }

    render () {
        const {
            expansionObj,
            match
        } = this.props
        return (
            <AppBar>
                <Toolbar
                    disableGutters
                >
                    <ToolbarContainer>
                        <LogoContainer>
                            <LogoWrapper
                                onClick={ this._handleGoHome }
                            >
                                <img src={ logo } alt="" />
                            </LogoWrapper>
                        </LogoContainer>
                        <HeaderContainer>
                            <HeaderWrapper>
                                <DateWrapper>
                                    <Time
                                        format="LLLL"
                                        update
                                    />
                                </DateWrapper>
                                <ActionsWrapper>
                                    {/* <IconContainer>
                                        <IconWrapper>
                                            <StyledIcon>
                                                {({ classes }) => (
                                                    <Badge
                                                        badgeContent={ 2 }
                                                        color="primary"
                                                        classes={{
                                                            badge        : classes.badge,
                                                            colorPrimary : classes.badgeColor
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={ faBell }
                                                        />
                                                    </Badge>
                                                )}
                                            </StyledIcon>
                                        </IconWrapper>
                                        <IconWrapper>
                                            <img src={ help } alt="" />
                                        </IconWrapper>
                                        <IconWrapper>
                                            <img src={ settings } alt="" />
                                        </IconWrapper>
                                    </IconContainer> */}
                                    <ExpansionProfile
                                        match={ match }
                                        logout={ this._handleLogout }
                                        expansionObj={ expansionObj }
                                    />
                                </ActionsWrapper>
                            </HeaderWrapper>
                        </HeaderContainer>
                    </ToolbarContainer>
                </Toolbar>
            </AppBar>
        )
    }
}

export default MUIAppBar
