import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../../../app/store/index.js'
import {
  getGoogleAuthUrl,
  loginAdmin,
  persistAdminSession,
} from '../api/adminAuthApi.js'
import { getErrorMessage } from '../../../../shared/utils/errorMessages.js'

const initialFormState = {
  email: '',
  password: '',
  remember: false,
}

const AdminLoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formState, setFormState] = useState(initialFormState)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, type, checked, value } = event.target

    setFormState((currentValue) => ({
      ...currentValue,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formState.email.includes('@')) {
      const msg = 'Enter a valid admin email address.'
      setMessage(msg)
      toast.error(msg)
      return
    }

    if (formState.password.length < 6) {
      const msg = 'Password must be at least 6 characters.'
      setMessage(msg)
      toast.error(msg)
      return
    }

    try {
      setIsSubmitting(true)
      setMessage('')
      const user = await loginAdmin({
        email: formState.email,
        password: formState.password,
      })

      persistAdminSession({ user, remember: formState.remember })
      dispatch(login({ user }))
      toast.success(`Welcome back, ${user.name || 'Admin'}!`, {
        position: 'top-right',
        autoClose: 3000,
      })
      navigate('/admin', { replace: true })
    } catch (error) {
      const message = getErrorMessage(error)
      setMessage(message)
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl()
  }

  return (
    <div>
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase text-[#9adca7]">Admin Login</p>
        <h2 className="text-4xl font-extrabold leading-tight text-[#f4f7f5]">Welcome back</h2>
        <p className="mt-3 text-base leading-7 text-[#aeb8b0]">
          Sign in to manage tournaments, matches, teams, and player records.
        </p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block" htmlFor="email">
          <span className="mb-2 block text-sm font-semibold uppercase text-[#c7d0c9]">Email Address</span>
          <span className="flex items-center rounded-lg border border-[#38423d] bg-[#191d20] px-4 focus-within:border-[#9adca7] focus-within:shadow-[0_0_0_3px_rgba(154,220,167,0.16)]">
            <span className="mr-3 text-lg font-bold text-[#8e9990]" aria-hidden="true">@</span>
            <input
              autoComplete="username"
              className="min-h-14 w-full bg-transparent text-base text-[#f4f7f5] outline-none placeholder:text-[#7e8780]"
              id="email"
              name="email"
              onChange={updateField}
              placeholder="admin@boundaryline.com"
              type="email"
              value={formState.email}
            />
          </span>
        </label>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label className="text-sm font-semibold uppercase text-[#c7d0c9]" htmlFor="password">
              Password
            </label>
            <button
              className="cursor-not-allowed bg-transparent p-0 text-sm font-semibold text-[#9adca7]/70"
              disabled
              type="button"
            >
              Forgot password?
            </button>
          </div>
          <span className="flex items-center rounded-lg border border-[#38423d] bg-[#191d20] px-4 focus-within:border-[#9adca7] focus-within:shadow-[0_0_0_3px_rgba(154,220,167,0.16)]">
            <span className="mr-3 text-lg font-bold text-[#8e9990]" aria-hidden="true">#</span>
            <input
              autoComplete="current-password"
              className="min-h-14 w-full bg-transparent text-base text-[#f4f7f5] outline-none placeholder:text-[#7e8780]"
              id="password"
              name="password"
              onChange={updateField}
              placeholder="Enter password"
              type="password"
              value={formState.password}
            />
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-[#cbd4cd]" htmlFor="remember">
            <input
              checked={formState.remember}
              className="h-4 w-4 rounded border-[#56615a] bg-[#191d20] accent-[#9adca7]"
              id="remember"
              name="remember"
              onChange={updateField}
              type="checkbox"
            />
            Remember me for 30 days
          </label>
        </div>

        <button
          className="min-h-14 w-full rounded-lg bg-[#075f32] px-5 text-lg font-extrabold text-[#d8f6df] transition hover:bg-[#08713b] focus:outline-none focus:ring-4 focus:ring-[#9adca7]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>

        {message && (
          <p className="rounded-lg border border-[#39443d] bg-[#151a1d] px-4 py-3 text-sm text-[#cbd4cd]" role="status">
            {message}
          </p>
        )}
      </form>
      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-[#343b37]" />
        <span className="text-sm font-semibold uppercase text-[#a3aca5]">Or continue with</span>
        <span className="h-px flex-1 bg-[#343b37]" />
      </div>

      <button
        className="min-h-12 w-full rounded-lg border border-[#38423d] bg-[#171b1e] px-4 text-base font-semibold text-[#eef2ef] transition hover:border-[#9adca7] hover:bg-[#1d2225] focus:outline-none focus:ring-4 focus:ring-[#9adca7]/20"
        onClick={handleGoogleLogin}
        type="button"
      >
        <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded bg-[#eef2ef] text-sm font-extrabold text-[#151719]">
          G
        </span>
        Continue with Google
      </button>

      <p className="mt-8 text-center text-base text-[#cbd4cd]">
        Need an admin account?{' '}
        <button
          className="cursor-not-allowed bg-transparent p-0 font-bold text-[#9adca7]/70 underline underline-offset-4"
          disabled
          type="button"
        >
          Request access
        </button>
      </p>
    </div>
  )
}

export default AdminLoginForm
