/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "asset.3f7a7e1b4e84b05d7069019ba14e187f.r2.cloudflarestorage.com"
            }
        ]
    }
};

export default nextConfig;
