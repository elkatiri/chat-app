import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChat extends Document {
  name?: string;
  participantIds: string[];
  createdBy: string;
  isGroup: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    participantIds: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
    },
    lastMessageAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
ChatSchema.index({ participantIds: 1 });
ChatSchema.index({ createdBy: 1 });
ChatSchema.index({ updatedAt: -1 });

const Chat: Model<IChat> = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
