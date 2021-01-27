import User from '../models/user';
import discord from 'discord.js'; 
import  refs  from '../utils/refs';
export default { 
    async getUser (args: any) { 
        let id = args.id; 
        let user: any = await User.findOne({ id: id });
        if (!user) { 
            throw new Error('No User Found');
        } else { 
            return { 
                username: user.username,
                id: user.id, 
                _id: user._id,
                avatar: user.avatar, 
                guilds: user.guilds, 
                discriminator: user.discriminator, 
                icon: user.icon ? user.icon : 'thor'
            }
        } 
    }, 
    async check(args: any ) { 
        let userid = args.id; 
        let guildid = args.id; 
        const client = new discord.Client(); 
        client.login(refs.token);
    }
}