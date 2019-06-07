// import { request, transport } from 'popsicle'
import gql from 'graphql-tag'
// import client from '../../../client/api/graphql/index'

export function createQueryResolver (endpoint, headers, client) {
    // Create query resolver function
    return async function queryResolver (query, vars) {
    // For default, we're using raw HTTP and rely on the server for validation.
        try {
            const result = await client.query({
                query       : gql(query),
                variables   : vars
            })
            if (result.errors) {
                throw new Error(`Query Excecution errors: ${result.errors.map(x => x.message).join('\n')}`)
            } else {
                return result.data
            }
        } catch (error) {
            throw new Error(`Query error: ${error.message}`)
        }
    }
}

export function createMutationResolver (endpoint, headers, client) {
    // Create query resolver function
    return async function mutationResolver (query, vars) {
    // For default, we're using raw HTTP and rely on the server for validation.
        try {
            const result = await client.mutate({
                mutation    : gql(query),
                variables   : vars
            })
            if (result.errors) {
                throw new Error(`Query Excecution errors: ${result.errors.map(x => x.message).join('\n')}`)
            } else {
                return result.data
            }
        } catch (error) {
            throw new Error(`Query error: ${error.message}`)
        }
    }
}
