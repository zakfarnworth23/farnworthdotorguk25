"use server"

interface ContactFormData {
  name: string
  email: string
  organization: string
  message: string
}

interface ContactFormResult {
  success: boolean
  error?: string
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error("[v0] RECAPTCHA_SECRET_KEY not configured")
    return false
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error("[v0] reCAPTCHA verification failed:", error)
    return false
  }
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
  const tenantId = process.env.MICROSOFT_TENANT_ID

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error("Microsoft 365 credentials not configured")
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to obtain access token")
  }

  const data = await response.json()
  return data.access_token
}

async function sendEmail(accessToken: string, to: string, subject: string, body: string): Promise<void> {
  const senderEmail = process.env.MICROSOFT_SENDER_EMAIL

  if (!senderEmail) {
    throw new Error("MICROSOFT_SENDER_EMAIL not configured")
  }

  const graphEndpoint = `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`

  const emailPayload = {
    message: {
      subject,
      body: {
        contentType: "HTML",
        content: body,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },
  }

  const response = await fetch(graphEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[v0] Failed to send email:", errorText)
    throw new Error("Failed to send email")
  }
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResult> {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return { success: false, error: "Please fill in all required fields" }
    }

    // Get Microsoft Graph access token
    const accessToken = await getAccessToken()

    const notificationBody = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Organization:</strong> ${formData.organization || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          <p style="color: #7f8c8d; font-size: 12px;">
            This message was sent via your portfolio contact form at ${new Date().toLocaleString()}
          </p>
        </body>
      </html>
    `

    await sendEmail(accessToken, "zak@farnworth.org.uk", `New Contact Form: ${formData.name}`, notificationBody)

    // Send automatic thank you email to submitter
    const thankYouBody = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">Thank you for contacting Zak Farnworth's correspondence line</h2>
          <p>Dear ${formData.name},</p>
          <p>Thank you for reaching out. I have received your message and will respond as soon as possible.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          <p>Best regards,<br/>Zak Farnworth<br/>ICT Technician</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
          <p style="color: #7f8c8d; font-size: 12px;">
            Office of Zak Farnworth<br/>
            Bolton, United Kingdom<br/>
            <a href="https://farnworth.org.uk" style="color: #3498db;">farnworth.org.uk</a>
          </p>
        </body>
      </html>
    `

    await sendEmail(accessToken, formData.email, "Thank you for contacting Zak Farnworth", thankYouBody)

    return { success: true }
  } catch (error) {
    console.error("[v0] Contact form submission error:", error)
    return {
      success: false,
      error: "Failed to send message. Please try emailing directly at zak@farnworth.org.uk",
    }
  }
}
