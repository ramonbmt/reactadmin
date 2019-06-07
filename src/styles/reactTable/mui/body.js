import { css } from '@emotion/core'

const MUITableBodyStyles = css`
    & .rt-tbody {
        background-color: #FFF;
        border-radius: 10px;
        border: 2px solid #EEE;
        margin-bottom: 1rem;
        & .rt-tr {
            &.-even {
                background-color: #FFF8E1;
            }
        }
        & .rt-td {
            align-items: center;
            display: flex;
            font-size: 14px;
            justify-content: center;
        }
    }
`

export default MUITableBodyStyles
