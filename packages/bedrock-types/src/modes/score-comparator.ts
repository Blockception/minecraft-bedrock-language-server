import { ModeCollection } from './mode-collection';

/** Score comparison operators used in execute if|unless score commands */
export const ScoreComparatorMode: ModeCollection = {
  name: 'ScoreComparator',
  modes: [
    { name: '<', documentation: 'Tests if the target score is less than the source score' },
    { name: '<=', documentation: 'Tests if the target score is less than or equal to the source score' },
    { name: '=', documentation: 'Tests if the target score is equal to the source score' },
    { name: '>=', documentation: 'Tests if the target score is greater than or equal to the source score' },
    { name: '>', documentation: 'Tests if the target score is greater than the source score' },
  ],
};
