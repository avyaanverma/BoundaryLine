import { BrandPanel } from '../../features/admin-login/components/BrandPanel'
import { LoginForm } from '../../features/admin-login/components/LoginForm'

export const AdminLoginPage = () => {
  return (
    <main className="min-h-screen bg-[#0d1012] text-[#eef2ef]">
      <section className="mx-auto flex min-h-screen w-full max-w-[1180px] items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid min-h-[690px] w-full overflow-hidden rounded-lg border border-[#29312d] bg-[#101315] shadow-[0_26px_80px_rgba(0,0,0,0.42)] md:grid-cols-[1.05fr_0.95fr]">
          <BrandPanel />
          <section className="flex items-center justify-center bg-[#0c0e10] px-5 py-10 sm:px-8 lg:px-14">
            <div className="w-full max-w-[440px]">
              <div className="mb-8 md:hidden">
                <p className="text-2xl font-bold text-[#9adca7]">BoundaryLine</p>
                <p className="mt-1 text-sm text-[#aeb8b0]">Admin Control Center</p>
              </div>
              <LoginForm />
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
