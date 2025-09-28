using System;

namespace Scraper.Metadata;

public partial class Block {
    public Block() {
        this.Name = String.Empty;
        this.SerializationID = String.Empty;
        this.RawID = 0;
        this.Properties = [];
    }
}