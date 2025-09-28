using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper.RP;
public partial class Container {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    /// <returns></returns>
    public static Container Load(String Folder) {
        var Out = new Container {
            AnimationControllers = Json.LoadEnsure<List<AnimationController>>(Path.Join(Folder, "animation_controllers.json")),
            Animations = Json.LoadEnsure<List<Animation>>(Path.Join(Folder, "animations.json")),
            Entities = Json.LoadEnsure<List<Entity>>(Path.Join(Folder, "entities.json")),
            Fogs = Json.LoadEnsure<List<Fog>>(Path.Join(Folder, "fogs.json")),
            Materials = Json.LoadEnsure<List<Material>>(Path.Join(Folder, "materials.json")),
            Models = Json.LoadEnsure<List<Model>>(Path.Join(Folder, "models.json")),
            Particles = Json.LoadEnsure<List<Particle>>(Path.Join(Folder, "particles.json")),
            RenderControllers = Json.LoadEnsure<List<RenderController>>(Path.Join(Folder, "render_controllers.json")),
            Sounds = Json.LoadEnsure<List<Sound>>(Path.Join(Folder, "sounds.json")),
            TextureItems = Json.LoadEnsure<List<TextureAtlas>>(Path.Join(Folder, "texture-atlas-item.json")),
            Textures = Json.LoadEnsure<List<Texture>>(Path.Join(Folder, "textures.json")),
            TextureTerrain = Json.LoadEnsure<List<TextureAtlas>>(Path.Join(Folder, "texture-atlas-terrain.json")),
        };

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    public void Save(String Folder) {
        Directory.CreateDirectory(Folder);

        Typescript.SaveArray("Animation", "../../Types/ResourcePack/Animation", nameof(this.Animations), this.Animations, Path.Join(Folder, "animations.ts"));
        Typescript.SaveArray("AnimationController", "../../Types/ResourcePack/AnimationController", nameof(this.AnimationControllers), this.AnimationControllers, Path.Join(Folder, "animation_controllers.ts"));
        Typescript.SaveArray("Entity", "../../Types/ResourcePack/Entity", nameof(this.Entities), this.Entities, Path.Join(Folder, "entities.ts"));
        Typescript.SaveArray("Model", "../../Types/ResourcePack/Model", nameof(this.Models), this.Models, Path.Join(Folder, "models.ts"));
        Typescript.SaveArray("string", null, nameof(this.Fogs), this.Fogs, Path.Join(Folder, "fogs.ts"));
        Typescript.SaveArray("string", null, nameof(this.Materials), this.Materials, Path.Join(Folder, "materials.ts"));
        Typescript.SaveArray("string", null, nameof(this.Particles), this.Particles, Path.Join(Folder, "particles.ts"));
        Typescript.SaveArray("string", null, nameof(this.RenderControllers), this.RenderControllers, Path.Join(Folder, "render_controllers.ts"));
        Typescript.SaveArray("string", null, nameof(this.SoundFiles), this.SoundFiles, Path.Join(Folder, "sounds_files.ts"));
        Typescript.SaveArray("string", null, nameof(this.Sounds), this.Sounds, Path.Join(Folder, "sounds.ts"));
        Typescript.SaveArray("string", null, nameof(this.TextureItems), this.TextureItems, Path.Join(Folder, "texture-atlas-item.ts"));
        Typescript.SaveArray("string", null, nameof(this.Textures), this.Textures, Path.Join(Folder, "textures.ts"));
        Typescript.SaveArray("string", null, nameof(this.TextureTerrain), this.TextureTerrain, Path.Join(Folder, "texture-atlas-terrain.ts"));
    }
}
