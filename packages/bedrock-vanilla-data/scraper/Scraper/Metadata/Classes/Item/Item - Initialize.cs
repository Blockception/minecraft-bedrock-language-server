using System;

namespace Scraper.Metadata;

public partial class Item {
    public Item() {
        this.CommandName = String.Empty;
        this.Name = String.Empty;
        this.RawID = 0;
        this.SerializationID = String.Empty;
        this.SerializationName = String.Empty;
    }
}