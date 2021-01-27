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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TODO ADD MONGOOSE CONNECTION FOR  SENDING DATA TO THE CLIENT
 */
exports.default = {
    getUser(args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(args);
            return {
                id: 'SOME ID',
                username: 'SOME USERNAME',
                discriminator: 'SOME DISC',
                _id: 'SOME MONGOOSE OBJECT',
                guilds: 'SOME GUILDS',
                avatar: 'SOME AV'
            };
        });
    },
};
