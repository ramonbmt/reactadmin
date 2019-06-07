import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
// import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import image from '@timdp/rollup-plugin-image'
import postcss from 'rollup-plugin-postcss'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

import pkg from './package.json'

const extensions = [".ts", ".js", ".jsx", ".tsx"]
const umdGlobals = {
    react: 'React',
    'prop-types': 'PropTypes',
    formik: 'formik'
}

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  external: [
      'react',
      'yup',
      '@material-ui/core/styles',
      'react-is',
      'formik'
    ],
  plugins: [
    // external(),
    resolve({
        extensions
    }),
    commonjs({
        include: 'node_modules/**',
        // namedExports: {
        //     'node_modules/react/index.js': [
        //         'Component', 
        //         'PureComponent', 
        //         'Fragment', 
        //         'Children', 
        //         'createElement', 
        //         'createRef',
        //         'memo',
        //         'createContext',
        //         'forwardRef'
        //     ],
        //     // 'node_modules/formik/dist/index.js': ['Formik', 'Field', 'Form', 'withFormik', 'FieldArray', 'utils', 'FastField', 'types', 'connect']
        //     'node_modules/yup/lib/index.js': [
        //         'boolean'
        //     ],
        //     'node_modules/@material-ui/core/styles/index.js': [
        //         'withStyles',
        //         'withTheme'
        //     ],
        //     'node_modules/react-is/index.js': [
        //         'isValidElementType'
        //     ]
        // }
    }),
    builtins(),
    babel({
        exclude: 'node_modules/**',
        extensions
    }),
    globals(),
    // uglify(),
    image(),
    postcss({
        plugins: [
            require('autoprefixer')
        ]
    })
  ]
}