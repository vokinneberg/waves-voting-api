import mongoose from 'mongoose';

const ProjectVerificationStatus = {
  Unknown: 'Unknown',
  Described: 'Described',
  Verified: 'Verified',
};

const ProjectStatus = {
  Idea: 'Idea',
  MVP: 'MVP',
  Business: 'Working business',
  DAOICO: 'TrustAmust DAOICO',
};

const TokenMonetizationType = {
  ICO: 'ICO',
  Grant: 'Grant',
  Private: 'Private Investors',
  Venture: 'Venture Investments',
  DAOICO: 'TrustAmust DAOICO',
};

const StartingProjectRank = 0;

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required.'],
  },
  project_id: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, 'Unique Id required.'],
    tags: { type: [String], index: true },
  },
  short_description: {
    type: String,
    required: [true, 'Short description required.'],
  },
  description: {
    type: String,
    required: [true, 'Description required.'],
  },
  project_site: String,
  project_status: {
    type: String,
    enum: ['Idea', 'MVP', 'Working Business'],
  },
  monetization_type: [{
    type: String,
    enum: ['ICO', 'Grant', 'Private Investors', 'Venture Investments', 'TrustAmust DAOICO'],
  }],
  social_links: [
    {
      name: String,
      link: String,
    },
  ],
  token: {
    id: String,
    ticker: String,
    description: String,
    logo: {
      name: String,
      link: String,
    },
  },
  team: [
    {
      name: String,
      surname: String,
      role: String,
      social_link: {
        name: String,
        link: String,
      },
    },
  ],
  votes: [
    {
      wallet_id: String,
      stake: Number,
      date: Date,
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
    enum: ['Unknown', 'Described', 'Verified'],
  },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

ProjectSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const ProjectModel = mongoose.model('Project', ProjectSchema);

export {
  ProjectModel,
  ProjectStatus,
  ProjectVerificationStatus,
  StartingProjectRank,
  TokenMonetizationType,
};
