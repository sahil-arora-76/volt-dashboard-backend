"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
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
`);
exports.default = schema;
