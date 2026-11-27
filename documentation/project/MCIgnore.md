# MCIgnore

Based upon `.gitignore`. This file specifies through glob-patterns what files, folder to excluded from the project

**Example**

```ini
## This is a comment
## this will ignore the folders/file called Template
Template

## This will included file/folders that are in a folder called template and have the name and extension: settings.json
!Template/settings.json

## Ignore any file in any folder with the template.json spec
**/*.template.json
```

Files matching an `.mcignore` pattern are skipped by diagnostics entirely (Molang included), so this is also the way to exclude templating sources (e.g. [JSONte](https://github.com/stirante/jsonte) `.templ`/`.modl` files) from being checked as if they were regular project files:

```ini
*.templ
*.modl
packs/data/jsonte/*.json
```

See [`.mcattributes`](MCAttributes.md) for disabling diagnostics by file extension instead of by path pattern.
