using System;
using System.Text.Json.Serialization;

namespace Scraper.BP;
public partial class LootTable : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }
}
