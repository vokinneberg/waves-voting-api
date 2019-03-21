import mongoose from 'mongoose';

const ProjectStatus = {
  Unknown: 'Unknown',
  Described: 'Described',
  Verified: 'Verified'
}

const ProjectSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    logo: {
      name: String,
      link: String
    },
    description: String,
    owner: String,
    country: String,
    home_page: String,
    social_links: [
      {
        name: String,
        link: String
      }
    ],
    token: {
      id: String,
      code: String,
      logo: {
        name: String,
        link: String
      }
    },
    votes: [
      {
        wallet_id: String,
        stake: Number
      },
    ],
    owner: String,
    rate: Number,
    status: {
      type: String,
      enum: ['Unknown', 'Described', 'Verified']
    }
  },
);

const ProjectModel = mongoose.model('Project', ProjectSchema);

export { ProjectModel, ProjectStatus };
