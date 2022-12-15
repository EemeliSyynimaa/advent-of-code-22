import * as fs from 'node:fs';

const ROCK : number  = 1;
const PAPER : number  = 2;
const SCISSORS : number  = 3;

const LOSE : number = 0;
const TIE : number = 3;
const WIN: number = 6;

function hand_number(hand: string) : number
{
    switch (hand)
    {
    case 'A':
    case 'X':
        return ROCK;
    case 'B':
    case 'Y':
        return PAPER;
    case 'C':
    case 'Z':
        return SCISSORS;
    default:
        return 0;
    };
}

function score_calculate_a(a: string, b: string) : number
{
    let score : number = 0;
    let a_num = hand_number(a);
    let b_num = hand_number(b);

    score += a_num;

    if (a_num == b_num)
    {
        score += TIE;
    }
    else if ((a_num == ROCK && b_num == SCISSORS) ||
        (a_num == SCISSORS && b_num == PAPER) ||
        (a_num == PAPER && b_num == ROCK))
    {
        score += WIN;
    }

    return score;
}

function hand_worse_get(hand: number) : number
{
    switch (hand)
    {
    case ROCK:
        return SCISSORS;
    case PAPER:
        return ROCK;
    case SCISSORS:
        return PAPER;
    default:
        return 0;
    }
}

function hand_better_get(hand: number) : number
{
    switch (hand)
    {
    case ROCK:
        return PAPER;
    case PAPER:
        return SCISSORS;
    case SCISSORS:
        return ROCK;
    default:
        return 0;
    }
}

function score_calculate_b(a: string, b: string) : number
{
    let score : number = 0;
    let a_num = hand_number(a);

    switch (b)
    {
    case 'X':
        score += hand_worse_get(a_num);
        break;
    case 'Y':
        score += TIE + a_num;
        break;
    case 'Z':
        score += WIN + hand_better_get(a_num);
        break;
    default:
        break;
    }

    return score;
}

function main()
{
    let data = fs.readFileSync("data/2.txt", "utf8");
    let values = data.split('\n');

    if (values.length)
    {
        console.log(values);

        let score_a : number = 0;
        let score_b : number = 0;

        for (let value in values)
        {
            if (values[value].length == 3)
            {
                let [a, b] = values[value].split(' ');

                score_a += score_calculate_a(b, a);
                score_b += score_calculate_b(a, b);
            }
        }

        // Problem a:
        console.log(`Total score for problem A is ${score_a}`);

        // Problem b:
        console.log(`Total score for problem B is ${score_b}`);
    }
    else
    {
        console.log("No values in file");
    }
}

module.exports = { main };
