namespace Scraper.BP;

public partial class Biome {
    public override System.String ToString() {
        return $"{this.ID} [{System.String.Join(',', this.Tags)}]";
    }
}
