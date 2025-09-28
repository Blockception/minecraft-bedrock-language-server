using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json.Serialization;

namespace Scraper;
///DOLATER <summary>add description for class: FormatVersions</summary>
public partial class FormatVersions {
    public static void GetVersions(Context context, String output) {
        String filepath = Path.Join(context.GithubFolder, "version.json");

        if (!File.Exists(filepath)) return;
        // json is a dictionary of version to FormatVersion
        // e.g. "1.16.100": { "version": "1.16.100" }
        Dictionary<String, FormatVersion> versions = Json.Load<Dictionary<String, FormatVersion>>(filepath);

        FormatVersion latest = versions["latest"];
        versions.Remove("latest");

        var result = new OutputFormatVersion(latest.Version) {
            Versions = new List<String>(versions.Keys)
        };

        Typescript.Save("FormatVersionData", "./General", "Versions", result, Path.Join(output, "versions.ts"));
    }
}

public class FormatVersion {
    [JsonPropertyName("version")]
    public String Version { get; set; }
}

internal class OutputFormatVersion {
    [JsonPropertyName("latest")]
    public String Latest { get; set; }

    [JsonPropertyName("versions")]
    public List<String> Versions { get; set; }

    public OutputFormatVersion(String latest) {
        this.Latest = latest;
        this.Versions = [];
    }
}