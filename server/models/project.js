import mongoose from 'mongoose';

const ProjectVerificationStatus = {
  Unknown: 'Unknown',
  Described: 'Described',
  Verified: 'Verified'
}


const ProjectStatus = {
  Idea: 'Idea',
  MVP: 'MVP',
  Business: 'Working business'
}

const ProjectSchema = new mongoose.Schema({
    name: String,
    short_description: String,
    description: String,
    project_site: String,
    project_status: {
      type: String,
      enum: ['Idea', 'MVP', 'Working Business']
    },
    social_links: [
      {
        name: String,
        link: String
      }
    ],
    token: {
      id: String,
      ticker: String,
      description: String,
      logo: {
        name: String,
        link: String
      }
    },
    team: [
      {
        name: String,
        surname: String,
        social_link: {
          name: String,
          link: String
        }
      }
    ],
    votes: [
      {
        wallet_id: String,
        stake: Number,
        date:  Date
      },
    ],
    owner: {
      name: String,
      surname: String,
      email: String,
      country: String,
    },
    rank: Number,
    verification_status: {
      type: String,
      enum: ['Unknown', 'Described', 'Verified']
    }
  },
);

const ProjectModel = mongoose.model('Project', ProjectSchema);

export { ProjectModel, ProjectStatus, ProjectVerificationStatus };
