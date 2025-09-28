

using System;
using System.IO;

namespace Scraper;

public partial class General {


    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    public void Save(String Folder) {
        Typescript.Save("GeneralEntity", "./format", nameof(this.EntityData), this.EntityData, Path.Join(Folder, "entities.ts"));
        Typescript.SaveArray("string", null, nameof(this.Biomes), this.Biomes, Path.Join(Folder, "biomes.ts"));
        Typescript.SaveArray("string", null, nameof(this.CameraPresets), this.CameraPresets, Path.Join(Folder, "camera_presets.ts"));
        Typescript.SaveArray("string", null, nameof(this.CooldownCategory), this.CooldownCategory, Path.Join(Folder, "cooldown_category.ts"));
        Typescript.SaveArray("string", null, nameof(this.Dimensions), this.Dimensions, Path.Join(Folder, "dimensions.ts"));
        Typescript.SaveArray("string", null, nameof(this.Effects), this.Effects, Path.Join(Folder, "effects.ts"));
        Typescript.SaveArray("string", null, nameof(this.Enchantments), this.Enchantments, Path.Join(Folder, "enchantments.ts"));
        Typescript.SaveArray("string", null, nameof(this.PotionEffects), this.PotionEffects, Path.Join(Folder, "potion_effects.ts"));
        Typescript.SaveArray("string", null, nameof(this.PotionModifiers), this.PotionModifiers, Path.Join(Folder, "potion_modifiers.ts"));
        Typescript.SaveArray("string", null, nameof(this.PotionTypes), this.PotionTypes, Path.Join(Folder, "potion_types.ts"));
    }
}