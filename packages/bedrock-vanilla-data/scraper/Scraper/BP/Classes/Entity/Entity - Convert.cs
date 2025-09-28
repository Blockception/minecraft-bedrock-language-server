using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.BP;
public partial class Entity {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Entity> Receiver) {
        JsonElement Root = Doc.RootElement;

        JsonElement Def = Root.GetProperty("minecraft:entity");
        String ID = Def.GetProperty("description").GetProperty("identifier").GetString();

        if (ID != null) {
            var Out = new Entity {
                ID = ID
            };

            Receiver.Add(Out);

            if (Def.TryGetProperty("events", out JsonElement Events)) {
                foreach (JsonProperty Property in Events.EnumerateObject()) {
                    Out.Events.Add(Property.Name);
                }
            }

            //Check components
            if (Def.TryGetProperty("components", out JsonElement Comps))
                CheckComponents(Comps, Out);

            if (Def.TryGetProperty("component_groups", out JsonElement Groups)) {
                foreach (JsonProperty Group in Groups.EnumerateObject()) {
                    CheckComponents(Group.Value, Out);
                }
            }
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Comps"></param>
    /// <param name="Receiver"></param>
    public static void CheckComponents(JsonElement Comps, Entity Receiver) {
        if (Comps.TryGetProperty("minecraft:type_family", out JsonElement families)) {
            if (families.TryGetProperty("family", out JsonElement farray)) {
                foreach (JsonElement F in farray.EnumerateArray()) {
                    String FStr = F.GetString();

                    if (!String.IsNullOrEmpty(FStr))
                        if (!Receiver.Families.Contains(FStr))
                            Receiver.Families.Add(FStr);
                }
            }
        }
    }
}
