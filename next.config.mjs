// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//         pathname: "/**",
//       },
//       {
//         protocol: "http",
//         hostname: "**",
//         pathname: "/**",
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'Access-Control-Allow-Credentials',
//             value: 'true',
//           },
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: 'http://localhost:8080',
//           },
//           {
//             key: 'Access-Control-Allow-Methods',
//             value: 'GET,POST,PUT,DELETE,OPTIONS',
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value: 'Authorization,Content-Type',
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // upddate this for runtime
  env: {
    NEXT_PUBLIC_IDONATE_API_URL:
      process.env.NEXT_PUBLIC_IDONATE_API_URL || "http://localhost:3000",
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "idonateapi.kangtido.life",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Add specific route for API requests
        source: "/api/v1:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Be careful with this in production
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
      {
        // General routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://idonateapi.kangtido.life",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization,Content-Type",
          },
        ],
      },
    ];
  },
  // Add rewrite for API calls
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://idonateapi.kangtido.life/api/v1/:path*",
        // destination: `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/v1:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://idonateapi.kangtido.life",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
  // hide all the console when production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
