import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const DetailWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 16px 0 16px 14px;
    > svg {
        font-size: 26px;
        color: var(--main-color)
    }
    > span {
        font-size: 14px;
        margin-left: 21px;
    }
    &:hover {
        background-color: #F4F2EC;
    }
`

const ExpansionItem = ({
    item: {
        icon,
        name,
        ...rest
    }
}) => (
    <DetailWrapper
        role="button"
        { ...rest }
    >
        { icon() }
        <span> { name } </span>
    </DetailWrapper>
)

ExpansionItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default ExpansionItem
