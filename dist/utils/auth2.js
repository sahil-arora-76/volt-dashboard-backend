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
exports.getUser = exports.getGuilds = exports.token = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const refs_1 = __importDefault(require("./refs"));
const baseUrl = 'https://discord.com/api/';
const token = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new URLSearchParams();
    data.append('client_id', refs_1.default.clientid);
    data.append('client_secret', refs_1.default.clientsecret);
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('redirect_uri', 'http://localhost:3000/auth2/callback');
    data.append('scope', 'identify guilds');
    const res = yield node_fetch_1.default('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
    const response = yield res.json();
    return response;
});
exports.token = token;
const getGuilds = (accessCode) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield node_fetch_1.default(baseUrl + '/users/@me/guilds', {
        headers: {
            'Authorization': 'Bearer ' + accessCode,
            'Content-Type': 'application/json'
        }
    });
    const response = yield res.json();
    return response;
});
exports.getGuilds = getGuilds;
const getUser = (accessCode) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield node_fetch_1.default(baseUrl + '/users/@me', {
        headers: {
            'Authorization': 'Bearer ' + accessCode,
            'Content-Type': 'applicaton/json'
        }
    });
    const response = yield res.json();
    return response;
});
exports.getUser = getUser;
