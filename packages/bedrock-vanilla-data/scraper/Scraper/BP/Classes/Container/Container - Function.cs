namespace Scraper.BP;

public partial class Container {
    public void Clean() {
        this.Blocks = this.Blocks.Clean();
        this.Entities = this.Entities.Clean();
        this.Features = this.Features.Clean();
        this.Items = this.Items.Clean();
        this.LootTables = this.LootTables.Clean();
        this.Trading = this.Trading.Clean();
    }
}
