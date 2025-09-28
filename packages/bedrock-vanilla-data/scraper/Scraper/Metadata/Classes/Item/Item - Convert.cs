using System.Collections.Generic;
using System.Linq;

namespace Scraper.Metadata;

public partial class Item {
    public static List<BP.Item> Convert(Item item) {
        var items = new List<BP.Item>()
        {
            new() {
                ID = item.Name,
            },
            new() {
                ID = item.CommandName,
            },
            new() {
                ID = item.SerializationName,
            },
        };

        return items.Distinct().ToList();
    }
}
