using System;
using System.Collections.Generic;

namespace Scraper.BP;
public partial class BlockState : IEquatable<BlockState> {
    public override Boolean Equals(Object obj) {
        return this.Equals(obj as BlockState);
    }

    public Boolean Equals(BlockState other) {
        return other != null &&
               EqualityComparer<List<String>>.Default.Equals(this.Values, other.Values) &&
               this.Name == other.Name &&
               this.Type == other.Type;
    }

    public override Int32 GetHashCode() {
        return HashCode.Combine(this.Values, this.Name, this.Type);
    }

    public static Boolean operator ==(BlockState left, BlockState right) {
        return EqualityComparer<BlockState>.Default.Equals(left, right);
    }

    public static Boolean operator !=(BlockState left, BlockState right) {
        return !(left == right);
    }
}
