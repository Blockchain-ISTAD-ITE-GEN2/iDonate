'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAppDispatch } from '@/redux/hooks';
import { setForgotToken, setEmail } from '@/redux/features/auth/authSlice';
import { z } from 'zod';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

// Define the validation schema using Zod
const validationSchema = z.object({
  email: z.string()
    .min(1, '* Email is required')
    .email('* Email is invalid'),
});

// Define the initial values for the form
const initialValues = {
  email: '',
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.token) {
          dispatch(setForgotToken(data.token));
          dispatch(setEmail(values.email));
          setSuccess(true);
          toast.success('Password reset link sent to your email!', {
            duration: 2000,
            position: 'top-center',
          });
          setTimeout(() => router.push('/reset-password'), 2000);
        }
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to send reset link. Please try again.');
        toast.error(errorData.message || 'Failed to send reset link.', {
          duration: 2000,
          position: 'top-center',
        });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred.', {
        duration: 2000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Formik form handling
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      const result = validationSchema.safeParse(values);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
         issue.message && (errors[issue.path[0]] = issue.message);
        });
      }
      return errors;
    },
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl font-semibold text-iDonate-navy-primary text-center">
          ភ្លេចពាក្យសម្ងាត់របស់អ្នកឬ
        </CardTitle>
        <CardDescription className="text-center text-iDonate-navy-secondary">
          បញ្ចូលអាស័យដ្ឋានអ៉ីមែលរបស់អ្នកហើយយើងនឹងផ្ញើលីងដើម្បីអោយអ្នកកំណត់ពាក្យសម្ងាត់របស់អ្នក
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription className="text-iDonate-navy-primary">
                ប្រសិនបើគណនីរបស់អ្នកមានស្រាប់{' '}
                <span className="font-semibold text-iDonate-green-primary">{formik.values.email}</span> យើងនឹងផ្ញើលីងក្នុងការកំណត់ពាក្យសម្ងាត់ទៅកាន់គណនីនោះ
              </AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full bg-iDonate-navy-primary hover:bg-iDonate-navy-secondary"
            disabled={isLoading}
          >
            {isLoading ? 'កំពុងផ្ញើរ...' : 'កំណត់ពាក្យសម្ងាត់ឡើងវិញ'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-iDonate-green-primary hover:underline"
            onClick={() => router.push('/login')}
          >
            ត្រឡប់ទៅកាន់ការចូលប្រើគណនី
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}