import fs       from 'node:fs';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  crlfDelay: Infinity,
});

const gameNumRe = /^Game (\d+):/;

const cubesMap: Record<string, number> = {
  green: 13,
  blue: 14,
  red: 12,
};

let sum = 0;

main: for await (const line of rl) {
  const gameNum = Number((gameNumRe.exec(line) || [])[1]) || 0;
  const sets = line.split(':')[1].split(';');

  outer: for (const subsets of sets) {
    const dataSets = subsets.split(',');

    for (const set of dataSets) {
      const [count, color] = set.trim().split(' ');

      if (cubesMap[color] < Number(count)) {
        continue main;
      }
    }
  }

  sum += gameNum;
}

console.log(sum);
