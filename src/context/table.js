import React from 'react'

const TableContext = React.createContext({
    search      : '',
    columns     : [],
    count       : 0,
    where       : {},
    title       : '',
    updateWhere : () => {}
})

export default TableContext
