using System;
using System.Text.Json.Serialization;
using Scraper.Converters;

namespace Scraper.RP;
public class TextureAtlasConverter : IDToStringConverter<TextureAtlas> { }

///DOLATER <summary>add description for class: Model</summary>
[JsonConverter(typeof(TextureAtlasConverter))]
public partial class TextureAtlas {
    /// <summary>Creates a new instance of <see cref="TextureAtlas"/></summary>
    public TextureAtlas() {
        this.ID = String.Empty;
    }
}
