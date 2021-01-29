import User from '../models/user'; 

import mongoose from 'mongoose';
import { guilds, sendEmbed as embeds, imageEmbed as embedimage  } from '../utils/discord';

export default { 
    async getUser (args: any) { 
        let id = args.id; 
        let user: any = await User.findOne({ _id: id });
        if (!user) { 
            return ['No User Found Try Logging In Again']
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
    },
    async imageEmbed(args: any) { 
        let channelId = args.imageData.channelId; 
        let guildId = args.imageData.guildId;
        let description = args.imageData.description; 
        let color = args.imageData.color; 
        let footerImage = args.imageData.footerImage; 
        let image = args.imageData.image; 
        let userMongooseId = args.imageData.userId; 
        let thumbnail = args.imageData.thumbnail; 
        let author = args.imageData.author; 
        let footer = args.imageData.footer;
        let authorImage = args.imageData.authorImage; 
        let title = args.imageData.title; 
        let c  = mongoose.Types.ObjectId(userMongooseId);
        const user = await User.findOne({_id: c}); 
        if (!user){ 
            return ['No User Found Try Logging In Again']
        }
        let content = { 
            channelId: channelId, 
            guildId: guildId,
            color: color, 
            description: description, 
            footerImage: footerImage && footerImage.length > 0 ? footerImage : undefined, 
            image: image && image.length > 0 ? image : undefined, 
            userId: user.id, 
            thumbnail: thumbnail && thumbnail.length > 0 ? thumbnail : undefined, 
            author: author && author.length > 0 ?  author : undefined, 
            footer: footer && footer.length > 0 ?  footer : undefined, 
            authorImage: authorImage && authorImage.length > 0 ? authorImage : undefined, 
            title: title && title.length > 0 ? title : undefined
        }
        let res = await embedimage(content); 
        return res;
    }
}