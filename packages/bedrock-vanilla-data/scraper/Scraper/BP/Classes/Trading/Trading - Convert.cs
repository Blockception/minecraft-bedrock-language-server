using System;
using System.Collections.Generic;

namespace Scraper.BP;
public partial class Trading {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Filepath"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String Filepath, List<Trading> Receiver) {
        Int32 Index = Filepath.IndexOf("trading");

        if (Index >= 0) {
            String ID = Filepath[Index..(Filepath.Length)].Replace('\\', '/');

            Receiver.Add(new Trading(ID));
        }
    }
}
