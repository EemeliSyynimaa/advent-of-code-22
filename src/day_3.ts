import * as fs from 'node:fs';

function priority_get(c : string)
{
    let code : number = c.charCodeAt(0);

    let minA : number = ('A').charCodeAt(0);
    let maxA : number = ('Z').charCodeAt(0);
    let minB : number = ('a').charCodeAt(0);
    let maxB : number = ('z').charCodeAt(0);

    if (code >= minA && code <= maxA)
    {
        return code - minA + 27;
    }
    else if (code >= minB && code <= maxB)
    {
        return code - minB + 1;
    }

    return 0;
}

function main()
{
    let data = fs.readFileSync("data/3.txt", "utf8");
    let values = data.split('\n');

    if (values.length)
    {
        let priorityTotalA : number = 0;
        let priorityTotalB : number = 0;
        let rucksacks : string[] = [];

        for (let value in values)
        {
            let rucksack = values[value];
            let compartmentSize = rucksack.length * 0.5;
            let compartmentA = rucksack.slice(0, compartmentSize);
            let compartmentB = rucksack.slice(compartmentSize, rucksack.length);
            let commonItem = '';
            let commonPriority : number = 0;

            labelFound : for (let i = 0; i < compartmentSize; i++)
            {
                let charA = compartmentA.charAt(i);

                for (let j = 0; j < compartmentSize; j++)
                {
                    let charB = compartmentB.charAt(j);

                    if (charA == charB)
                    {
                        commonItem = charA;
                        commonPriority = priority_get(commonItem);

                        priorityTotalA += commonPriority;

                        break labelFound;
                    }
                }
            }

            rucksacks.push(rucksack);

            if (rucksacks.length === 3)
            {
                let rucksackA : string = rucksacks[0];
                let rucksackB : string = rucksacks[1];
                let rucksackC : string = rucksacks[2];
                let commonItem : string = '';
                let commonPriority : number = 0;

                labelFoundB : for (let i = 0; i < rucksackA.length; i++)
                {
                    let charA = rucksackA.charAt(i);

                    for (let j = 0; j < rucksackB.length; j++)
                    {
                        let charB = rucksackB.charAt(j);

                        if (charA == charB)
                        {
                            for (let k = 0; k < rucksackC.length; k++)
                            {
                                let charC = rucksackC.charAt(k);

                                if (charA == charC)
                                {
                                    commonItem = charA;
                                    commonPriority = priority_get(commonItem);
                                    priorityTotalB += commonPriority;

                                    break labelFoundB;
                                }
                            }
                        }
                    }
                }

                console.log(`${rucksacks} => common item ${commonItem} and priority ${commonPriority}`);
                rucksacks.length = 0;
            }

            console.log(`Rucksack ${rucksack} => ${compartmentA} ${compartmentB}, common item ${commonItem} and priority ${commonPriority}`);
        }

        // Problem a:
        console.log(`Total priority for problem A is ${priorityTotalA}`);

        // Problem b:
        console.log(`Total priority for problem B is ${priorityTotalB}`);
    }
    else
    {
        console.log("No values in file");
    }
}

main();

module.exports = { main };
