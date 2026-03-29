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
| `diagnostic.objective`          | Disable or enable diagnostics for objectives in this project                   |
| `diagnostic.tags`               | Disable or enable diagnostics for tags in this project                         |
| `diagnostic.disable.<code>`     | Set to `true` to disable a specific diagnostic code project-wide (e.g. `diagnostic.disable.behaviorpack.entity.missing=true`) |
| `completion.json`               | Disable or enable JSON completion in this project                              |
| `completion.lang.comments`      | Disable or enable lang file comment completion in this project                 |
| `completion.lang.dynamic`       | Disable or enable dynamic lang file completion in this project                 |
