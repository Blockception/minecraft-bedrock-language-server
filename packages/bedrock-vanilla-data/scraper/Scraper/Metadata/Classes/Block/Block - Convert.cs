namespace Scraper.Metadata;

public partial class Block {
    public static BP.Block Convert(Block block) {
        return new BP.Block() {
            ID = block.Name,
            Properties = block.Properties.ConvertAll((item) => item.Name),
        };
    }
}
