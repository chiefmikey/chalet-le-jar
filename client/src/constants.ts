export const locations = {
  0: 'CASTLE',
  1: 'FINNS',
  2: 'LONDON',
  3: 'GUARDIAN',
  4: 'CREEPER',
  5: 'OUTPOST',
  6: 'BUNKER',
  7: 'SUBTERRANE',
  8: 'ENDPORTAL',
  9: 'CHICKEN?',
  10: 'RANDOM',
} as { [key: number]: string };

export const pins = {
  0: 'KELP',
  1: 'CREEPER',
  2: 'GUARDIAN',
};

const generateNegative = (input: number) => {
  const randomNegative = Math.random() > 0.5 ? 1 : -1;
  return input * randomNegative;
}

const generateRandomCoordinate = (): [number, number, number] => {
  const x = Math.random() * 50_000;
  const y = Math.random() * 200;
  const z = Math.random() * 50_000;

  return [x, y, z];
};

export const coordinates = {
  0: '27 64 167',
  1: '19 60 89',
  2: '351 83 640',
  3: '0 0 0',
  4: '1290 192 -11',
  5: '590 72 2610',
  6: '20 -42 140',
  7: '61993 -28 -2384',
  8: '1038 33 124',
  9: '-89 77 3857',
  10: generateRandomCoordinate().join(' '),
} as { [key: number]: string };

export const users = [
  'rotttttt',
  'AverageThyme486',
  'MortalCaribou91',
  'HUNGLIKE12',
  'gajdra',
  'L0ST UN1C0RN',
  'Minty Fresh1515',
  'Dark Zelda92',
];

export const menuOptions = {
  1: 'TELEPORT',
  2: 'REWIND',
  3: 'SAVE',
  4: 'MESSAGE',
  5: 'SFX',
  6: 'SETTINGS',
} as {
  [key: number]: string;
};
