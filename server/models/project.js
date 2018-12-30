import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    description: String,
    feature_img: String,
    tokensCount: Number,
    createdAt: Date,
    updatedAt: Date,
    votes: [
      {
        voter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        amount: Number,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
);

const ProjectModel = mongoose.model('Project', ProjectSchema);

ProjectModel.update = projectToUpdate => ProjectModel.updateOne(projectToUpdate);

ProjectModel.toJSON = () => ({
  name: this.name,
  email: this.email,
  description: this.description,
  feature_img: this.feature_img,
  createdAt: this.createdAt,
  updatedAt: this.updatedAt,
  tokensCount: this.tokensCount,
  votes: this.votes,
  owner: this.owner,
});

export default ProjectModel;
