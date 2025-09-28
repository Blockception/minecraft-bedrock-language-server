using System;
using System.Text.Json.Serialization;
using Scraper.Converters;

namespace Scraper.RP;
public class ParticleConverter : IDToStringConverter<Particle> { }

///DOLATER <summary>add description for class: Model</summary>
[JsonConverter(typeof(ParticleConverter))]
public partial class Particle {
    /// <summary>Creates a new instance of <see cref="Particle"/></summary>
    public Particle() {
        this.ID = String.Empty;
    }
}
