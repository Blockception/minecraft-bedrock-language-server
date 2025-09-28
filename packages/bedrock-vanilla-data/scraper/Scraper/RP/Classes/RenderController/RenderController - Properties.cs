using System;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class RenderController : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }
}
