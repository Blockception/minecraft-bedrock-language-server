using System;
using System.IO;

namespace Scraper;
public partial class OutputSet {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    /// <returns></returns>
    public static OutputSet Load(String Folder) {
        var Out = new OutputSet {
            BehaviorPack = BP.Container.Load(Path.Join(Folder, "BehaviorPack")),
            ResourcePack = RP.Container.Load(Path.Join(Folder, "ResourcePack"))
        };

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    public void Save(String Folder) {
        this.BehaviorPack.Save(Path.Join(Folder, "BehaviorPack"));
        this.ResourcePack.Save(Path.Join(Folder, "ResourcePack"));
    }
}
