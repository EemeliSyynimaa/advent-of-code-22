import * as fs from 'node:fs';

function main() : void
{
    const data = fs.readFileSync("data/4.txt", "utf8");
    const values = data.split('\n');

    if (values.length)
    {
        let totalA = 0;
        let totalB = 0;

        for (const value in values)
        {
            const sections : string[] = values[value].split(',');

            if (sections.length > 1)
            {
                console.log(sections);

                const rangeA = sections[0].split('-');
                const rangeB = sections[1].split('-');

                const minA = Number(rangeA[0]);
                const maxA = Number(rangeA[1]);
                const minB = Number(rangeB[0]);
                const maxB = Number(rangeB[1]);

                let includes = false;

                if ((minA >= minB && maxA <= maxB) ||
                    (minB >= minA && maxB <= maxA))
                {
                    includes = true;
                    totalA++;
                }

                if ((minA >= minB && minA <= maxB) ||
                    (minB >= minA && minB <= maxA))
                {
                    includes = true;
                    totalB++;
                }
            }
        }

        // Problem a:
        console.log(`Total included sections for problem A is ${totalA}`);

        // Problem b:
        console.log(`Total overlapped sections for problem B is ${totalB}`);
    }
    else
    {
        console.log("No values in file");
    }
}

main();

module.exports = { main };
