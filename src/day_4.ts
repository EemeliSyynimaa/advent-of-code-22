import * as fs from 'node:fs';

function main()
{
    let data = fs.readFileSync("data/4.txt", "utf8");
    let values = data.split('\n');

    if (values.length)
    {
        let totalA : number = 0;
        let totalB : number = 0;

        for (let value in values)
        {
            let sections : string[] = values[value].split(',');

            if (sections.length > 1)
            {
                console.log(sections);

                let rangeA = sections[0].split('-');
                let rangeB = sections[1].split('-');

                let minA : number = Number(rangeA[0]);
                let maxA : number = Number(rangeA[1]);
                let minB : number = Number(rangeB[0]);
                let maxB : number = Number(rangeB[1]);

                let includes : boolean = false;

                if ((minA >= minB && maxA <= maxB) || (minB >= minA && maxB <= maxA))
                {
                    includes = true;
                    totalA++;
                }

                if ((minA >= minB && minA <= maxB) || (minB >= minA && minB <= maxA))
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
