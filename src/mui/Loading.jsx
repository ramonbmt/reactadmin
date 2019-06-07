import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Delay from 'react-delay-render'
import CircularProgress from '@material-ui/core/CircularProgress'
import flexCenter from '../styles/emotion/flexCenter'

const LoadingContainer = styled.div`
    ${flexCenter}
`

const Loading = ({
    size,
    ...rest
}) => (
    <LoadingContainer>
        <CircularProgress
            { ...rest }
            size={ size }
        />
    </LoadingContainer>
)

Loading.propTypes = {
    size: PropTypes.number
}

Loading.defaultProps = {
    size: 50
}

export default Delay({ delay: 50 })(Loading)
