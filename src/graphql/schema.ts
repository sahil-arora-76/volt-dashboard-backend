import { buildSchema } from 'graphql';
const schema = buildSchema(`
    type User { 
        id: String!
        username: String!
        avatar: String! 
        discriminator: String!
        _id: String!
    }
    type rootQuery { 
        getUser(id: String): User!
    }
    schema {   
        query: rootQuery
    }
`)
export default schema; 