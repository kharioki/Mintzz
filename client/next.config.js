/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: false,
//   experimental: {
//     concurrentFeatures: false,
//   },
// }

// module.exports = nextConfig

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
    };
    return config;
  },
};

// module.exports = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
//       config.resolve.fallback = {
//         fs: false,
//         crypto: false,
//         net: false,
//         assert: false,
//         stream: false,
//         http: false,
//         https: false,
//         os: false,
//       }
//     }

//     return config;
//   }
// }