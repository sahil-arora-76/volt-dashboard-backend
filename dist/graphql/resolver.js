const User = require('../models/user'); 
const mongoose = require('mongoose');
const refs = require('../utils/discord');
const { getVotes } = require('../utils/votes')

module.exports =  { 
    async getUser (args) { 
        let id = args.id; 
        let user = await User.findOne({ _id: id });
        if (!user) { 
            return ['No User Found Try Logging In Again'];
        } else { 
            let sortedGuilds = await refs.guilds(user.guilds, user.id);
            return { 
                username: user.username,
                id: user.id, 
                _id: user._id,
                avatar: user.avatar, 
                guilds: sortedGuilds, 
                discriminator: user.discriminator, 
                icon: user.icon ? user.icon : ''
            };
        } 
    }, 
    async sendEmbed(args) { 
        let channelId = args.userData.channelId; 
        let guildId = args.userData.guildId;
        let description = args.userData.description; 
        let color = args.userData.color;
        let c  = mongoose.Types.ObjectId(args.userData.userId);
        let user = await User.findOne({ _id:  c }); 
        if (user) { 
            let embed = await refs.sendEmbed({ channelId: channelId, guildId: guildId, color: color, description: description, userId: user.id, title: args.userData.title }); 
            return embed;
        }  
    },
    async imageEmbed(args) { 
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
        const user = await User.findOne({ _id: c }); 
        if (!user){ 
            return ['No User Found Try Logging In Again'];
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
        };
        let res = await refs.imageEmbed(content); 
        return res;
    },
    async getVote() {
        let c = await getVotes(); 
        let k = []; 
        for (const el in c) { 
            k.push(c[el]);
        }
        return k;
    }

};