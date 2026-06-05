import type { NextConfig } from "next";

const repoName = "my-profile";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
