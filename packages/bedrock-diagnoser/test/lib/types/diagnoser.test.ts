import * as path from 'path';

describe("Diagnoser", ()=>{
  it("extname", ()=>{
    const filepath = "file:///c:/temp/test.mcfunction";

    const ext = path.extname(filepath);
    expect(ext).toEqual(".mcfunction");
  });
})