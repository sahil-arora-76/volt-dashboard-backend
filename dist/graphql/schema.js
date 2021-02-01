const { buildSchema } = require('graphql');
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
    input userInput { 
        guildId: String
        channelId: String
        color: String 
        description: String 
        userId: String
        title: String
    }
    input imageInput { 
        guildId: String!
        channelId: String!
        color: String!
        description: String! 
        userId: String!
        footer: String
        footerImage: String 
        thumbnail: String
        image: String!
        author: String
        authorImage: String
        title: String
    }
    type rootQuery { 
        getUser(id: String): User!
        sendEmbed(userData: userInput): [String]!
        imageEmbed(imageData: imageInput): [String]!
    }
    schema {   
        query: rootQuery
    }
`);
module.exports =  schema; 