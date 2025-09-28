using System;
using System.Text.Json.Serialization;

namespace Scraper;
///DOLATER <summary>add description for interface: IIdentifier</summary>
public interface IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }
}
