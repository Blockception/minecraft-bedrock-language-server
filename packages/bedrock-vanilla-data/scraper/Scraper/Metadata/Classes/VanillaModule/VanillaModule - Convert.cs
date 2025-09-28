using System;
using System.Collections.Generic;

namespace Scraper.Metadata;

public partial class VanillaModule<T> {
    public static ConvertFile<U> Convert<U>(Converter<T, U> mapfn) {
        return new ConvertFile<U>((String filepath, List<U> receiver) => {
            Console.WriteLine("Loading file" + filepath);
            VanillaModule<T> obj = Json.Load<VanillaModule<T>>(filepath);

            receiver.AddRange(obj.DataItems.ConvertAll(mapfn));
        });
    }

    public static ConvertFile<U> Convert<U>(Converter<T, List<U>> mapfn) {
        return new ConvertFile<U>((String filepath, List<U> receiver) => {
            Console.WriteLine("Loading file" + filepath);
            VanillaModule<T> obj = Json.Load<VanillaModule<T>>(filepath);
            List<List<U>> items = obj.DataItems.ConvertAll(mapfn);
            items.ForEach(item => receiver.AddRange(item));
        });
    }

    public static void Convert(String filepath, List<T> receiver) {
        VanillaModule<T> obj = Json.Load<VanillaModule<T>>(filepath);
        receiver.AddRange(obj.DataItems);
    }
}
