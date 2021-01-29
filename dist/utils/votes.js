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
exports.votes = void 0;
const refs_1 = __importDefault(require("./refs"));
const baseUrl = 'https://top.gg/api';
const auth = refs_1.default.auth;
const node_fetch_1 = __importDefault(require("node-fetch"));
let votes = () => __awaiter(void 0, void 0, void 0, function* () {
    let sorted = [];
    let res = yield node_fetch_1.default(baseUrl + '/bots/710534645405581353/votes', {
        method: 'GET',
        headers: {
            'Authorization': auth
        }
    });
    let response = yield res.json();
    let i = 0;
    response.map((el) => {
        if (!sorted.includes(el.id)) {
            sorted.push(el.id);
        }
        else {
            response[i] = undefined;
        }
        i++;
    });
    return response;
});
exports.votes = votes;
