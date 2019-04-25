import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email required.'],
            unique: true,
        },
        hashedPassword: String,
    },
    { timestamps: { createdAt: 'created_at' } }
)

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
