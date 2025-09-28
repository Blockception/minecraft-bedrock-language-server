using System;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class Fog : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }
}
