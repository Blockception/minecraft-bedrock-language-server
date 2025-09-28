using System;
using System.Text.Json.Serialization;
using Scraper.Converters;

namespace Scraper.RP;
public class TextureConverter : IDToStringConverter<Texture> { }

///DOLATER <summary>add description for class: Model</summary>
[JsonConverter(typeof(TextureConverter))]
public partial class Texture {
    /// <summary>Creates a new instance of <see cref="Texture"/></summary>
    public Texture() {
        this.ID = String.Empty;
    }
}
