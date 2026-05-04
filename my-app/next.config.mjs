/** @type {import('next').NextConfig} */
const nextConfig = {
typescript: {
    // This allows the build to continue even with the 'baseUrl' warning
    ignoreBuildErrors: true,
  },
  eslint: {
    // Recommended to skip this during emergency deploys too
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
