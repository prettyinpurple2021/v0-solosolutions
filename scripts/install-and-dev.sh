#!/bin/sh
cd /vercel/share/v0-project
pnpm install
exec pnpm run _dev
