namespace Scraper;
public partial class Output {
    /// <summary>
    /// 
    /// </summary>
    public void Clean() {
        this.Edu.Clean();
        this.Vanilla.Clean();
        this.General.Clean();
    }

    /// <summary>
    /// 
    /// </summary>
    public void Prune() {
        //Remove edu entities from vanilla
        this.Edu.BehaviorPack.Entities.ForEach((entity) => {
            this.Vanilla.BehaviorPack.Entities.RemoveAll((x) => x.ID == entity.ID);
            this.Vanilla.ResourcePack.Entities.RemoveAll((x) => x.ID == entity.ID);
        });

        //Remove edu block from vanilla
        this.Edu.BehaviorPack.Blocks.ForEach((block) => {
            this.Vanilla.BehaviorPack.Blocks.RemoveAll((x) => x.ID == block.ID);
        });
    }
}
