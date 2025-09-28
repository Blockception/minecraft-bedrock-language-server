using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace Scraper;
public class Program {
    private static async Task Main(String[] args) {
        Context context = await Utility.GetFolders();

        var sw = new Stopwatch();
        sw.Start();

        //Loads the base set
        var Out = Output.Load(Utility.BaseFolder);

        //Scrape data sets
        Metadata.Scraper.Scrape(context.MetadataFolder, Out.Vanilla.BehaviorPack, Out.General);

        BP.Scraper.Scrape(context.EduBP, Out.Edu.BehaviorPack);
        BP.Scraper.Scrape(context.VanillaBP, Out.Vanilla.BehaviorPack);

        RP.Scraper.Scrape(context.EduRP, Out.Edu.ResourcePack);
        RP.Scraper.Scrape(context.VanillaRP, Out.Vanilla.ResourcePack);

        //Process collected data into general data for quick lookup of things like entities families and events
        Out.General.Scrape(Out);

        //TODO prune education from vanilla
        Out.Clean();
        Out.Prune();

        //Save
        Out.Save(Utility.OutputFolder);

        Vanilla.GithubLinks(context, Utility.OutputFolder);
        FormatVersions.GetVersions(context, Utility.OutputFolder);

        sw.Stop();

        Console.WriteLine($"ms: {sw.ElapsedMilliseconds}, ticks: {sw.ElapsedTicks}");
        //Console.ReadLine();
    }
}
