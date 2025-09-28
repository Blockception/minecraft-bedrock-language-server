using System;
using System.Collections.Generic;

namespace Scraper;

public static partial class IdentifierExtension {
    public static List<String> DuplicateWithoutNamespace(this List<String> items) {
        var result = new List<String>(items.Count * 2);
        result.AddRange(items);

        foreach (String item in items) {
            if (item.StartsWith("minecraft:")) {
                result.Add(item[10..]);
            }
        }

        return result;
    }
}
