# Dynamic key completion

The extension can suggest existing translation keys as you type inside `.lang` files, making it easy to reference keys consistently across locales.

## Setting: `BC-MC.Completion.Lang.Dynamic`

| Setting | Type | Default |
|---|---|---|
| `BC-MC.Completion.Lang.Dynamic` | boolean | `true` |

When enabled (the default), the extension reads all keys already present in your pack's `.lang` files and offers them as IntelliSense completions. This helps you:

- Avoid typos when writing the same key in multiple locale files
- Discover keys that already exist in your pack
- Quickly copy an existing key as the basis for a new one

## Turning it on or off

1. Open **Settings** (`Ctrl+,` / `Cmd+,`)
2. Search for `BC-MC.Completion.Lang.Dynamic`
3. Check the box to enable, or uncheck to disable

Or add the following to your `settings.json`:

```json
{
  "BC-MC.Completion.Lang.Dynamic": true
}
```

## Related setting: `BC-MC.Completion.Lang.Comments`

Set `BC-MC.Completion.Lang.Comments` to `true` to enable completions for comment region markers (`## region` / `## endregion`), which helps keep large `.lang` files organised.
