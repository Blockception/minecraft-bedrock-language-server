# Mcattributes

This file stores any of the settings/attributes related to the project. If no attributes are specified, the plugin will fall back onto plugin settings.

**Example**

```ini
diagnostic.enable=true
diagnostic.objective=true
diagnostic.tags=true
diagnostic.mcfunction=true
```

## Settings

This vscode plugin responds to the following settings/attributes:

| Attribute                       | Description                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------ |
| `education.enable`              | Disable or enable education edition for this project                           |
| `diagnostic.enable`             | Disable or enable diagnostics for this project                                 |
| `diagnostic.json`               | Disable or enable diagnostics for json in this project                         |
| `diagnostic.lang`               | Disable or enable diagnostics for language in this project                     |
| `diagnostic.mcfunction`         | Disable or enable diagnostics for mcfunction in this project                   |
| `diagnostic.<extension>`        | Disable or enable diagnostics for **any** file extension (e.g. `diagnostic.templ=false`, `diagnostic.modl=false`), not just the extensions listed above. The extension is taken from the actual filename on disk, including its Molang checks. |
| `diagnostic.objective`          | Disable or enable diagnostics for objectives in this project                   |
| `diagnostic.tags`               | Disable or enable diagnostics for tags in this project                         |
| `diagnostic.disable.<code>`     | Set to `true` to disable a specific diagnostic code project-wide (e.g. `diagnostic.disable.behaviorpack.entity.missing=true`) |
| `completion.json`               | Disable or enable JSON completion in this project                              |
| `completion.lang.comments`      | Disable or enable lang file comment completion in this project                 |
| `completion.lang.dynamic`       | Disable or enable dynamic lang file completion in this project                 |

## Disabling diagnostics (including Molang) for templating file extensions

Templating tools (e.g. [JSONte](https://github.com/stirante/jsonte)) often use their own extensions such as `.templ` or `.modl` for source files that still contain Molang-looking strings. Since file-type detection is based on the containing folder (e.g. `entities/`) rather than the extension, these files are otherwise diagnosed just like a regular `.json` file, including Molang validation.

To turn off **all** diagnostics (Molang included) for such an extension project-wide, add it to `.mcattributes`:

```ini
diagnostic.templ=false
diagnostic.modl=false
```

If you only want to exclude specific files or folders instead of a whole extension, use path/glob patterns in [`.mcignore`](MCIgnore.md) — ignored files are skipped by diagnostics entirely.
