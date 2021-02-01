const fetch = require('node-fetch');
const refs = require('./refs')
const baseUrl = 'https://top.gg/api';
const bot_id = '710534645405581353';

const getLastVotes = () => {
    const promise = new Promise((resolve, reject) => {
        // eslint-disable-next-line
        const res = await fetch(`${baseUrl}/bots/${bot_id}/votes`, { 
            method: 'GET',
            headers: {
                'Authorization': refs.topgg
            }
        });
    });
    return res;
}

module.exports = {
    getLastVotes
}