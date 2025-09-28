using System;
using System.Collections.Generic;

namespace Scraper.RP;
///DOLATER <summary>add description for class: Scraper</summary>
public static partial class Scraper {
    public static readonly Action<String, List<Material>> Materials = Material.Convert;
    public static readonly Action<String, List<Sound>, List<String>> Sounds = Sound.Convert;
    public static readonly Action<String, List<Texture>> Textures = Texture.Convert;
    public static readonly Action<String, List<TextureAtlas>> TextureItems = TextureAtlas.Convert;
    public static readonly Action<String, List<TextureAtlas>> TextureTerrain = TextureAtlas.Convert;
    public static readonly ConvertJson<Animation> Animations = Animation.Convert;
    public static readonly ConvertJson<AnimationController> AnimationControllers = AnimationController.Convert;
    public static readonly ConvertJson<Entity> Entities = Entity.Convert;
    public static readonly ConvertJson<Fog> Fogs = Fog.Convert;
    public static readonly ConvertJson<Model> Models = Model.Convert;
    public static readonly ConvertJson<Particle> Particles = Particle.Convert;
    public static readonly ConvertJson<RenderController> RenderControllers = RenderController.Convert;
}
