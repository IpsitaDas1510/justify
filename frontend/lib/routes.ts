// Optional base path for deployments under a subfolder (e.g., GitHub Pages).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Ensure links work both with and without a configured base path.
export function withBasePath(path: string) {
  if (!basePath) return path;
  if (path === "/") return basePath;
  return `${basePath}${path}`;
}