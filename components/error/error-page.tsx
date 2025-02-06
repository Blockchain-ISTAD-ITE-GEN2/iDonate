"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-iDonate-light-gray px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center bg-white shadow-lg rounded-2xl p-10 max-w-md"
      >
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">
          We encountered an unexpected error. Please try again or contact
          support.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.refresh()}
            className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-500"
          >
            Retry
          </button>
          <Link
            onClick={() => router.refresh()}
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
          >
            Go Home
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact support
          </a>
        </p>
      </motion.div>
    </main>
  );
};

export default ErrorPage;
