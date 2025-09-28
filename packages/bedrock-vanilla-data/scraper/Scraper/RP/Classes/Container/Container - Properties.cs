using System;
using System.Collections.Generic;

namespace Scraper.RP;
public partial class Container {
    public List<AnimationController> AnimationControllers { get; set; }
    public List<Animation> Animations { get; set; }
    public List<Entity> Entities { get; set; }
    public List<Fog> Fogs { get; set; }
    public List<Material> Materials { get; set; }
    public List<Model> Models { get; set; }
    public List<Particle> Particles { get; set; }
    public List<RenderController> RenderControllers { get; set; }
    public List<Sound> Sounds { get; set; }
    public List<Texture> Textures { get; set; }
    public List<TextureAtlas> TextureItems { get; set; }
    public List<TextureAtlas> TextureTerrain { get; set; }
    public List<String> SoundFiles { get; set; }
}
