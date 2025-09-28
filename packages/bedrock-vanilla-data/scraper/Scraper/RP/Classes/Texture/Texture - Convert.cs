using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper.RP;
public partial class Texture {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Pack"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String Pack, List<Texture> Receiver) {
        String Textures = Path.Join(Pack, "textures");

        Convert(Directory.GetFiles(Textures, "*.png", SearchOption.AllDirectories), Receiver);
        Convert(Directory.GetFiles(Textures, "*.tga", SearchOption.AllDirectories), Receiver);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Files"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String[] Files, List<Texture> Receiver) {
        foreach (String Filepath in Files) {
            Int32 Index = Filepath.IndexOf("textures");

            if (Index >= 0) {
                String Ext = Path.GetExtension(Filepath);
                String ID = Filepath[Index..(Filepath.Length - Ext.Length)].Replace('\\', '/');

                if (!String.IsNullOrEmpty(ID)) {
                    var Item = new Texture() {
                        ID = ID
                    };

                    Receiver.Add(Item);
                }
            }
        }
    }
}
