# Vibely - Real-time Chat Application

A full-stack real-time chat application built with Next.js 15, TypeScript, Clerk authentication, and MongoDB. Connect with friends from around the world with an Instagram-inspired UI design.

## Features

- 🔐 **Authentication**: Secure authentication powered by Clerk
- 💬 **Real-time Messaging**: Chat with friends in real-time
- 👥 **User Management**: See all users and their online/offline status
- 🌍 **Global Reach**: Connect with friends worldwide
- 📱 **Instagram-inspired UI**: Beautiful, modern interface design
- ⚡ **Fast & Responsive**: Built with Next.js 15 for optimal performance
- 🔒 **Secure**: Protected routes and API endpoints

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS v4
- **Real-time Updates**: WebSocket-based real-time messaging with Socket.io

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Clerk account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...

   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

4. **Set up Clerk Webhook**

   - Go to your Clerk Dashboard → Webhooks
   - Add a new endpoint: `https://your-domain.com/api/webhooks/clerk`
   - Subscribe to events: `user.created`, `user.updated`, `user.deleted`
   - Copy the webhook signing secret to `CLERK_WEBHOOK_SECRET`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chat-app/
├── app/
│   ├── api/
│   │   ├── chats/          # Chat API endpoints
│   │   ├── messages/       # Message API endpoints
│   │   ├── users/          # User API endpoints
│   │   └── webhooks/       # Clerk webhook handler
│   ├── chat/               # Chat interface pages
│   │   └── components/     # Chat UI components
│   ├── sign-in/            # Sign-in page
│   ├── sign-up/            # Sign-up page
│   ├── layout.tsx          # Root layout with ClerkProvider
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── lib/
│   ├── models/             # Mongoose models
│   │   ├── User.ts
│   │   ├── Chat.ts
│   │   └── Message.ts
│   └── mongodb.ts          # MongoDB connection utility
├── middleware.ts           # Clerk middleware for route protection
└── package.json
```

## API Routes

### Users
- `GET /api/users` - Get all users (excluding current user)
- `POST /api/users/activity` - Update user's last active timestamp

### Chats
- `GET /api/chats` - Get all chats for the current user
- `POST /api/chats` - Create a new chat

### Messages
- `GET /api/messages?chatId=...` - Get messages for a chat
- `POST /api/messages` - Send a new message

### Webhooks
- `POST /api/webhooks/clerk` - Handle Clerk user events

## Database Models

### User
- `clerkId`: Unique Clerk user ID
- `email`: User email
- `firstName`, `lastName`: User name
- `username`: Optional username
- `profileImage`: Profile picture URL
- `lastActive`: Last activity timestamp

### Chat
- `name`: Chat name (for group chats)
- `participantIds`: Array of user Clerk IDs
- `createdBy`: Creator's Clerk ID
- `isGroup`: Boolean for group chats
- `lastMessage`: Last message content
- `lastMessageAt`: Timestamp of last message

### Message
- `content`: Message text
- `chatId`: Reference to Chat
- `userId`: Sender's Clerk ID
- `readBy`: Array of user IDs who read the message

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app will automatically build and deploy.

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET`
- `MONGODB_URI`

## Features in Detail

### Authentication Flow
1. User signs up/signs in via Clerk
2. Clerk webhook creates/updates user in MongoDB
3. User is redirected to `/chat` page

### Chat Flow
1. User selects another user from the sidebar
2. System creates or retrieves existing direct chat
3. WebSocket connection is established for real-time messaging
4. Messages are displayed instantly via Socket.io events
5. User can send messages which are saved to MongoDB and broadcasted in real-time

### Online Status
- Users are considered online if their `lastActive` timestamp is within the last 5 minutes
- Activity is updated every 2 minutes when the chat page is open

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Clerk, and MongoDB
