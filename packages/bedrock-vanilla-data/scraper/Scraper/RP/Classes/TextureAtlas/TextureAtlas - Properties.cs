using System;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class TextureAtlas : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }
}
