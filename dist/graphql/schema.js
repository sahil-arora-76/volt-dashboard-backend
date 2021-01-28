"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
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
    input userInput { 
        guildId: String
        channelId: String
        color: String 
        description: String 
        userId: String
    }
    type rootQuery { 
        getUser(id: String): User!
        sendEmbed(userData: userInput): [String]
    }
    schema {   
        query: rootQuery
    }
`);
exports.default = schema;
