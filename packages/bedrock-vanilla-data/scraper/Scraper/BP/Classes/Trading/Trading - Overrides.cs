using System;
using System.Collections.Generic;

namespace Scraper.BP;
public partial class Trading : IEquatable<Trading> {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="obj"></param>
    /// <returns></returns>
    public override Boolean Equals(Object obj) {
        return this.Equals(obj as Trading);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="other"></param>
    /// <returns></returns>
    public Boolean Equals(Trading other) {
        return other != null &&
               this.ID == other.ID;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
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

    /// <summary>
    /// 
    /// </summary>
    /// <param name="left"></param>
    /// <param name="right"></param>
    /// <returns></returns>
    public static Boolean operator ==(Trading left, Trading right) {
        return EqualityComparer<Trading>.Default.Equals(left, right);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="left"></param>
    /// <param name="right"></param>
    /// <returns></returns>
    public static Boolean operator !=(Trading left, Trading right) {
        return !(left == right);
    }
}
