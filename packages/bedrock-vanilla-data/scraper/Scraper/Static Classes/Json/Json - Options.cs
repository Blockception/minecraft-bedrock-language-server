using System;
using System.Text.Json;

namespace Scraper;
public static partial class Json {
    /// <summary>
    /// 
    /// </summary>
    public static JsonSerializerOptions ReadOptions = new() {
        AllowTrailingCommas = true,
        ReadCommentHandling = JsonCommentHandling.Skip
    };

    /// <summary>
    /// 
    /// </summary>
    public static JsonSerializerOptions WriteOptions = new() {
        WriteIndented = true,
        PropertyNamingPolicy = new snake_case(),
        AllowTrailingCommas = false
    };
}

public class snake_case : JsonNamingPolicy {

    /// <summary>
    /// 
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public override String ConvertName(String name) {
        Int32 Amount = 0;

        for (Int32 I = 0; I < name.Length; I++) {
            if (Char.IsUpper(name[I])) {
                Amount++;
            }
        }

        if (Amount == 0) { return name; }

        Char[] Out = new Char[name.Length + Amount];
        Int32 J = 0;

        for (Int32 I = 0; I < name.Length; I++) {
            Char C = name[I];

            if (Char.IsUpper(C)) {
                Out[J++] = '_';

                C = Char.ToLower(C);
            }

            Out[J++] = C;
        }

        return new String(Out);
    }
}
