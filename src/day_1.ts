import * as fs from 'node:fs';

function main()
{
    let data = fs.readFileSync("data/1.txt", "utf8");
    let values = data.split('\n');

    console.log(values);

    if (values.length)
    {
        let totals: Array<number> = [];
        let current : number = 0;

        for (let i in values)
        {
            let value = values[i];

            if (value == '')
            {
                totals.push(current);
                current = 0;
            }
            else
            {
                current += Number(value);
            }
        }

        totals.sort((a, b) => { return b - a; });

        let total = 0;

        for (let b = 0; b < 3; b++)
        {
            total += totals[b];
        }

        // Problem a:
        console.log(`Largest single amount: ${totals[0]}`);

        // Problem b:
        console.log(`Largest three amounts: ${total}`);
    }
    else
    {
        console.log("No values in file");
    }
}

module.exports = { main };
