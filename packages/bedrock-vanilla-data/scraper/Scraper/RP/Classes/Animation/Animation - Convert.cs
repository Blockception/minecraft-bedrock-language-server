using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.RP;
public partial class Animation {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Animation> Receiver) {
        JsonElement Root = Doc.RootElement;
        JsonElement container = Root.GetProperty("animations");

        foreach (JsonProperty anim in container.EnumerateObject()) {
            var Item = new Animation() {
                ID = anim.Name,
            };
            Receiver.Add(Item);

            if (anim.Value.TryGetProperty("bones", out JsonElement Bones)) {
                HarvestBones(Bones, Item.Bones);
            }
            if (anim.Value.TryGetProperty("sound_effects", out JsonElement sounds)) {
                HarvestAllEffects(sounds, Item.Sounds);
            }
            if (anim.Value.TryGetProperty("particle_effects", out JsonElement particles)) {
                HarvestAllEffects(particles, Item.Particles);
            }
        }
    }

    // Collect all the bone names
    internal static void HarvestBones(JsonElement root, List<String> Bones) {
        if (root.ValueKind != JsonValueKind.Object) {
            return;
        }

        foreach (JsonProperty Bone in root.EnumerateObject()) {
            Bones.AddOrSkip(Bone.Name);
        }
    }

    // Collects all defined effect: { "0.0": { "effect": "value" } } or { "0.0": [{ "effect": "value" }] }
    internal static void HarvestAllEffects(JsonElement root, List<String> effects) {
        if (root.ValueKind != JsonValueKind.Object) {
            return;
        }

        foreach (JsonProperty item in root.EnumerateObject()) {
            HarvestEffect(item.Value, effects);
        }
    }

    // Collect all the { "effect": "value" } or [{ "effect": "value" }]
    internal static void HarvestEffect(JsonElement root, List<String> effects) {
        if (root.ValueKind == JsonValueKind.Array) {
            foreach (JsonElement Bone in root.EnumerateArray()) {
                HarvestEffect(Bone, effects);
            }
            return;
        }

        if (root.TryGetProperty("effect", out JsonElement effect)) {
            if (effect.ValueKind != JsonValueKind.String && String.IsNullOrWhiteSpace(effect.GetString())) {
                return;
            }
            effects.AddOrSkip(effect.GetString());
        }
    }
}
