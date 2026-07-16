import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/Button"
import { site } from "@/data/site"

export function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get("email") || "").trim()
    const password = String(data.get("password") || "")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setLoading(true)
    setError("")
    window.setTimeout(() => {
      setLoading(false)
      navigate("/enquiry")
    }, 600)
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14">
      <div className="mb-8 text-center">
        <img
          src={site.logo}
          alt=""
          className="mx-auto mb-4 h-16 w-16 rounded-full object-cover ring-2 ring-secondary"
        />
        <h1 className="text-3xl font-extrabold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-600">Log in to manage your laundry orders</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
      >
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}
        <label className="mb-4 block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
        </label>
        <label className="mb-6 block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm outline-none ring-ring focus:ring-2"
          />
        </label>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  )
}
