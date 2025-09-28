git add .
git commit
npx prettier --write "src/**/*.json" --config ./scripts/json.prettierrc.json
git add **/*.json
git commit -m "auto: Formatted json files"
npx prettier --write "src/**/*.ts" --config ./scripts/typescript.prettierrc.json
git add **/*.ts
git commit -m "auto: Formatted typescript files"