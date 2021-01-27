import { buildSchema } from 'graphql';
const schema = buildSchema(`
    type guild { 
        id: String!
        owner: Boolean
        name: String!
        icon: String
        permissions: Int
        permissions_new: String
        featured: [String]
    }
    type User { 
        id: String!
        username: String!
        avatar: String! 
        discriminator: String!
        _id: String!
        guilds: [guild]
    }
    type rootQuery { 
        getUser(id: String): User!
        check(userId: String, guildId: String): String
    }
    schema {   
        query: rootQuery
    }
`)
export default schema; 