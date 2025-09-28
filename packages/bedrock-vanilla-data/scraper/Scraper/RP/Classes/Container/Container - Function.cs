namespace Scraper.RP;
public partial class Container {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Excluded"></param>
    public void Clean() {
        this.AnimationControllers = this.AnimationControllers.Clean();
        this.Animations = this.Animations.Clean();
        this.Entities = this.Entities.Clean();
        this.Fogs = this.Fogs.Clean();
        this.Materials = this.Materials.Clean();
        this.Models = this.Models.Clean();
        this.Particles = this.Particles.Clean();
        this.RenderControllers = this.RenderControllers.Clean();
        this.Sounds = this.Sounds.Clean();
        this.Textures = this.Textures.Clean();
        this.TextureItems = this.TextureItems.Clean();
        this.TextureTerrain = this.TextureTerrain.Clean();
        this.SoundFiles.Sort();
    }
}
