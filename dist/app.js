const express = require('express');   
const { graphqlHTTP }  = require('express-graphql'); 
const schema = require('./graphql/schema'); 
const refs = require('./utils/refs');
const resolver  = require('./graphql/resolver'); 
const mongoose = require('mongoose');
const User = require('./models/user'); 
const { getUser, getGuilds, token } = require('./utils/auth2');
const bodyParser = require('body-parser'); 
mongoose.connect('mongodb+srv://volt:voltTHOR1@cluster0.qglcz.mongodb.net/test?retryWrites=true&w=majority'); 
mongoose.connection.on('connected', () => {
    console.log('mongoose connected');
}) 

const app  = express();
app.use(bodyParser.json());
app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS, GET, POST'); 
    if (req.method  === 'OPTIONS') { 
        return res.sendStatus(200); 
    }
    next(); 
})

app.get('/auth2', (req, res, next) => {
    res.redirect(refs.redirect); 
})

app.get('/logout', (req, res, next) => {
    res.cookie('token','__', { maxAge: 0 }); 
    res.cookie('userid', '__', { maxAge: 0 }); 
    res.redirect('http://localhost:8080/');
})

app.use('/auth2/callback', async (req, res, next) => {
    const authToken = await token(req.query.code); 
    if (authToken.error) { 
        return res.redirect('http://localhost:8080');
    }
    const guilds = await getGuilds(authToken.access_token);
    const users = await getUser(authToken.access_token);
    const isUser = await User.findOne({id: users.id});;
    if (isUser) { 
        isUser.avatar = users.avatar;
        isUser.username = users.username; 
        isUser.discrimintor  = users.discriminator; 
        isUser.save();
        res.cookie('userid', isUser._id.toString()); 
    } else { 
        const newUser = new User({
            id: users.id, 
            avatar: users.avatar, 
            discriminator: users.discriminator, 
            guilds: guilds
        })
        newUser.save(); 
        res.cookie('userid', newUser._id.toString());
    }
    res.cookie('token', { 
        access_token: authToken.access_token, 
        refresh_token: authToken.refresh_token
    }); 
    return res.redirect('http://localhost:8080/login');  
})

app.use('/graphql', graphqlHTTP({ 
    schema: schema, 
    rootValue: resolver, 
    graphiql: true
}))

app.listen(3000,  () => console.log('app running')); 