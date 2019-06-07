import React from 'react'

const ModuleContext = React.createContext({
    routes 			: [],
    drawerObj		: [],
    addRoute		: () => {}
})

export default ModuleContext
