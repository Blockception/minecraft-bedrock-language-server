"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreComparatorMode = void 0;
/** Score comparison operators used in execute if|unless score commands */
exports.ScoreComparatorMode = {
    name: 'ScoreComparator',
    modes: [
        { name: '<', documentation: 'Tests if the target score is less than the source score' },
        { name: '<=', documentation: 'Tests if the target score is less than or equal to the source score' },
        { name: '=', documentation: 'Tests if the target score is equal to the source score' },
        { name: '>=', documentation: 'Tests if the target score is greater than or equal to the source score' },
        { name: '>', documentation: 'Tests if the target score is greater than the source score' },
    ],
};
//# sourceMappingURL=score-comparator.js.map