const fetch = require('node-fetch');
const refs  = require( './refs'); 
const baseUrl = 'https://discord.com/api/';  

const token = async (code) => {
    const data = new URLSearchParams();  
    data.append('client_id', refs.clientid); 
    data.append('client_secret', refs.clientsecret); 
    data.append('grant_type', 'authorization_code'); 
    data.append('code', code); 
    data.append('redirect_uri', 'http://localhost:3000/auth2/callback'); 
    data.append('scope', 'identify guilds'); 
    const res = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        body: data
    })
    const response = await res.json(); 
    return response; 
}

const getGuilds = async (accessCode) => { 
    const res = await fetch(baseUrl + '/users/@me/guilds', {
        headers: {
            'Authorization': 'Bearer ' + accessCode, 
            'Content-Type': 'application/json'
        }
    })
    const response = await res.json();
    return response; 
}


const getUser  = async (accessCode) => { 
    const res = await fetch(baseUrl + '/users/@me',  {
        headers: {
            'Authorization': 'Bearer ' + accessCode, 
            'Content-Type': 'applicaton/json'
        }
    })
    const response = await res.json(); 
    return response;
}

module.exports = { 
    token: token, 
    getGuilds: getGuilds, 
    getUser: getUser
}