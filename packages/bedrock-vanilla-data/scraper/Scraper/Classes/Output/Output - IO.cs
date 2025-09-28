using System;
using System.IO;

namespace Scraper;
public partial class Output {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    /// <returns></returns>
    public static Output Load(String Folder) {
        var Out = new Output {
            Edu = OutputSet.Load(Path.Join(Folder, "Edu")),
            Vanilla = OutputSet.Load(Path.Join(Folder, "Vanilla"))
        };

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    public void Save(String Folder) {
        this.Edu.Save(Path.Join(Folder, "Edu"));
        this.Vanilla.Save(Path.Join(Folder, "Vanilla"));

        this.General.Save(Path.Join(Folder, "General"));
    }
}
