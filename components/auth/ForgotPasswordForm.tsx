'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { requestPasswordReset } from '@/app/actions'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      await requestPasswordReset(email)
      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl font-semibold text-iDonate-navy-primary text-center"> ភ្លេចពាក្យសម្ងាត់របស់អ្នកឬ</CardTitle>
        <CardDescription className="text-center text-iDonate-navy-secondary">
          បញ្ចូលអាស័យដ្ឋានអ៉ីមែលរបស់អ្នកហើយយើងនឹងផ្ញើលីងដើម្បីអោយអ្នកកំណត់ពាក្យសម្ងាត់របស់អ្នក
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
          <label
                htmlFor="email"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1"
              >
                <Mail className="w-4 h-4 text-iDonate-navy-primary" />
                <span>
                  អ៉ីមែល <span className="text-red-500">*</span>
                </span>
              </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="បញ្ចូលអ៉ីមែលរបស់អ្នក"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription className='text-iDonate-navy-primary'>
                ប្រសិនបើគណនីរបស់អ្នកមានស្រាប់ <span className='font-semibold text-iDonate-green-primary'>{email} </span>យើងនឹងផ្ញើលីងក្នុងការកំណត់ពាក្យសម្ងាត់ទៅកាន់គណនីនោះ
              </AlertDescription>
            </Alert>
          )} 
          <Button type="submit" className="w-full bg-iDonate-navy-primary hover:bg-iDonate-navy-secondary " disabled={isLoading}>
            {isLoading ? 'កំពុងផ្ញើរ...' : 'កំណត់ពាក្យសម្ងាត់ឡើងវិញ'}
          </Button>
        </form>
        <div className="mt-4 text-center ">
          <Button variant="link" className='text-iDonate-green-primary hover:underline ' onClick={() => router.push('/auth/login')}>
            ត្រឡប់ទៅកាន់ការចូលប្រើគណនី
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

