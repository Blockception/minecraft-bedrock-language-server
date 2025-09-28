using System;
using System.Collections.Generic;

namespace Scraper;
public partial class Context {
    public List<String> VanillaRP { get; set; }
    public List<String> EduRP { get; set; }


    public List<String> VanillaBP { get; set; }
    public List<String> EduBP { get; set; }

    public List<String> MetadataFolder { get; set; }

    public String GithubFolder { get; set; }
}
