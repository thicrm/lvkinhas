# 📧 EmailJS Setup Guide for LVKINHAS Contact Form

## 🎯 What This Does

Your contact form now has **real email functionality** that will send messages directly to `lvcascavallini@gmail.com` when visitors submit the form.

## 🚀 Setup Steps

### 1. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 2. Create Email Service
- In EmailJS dashboard, go to **"Email Services"**
- Click **"Add New Service"**
- Choose **"Gmail"** (recommended for personal use)
- Connect your Gmail account (`lvcascavallini@gmail.com`)
- Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
- Go to **"Email Templates"**
- Click **"Create New Template"**
- Use this template structure:

```html
Subject: New message from {{from_name}} - {{subject}}

Hello Lucas,

You have received a new message from your website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your LVKINHAS portfolio website.
```

- Save the template and note down the **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key
- Go to **"Account"** → **"API Keys"**
- Copy your **Public Key** (e.g., `user_def456`)

### 5. Update Your Code
Replace the placeholder values in `src/components/Contact.tsx`:

```typescript
// Line ~350: Replace YOUR_PUBLIC_KEY
emailjs.init("user_def456"); // Your actual public key

// Line ~375: Replace YOUR_SERVICE_ID  
'YOUR_SERVICE_ID', // Replace with your service ID (e.g., 'service_abc123')

// Line ~376: Replace YOUR_TEMPLATE_ID
'YOUR_TEMPLATE_ID', // Replace with your template ID (e.g., 'template_xyz789')
```

## 🔧 Configuration Example

```typescript
// Initialize EmailJS
useEffect(() => {
  try {
    emailjs.init("user_def456"); // Your actual public key
  } catch (error) {
    console.warn('EmailJS initialization failed:', error);
  }
}, []);

// Send email
const result = await emailjs.send(
  'service_abc123', // Your actual service ID
  'template_xyz789', // Your actual template ID
  templateParams
);
```

## 📱 How It Works

1. **Visitor fills out form** on your website
2. **Form data is sent** via EmailJS to your Gmail
3. **You receive email** at `lvcascavallini@gmail.com`
4. **You can reply directly** to the visitor's email address

## 🆓 Free Tier Limits

- **200 emails per month** (free)
- **2 email templates** (free)
- **1 email service** (free)

## 🚨 Important Notes

- **Never share** your private keys publicly
- **Test thoroughly** before going live
- **Monitor email limits** to avoid service interruption
- **Backup your configuration** values

## 🆘 Troubleshooting

### Common Issues:
- **"Service not configured"**: Check your service ID
- **"Template not found"**: Check your template ID  
- **"Invalid public key"**: Check your public key
- **"Email limit reached"**: Upgrade plan or wait for reset

### Testing:
1. Fill out the contact form
2. Check browser console for errors
3. Verify email received in Gmail
4. Check spam folder if needed

## ✅ Success Indicators

- Form submits without errors
- Success message appears
- Email received in `lvcascavallini@gmail.com`
- Form fields clear after submission

---

**Need help?** Check EmailJS documentation or contact their support team.
