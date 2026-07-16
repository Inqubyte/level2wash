import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/Button"
import { site } from "@/data/site"

export function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const password = String(data.get("password") || "")
    const confirm = String(data.get("confirm") || "")

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")
    window.setTimeout(() => {
      setLoading(false)
      navigate("/enquiry")
    }, 700)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14">
      <div className="mb-8 text-center">
        <img
          src={site.logo}
          alt=""
          className="mx-auto mb-4 h-16 w-16 rounded-full object-cover ring-2 ring-secondary"
        />
        <h1 className="text-3xl font-extrabold text-slate-900">Create an account</h1>
        <p className="mt-2 text-slate-600">
          Enter your details to register for laundry services
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
      >
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
        <div className="space-y-4">
          <Field label="Full Name" name="name" required />
          <Field label="Email Address" name="email" type="email" required />
          <Field label="Phone Number" name="phone" type="tel" required />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Full Address</span>
            <textarea
              name="address"
              required
              rows={2}
              placeholder="Apartment, Street, Area, City"
              className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            />
          </label>
          <Field label="Password" name="password" type="password" required placeholder="Secure password" />
          <Field
            label="Confirm Password"
            name="confirm"
            type="password"
            required
            placeholder="Re-enter password"
          />
        </div>
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
      />
    </label>
  )
}
