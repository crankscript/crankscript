#!/bin/bash

set -euo pipefail

echo "🔄 Pulling latest main..."
git checkout main
git pull origin main

echo "🌿 Switching to stable..."
git checkout stable
git pull origin stable

echo "🔁 Fast-forward merging main into stable..."
git merge --ff-only main

echo "🚀 Pushing stable..."
git push origin stable

echo "✅ Done!"
