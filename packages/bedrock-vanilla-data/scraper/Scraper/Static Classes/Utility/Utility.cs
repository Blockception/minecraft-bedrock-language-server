using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Scraper;

///DOLATER <summary>add description for class: Utility</summary>
public static partial class Utility {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Filepath"></param>
    /// <param name="uri"></param>
    public static async Task Download(String Filepath, String uri) {
        if (File.Exists(Filepath)) {
            File.Delete(Filepath);
        }

        Console.WriteLine("start\tdownloading: " + uri);
        using var client = new HttpClient();
        var data = await client.GetByteArrayAsync(uri);
        File.WriteAllBytes(Filepath, data);
        Console.WriteLine("done\tdownloading: " + uri);
    }

    /// <summary>
    /// 
    /// </summary>
    public static async Task<String> DownloadUnpack(String Name, String Uri) {
        String Filepath = Path.Join(WorkFolder, $"{Name}.zip");

        if (!File.Exists(Filepath)) {
            await Download(Filepath, Uri);
        }
        else {
            Console.WriteLine("Skipping downloading: " + Uri);
        }

        if (File.Exists(Filepath)) {
            String Folder = Path.Join(WorkFolder, Name);

            if (!Directory.Exists(Folder)) {
                Console.WriteLine("Unzipping: " + Uri);
                ZipFile.ExtractToDirectory(Filepath, Folder);
            }
            else {
                Console.WriteLine("Skipping unzipping: " + Uri);
            }

            return Folder;
        }

        return null;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Name"></param>
    /// <param name="Uri"></param>
    /// <returns></returns>
    public static Task<String> DownloadUnpackAsync(String Name, String Uri) {
        return Task.Run<String>(() => DownloadUnpack(Name, Uri));
    }

    public static async Task<Context> GetFolders() {
        Directory.CreateDirectory(Utility.WorkFolder);
        Directory.CreateDirectory(Utility.OutputFolder);
        var Out = new Context();

        //Edu
        String EduInstall = Minecraft.EduInstallationFolder();

        if (EduInstall != null) {
            String BPS = Path.Join(EduInstall, "data", "behavior_packs", "education");
            String RPS = Path.Join(EduInstall, "data", "resource_packs", "education");

            ExistsIf(Out.EduBP, BPS);
            ExistsIf(Out.EduRP, RPS);
        }

        //Vanilla
        String Install = Minecraft.InstallationFolder();

        if (Install != null) {
            String BPS = Path.Join(Install, "data", "behavior_packs");
            String RPS = Path.Join(Install, "data", "resource_packs");

            ExistsIf(Out.VanillaBP, BPS, "vanilla");
            ExistsIf(Out.EduBP, BPS, "education");

            ExistsIf(Out.VanillaRP, RPS, "vanilla");
            ExistsIf(Out.EduRP, RPS, "education");
        }

        var df = await DownloadUnpack("Samples", "https://github.com/Mojang/bedrock-samples/archive/refs/heads/main.zip");
        String Folder = Path.Join(df, "bedrock-samples-main");
        ExistsIf(Out.VanillaBP, Folder, "behavior_pack");
        ExistsIf(Out.VanillaRP, Folder, "resource_pack");
        ExistsIf(Out.MetadataFolder, Folder, "metadata");

        Out.GithubFolder = Folder;

        return Out;
    }

    private static void ExistsIf(List<String> Receiver, String Folder) {
        if (Directory.Exists(Folder)) {
            Receiver.Add(Folder);
        }
    }

    private static void ExistsIf(List<String> Receiver, String Folder, String SubFolder) {
        Folder = Path.Join(Folder, SubFolder);
        ExistsIf(Receiver, Folder);
    }
}
