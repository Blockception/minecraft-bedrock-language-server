namespace Scraper.BP;

public partial class Block {
    public override System.String ToString() {
        return $"{this.ID} [{System.String.Join(',', this.Properties)}]";
    }
}
