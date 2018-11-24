import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    feature_img: String,
    votes: [
      {
        voter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        amount: Number,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
);

const ProjectModel = mongoose.model('Project', ProjectSchema);

ProjectModel.getAll = () => ProjectSchema.find({});

ProjectModel.add = projectToAdd => projectToAdd.save();

ProjectModel.update = projectToUpdate => projectToUpdate.save();

export default ProjectModel;
