import { BlockState, Block } from "./block";
import { Location } from "../types/location";

const blockDescription: string = "minecraft:log[direction=west,stripped=true,half=top]";
const blockID = "minecraft:log";
const blockStates: BlockState[] = [
  { property: "direction", value: "west" },
  { property: "stripped", value: "true" },
  { property: "half", value: "top" },
];

describe("Block", () => {
  it("get id works", () => {
    const id = Block.getId(blockDescription);

    expect(id).toEqual(blockID);
  });

  it("get states", () => {
    const states = Block.getStates(blockDescription);

    expect(states).toEqual(expect.arrayContaining(blockStates));
  });

  it("parse", () => {
    const block = Block.fromBlockDescriptor(blockDescription, Location.create("", 0));

    expect(block.id).toEqual(blockID);
    expect(block.states).toEqual(expect.arrayContaining(blockStates));
  });
});
