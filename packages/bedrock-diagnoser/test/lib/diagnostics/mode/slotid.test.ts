import { Command } from 'bc-minecraft-bedrock-command';
import { mode_slotid_diagnose } from '../../../../src/diagnostics/mode/diagnose';
import { TestDiagnoser} from '../../../diagnoser';

describe("Mode SlotID", () => {
    it("range check max", () => {
        const commtext = "replaceitem entity @s slot.hotbar 8 example:item 1 0"
        const comm = Command.parse(commtext);
        const diagnoser = new TestDiagnoser();
        
        mode_slotid_diagnose(comm.parameters[4], comm, diagnoser);

        diagnoser.expectEmpty();
    });

    it("range check min", () => {
        const commtext = "replaceitem entity @s slot.hotbar 0 example:item 1 0"
        const comm = Command.parse(commtext);
        const diagnoser = new TestDiagnoser();
        
        mode_slotid_diagnose(comm.parameters[4], comm, diagnoser);

        diagnoser.expectEmpty();
    });

    it("range check error", () => {
        const commtext = "replaceitem entity @s slot.hotbar 9 example:item 1 0"
        const comm = Command.parse(commtext);
        const diagnoser = new TestDiagnoser();
        
        mode_slotid_diagnose(comm.parameters[4], comm, diagnoser);

        diagnoser.expectAmount(1);
    });
});