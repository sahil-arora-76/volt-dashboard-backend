const fetch = require('node-fetch');
const refs = require('./refs');
const baseUrl = 'https://top.gg/api';
const botId = '710534645405581353';

function heavyLifiting(args) { 
    const c = {};
    for (let i = 0; i < args.length; i++) { 
        if (c[args[i].username]) { 
            c[args[i].username].votes ++; 
        } else { 
            const obj = {
                votes: 1,
                avatar: args[i].avatar, 
                id: args[i].id, 
                username: args[i].username 
            };
            c[args[i].username] = obj;
        }
    }
    return c;
}

const getVotes = () => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${baseUrl}/bots/${botId}/votes`, { 
                method: 'GET',
                headers: {
                    'Authorization': refs.topgg
                }
            });
            if (!res.ok) { 
                return reject(res);
            }
            res = await res.json();
            let response = heavyLifiting(res);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};
module.exports = {
    getVotes
};