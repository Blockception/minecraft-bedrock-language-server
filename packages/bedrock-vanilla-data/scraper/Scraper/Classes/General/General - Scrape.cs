

namespace Scraper;
public partial class General {

    public void Scrape(Output output) {
        this.Scrape(output.Edu);
        this.Scrape(output.Vanilla);
    }

    public void Scrape(OutputSet output) {
        this.Scrape(output.BehaviorPack);
    }

    public void Scrape(BP.Container Data) {
        this.EntityData.Scrape(Data);
    }
}
