using System;
using System.Collections.Generic;

namespace Scraper;
public partial class General {
    public GeneralEntity EntityData { get; set; }
    public List<String> Biomes { get; internal set; }
    public List<String> CameraPresets { get; internal set; }
    public List<String> CooldownCategory { get; internal set; }
    public List<String> Dimensions { get; internal set; }
    public List<String> Effects { get; internal set; }
    public List<String> Enchantments { get; internal set; }
    public List<String> PotionEffects { get; internal set; }
    public List<String> PotionModifiers { get; internal set; }
    public List<String> PotionTypes { get; internal set; }
}
