import mongoose from 'mongoose'; 
const user = new mongoose.Schema({ 
    username: String, 
    id: {
        type: String, 
        required: true
    }, 
    avatar: String, 
    discriminator: String, 
    guilds: Array, 
    api: Boolean
}, { timestamps: true })
export default mongoose.model('Users', user); 