using System;
using System.IO;
using System.Text.Json;

namespace Scraper;
///DOLATER <summary>add description for class: Typescript</summary>
public static partial class Typescript {
    public static void SaveArray<T>(String Type, String TypeLocation, String Name, T Data, String Filepath) {
        FileStream Writer = null;

        try {
            var JW = new JsonWriterOptions() {
                Indented = true
            };

            Writer = new FileStream(Filepath, FileMode.Create, FileAccess.ReadWrite);
            var TextWriter = new StreamWriter(Writer);

            TextWriter.WriteLine("/** Notice: Auto generated file, do not edit */\n\r");

            if (TypeLocation != null) {
                TextWriter.WriteLine($"import {{ {Type} }} from '{TypeLocation}';\n\r\n\r");
            }

            TextWriter.WriteLine($"export const {Name}: {Type}[] = ");
            TextWriter.Flush();

            var JWriter = new Utf8JsonWriter(Writer, JW);
            JsonSerializer.Serialize<T>(JWriter, Data, Json.WriteOptions);
        }
        catch (Exception ex) {
            Console.WriteLine(ex.ToString());
        }
        finally {
            Writer?.Close();
        }
    }

    public static void Save<T>(String Type, String TypeLocation, String Name, T Data, String Filepath) {
        FileStream Writer = null;

        try {
            var JW = new JsonWriterOptions() {
                Indented = true
            };

            Writer = new FileStream(Filepath, FileMode.Create, FileAccess.ReadWrite);
            var TextWriter = new StreamWriter(Writer);

            TextWriter.WriteLine("/** Notice: Auto generated file, do not edit */\n\r");

            if (TypeLocation != null) {
                TextWriter.WriteLine($"import {{ {Type} }} from '{TypeLocation}';\n\r\n\r");
            }

            TextWriter.WriteLine($"export const {Name}: {Type} = ");
            TextWriter.Flush();

            var JWriter = new Utf8JsonWriter(Writer, JW);
            JsonSerializer.Serialize<T>(JWriter, Data, Json.WriteOptions);
        }
        catch (Exception ex) {
            Console.WriteLine(ex.ToString());
        }
        finally {
            Writer?.Close();
        }
    }
}
