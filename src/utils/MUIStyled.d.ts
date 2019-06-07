import {
    StyleRules,
    StyleRulesCallback
} from '@material-ui/core/styles'
import {
    StyledComponentProps,
    WithStylesOptions
} from '@material-ui/core/styles/withStyles'

type Styles = StyleRules | StyleRulesCallback

declare const createStyled: (styles: Styles, options: WithStylesOptions) => (props: StyledComponentProps) => JSX.Element

export default createStyled
