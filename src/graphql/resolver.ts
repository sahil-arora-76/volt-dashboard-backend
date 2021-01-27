/**
 * TODO ADD MONGOOSE CONNECTION FOR  SENDING DATA TO THE CLIENT 
 */
export default { 
    async getUser(args: any) { 
        console.log(args);
        return { 
                id: 'SOME ID', 
                username: 'SOME USERNAME',
                discriminator: 'SOME DISC',
                _id: 'SOME MONGOOSE OBJECT', 
                guilds: 'SOME GUILDS', 
                avatar: 'SOME AV' 
            }
    }, 
}