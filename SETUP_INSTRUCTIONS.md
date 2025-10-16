# Contact Form Setup Instructions

This contact form integrates with Microsoft 365 and Google reCAPTCHA. Follow these steps to configure it:

## 1. Microsoft 365 App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations** > **New registration**
3. Name your app (e.g., "Portfolio Contact Form")
4. Set **Supported account types** to "Accounts in this organizational directory only"
5. Click **Register**

### Configure API Permissions:
1. Go to **API permissions** > **Add a permission**
2. Select **Microsoft Graph** > **Application permissions**
3. Add these permissions:
   - `Mail.Send`
   - `User.Read.All`
4. Click **Grant admin consent**

### Create Client Secret:
1. Go to **Certificates & secrets** > **New client secret**
2. Add a description and set expiration
3. **Copy the secret value immediately** (you won't see it again)

### Get Your Credentials:
- **Client ID**: Found on the app's Overview page
- **Tenant ID**: Found on the app's Overview page
- **Client Secret**: The value you just copied

## 2. Google reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click **Create** (+) button
3. Configure:
   - **Label**: Portfolio Contact Form
   - **reCAPTCHA type**: Score based (v3)
   - **Domains**: Add your domain (e.g., farnworth.org.uk)
4. Accept terms and submit
5. Copy both the **Site Key** and **Secret Key**

## 3. Environment Variables

Add these environment variables to your Vercel project:

### Microsoft 365 Variables:
\`\`\`
MICROSOFT_CLIENT_ID=your-client-id-here
MICROSOFT_CLIENT_SECRET=your-client-secret-here
MICROSOFT_TENANT_ID=your-tenant-id-here
MICROSOFT_SENDER_EMAIL=your-email@yourdomain.com
\`\`\`

### reCAPTCHA Variables:
\`\`\`
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
RECAPTCHA_SECRET_KEY=your-secret-key-here
\`\`\`

## 4. Testing

1. Deploy your changes to Vercel
2. Test the contact form with a real submission
3. Check that:
   - You receive the notification email
   - The submitter receives the thank you email
   - No errors appear in the Vercel logs

## Troubleshooting

### Email not sending:
- Verify all Microsoft credentials are correct
- Check that admin consent was granted for API permissions
- Ensure the sender email exists in your M365 tenant
- Check Vercel logs for specific error messages

### reCAPTCHA errors:
- Verify the site key is correct and starts with NEXT_PUBLIC_
- Check that your domain is added to reCAPTCHA admin
- Ensure the secret key is correct

### Need Help?
Check the Vercel logs for detailed error messages with the [v0] prefix.
