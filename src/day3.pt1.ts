import fs       from 'node:fs';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  crlfDelay: Infinity,
});

const d: string[][] = [];

for await (const line of rl) {
  d.push(line.split(''));
}

const isValidSymbol = (r: number, c: number) =>
  d[r] ? (d[r][c] ? d[r][c] !== '.' : false) : false;

const isPartNumber = (n: string, y: number, x: number): boolean => {
  const l = n.length;
  const e = x + l;

  if (
    isValidSymbol(y - 1, x - 1) ||
    isValidSymbol(y, x - 1) ||
    isValidSymbol(y + 1, x - 1) ||
    isValidSymbol(y - 1, e) ||
    isValidSymbol(y, e) ||
    isValidSymbol(y + 1, e)
  ) {
    return true;
  }

  for (let i = 0; i < l; i++) {
    if (isValidSymbol(y - 1, x + i) || isValidSymbol(y + 1, x + i)) {
      return true;
    }
  }

  return false;
};

const nums: number[] = [];

for (let y = 0; y < d.length; y++) {
  let n = '';
  let s = 0;

  inner: for (let x = 0; x < d[y].length; x++) {
    while (d[y][x] >= '0' && d[y][x] <= '9') {
      if (!n) s = x;

      n += d[y][x++];
    }

    if (!n) continue inner;
    if (isPartNumber(n, y, s)) nums.push(Number(n));

    n = '';
  }
}

console.log(nums.reduce((acc, n) => acc + n));
