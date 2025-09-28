using System;
using System.IO;

namespace Scraper;
///DOLATER <summary>add description for class: Utility</summary>
public static partial class Utility {
    /// <summary>
    /// 
    /// </summary>
    public static readonly String WorkFolder = Path.Join(Environment.CurrentDirectory, "work");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String SourceFolder = FindFolder(WorkFolder, "src");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String OutputFolder = Path.Join(SourceFolder, "Lib");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String OutputEdu = Path.Join(OutputFolder, "Edu");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String OutputVanillia = Path.Join(OutputFolder, "Vanilla");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String BaseFolder = Path.Join(SourceFolder, "Base");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String BaseEdu = Path.Join(BaseFolder, "Edu");

    /// <summary>
    /// 
    /// </summary>
    public static readonly String BaseVanillia = Path.Join(BaseFolder, "Vanilla");

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Source"></param>
    /// <param name="Find"></param>
    /// <returns></returns>
    private static String FindFolder(String Source, String Find) {
        while (Source.Length >= 0) {
            String Item = Path.Join(Source, Find);
            if (Directory.Exists(Item)) {
                return Item;
            }

            Source = Directory.GetParent(Source).FullName;
        }

        throw new Exception();
    }
}
