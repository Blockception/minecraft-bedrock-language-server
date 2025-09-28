namespace Scraper.Metadata;

public partial class NamedObject {
    public static System.String Convert(NamedObject obj) {
        return obj.Name;
    }


    public static BP.Entity ConvertEntity(NamedObject obj) {
        return new BP.Entity() {
            ID = obj.ID,
        };
    }
}
