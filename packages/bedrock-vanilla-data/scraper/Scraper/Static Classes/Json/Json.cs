using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Text.Json;

namespace Scraper;
///DOLATER <summary>add description for class: Json</summary>
public static partial class Json {
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Filepath"></param>
    /// <returns></returns>
    public static T Load<T>([DisallowNull] String Filepath) {
        if (!File.Exists(Filepath)) { return default; }

        T Out = default;

        try {
            String Data = File.ReadAllText(Filepath);
            Out = JsonSerializer.Deserialize<T>(Data, Json.ReadOptions);
        }
        catch (Exception ex) {
            Console.WriteLine(ex.ToString());
        }

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Filepath"></param>
    /// <returns></returns>
    [return: NotNull]
    public static T LoadEnsure<T>([DisallowNull] String Filepath)
        where T : class, new() {

        T Out = Load<T>(Filepath) ?? new T();

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="Filepath"></param>
    public static void Save<T>(T Data, [DisallowNull] String Filepath) {
        FileStream Writer = null;

        try {
            var JW = new JsonWriterOptions() {
                Indented = true
            };

            Writer = new FileStream(Filepath, FileMode.Create, FileAccess.ReadWrite);
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

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Filepath"></param>
    /// <returns></returns>
    public static JsonDocument GetDoc(String Filepath) {
        if (!File.Exists(Filepath)) return null;

        JsonDocument Doc = null;
        Stream Reader = null;

        var Options = new JsonDocumentOptions() {
            AllowTrailingCommas = true,
            CommentHandling = JsonCommentHandling.Skip
        };

        try {
            Reader = new FileStream(Filepath, FileMode.Open, FileAccess.Read);
            Doc = JsonDocument.Parse(Reader, Options);
        }
        catch (Exception ex) {
            Console.WriteLine(ex.ToString());
        }
        finally {
            Reader?.Close();
        }

        return Doc;
    }
}
