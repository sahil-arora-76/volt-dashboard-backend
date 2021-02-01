const fetch = require('node-fetch');
const refs = require('./refs');
const { fork } = require('child_process');   
const baseUrl = 'https://top.gg/api';
const botId = '710534645405581353';

const getVotes = () => {
    const promise = new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${baseUrl}/bots/${botId}/votes`, { 
                method: 'GET',
                headers: {
                    'Authorization': refs.topgg
                }
            })
            if (!res.ok) { 
                return reject(res);
            }
            res = await res.json();
            let child = fork('../cluster/proccesVotes'); 
            child.send({ message: res })
            child.on('message', (msg) => {
                child.kill();
                console.log(msg)
                resolve(msg);
            })
        } catch (error) {
            reject(error);
        }
    });
    return promise;
};
module.exports = {
    getVotes
};