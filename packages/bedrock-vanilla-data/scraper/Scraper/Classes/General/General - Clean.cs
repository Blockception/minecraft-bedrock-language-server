namespace Scraper;

public partial class General {
    public void Clean() {
        this.EntityData.Clean();
        this.Biomes = this.Biomes.Clean();
        this.CameraPresets = this.CameraPresets.Clean();
        this.CooldownCategory = this.CooldownCategory.Clean();
        this.Dimensions = this.Dimensions.Clean();
        this.Effects = this.Effects.DuplicateWithoutNamespace().Clean();
        this.Enchantments = this.Enchantments.Clean();
        this.PotionEffects = this.PotionEffects.DuplicateWithoutNamespace().Clean();
        this.PotionModifiers = this.PotionModifiers.Clean();
        this.PotionTypes = this.PotionTypes.Clean();
    }
}