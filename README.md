This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Quick Deployment Steps

1. **Push your code to GitHub**
2. **Import to Vercel** - Connect your GitHub repository
3. **Add Environment Variables** in Vercel project settings:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
   - `CLERK_SECRET_KEY` - Your Clerk secret key
   - `CLERK_WEBHOOK_SECRET` - Your Clerk webhook signing secret
   - `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL (optional)

4. **Configure Clerk Webhooks** - Point to `https://your-domain.vercel.app/api/webhooks/clerk`

5. **Deploy** - Vercel will automatically deploy your app

📖 **For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
