import * as fs from "node:fs";

function priority_get(c: string): number {
    const code: number = c.charCodeAt(0);

    const minA: number = "A".charCodeAt(0);
    const maxA: number = "Z".charCodeAt(0);
    const minB: number = "a".charCodeAt(0);
    const maxB: number = "z".charCodeAt(0);

    if (code >= minA && code <= maxA) {
        return code - minA + 27;
    } else if (code >= minB && code <= maxB) {
        return code - minB + 1;
    }

    return 0;
}

function main(): void {
    const data = fs.readFileSync("data/3.txt", "utf8");
    const values = data.split("\n");

    if (values.length) {
        let priorityTotalA = 0;
        let priorityTotalB = 0;
        const rucksacks: string[] = [];

        for (const value in values) {
            const rucksack = values[value];
            const compartmentSize = rucksack.length * 0.5;
            const compartmentA = rucksack.slice(0, compartmentSize);
            const compartmentB = rucksack.slice(
                compartmentSize,
                rucksack.length
            );
            let commonItem = "";
            let commonPriority = 0;

            labelFound: for (let i = 0; i < compartmentSize; i++) {
                const charA = compartmentA.charAt(i);

                for (let j = 0; j < compartmentSize; j++) {
                    const charB = compartmentB.charAt(j);

                    if (charA === charB) {
                        commonItem = charA;
                        commonPriority = priority_get(commonItem);

                        priorityTotalA += commonPriority;

                        break labelFound;
                    }
                }
            }

            rucksacks.push(rucksack);

            if (rucksacks.length === 3) {
                const rucksackA: string = rucksacks[0];
                const rucksackB: string = rucksacks[1];
                const rucksackC: string = rucksacks[2];
                let commonItem = "";
                let commonPriority = 0;

                labelFoundB: for (let i = 0; i < rucksackA.length; i++) {
                    const charA = rucksackA.charAt(i);

                    for (let j = 0; j < rucksackB.length; j++) {
                        const charB = rucksackB.charAt(j);

                        if (charA === charB) {
                            for (let k = 0; k < rucksackC.length; k++) {
                                const charC = rucksackC.charAt(k);

                                if (charA === charC) {
                                    commonItem = charA;
                                    commonPriority = priority_get(commonItem);
                                    priorityTotalB += commonPriority;

                                    break labelFoundB;
                                }
                            }
                        }
                    }
                }

                console.log(
                    `${rucksacks} => common item ${commonItem}` +
                        `and priority ${commonPriority}`
                );
                rucksacks.length = 0;
            }

            console.log(
                `Rucksack ${rucksack} => ${compartmentA} ` +
                    `${compartmentB}, common item ${commonItem} and priority ` +
                    `${commonPriority}`
            );
        }

        // Problem a:
        console.log(`Total priority for problem A is ${priorityTotalA}`);

        // Problem b:
        console.log(`Total priority for problem B is ${priorityTotalB}`);
    } else {
        console.log("No values in file");
    }
}

main();

module.exports = { main };
