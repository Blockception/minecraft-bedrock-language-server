using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper;
///DOLATER <summary>add description for class: Vanilla</summary>
public static partial class Vanilla {
    private static readonly String[] _Exclude = new String[] {
  "manifest.json",
  "behavior_trees",
  "contents.json"
};

    public static void GithubLinks(Context context, String OutputFolder) {
        String Folder = context.GithubFolder;
        String[] files = Directory.GetFiles(Folder, "*.json", SearchOption.AllDirectories);
        var items = new List<String>(files.Length);

        foreach (String file in files) {
            if (IsExcluded(file)) continue;

            String type = PackType(file);
            if (type == null) continue;

            //Transform filepath to github raw link
            //From: F:\Projects\Blockception\Software\bc-dev\BC-Minecraft-Bedrock-Vanilla-Data\scraper\Scraper\bin\x64\Debug\net6.0\work\Samples\bedrock-samples-main\behavior_pack\entities\allay.json
            //To: https://raw.githubusercontent.com/Mojang/bedrock-samples/main/behavior_pack/entities/allay.json

            String link = file.Replace(Folder, "").Replace("\\", "/");
            items.Add(link);
        }

        items.Sort();

        String filepath = Path.Join(OutputFolder, "Vanilla", "sources.ts");
        var Writer = new FileStream(filepath, FileMode.Create, FileAccess.ReadWrite);
        var TextWriter = new StreamWriter(Writer);

        TextWriter.WriteLine("export const GithubFiles = {");
        TextWriter.WriteLine("  source: \"https://raw.githubusercontent.com/Mojang/bedrock-samples/main/\",");
        TextWriter.WriteLine("  files: [");

        foreach (String link in items) {
            TextWriter.WriteLine($"    \"{link.TrimStart('/')}\",");
        }

        TextWriter.WriteLine("]};");
        TextWriter.Flush();

        Writer.Flush();
        Writer.Close();
    }

    public static Boolean IsExcluded(String path) {
        foreach (String exclude in _Exclude) {
            if (path.Contains(exclude)) {
                return true;
            }
        }

        return false;
    }

    public static String PackType(String path) {
        if (path.Contains("behavior_pack")) {
            return "behavior_pack";
        }

        if (path.Contains("resource_pack")) {
            return "resource_pack";
        }

        return null;
    }
}
