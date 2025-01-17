import Image from "next/image";
import Link from "next/link";
import React from "react";
import not_found from "@/public/images/404.png";

const NotFound = () => {
  return (
    <main className="flex flex-col flex-1 items-center justify-center p-9 gap-9">
      <div className="flex flex-col flex-1 items-center justify-center p-9 gap-6">
        <h1 className="text-heading-one-eng font-extrabold leading-tight text-iDonate-navy-primary ">
          Oops! Page Not Found
        </h1>

        <p className="text-medium-eng leading-6 text-iDonate-navy-secondary">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="relative w-full max-w-xl mx-auto h-auto">
          <Image
            src={not_found}
            alt="404 error illustration"
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-iDonate-green-secondary px-6 py-3 text-sm font-semibold text-iDonate-light-gray hover:bg-iDonate-green-primary shadow-light"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
