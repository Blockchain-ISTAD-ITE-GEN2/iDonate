import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function WaitingForVerification() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-iDonate-navy-primary mb-4">កំពុងដំណើរការផ្ទៀងផ្ទាត់</h1>
        <div className="text-iDonate-navy-secondary mb-6">
          <p className="mb-4 text-9xl">🙏</p>
          <p className="mb-4">សូមអរគុណសម្រាប់ការចុះឈ្មោះជាមួយ iDonate Platform។ គណនីរបស់អ្នកកំពុងរង់ចាំការផ្ទៀងផ្ទាត់ពីអ្នកគ្រប់គ្រងរបស់យើង។</p>
          <p>សូមអត់ធ្មត់ព្រោះដំណើរការនេះអាចចំណាយពេលបន្តិច។ យើងនឹងជូនដំណឹងដល់អ្នកនៅពេលគណនីរបស់អ្នកត្រូវបានផ្ទៀងផ្ទាត់។</p>
        </div>
        {/* <div className="flex justify-center mb-6">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div> */}
        <div className="text-sm text-iDonate-navy-secondary">
          <p>ប្រសិនបើអ្នកមានសំណួរ សូមទាក់ទងក្រុមគាំទ្ររបស់យើង។</p>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block bg-iDonate-navy-primary hover:bg-iDonate-navy-secondary text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          ត្រឡប់ទៅទំព័រដើម
        </Link>
      </div>
    </div>
  )
}

