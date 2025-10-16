export function loadRecaptcha(siteKey: string) {
  if (typeof window === "undefined") return

  const script = document.createElement("script")
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

export async function executeRecaptcha(siteKey: string, action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("reCAPTCHA not loaded"))
      return
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject)
    })
  })
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}
