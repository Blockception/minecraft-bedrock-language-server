using System.Text.Json.Serialization;
using Scraper.Converters;

namespace Scraper.RP;
public class MaterialConverter : IDToStringConverter<Material> { }

///DOLATER <summary>add description for class: Fog</summary>
[JsonConverter(typeof(MaterialConverter))]
public partial class Material {
    /// <summary>Creates a new instance of <see cref="Material"/></summary>
    public Material() {
        //TODO Fill Constructor for class: Material
    }
}
