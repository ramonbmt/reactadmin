async function fetchSchema (queryResolver) {
    const introspectionQuery = `
        query IntrospectionQuery {
            __schema {
                mutationType { 
                    name 
                    fields {
                        name
                        args {
                            name
                            type {
                                kind
                                name
                                ofType {
                                    name
                                }
                            }
                        }
                    }
                }
                queryType { 
                    name 
                    fields {
                        name
                        args {
                            name
                            type {
                                kind
                                name
                                ofType {
                                    name
                                }
                            }
                        }
                        type {
                            kind
                            ofType {
                              kind
                              name
                            }
                        }
                    }
                }
                types {
                    ...FullType
                }
            }
        }
        fragment FullType on __Type {
            kind
            name
            description
            fields(includeDeprecated: true) {
                name
                description
                args {
                    ...InputValue
                }
                type {
                    ...TypeRef
                }
                isDeprecated
                deprecationReason
            }
            inputFields {
                ...InputValue
            }
            interfaces {
                ...TypeRef
            }
            enumValues(includeDeprecated: true) {
                name
                description
                isDeprecated
                deprecationReason
            }
            possibleTypes {
                ...TypeRef
            }
        }

        fragment InputValue on __InputValue {
            name
            description
            type { ...TypeRef }
            defaultValue
        }

        fragment TypeRef on __Type {
            kind
            name
            ofType {
                kind
                name
                ofType {
                    kind
                    name
                    ofType {
                        kind
                        name
                    }
                }
            }
        }
    `
    return (await queryResolver(introspectionQuery)).__schema
}

function createMutationFunction (mutationResolver, mutationObject) {
    return async function mutationFunction (args, returnFields) {
        // Fetch all required arguments
        const nonNullableTypes = mutationObject.args.filter(a => a.type.kind === 'NON_NULL')

        // Check if we have missing or extra args
        const missingArgs = nonNullableTypes.filter(a => args[a.name] === undefined)
        const extraArgs = Object.keys(args).filter(a => mutationObject.args.filter(x => a === x.name).length === 0)

        if (missingArgs.length > 0) {
            throw new Error(`The following arguments are missing: ${missingArgs.map(a => a.name).join(', ')}`)
        }

        if (extraArgs.length > 0) {
            throw new Error(`The following extra arguments were passed: ${extraArgs.join(', ')}`)
        }

        const toList = name => `[${name}]`
        const toNonNull = name => `${name}!`
        const toIDLTypeName = type => {
            switch (type.kind) {
                case 'LIST':
                    return toList(toIDLTypeName(type.ofType))
                case 'NON_NULL':
                    return toNonNull(toIDLTypeName(type.ofType))
                default:
                    return type.name
            }
        }

        // Combine our input object with the schema types
        const variables = Object.keys(args).map(a => {
            const field = mutationObject.args.filter(x => a === x.name)[0]

            return {
                name : field.name,
                type : toIDLTypeName(field.type)
            }
        })

        // Build the query
        const varDecl = variables.map(k => `$${k.name}: ${k.type}`).join(', \n')
        const varAssignment = variables.map(k => `${k.name}: $${k.name}`).join(', \n')

        const mutation = `mutation dynamic_mutation ${varDecl ? `(
            ${varDecl} 
          )` : ''
        }
         {
          result: ${mutationObject.name} ${varAssignment ? `(
            ${varAssignment} 
          )` : ''}
          ${returnFields || `{
            id
          }`}
        }`

        // Execute and return id
        return (await mutationResolver(mutation, args)).result
    }
}

function createQueryFunction (queryResolver, mutationObject) {
    return async function mutationFunction (args, info) {
        // Fetch all required arguments
        const nonNullableTypes = mutationObject.args.filter(a => a.type.kind === 'NON_NULL')

        // Check if we have missing or extra args
        const missingArgs = nonNullableTypes.filter(a => args[a.name] === undefined)
        const extraArgs = Object.keys(args).filter(a => mutationObject.args.filter(x => a === x.name).length === 0)

        if (missingArgs.length > 0) {
            throw new Error(`The following arguments are missing: ${missingArgs.map(a => a.name).join(', ')}`)
        }

        if (extraArgs.length > 0) {
            throw new Error(`The following extra arguments were passed: ${extraArgs.join(', ')}`)
        }

        const toList = name => `[${name}]`
        const toNonNull = name => `${name}!`
        const toIDLTypeName = type => {
            switch (type.kind) {
                case 'LIST':
                    return toList(toIDLTypeName(type.ofType))
                case 'NON_NULL':
                    return toNonNull(toIDLTypeName(type.ofType))
                default:
                    return type.name
            }
        }

        // Combine our input object with the schema types
        const variables = Object.keys(args).map(a => {
            const field = mutationObject.args.filter(x => a === x.name)[0]

            return {
                name : field.name,
                type : toIDLTypeName(field.type)
            }
        })

        // Build the query
        const varDecl = variables.map(k => `$${k.name}: ${k.type}`).join(', \n')
        const varAssignment = variables.map(k => `${k.name}: $${k.name}`).join(', \n')

        const query = `query dynamic_query ${varDecl ? `(
            ${varDecl} 
          )` : ''
        }
         {
          result: ${mutationObject.name} ${varAssignment ? `(
            ${varAssignment} 
          )` : ''}
          ${info || `{
            id
          }`}
        }`

        // Execute and return id
        return (await queryResolver(query, args)).result
    }
}

export function createMutationObjectFromSchema (queryResolver, mutationResolver, schema) {
    const mutations = schema.mutationType.fields
    const querys = schema.queryType.fields

    const o = {}

    mutations.forEach(m => {
        o[m.name] = createMutationFunction(mutationResolver, m)
    })

    querys.forEach(m => {
        o[m.name] = createQueryFunction(queryResolver, m)
    })

    return o
}

export async function createMutationObject (queryResolver, mutationResolver) {
    const schema = await fetchSchema(queryResolver)

    return createMutationObjectFromSchema(queryResolver, mutationResolver, schema)
}
