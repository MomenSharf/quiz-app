// /** @type {import('next').NextConfig} */
// import dotenv from "dotenv";
// dotenv.config();

// const nextConfig = {
//   images: {
//     domains: [
//       "utfs.io",
//       "giphy.com",
//       "media.giphy.com",
//       "images.unsplash.com",
//       "is82n89kxs.ufs.sh",
//       "media.giphy.com",
//       "media0.giphy.com",
//       "media1.giphy.com",
//       "media2.giphy.com",
//       "media3.giphy.com",
//       "media4.giphy.com",
//     ],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//         port: "",
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "giphy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "is82n89kxs.ufs.sh",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media0.giphy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media1.giphy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media2.giphy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media3.giphy.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media4.giphy.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
