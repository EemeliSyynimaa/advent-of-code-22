import * as fs from "node:fs";

function move_from_to(stacks: Array<string>, from: number, to: number): void {}

function main(): void {
    const data = fs.readFileSync("data/5.txt", "utf8");
    const values = data.split("\n");

    if (values.length) {
        const stacksA: Array<Array<string>> = [];
        const stacksB: Array<Array<string>> = [];

        for (const value in values) {
            const firstChar = values[value].charAt(0);

            if (firstChar === "[") {
                // Stack initialization
                console.log(values[value]);
                for (let i = 1, j = 0; i < values[value].length; i += 4, j++) {
                    const temp = values[value].charAt(i);

                    if (stacksA.length <= j) {
                        stacksA.push([]);
                        stacksB.push([]);
                    }

                    if (temp !== " ") {
                        stacksA[j].push(temp);
                        stacksB[j].push(temp);
                    }
                }
            } else if (firstChar === "m") {
                // Movement commands
                console.log(values[value]);
                const operands = values[value].split(" ");
                const count = Number(operands[1]);
                const from = Number(operands[3]) - 1;
                const to = Number(operands[5]) - 1;

                // Logic for solution A
                stacksA[to] = stacksA[to].concat(
                    stacksA[from].splice(-count).reverse()
                );

                // Logic for solution B
                stacksB[to] = stacksB[to].concat(stacksB[from].splice(-count));
            } else if (firstChar === " ") {
                // Header row, order stacks here
                console.log("Reverse stacks");
                for (const stack in stacksA) {
                    stacksA[stack].reverse();
                    stacksB[stack].reverse();
                }
            } else {
                // Empty row
                console.log("SKIP!");
            }
        }

        const solutionA = Buffer.alloc(stacksA.length);
        const solutionB = Buffer.alloc(stacksB.length);

        for (let i = 0; i < stacksA.length; i++) {
            solutionA.write(String(stacksA[i].pop()), i, "utf-8");
            solutionB.write(String(stacksB[i].pop()), i, "utf-8");
        }

        // Problem a:
        console.log(
            `Tops of each stack for solution A are ${solutionA.toString()}`
        );

        // Problem b:
        console.log(
            `Tops of each stack for solution B are ${solutionB.toString()}`
        );
    } else {
        console.log("No values in file");
    }
}

main();

module.exports = { main };
