import * as migration_20260921_172104_initial from './20260921_172104_initial';

export const migrations = [
  {
    up: migration_20260921_172104_initial.up,
    down: migration_20260921_172104_initial.down,
    name: '20260921_172104_initial'
  },
];
