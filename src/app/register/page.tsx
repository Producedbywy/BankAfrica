"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })

  const validatePassword = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    const isPasswordValid = Object.values(passwordStrength).every(Boolean)
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (name.length < 2) {
      setError("Please enter your full name")
      setLoading(false)
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("An account with this email already exists")
        }
        throw new Error(data.error || "Registration failed. Please try again later.")
      }

      router.push("/login?registered=true&email=" + encodeURIComponent(email))
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="relative isolate flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-serif mb-2">
            Digital Banking for Africa
          </h1>
          <p className="text-lumo-cream/80">
            Join thousands of users managing their finances with ease
          </p>
        </div>

        <Card className="w-full max-w-md border-0 bg-lumo-midnight/90 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Create Your Account
            </CardTitle>
            <p className="text-sm text-lumo-cream/80 text-center">
              Start your journey to modern banking
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-lumo-cream/80">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-lumo-cream/80">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-lumo-cream/80">
                    Create Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
                    placeholder="Create a strong password"
                    minLength={8}
                    onChange={(e) => validatePassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <div className="mt-2 text-xs space-y-1">
                    <p className="text-lumo-cream/60">Password requirements:</p>
                    <ul className="space-y-1">
                      {[
                        { key: 'length', text: 'At least 8 characters' },
                        { key: 'uppercase', text: 'One uppercase letter' },
                        { key: 'lowercase', text: 'One lowercase letter' },
                        { key: 'number', text: 'One number' },
                        { key: 'special', text: 'One special character (@$!%*?&)' },
                      ].map(({ key, text }) => (
                        <li key={key} className={`flex items-center ${
                          passwordStrength[key as keyof typeof passwordStrength] 
                            ? 'text-lumo-teal' 
                            : 'text-lumo-cream/60'
                        }`}>
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {passwordStrength[key as keyof typeof passwordStrength] ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            )}
                          </svg>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-lumo-cream/80">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1 bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
                    placeholder="Confirm your password"
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-lumo-orange bg-lumo-orange/10 border border-lumo-orange/20 p-3 rounded-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-lumo-orange text-white hover:bg-lumo-yellow hover:text-lumo-navy transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-current rounded-full animate-spin" />
                    <span className="ml-2">Creating your account...</span>
                  </div>
                ) : (
                  "Create secure account"
                )}
              </Button>

              <div className="text-center text-sm mt-4">
                <span className="text-lumo-cream/60">Already have an account?</span>{" "}
                <Link href="/login" className="text-lumo-teal hover:text-lumo-yellow transition-colors">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
