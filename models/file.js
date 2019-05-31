import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    mime_type: String,
  },
  { timestamps: { createdAt: 'created_at' } }
);

const FileModel = mongoose.model('File', FileSchema);

export { FileSchema, FileModel };
