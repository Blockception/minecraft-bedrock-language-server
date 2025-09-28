namespace Scraper;
public partial class OutputSet {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    /// <returns></returns>
    public void Clean() {
        this.BehaviorPack.Clean();
        this.ResourcePack.Clean();
    }
}
