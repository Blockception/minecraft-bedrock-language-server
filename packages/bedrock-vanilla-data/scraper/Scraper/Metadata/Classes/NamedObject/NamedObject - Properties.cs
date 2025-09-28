using System.Text.Json.Serialization;

namespace Scraper.Metadata;

public partial class NamedObject : INamed, IIdentifier {
    [JsonPropertyName("name")]
    public System.String Name { get; set; }

    [JsonIgnore]
    public System.String ID { get => this.Name; set => this.Name = value; }
}
