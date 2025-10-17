"use client"

import type React from "react"

import { useState } from "react"
import { submitContactForm } from "@/app/actions/contact"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const attachments = await Promise.all(
        files.map(async (file) => {
          const base64 = await fileToBase64(file)
          return {
            name: file.name,
            contentType: file.type,
            contentBytes: base64,
          }
        }),
      )

      const result = await submitContactForm({ ...formData, attachments })

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", organization: "", message: "" })
        setFiles([])
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setErrorMessage(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const newFiles = Array.from(e.target.files)

    // Limit to 5 files and 3.5MB total
    const totalSize = [...files, ...newFiles].reduce((sum, file) => sum + file.size, 0)

    if ([...files, ...newFiles].length > 5) {
      setErrorMessage("Maximum 5 files allowed")
      return
    }

    if (totalSize > 3.5 * 1024 * 1024) {  // 3.5MB limit
      setErrorMessage("Total file size must be under 3.5MB")
      return
    }

    setFiles((prev) => [...prev, ...newFiles])
    setErrorMessage("")
  }
}

const removeFile = (index: number) => {
  setFiles((prev) => prev.filter((_, i) => i !== index))
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-muted-foreground">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-muted-foreground">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground"
          placeholder="your.email@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="organization" className="text-sm text-muted-foreground">
          Organization
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground"
          placeholder="Your school or trust (optional)"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-muted-foreground">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground resize-none"
          placeholder="Tell me about your inquiry..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="attachments" className="text-sm text-muted-foreground">
          Attachments (optional)
        </label>
        <input
          type="file"
          id="attachments"
          onChange={handleFileChange}
          multiple
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-muted-foreground/10 file:text-foreground hover:file:bg-muted-foreground/20 file:cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">Max 5 files, 3.5MB total</p>

        {files.length > 0 && (
          <div className="space-y-2 mt-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted-foreground/5 rounded-lg">
                <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                <span className="text-xs text-muted-foreground mx-2">{(file.size / 1024).toFixed(1)}KB</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {status === "error" && (
        <div className="p-4 border border-red-500/50 rounded-lg bg-red-500/10">
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      {status === "success" && (
        <div className="p-4 border border-green-500/50 rounded-lg bg-green-500/10">
          <p className="text-sm text-green-500">
            Message sent successfully! You'll receive a confirmation email shortly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      <p className="text-xs text-muted-foreground">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
    </form>
  )
}
