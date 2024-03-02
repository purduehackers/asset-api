/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost"
            },
            {
                protocol: "https",
                hostname: "asset-api.vercel.app"
            }
        ]
    }
};

export default nextConfig;
