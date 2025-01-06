import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

