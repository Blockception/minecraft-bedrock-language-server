using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Scraper.RP;
public partial class AnimationController {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<AnimationController> Receiver) {
        JsonElement Root = Doc.RootElement;
        JsonElement container = Root.GetProperty("animation_controllers");

        foreach (JsonProperty anim in container.EnumerateObject()) {
            var Item = new AnimationController() {
                ID = anim.Name
            };
            Receiver.Add(Item);

            if (anim.Value.TryGetProperty("states", out JsonElement states)) {
                HarvestStates(states, Item);
            }
        }
    }

    internal static void HarvestStates(JsonElement states, AnimationController receiver) {
        if (states.ValueKind != JsonValueKind.Object) return;

        foreach (JsonProperty state in states.EnumerateObject()) {
            HarvestState(state.Value, receiver);
        }
    }

    internal static void HarvestState(JsonElement state, AnimationController receiver) {
        if (state.ValueKind != JsonValueKind.Object) return;

        if (state.TryGetProperty("animations", out JsonElement animations)) {
            HarvestConditionals(animations, receiver.Animations);
        }
        if (state.TryGetProperty("particle_effects", out JsonElement particlesEffects)) {
            HarvestConditionals(particlesEffects, receiver.Particles);
        }
        if (state.TryGetProperty("sound_effects", out JsonElement soundEffects)) {
            HarvestConditionals(soundEffects, receiver.Sounds);
        }
    }

    // Harvest keys from: [{ "<key>": "<value"> }, "<key>"]
    internal static void HarvestConditionals(JsonElement conditionals, List<String> keys) {
        switch (conditionals.ValueKind) {
            // [{ "<key>": "<value"> }, "<key>"]
            case JsonValueKind.Array:
                foreach (JsonElement item in conditionals.EnumerateArray()) {
                    HarvestConditionals(item, keys);
                }
                return;
            // { "<key>": "<value"> }
            case JsonValueKind.Object:
                JsonProperty key = conditionals.EnumerateObject().First();
                if (String.IsNullOrWhiteSpace(key.Name)) return;
                keys.AddOrSkip(key.Name);
                return;

            // "<key>"
            case JsonValueKind.String:
                String v = conditionals.GetString();
                if (String.IsNullOrWhiteSpace(v)) return;
                keys.AddOrSkip(v);
                return;
        }
    }
}
