# Vercel Deployment Guide

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your MongoDB connection string
3. Your Clerk API keys

## Step 1: Push Your Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

## Step 3: Configure Environment Variables

In the Vercel project settings, add these environment variables:

### Required Environment Variables

1. **MONGODB_URI**
   ```
   mongodb+srv://elkatiriahmed:<your-password>@cluster0.lrkhnsh.mongodb.net/chat-app
   ```
   Replace `<your-password>` with your actual MongoDB password.

2. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
   ```
   pk_test_b25lLWxvdXNlLTMxLmNsZXJrLmFjY291bnRzLmRldiQ
   ```

3. **CLERK_SECRET_KEY**
   ```
   sk_test_Vz5rF36pi48aK9kJjYe5V8RvKZSEbtXFywcWPw6Svt
   ```

4. **CLERK_WEBHOOK_SECRET**
   - Get this from your Clerk dashboard → Webhooks
   - Create a webhook endpoint pointing to: `https://your-vercel-domain.vercel.app/api/webhooks/clerk`
   - Subscribe to: `user.created`, `user.updated`, `user.deleted`

5. **NEXT_PUBLIC_APP_URL** (Optional but recommended)
   ```
   https://your-vercel-domain.vercel.app
   ```
   Replace with your actual Vercel domain.

### How to Add Environment Variables in Vercel

1. Go to your project dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add each variable:
   - **Name**: The variable name (e.g., `MONGODB_URI`)
   - **Value**: The actual value
   - **Environment**: Select "Production", "Preview", and "Development" (or just "Production" if you prefer)

## Step 4: Configure Clerk Webhooks

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to "Webhooks"
3. Click "Add Endpoint"
4. Enter your Vercel URL: `https://your-domain.vercel.app/api/webhooks/clerk`
5. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
6. Copy the "Signing Secret" and add it to Vercel as `CLERK_WEBHOOK_SECRET`

## Step 5: Deploy

1. After adding environment variables, Vercel will automatically trigger a new deployment
2. Or manually trigger by clicking "Redeploy" in the Deployments tab
3. Wait for the build to complete

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test sign-up/sign-in
3. Test creating chats and sending messages
4. Check that webhooks are working (users should be created in MongoDB)

## Troubleshooting

### Build Fails with "MONGODB_URI not defined"
- ✅ This is now fixed! The code checks for env vars at runtime, not build time
- Make sure you've added all environment variables in Vercel settings

### Webhooks Not Working
- Verify the webhook URL is correct in Clerk dashboard
- Check that `CLERK_WEBHOOK_SECRET` matches in both Clerk and Vercel
- Check Vercel function logs for webhook errors

### Database Connection Issues
- Verify `MONGODB_URI` is correct (check password)
- Ensure MongoDB Atlas allows connections from Vercel IPs (Network Access settings)
- Check MongoDB connection string format

### Environment Variables Not Working
- Make sure variables are added for the correct environment (Production/Preview/Development)
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

## Additional Notes

- Vercel automatically provides HTTPS
- Environment variables are encrypted and secure
- Each deployment gets a unique preview URL
- Production deployments use your custom domain (if configured)

## Next Steps

1. Set up a custom domain (optional)
2. Configure analytics (optional)
3. Set up monitoring and error tracking
4. Configure automatic deployments from main branch

