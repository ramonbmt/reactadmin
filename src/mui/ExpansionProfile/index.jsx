import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import { Query } from 'react-apollo'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
// import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import ExitIcon from '@material-ui/icons/ExitToApp'
import styled from '@emotion/styled'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import createStyled from '../../utils/MUIStyled'
import user from '../../assets/images/user-placeholder.png'
// import { CURRENT_USER } from '../../../api/graphql/requests/users/query.graphql'
import Item from './Item'

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const StyledContainer = createStyled(theme => ({
    panelRoot: {
        width             : 258,
        boxShadow         : theme.shadows[0],
        color             : '#C4C0C0',
        margin            : 0,
        '&:first-of-type' : {
            borderBottomLeftRadius  : 0,
            borderBottomRightRadius : 0
        },
        '&>:last-child': {
            boxShadow: '0px 1.5px 1px 0px rgba(0, 0, 0, 0.2), 0px 1.5px 3px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
        }
    },
    summary: {
        height: '100%'
    },
    summaryContent: {
        alignItems  : 'center',
        '& > img'   : {
            height  : 37,
            width   : 37
        },
        '& > span': {
            fontSize    : 12,
            marginLeft  : 15
        }
    },
    details: {
        color                   : '#575656',
        flexDirection           : 'column',
        padding                 : '8px 24px 16px 16px'
    }
}), { withTeme: true })

class ExpansionProfile extends PureComponent {
    static propTypes = {
        logout          : PropTypes.func.isRequired,
        expansionObj    : PropTypes.arrayOf(PropTypes.object),
        match           : PropTypes.object.isRequired
    }

    static defaultProps = {
        expansionObj: []
    }

    state = {
        expanded: false
    }

    _handleClickAway = () => {
        const { expanded } = this.state
        if (expanded) {
            this.setState({ expanded: false })
        }
    }

    _handleExpand = (e, expanded) => {
        this.setState({ expanded })
    }

    _handleItemClick = () => {
        this.setState({ expanded: false })
    }

    render () {
        const {
            logout,
            expansionObj,
            match
        } = this.props
        const { expanded } = this.state
        return (
            <StyledContainer>
                { ({ classes }) => (
                    <ClickAwayListener
                        onClickAway={ this._handleClickAway }
                    >
                        <ExpansionPanel
                            className={ classes.panelRoot }
                            expanded={ expanded }
                            onChange={ this._handleExpand }
                        >
                            <ExpansionPanelSummary
                                expandIcon={ <ExpandMoreIcon /> }
                                // className={ classes.summary }
                                classes={{
                                    root    : classes.summary,
                                    content : classes.summaryContent
                                }}
                            >
                                <img src={ user } alt="" />
                                {/* <Query query={ CURRENT_USER }>
                                    { ({ data: { me }, loading }) => !loading && <span> Hola, { me?.name } </span> }
                                </Query> */}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                className={ classes.details }
                            >
                                { expansionObj.map(({ key, to, ...item }) => (
                                    to
                                        ? (
                                            <StyledLink
                                                key={ key || to }
                                                onClick={ this._handleItemClick }
                                                to={ `${match.url}${to}` }
                                            >
                                                <Item item={ item } />
                                            </StyledLink>
                                        )
                                        : (
                                            <Item
                                                key={ key || to }
                                                onClick={ this._handleItemClick }
                                                item={ item }
                                            />
                                        )
                                )) }
                                <Item
                                    item={{
                                        name    : 'Cerrar sesion',
                                        onClick : logout,
                                        icon    : () => <ExitIcon />
                                    }}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </ClickAwayListener>
                ) }
            </StyledContainer>
        )
    }
}

export default ExpansionProfile
