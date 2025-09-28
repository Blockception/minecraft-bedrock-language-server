using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.RP;
public partial class Model {
    public static void Convert(JsonDocument Doc, List<Model> Receiver) {
        JsonElement Root = Doc.RootElement;

        foreach (JsonProperty property in Root.EnumerateObject()) {
            if (property.Name.StartsWith("geometry.")) {
                Convert180(property, Receiver);
            }
        }

        if (Root.TryGetProperty("minecraft:geometry", out JsonElement _)) {
            Convert(Root, Receiver);
        }
    }

    internal static void Convert180(JsonProperty Root, List<Model> Receiver) {
        JsonElement geo = Root.Value;
        String ID = Root.Name;

        Int32 Index = ID.IndexOf(":");

        if (Index >= 0) {
            ID = ID[..Index];
        }

        var Item = new Model {
            ID = ID
        };

        Receiver.Add(Item);

        if (geo.TryGetProperty("bones", out JsonElement Bones)) {
            HarvestBones(Bones, Item.Bones);
        }
    }

    internal static void Convert(JsonElement Root, List<Model> Receiver) {
        JsonElement Geos = Root.GetProperty("minecraft:geometry");

        foreach (JsonElement Geo in Geos.EnumerateArray()) {
            String Identifier = Geo.GetProperty("description").GetProperty("identifier").GetString();
            var Item = new Model {
                ID = Identifier
            };

            Receiver.Add(Item);

            if (Geo.TryGetProperty("bones", out JsonElement Bones)) {
                HarvestBones(Bones, Item.Bones);
            }
        }
    }

    internal static void HarvestBones(JsonElement Root, List<String> Bones) {
        if (Root.ValueKind != JsonValueKind.Array) {
            return;
        }

        foreach (JsonElement Bone in Root.EnumerateArray()) {
            if (Bone.TryGetProperty("name", out JsonElement Name)) {
                String n = Name.GetString();
                if (n is not null && !Bones.Contains(n)) {
                    Bones.Add(n);
                }
            }
        }
    }
}
