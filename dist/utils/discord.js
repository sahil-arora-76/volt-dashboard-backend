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
exports.imageEmbed = exports.sendEmbed = exports.guilds = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const refs_1 = __importDefault(require("./refs"));
let guilds = (guilds, userid) => {
    const promise = new Promise((resolve, reject) => {
        const client = new discord_js_1.default.Client();
        let sortedGuilds = [];
        client.on('ready', () => {
            guilds.map((x) => __awaiter(void 0, void 0, void 0, function* () {
                let guilds = client.guilds.cache.get(x.id);
                if (guilds) {
                    let isMember = guilds.member(userid);
                    if (isMember) {
                        if (isMember.hasPermission('MANAGE_GUILD')) {
                            sortedGuilds.push(x);
                        }
                    }
                }
            }));
            if (sortedGuilds.length > 0) {
                client.destroy();
                resolve(sortedGuilds);
            }
            else {
                reject([]);
            }
        });
        client.login(refs_1.default.token);
    });
    return promise;
};
exports.guilds = guilds;
let sendEmbed = (content) => {
    const promise = new Promise((resolve, reject) => {
        const client = new discord_js_1.default.Client();
        const errors = [];
        client.on('ready', () => {
            var _a, _b, _c;
            let channel = client.channels.cache.get(content.channelId);
            let guild = client.guilds.cache.get(content.guildId);
            if (guild && channel && ((_a = guild.me) === null || _a === void 0 ? void 0 : _a.hasPermission('MANAGE_GUILD'))) {
                if (guild.member(content.userId)) {
                    let perms = (_b = guild.member(content.userId)) === null || _b === void 0 ? void 0 : _b.hasPermission('MANAGE_GUILD');
                    if (perms) {
                        let embed = new discord_js_1.default.MessageEmbed();
                        embed.setColor(content.color);
                        embed.setDescription(content.description);
                        channel.send(embed);
                        resolve(['Ok']);
                    }
                    else {
                        errors.push('Not Enough Perms');
                        resolve(errors);
                    }
                }
                else {
                    errors.push('You Should Be In That Guild');
                    resolve(errors);
                }
            }
            else {
                if (!channel) {
                    errors.push('No Channel Found!');
                    resolve(errors);
                }
                else if (!guild) {
                    errors.push('No Guild Found');
                    resolve(errors);
                }
                else if (!((_c = guild.me) === null || _c === void 0 ? void 0 : _c.hasPermission('MANAGE_GUILD'))) {
                    errors.push('I Should Have Manage Guilds Permission');
                    resolve(errors);
                }
            }
        });
        client.login(refs_1.default.token);
    });
    return promise;
};
exports.sendEmbed = sendEmbed;
let imageEmbed = (content) => {
    const client = new discord_js_1.default.Client();
    const promise = new Promise((resolve, reject) => {
        const errors = [];
        client.on('ready', () => {
            var _a, _b, _c;
            const guild = client.guilds.cache.get(content.guildId);
            const channel = client.channels.cache.get(content.channelId.toString());
            if (channel && guild && ((_a = guild.me) === null || _a === void 0 ? void 0 : _a.hasPermission('MANAGE_GUILD'))) {
                if (guild.member(content.userId)) {
                    let perms = (_b = guild.member(content.userId)) === null || _b === void 0 ? void 0 : _b.hasPermission('MANAGE_GUILD');
                    if (perms) {
                        const embed = new discord_js_1.default.MessageEmbed();
                        embed.setColor(content.color);
                        embed.setDescription(content.description);
                        if (content.footer) {
                            if (content.footerImage) {
                                embed.setFooter(content.footer, content.footerImage);
                            }
                            else {
                                embed.setFooter(content.footer);
                            }
                        }
                        if (content.thumbnail) {
                            embed.setThumbnail(content.thumbnail);
                        }
                        if (content.author) {
                            if (content.authorImage) {
                                embed.setAuthor(content.author, content.authorImage);
                            }
                            else {
                                embed.setAuthor(content.author);
                            }
                        }
                        if (content.image) {
                            embed.setImage(content.image);
                        }
                        console.log(embed);
                        channel.send(embed);
                        resolve(['Ok']);
                    }
                    else {
                        errors.push('Required MANAGE_GUILD Perms ');
                        resolve(errors);
                    }
                }
                else {
                    errors.push('You Should Be In That Guild');
                    resolve(errors);
                }
            }
            else {
                if (!channel) {
                    errors.push('No Channel Found!');
                    resolve(errors);
                }
                else if (!guild) {
                    errors.push('No Guild Found');
                    resolve(errors);
                }
                else if (!((_c = guild.me) === null || _c === void 0 ? void 0 : _c.hasPermission('MANAGE_GUILD'))) {
                    errors.push('I Should Have Manage Guilds Permission');
                    resolve(errors);
                }
            }
        });
    });
    client.login(refs_1.default.token);
    return promise;
};
exports.imageEmbed = imageEmbed;
