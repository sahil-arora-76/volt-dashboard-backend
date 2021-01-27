import User from '../models/user'; 
import  refs  from '../utils/refs';
import { guilds } from '../utils/discord'; 
export default { 
    async getUser (args: any) { 
        let id = args.id; 
        let user: any = await User.findOne({ id: id });
        if (!user) { 
            throw new Error('No User Found');
        } else { 
            let sortedGuilds = await guilds(user.guilds, user.id);
            return { 
                username: user.username,
                id: user.id, 
                _id: user._id,
                avatar: user.avatar, 
                guilds: sortedGuilds, 
                discriminator: user.discriminator, 
                icon: user.icon ? user.icon : 'thor'
            }
        } 
    }, 
    async check(args: any ) { 
        let userid = args.id; 
        let guildid = args.id; 
    }
}