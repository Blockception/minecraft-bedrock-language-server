using System;

namespace Scraper.BP;
/// <summary>The class that represent the block data in behaviourpacksw</summary>
public partial class Block {
    /// <summary>Creates a new instance of <see cref="Block"/></summary>
    public Block() {
        this.ID = String.Empty;
        this.Properties = [];
    }
}
