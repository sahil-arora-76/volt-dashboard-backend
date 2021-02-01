const fetch = require('node-fetch');
const refs = require('./refs');
const baseUrl = 'https://top.gg/api';
const bot_id = '710534645405581353';

const getLastVotes = () => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${baseUrl}/bots/${bot_id}/votes`, { 
                method: 'GET',
                headers: {
                    'Authorization': refs.topgg
                }
            });
            res = await res.json();
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};

module.exports = {
    getLastVotes
};