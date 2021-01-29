"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const discord_1 = require("../utils/discord");
exports.default = {
    getUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = args.id;
            let user = yield user_1.default.findOne({ _id: id });
            if (!user) {
                return ['No User Found Try Logging In Again'];
            }
            else {
                let sortedGuilds = yield discord_1.guilds(user.guilds, user.id);
                return {
                    username: user.username,
                    id: user.id,
                    _id: user._id,
                    avatar: user.avatar,
                    guilds: sortedGuilds,
                    discriminator: user.discriminator,
                    icon: user.icon ? user.icon : 'thor'
                };
            }
        });
    },
    sendEmbed(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let channelId = args.userData.channelId;
            let guildId = args.userData.guildId;
            let description = args.userData.description;
            let color = args.userData.color;
            let c = mongoose_1.default.Types.ObjectId(args.userData.userId);
            let user = yield user_1.default.findOne({ _id: c });
            if (user) {
                let embed = yield discord_1.sendEmbed({ channelId: channelId, guildId: guildId, color: color, description: description, userId: user.id });
                return embed;
            }
        });
    },
    imageEmbed(args) {
        return __awaiter(this, void 0, void 0, function* () {
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
            let c = mongoose_1.default.Types.ObjectId(userMongooseId);
            const user = yield user_1.default.findOne({ _id: c });
            if (!user) {
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
                author: author && author.length > 0 ? author : undefined,
                footer: footer && footer.length > 0 ? footer : undefined,
                authorImage: authorImage && authorImage.length > 0 ? authorImage : undefined,
                title: title && title.length > 0 ? title : undefined
            };
            let res = yield discord_1.imageEmbed(content);
            return res;
        });
    }
};
