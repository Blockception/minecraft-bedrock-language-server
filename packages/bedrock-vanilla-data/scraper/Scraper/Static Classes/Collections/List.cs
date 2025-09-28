using System;
using System.Collections.Generic;

namespace Scraper;
public static class ListExtensions {
    /// <summary>
    /// Add the given item to the list, but not if its already there
    /// </summary>
    /// <param name="items"></param>
    /// <param name="add"></param>
    public static void AddOrSkip(this List<String> items, String add) {
        if (items.Contains(add)) {
            return;
        }
        items.Add(add);
    }
}