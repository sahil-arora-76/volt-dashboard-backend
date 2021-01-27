import discord from 'discord.js';  
import refs from './refs'; 


export let guilds = (guilds: any, userid: string) => {
    const promise = new Promise((resolve, reject) => {
        const client = new discord.Client(); 
        let sortedGuilds: any = [];
        client.on('ready', () => {
            guilds.map(async (x: any) => {
                let guilds = client.guilds.cache.get(x.id);
                if (guilds) {
                    let isMember = guilds.member(userid);
                    if (isMember) { 
                        if (isMember.hasPermission('MANAGE_GUILD')) { 
                            sortedGuilds.push(x);
                        }
                    }
                }  
            })
            if (sortedGuilds.length > 0 ) {
                client.destroy(); 
                resolve(sortedGuilds);
            } else { 
                reject([]);
            }
        })
    client.login(refs.token);
})
return promise;
} 