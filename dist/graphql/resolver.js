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
const discord_js_1 = __importDefault(require("discord.js"));
const refs_1 = __importDefault(require("../utils/refs"));
exports.default = {
    getUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = args.id;
            let user = yield user_1.default.findOne({ id: id });
            if (!user) {
                throw new Error('No User Found');
            }
            else {
                return {
                    username: user.username,
                    id: user.id,
                    _id: user._id,
                    avatar: user.avatar,
                    guilds: user.guilds,
                    discriminator: user.discriminator,
                    icon: user.icon ? user.icon : 'thor'
                };
            }
        });
    },
    check(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let userid = args.id;
            let guildid = args.id;
            const client = new discord_js_1.default.Client();
            client.login(refs_1.default.token);
        });
    }
};
