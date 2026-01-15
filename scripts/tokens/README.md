# Token Generation Script

## Wymagane uprawnienia tokena Figma

Token musi mieć następujące uprawnienia:
- **File content** → Read-only access to variables (`file_variables:read`)

## Generowanie tokena

1. Idź do: https://www.figma.com/developers/api#access-tokens
2. Kliknij "Get personal access token"
3. Zaznacz uprawnienia:
   - ✅ File content - Read-only access to variables
4. Skopiuj token do `.env`

## Użycie

```bash
# Z .env
bun --env-file=.env scripts/tokens/app.mjs

# Lub bezpośrednio
FIGMA_ACCESS_TOKEN=xxx FIGMA_FILE_KEY=yyy bun scripts/tokens/app.mjs

# Użyj cache (bez API)
bun --env-file=.env scripts/tokens/app.mjs --skip-api
```

## Alternatywa: Eksport z pluginu

Jeśli nie masz dostępu do Variables REST API:

1. W Figma zainstaluj plugin "Variables Export" lub "Design Tokens"
2. Eksportuj zmienne do JSON
3. Zapisz jako `scripts/tokens/cache/variables.json`
4. Uruchom: `bun scripts/tokens/app.mjs --skip-api`
