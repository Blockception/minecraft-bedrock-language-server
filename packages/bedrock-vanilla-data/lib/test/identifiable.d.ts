import { Identifiable } from "../src/Lib/Types/Identifiable";
export declare function Test_Identifiable(data: Identifiable): void;
export declare function Check_Identifiable(data: (Identifiable | string)[]): void;
export declare function Check_IsFunction<T extends Identifiable>(items: T[], check: (value: any) => value is T): void;
