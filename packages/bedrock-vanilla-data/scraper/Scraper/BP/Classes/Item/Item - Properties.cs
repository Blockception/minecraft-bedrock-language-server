using System;
using System.Text.Json.Serialization;

namespace Scraper.BP;
public partial class Item : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("max_damage")]
    public Int32 MaxDamage { get; set; }
}
