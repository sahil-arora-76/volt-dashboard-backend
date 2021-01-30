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

export let sendEmbed = (content: any)  => {
    const promise = new Promise((resolve, reject) => {
        const client = new discord.Client();
        const errors: String[] = []; 
        client.on('ready', () => {
            let channel: any = client.channels.cache.get(content.channelId);
            let guild = client.guilds.cache.get(content.guildId); 
            if (guild && channel && guild.me?.hasPermission('MANAGE_GUILD')) { 
                if (guild.member(content.userId)) { 
                    let perms = guild.member(content.userId)?.hasPermission('MANAGE_GUILD'); 
                    if (perms) { 
                        let embed = new discord.MessageEmbed(); 
                        embed.setColor(content.color); 
                        embed.setDescription(content.description); 
                        if (content.title) { 
                            embed.setTitle(content.title);
                        }
                        channel.send(embed);
                        resolve(['Ok']); 
                    } else { 
                        errors.push('Not Enough Perms');
                        resolve(errors)
                    }
                } else { 
                    errors.push('You Should Be In That Guild'); 
                    resolve(errors);
                }
            } else {
                if (!channel) { 
                    errors.push('No Channel Found!'); 
                    resolve(errors); 
                } else if (!guild) { 
                    errors.push('No Guild Found');
                    resolve(errors); 
                } else if (!guild.me?.hasPermission('MANAGE_GUILD')) { 
                    errors.push('I Should Have Manage Guilds Permission');
                    resolve(errors);
                }
            }
        })
        client.login(refs.token); 
    })
    return promise;
}


export let imageEmbed  = (content: any ) => {
    const client = new discord.Client();  
    const promise = new Promise((resolve, reject) => {
        const errors: String[] = [];
        client.on('ready', () => {
            const guild = client.guilds.cache.get(content.guildId); 
            const channel: any = client.channels.cache.get(content.channelId.toString());
            if (channel && guild && guild.me?.hasPermission('MANAGE_GUILD'))  { 
                if (guild.member(content.userId)) { 
                    let perms = guild.member(content.userId)?.hasPermission('MANAGE_GUILD'); 
                    if (perms) { 
                        const embed = new discord.MessageEmbed(); 
                        embed.setColor(content.color); 
                        embed.setDescription(content.description);
                        if (content.footer) {  
                            if (content.footerImage) { 
                                embed.setFooter(content.footer, content.footerImage)
                            } else {
                                embed.setFooter(content.footer);
                            }
                        } 
                        if (content.thumbnail) { 
                            embed.setThumbnail(content.thumbnail);
                        }
                        if (content.author) { 
                            if (content.authorImage) { 
                                embed.setAuthor(content.author, content.authorImage);
                            } else { 
                                embed.setAuthor(content.author);
                            }
                        }
                        if (content.image) { 
                            embed.setImage(content.image); 
                        }
                        console.log(embed)
                        channel.send(embed);
                        resolve(['Ok']);
                    } else {
                        errors.push('Required MANAGE_GUILD Perms '); 
                        resolve(errors)
                    }
                } else { 
                    errors.push('You Should Be In That Guild'); 
                    resolve(errors);
                }
            } else { 
                if (!channel) { 
                    errors.push('No Channel Found!'); 
                    resolve(errors); 
                } else if (!guild) { 
                    errors.push('No Guild Found');
                    resolve(errors); 
                } else if (!guild.me?.hasPermission('MANAGE_GUILD')) { 
                    errors.push('I Should Have Manage Guilds Permission');
                    resolve(errors);
                }
            }
              
        })
    })
    client.login(refs.token); 
    return promise;
}