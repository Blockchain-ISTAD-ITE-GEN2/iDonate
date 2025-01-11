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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
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
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Be careful with this in production
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
      {
        // General routes
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://34.142.164.66:9999',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Authorization,Content-Type',
          },
        ],
      },
    ];
  },
  // Add rewrite for API calls
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://34.142.164.66:9999/api/v1/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:8080' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  }
};

export default nextConfig;