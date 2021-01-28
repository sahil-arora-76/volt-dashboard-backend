import User from '../models/user'; 
import  refs  from '../utils/refs';
import mongoose from 'mongoose';
import { guilds, sendEmbed as embeds  } from '../utils/discord'; 
export default { 
    async getUser (args: any) { 
        let id = args.id; 
        let user: any = await User.findOne({ _id: id });
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
    async sendEmbed(args: any ) { 
        let channelId = args.userData.channelId; 
        let guildId = args.userData.guildId;
        let description = args.userData.description; 
        let color = args.userData.color;
        let c  = mongoose.Types.ObjectId(args.userData.userId);
        let user = await User.findOne({ _id:  c }); 
        if (user) { 
            let embed = await embeds({channelId: channelId, guildId: guildId, color: color, description: description, userId: user.id }) 
            return embed
        }  
    }
}