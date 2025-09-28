using System;

namespace Scraper;
///DOLATER <summary>add description for class: Sort</summary>
public static partial class Sort {
    public static readonly Comparison<String> String = StringSort;

    public static Comparison<T> SortNamed<T>() where T : INamed {
        return new Comparison<T>(NamedSort<T>);
    }

    public static Comparison<T> SortID<T>() where T : IIdentifier {
        return new Comparison<T>(IDSort<T>);
    }



    internal static Int32 StringSort(String x, String y) {
        return x.CompareTo(y);
    }

    internal static Int32 NamedSort<T>(T X, T Y)
        where T : INamed {
        return StringSort(X.Name, Y.Name);
    }


    internal static Int32 IDSort<T>(T X, T Y)
        where T : IIdentifier {
        return StringSort(X.ID, Y.ID);
    }
}
