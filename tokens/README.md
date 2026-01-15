# Design Tokens (Tokens Studio Sync)

This folder is synced with Figma via **Tokens Studio for Figma**.

## Setup for Designers

### 1. Install Tokens Studio
- Figma → Plugins → "Tokens Studio for Figma" → Install

### 2. Generate GitHub Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with permissions:
   - `repo` (full control)
3. Copy the token

### 3. Configure sync in Tokens Studio
1. Open Tokens Studio in Figma
2. Settings (⚙️) → Add new → **GitHub**
3. Fill in:
   - **Name**: `pawaBlox`
   - **Personal Access Token**: (paste token from step 2)
   - **Repository**: `YOUR-ORG/pawablox`
   - **Branch**: `main`
   - **File Path**: `tokens/tokens.json`
   - **baseUrl**: (leave empty)
4. Save

### 4. Workflow

**Pull tokens:**
- Tokens Studio → Pull from GitHub

**Push changes:**
- Tokens Studio → Push to GitHub

## What happens after Push?

1. GitHub Actions detects change in `tokens/`
2. Runs `bun scripts/tokens/app.mjs`
3. Generates SCSS files in `packages/tokens/scss/vars/`
4. **Creates Pull Request** `🎨 Update Design Tokens`
5. Developer reviews and merges PR

## Token format

Tokens Studio uses W3C DTCG format:

```json
{
  "colors": {
    "primary": {
      "$value": "#9ce800",
      "$type": "color"
    }
  },
  "spacing": {
    "sm": {
      "$value": "8",
      "$type": "number"
    }
  }
}
```
