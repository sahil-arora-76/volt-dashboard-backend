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
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./graphql/schema"));
const refs_1 = __importDefault(require("./utils/refs"));
const resolver_1 = __importDefault(require("./graphql/resolver"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
const auth2_1 = require("./utils/auth2");
const body_parser_1 = __importDefault(require("body-parser"));
mongoose_1.default.connect('mongodb://localhost/dashboardv2');
mongoose_1.default.connection.on('connected', () => {
    console.log('mongoose connected');
});
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS, GET, POST');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.get('/auth2', (req, res, next) => {
    res.redirect(refs_1.default.redirect);
});
app.get('/logout', (req, res, next) => {
    res.cookie('token', '__', { maxAge: 0 });
    res.cookie('userid', '__', { maxAge: 0 });
    res.redirect('http://localhost:8080/');
});
app.use('/auth2/callback', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = yield auth2_1.token(req.query.code);
    if (authToken.error) {
        return res.redirect('http://localhost:8080');
    }
    const guilds = yield auth2_1.getGuilds(authToken.access_token);
    const users = yield auth2_1.getUser(authToken.access_token);
    const isUser = yield user_1.default.findOne({ id: users.id });
    ;
    if (isUser) {
        isUser.avatar = users.avatar;
        isUser.username = users.username;
        isUser.discrimintor = users.discriminator;
        isUser.save();
        res.cookie('userid', isUser._id.toString());
    }
    else {
        const newUser = new user_1.default({
            id: users.id,
            avatar: users.avatar,
            discriminator: users.discriminator,
            guilds: guilds
        });
        newUser.save();
        res.cookie('userid', newUser._id.toString());
    }
    res.cookie('token', {
        access_token: authToken.access_token,
        refresh_token: authToken.refresh_token
    });
    return res.redirect('http://localhost:8080/login');
}));
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    rootValue: resolver_1.default,
    graphiql: true
}));
app.listen(3000, () => console.log('app running'));
``;
