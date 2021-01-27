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
exports.guilds = void 0;
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
