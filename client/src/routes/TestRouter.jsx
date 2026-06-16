import { AdminLoginPage } from '../pages/admin/AdminLoginPage'

const testRoutes = {
  '/': AdminLoginPage,
  '/admin/login': AdminLoginPage,
}

const getCurrentPath = () => {
  if (typeof window === 'undefined') {
    return '/'
  }

  return window.location.pathname
}

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d1012] px-5 text-[#eef2ef]">
      <section className="w-full max-w-md rounded-lg border border-[#29312d] bg-[#101315] p-8 text-center">
        <p className="text-sm font-semibold uppercase text-[#9adca7]">Test Router</p>
        <h1 className="mt-3 text-3xl font-extrabold">Route not found</h1>
        <p className="mt-3 text-[#aeb8b0]">
          Use the admin login test route while the full app router is still being built.
        </p>
        <a
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#075f32] px-5 font-bold text-[#d8f6df] hover:bg-[#08713b]"
          href="/admin/login"
        >
          Open Admin Login
        </a>
      </section>
    </main>
  )
}

export const ComingSoonPage = ()=>{
  return <h1>Coming Soon</h1>
}

export const TestRouter = () => {
  const CurrentPage = testRoutes[getCurrentPath()] ?? NotFoundPage

  return <CurrentPage />
}
