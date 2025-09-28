using System;
using System.Collections.Generic;
using System.Linq;

namespace Scraper;

///DOLATER <summary>add description for class: IdentifierExtension</summary>
public static partial class IdentifierExtension {
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Data"></param>
    /// <param name="FindID"></param>
    public static Boolean HasID<T>(this T[] Data, String FindID)
        where T : IIdentifier {
        Int32 Max = Data.Length;

        for (Int32 I = 0; I < Max; I++) {
            T Item = Data[I];

            if (Item.ID == FindID) {
                return true;
            }
        }

        return false;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Data"></param>
    /// <param name="FindID"></param>
    public static Boolean HasID<T>(this T[] Data, String FindID, Int32 StartIndex)
        where T : IIdentifier {
        Int32 Max = Data.Length;

        for (Int32 I = StartIndex; I < Max; I++) {
            T Item = Data[I];

            if (Item.ID == FindID) {
                return true;
            }
        }

        return false;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Data"></param>
    /// <param name="FindID"></param>
    public static Boolean HasID<T>(this List<T> Data, String FindID)
        where T : IIdentifier {
        return HasID(Data, FindID, 0);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Data"></param>
    /// <param name="FindID"></param>
    public static Boolean HasID<T>(this List<T> Data, String FindID, Int32 StartIndex)
        where T : IIdentifier {
        Int32 Max = Data.Count;

        for (Int32 I = StartIndex; I < Max; I++) {
            T Item = Data[I];

            if (Item.ID == FindID) {
                return true;
            }
        }

        return false;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Data"></param>
    /// <param name="Excluded"></param>
    /// <returns></returns>
    public static List<T> Clean<T>(this List<T> Data, List<T> Excluded)
        where T : IIdentifier {

        Int32 Count = Data.Count;
        var Out = new List<T>(Data.Count);

        for (Int32 I = Count - 1; I >= 0; I--) {
            T Item = Data[I];
            String ID = Item.ID;

            if (Excluded.HasID(ID) || Out.HasID(ID)) {
                continue;
            }

            Out.Add(Item);
        }

        Out.Sort(Sort.SortID<T>());

        return Out;
    }

    public static List<T> Clean<T>(this List<T> Data)
        where T : IIdentifier {

        Int32 Count = Data.Count;
        var Out = new List<T>(Data.Count);

        // Walk backwards
        for (Int32 I = Count - 1; I >= 0; I--) {
            T Item = Data[I];
            String ID = Item.ID;

            //If the data has a later entry that has the same ID, such the last found item instead
            if (Out.HasID(ID)) {
                continue;
            }

            Out.Add(Item);
        }

        Out.Sort(Sort.SortID<T>());

        return Out;
    }

    public static List<String> Clean(this List<String> Data) {
        return Data.Distinct().ToList();
    }
}
