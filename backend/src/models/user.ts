import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        question: String,
        answer: String,
        firstname: String,
        lastname: String,
        gender: String,
        address: String,
        phone: String,
        email: String,
        card: String,
        type: String,
        profilePicture: String,
        active:Number
    }
);

export default mongoose.model('UserModel', userSchema, 'users');