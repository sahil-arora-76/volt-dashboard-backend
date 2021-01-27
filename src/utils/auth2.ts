import fetch from 'node-fetch';
import refs  from './refs'; 
const baseUrl = 'https://discord.com/api/';  

export const token = async (code: string) => {
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

export const getGuilds = async (accessCode: String) => { 
    const res = await fetch(baseUrl + '/users/@me/guilds', {
        headers: {
            'Authorization': 'Bearer ' + accessCode, 
            'Content-Type': 'application/json'
        }
    })
    const response = await res.json();
    return response; 
}


export const getUser  = async (accessCode: String) => { 
    const res = await fetch(baseUrl + '/users/@me',  {
        headers: {
            'Authorization': 'Bearer ' + accessCode, 
            'Content-Type': 'applicaton/json'
        }
    })
    const response = await res.json(); 
    return response;
}