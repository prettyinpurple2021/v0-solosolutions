import { execSync } from "node:child_process"
import { existsSync, rmSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(process.cwd())
process.chdir(root)

const filesToRestore = [
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

const filesToDelete = ["components/liquid-blob.tsx", "components/reveal.tsx"]

let ref = "origin/main"
try {
  execSync(`git rev-parse --verify ${ref}`, { stdio: "pipe" })
} catch {
  try {
    execSync(`git fetch origin main --depth=1`, { stdio: "inherit" })
  } catch (e) {
    console.log("[v0] fetch failed, trying main:", e.message)
    ref = "main"
  }
}

console.log(`[v0] Restoring files from ${ref}`)
for (const f of filesToRestore) {
  try {
    execSync(`git checkout ${ref} -- "${f}"`, { stdio: "inherit" })
    console.log(`[v0] restored ${f}`)
  } catch (e) {
    console.log(`[v0] failed to restore ${f}:`, e.message)
  }
}

for (const f of filesToDelete) {
  const full = resolve(root, f)
  if (existsSync(full)) {
    rmSync(full, { force: true })
    console.log(`[v0] deleted ${f}`)
  }
}

console.log("[v0] Revert complete.")
