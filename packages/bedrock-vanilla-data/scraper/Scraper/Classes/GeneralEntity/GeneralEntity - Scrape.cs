using System;

namespace Scraper;
public partial class GeneralEntity {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Data"></param>
    public void Scrape(BP.Container Data) {
        foreach (BP.Entity Entity in Data.Entities) {
            foreach (String Event in Entity.Events) {
                if (!this.Events.Contains(Event)) {
                    this.Events.Add(Event);
                }
            }

            foreach (String Family in Entity.Families) {
                if (!this.Families.Contains(Family)) {
                    this.Families.Add(Family);
                }
            }
        }
    }

    public void Clean() {
        this.Events.Sort(Sort.String);
        this.Families.Sort(Sort.String);
    }
}
