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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", organization: "", message: "" })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
