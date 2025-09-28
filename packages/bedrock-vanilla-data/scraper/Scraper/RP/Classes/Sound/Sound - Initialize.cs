using System;
using System.Text.Json.Serialization;
using Scraper.Converters;

namespace Scraper.RP;
public class SoundConverter : IDToStringConverter<Sound> { }

///DOLATER <summary>add description for class: Model</summary>
[JsonConverter(typeof(SoundConverter))]
public partial class Sound {
    /// <summary>Creates a new instance of <see cref="Sound"/></summary>
    public Sound() {
        this.ID = String.Empty;
    }
}
