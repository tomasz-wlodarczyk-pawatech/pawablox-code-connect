# pawaBlox - Figma Token Export Plugin

Plugin do eksportu zmiennych (Variables) z Figma do JSON.

## Instalacja w Figma

1. Otwórz Figma Desktop
2. Idź do **Plugins** → **Development** → **Import plugin from manifest...**
3. Wybierz plik `manifest.json` z tego folderu

## Użycie

1. Otwórz plik Figma z design systemem
2. Uruchom plugin: **Plugins** → **Development** → **pawaBlox - Export Variables to JSON**
3. Skopiuj zawartość z pola **Variables**
4. Wklej do `scripts/tokens/cache/tokens.json`
5. Skopiuj zawartość z pola **Styles**
6. Wklej do `scripts/tokens/cache/styles.json`
7. Uruchom: `bun --env-file=.env scripts/tokens/app.mjs --skip-api`

## Format wyjściowy

Plugin generuje JSON zgodny z [W3C Design Tokens spec](https://github.com/design-tokens/community-group).

Przykład:
```json
{
  "@tailwindcss": {
    "spacing": {
      "0": { "$type": "number", "$value": 0 },
      "1": { "$type": "number", "$value": 4 },
      "2": { "$type": "number", "$value": 8 }
    }
  }
}
```
