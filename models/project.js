import mongoose from 'mongoose';

const ProjectVerificationStatus = {
  Unknown: 'Unknown',
  Described: 'Described',
  Verified: 'Verified',
  Suspicious: 'Suspicious',
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

const VoteStatus = {
  Init: 'Init',
  NoFunds: 'No Funds',
  Settled: 'Settled',
};

const StartingProjectRank = 0;

const ProjectSchema = new mongoose.Schema(
  {
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
    monetization_type: [
      {
        type: String,
        enum: ['ICO', 'Grant', 'Private Investors', 'Venture Investments', 'TrustAmust DAOICO'],
      },
    ],
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
      svg_logo: {
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
      new mongoose.Schema(
        {
          waves_address: {
            type: String,
            unique: true,
            sparse: true,
            tags: { type: [String], index: true },
          },
          stake: { type: mongoose.Types.Decimal128, default: 0 },
          transaction_id: String,
          rank: { type: mongoose.Types.Decimal128, default: 0 },
          status: {
            type: String,
            enum: [VoteStatus.Init, VoteStatus.NoFunds, VoteStatus.Settled],
            default: VoteStatus.Init,
          },
        },
        { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
      ),
    ],
    owner: {
      name: String,
      surname: String,
      email: String,
      country: String,
    },
    rank: { type: mongoose.Types.Decimal128, default: 0.0 },
    verification_status: {
      type: String,
      enum: [
        ProjectVerificationStatus.Unknown,
        ProjectVerificationStatus.Described,
        ProjectVerificationStatus.Verified,
        ProjectVerificationStatus.Suspicious,
      ],
      default: ProjectVerificationStatus.Unknown,
    },
    verification_transaction_id: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

/* eslint no-underscore-dangle: ["error", { "allow": ["__v", "_id"] }] */
ProjectSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    ret.votes = ret.votes.map(vote => ({
      ...vote,
      stake: parseFloat(vote.stake).toFixed(1),
      rank: parseFloat(vote.rank).toFixed(2),
    }));
    ret.rank = parseFloat(ret.rank);
    return ret;
  },
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

export {
  ProjectSchema,
  ProjectModel,
  ProjectStatus,
  ProjectVerificationStatus,
  StartingProjectRank,
  TokenMonetizationType,
  VoteStatus,
};
