import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  chatId: string;
  userId: string;
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    readBy: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
MessageSchema.index({ chatId: 1, createdAt: -1 });
MessageSchema.index({ userId: 1 });

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
