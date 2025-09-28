using System;
using System.Collections.Generic;

namespace Scraper.BP;
public partial class LootTable {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Filepath"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String Filepath, List<LootTable> Receiver) {
        Int32 Index = Filepath.IndexOf("loot_tables");

        if (Index >= 0) {
            String ID = Filepath[Index..(Filepath.Length)].Replace('\\', '/');

            Receiver.Add(new LootTable(ID));
        }
    }
}
