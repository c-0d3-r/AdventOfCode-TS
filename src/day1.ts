import fs       from 'node:fs';
import readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  crlfDelay: Infinity,
});

let sum = 0;

for await (const line of rl) {
  // # 1
  // let firstNum: number | undefined;
  // let secondNum: number | undefined;

  // for (let i = 0; i < line.length; i++) {
  //   const charCode = line.charCodeAt(i);

  //   if (charCode >= 48 && charCode <= 57) {
  //     if (firstNum === undefined) {
  //       firstNum = Number(String.fromCharCode(charCode));

  //       continue;
  //     }

  //     secondNum = Number(String.fromCharCode(charCode));
  //   }
  // }

  // #2
  const numbers = line.match(/\d+/g)?.join('');

  const firstNum = parseInt(numbers!.at(0)!);
  const secondNum = parseInt(numbers!.at(-1)!);

  sum += <number>firstNum * 10 + (<number>secondNum ?? firstNum);
}

console.log(sum);
