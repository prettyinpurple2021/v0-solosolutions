import { execSync } from "node:child_process"
import { existsSync, rmSync } from "node:fs"
import { resolve } from "node:path"

const root = "/vercel/share/v0-project"
process.chdir(root)

const files = [
  "app/globals.css",
  "app/layout.tsx",
  "app/page.tsx",
  "components/hero-section.tsx",
  "components/navbar.tsx",
  "components/ecosystem-section.tsx",
  "components/features-section.tsx",
  "components/cta-section.tsx",
  "components/footer.tsx",
  "components/animated-background.tsx",
  "components/brand-page-layout.tsx",
]

function run(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString().trim()
}

console.log("Fetching origin/main...")
run("git fetch origin main")

for (const f of files) {
  try {
    run(`git cat-file -e origin/main:${f}`)
    run(`git checkout origin/main -- ${f}`)
    console.log(`Restored: ${f}`)
  } catch {
    console.log(`Skipped (not in origin/main): ${f}`)
  }
}

for (const f of ["components/liquid-blob.tsx", "components/reveal.tsx"]) {
  const p = resolve(root, f)
  if (existsSync(p)) {
    rmSync(p)
    console.log(`Deleted: ${f}`)
  }
}

console.log("Done.")
