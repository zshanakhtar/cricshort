/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
// Add image domain configuration to allow the specified hostname
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scores.iplt20.com",
      },
    ],
  },
};

export default config;
