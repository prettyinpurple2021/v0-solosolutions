import { execSync } from "child_process"
import { existsSync } from "fs"

console.log("[v0] Checking for node_modules...")

if (!existsSync("/vercel/share/v0-project/node_modules")) {
  console.log("[v0] node_modules not found, running pnpm install...")
  try {
    execSync("pnpm install", {
      cwd: "/vercel/share/v0-project",
      stdio: "inherit",
    })
    console.log("[v0] pnpm install complete!")
  } catch (e) {
    console.log("[v0] pnpm failed, trying npm install...")
    execSync("npm install", {
      cwd: "/vercel/share/v0-project",
      stdio: "inherit",
    })
    console.log("[v0] npm install complete!")
  }
} else {
  console.log("[v0] node_modules already exists, skipping install.")
}

// Verify next binary exists
if (existsSync("/vercel/share/v0-project/node_modules/.bin/next")) {
  console.log("[v0] next binary found at node_modules/.bin/next")
} else {
  console.log("[v0] ERROR: next binary still not found after install!")
}
