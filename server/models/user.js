import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    publicKey: String,
    wavesWalletAddress: String,
    createdAt: Date,
    projects: [
      {
        voter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project',
        },
      },
    ],
  },
);

const UserModel = mongoose.model('User', UserSchema);

UserModel.getAll = () => UserModel.find({});

UserModel.addUser = userToAdd => userToAdd.save();

UserModel.finByWalletAddress = walletAddress => UserModel
  .find({ wavesWalletAddress: walletAddress });

export default UserModel;
