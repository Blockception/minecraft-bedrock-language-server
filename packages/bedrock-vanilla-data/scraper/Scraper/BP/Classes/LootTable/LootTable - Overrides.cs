using System;
using System.Collections.Generic;

namespace Scraper.BP;
public partial class LootTable : IEquatable<LootTable> {
    public override Boolean Equals(Object obj) {
        return this.Equals(obj as LootTable);
    }

    public Boolean Equals(LootTable other) {
        return other != null &&
               this.ID == other.ID;
    }

    public override Int32 GetHashCode() {
        return HashCode.Combine(this.ID);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public override String ToString() {
        return this.ID;
    }

    public static Boolean operator ==(LootTable left, LootTable right) {
        return EqualityComparer<LootTable>.Default.Equals(left, right);
    }

    public static Boolean operator !=(LootTable left, LootTable right) {
        return !(left == right);
    }
}
