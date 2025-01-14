import React from "react";
import { Detector } from "react-detect-offline";
import Image from "next/image";
import logo from "@/public/logo/logodesign no background.png";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

const CheckConnection = (props: any) => {
  return (
    <Detector
      render={({ online }) =>
        online ? (
          props.children
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center md:px-6 lg:px-8">
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center">
              <h1 className="text-3xl font-bold text-iDonate-green-primary dark:text-iDonate-green-secondary sm:text-4xl md:text-5xl lg:text-6xl">
                ជូនព័ត៌មានអំពីអ៊ិនធឺណិត
              </h1>
              <span className="mt-4 md:mt-0 md:ml-4 text-iDonate-green-primary dark:text-iDonate-green-secondary flex">
                <span className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                  <MdOutlineSignalWifiStatusbarConnectedNoInternet4 size={48} />
                </span>
              </span>
            </div>

            <p className="mt-2 text-base text-iDonate-navy-secondary dark:text-iDonate-navy-accent sm:text-lg md:mt-4 md:text-xl lg:text-2xl">
              សូមពិនិត្យមើលការតភ្ជាប់អ៊ិនធឺណិតរបស់អ្នក ហើយព្យាយាមម្តងទៀត។
            </p>

            <div className="flex items-center justify-center mt-6">
              <Image
                src={logo}
                alt="No Connection Icon"
                width={300}
                height={300}
                className="max-h-64 sm:max-h-72 md:max-h-80 lg:max-h-96"
              />
            </div>
          </div>
        )
      }
    />
  );
};

export default CheckConnection;
