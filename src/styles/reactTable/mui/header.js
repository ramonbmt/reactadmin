import { css } from '@emotion/core'

const MUITableHeaderStyles = css`
    & .rt-thead {
        &.-header {
            box-shadow: none;
        }
        & .rt-th {
            border-right: none;
            > :first-of-type {
                color: var(--main-color);
                font-size: 14px;
            }
        }
    }
`

export default MUITableHeaderStyles
