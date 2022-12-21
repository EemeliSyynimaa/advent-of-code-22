import * as fs from "node:fs";

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const LOSE = 0;
const TIE = 3;
const WIN = 6;

function hand_number(hand: string): number {
    switch (hand) {
        case "A":
        case "X":
            return ROCK;
        case "B":
        case "Y":
            return PAPER;
        case "C":
        case "Z":
            return SCISSORS;
        default:
            return 0;
    }
}

function score_calculate_a(a: string, b: string): number {
    let score = 0;
    const numA = hand_number(a);
    const numB = hand_number(b);

    score += numA;

    if (numA === numB) {
        score += TIE;
    } else if (
        (numA === ROCK && numB === SCISSORS) ||
        (numA === SCISSORS && numB === PAPER) ||
        (numA === PAPER && numB === ROCK)
    ) {
        score += WIN;
    }

    return score;
}

function hand_worse_get(hand: number): number {
    switch (hand) {
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

function hand_better_get(hand: number): number {
    switch (hand) {
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

function score_calculate_b(a: string, b: string): number {
    let score = 0;
    const numA = hand_number(a);

    switch (b) {
        case "X":
            score += hand_worse_get(numA);
            break;
        case "Y":
            score += TIE + numA;
            break;
        case "Z":
            score += WIN + hand_better_get(numA);
            break;
        default:
            break;
    }

    return score;
}

function main(): void {
    const data = fs.readFileSync("data/2.txt", "utf8");
    const values = data.split("\n");

    if (values.length) {
        console.log(values);

        let scoreA = 0;
        let scoreB = 0;

        for (const value in values) {
            if (values[value].length === 3) {
                const [a, b] = values[value].split(" ");

                scoreA += score_calculate_a(b, a);
                scoreB += score_calculate_b(a, b);
            }
        }

        // Problem a:
        console.log(`Total score for problem A is ${scoreA}`);

        // Problem b:
        console.log(`Total score for problem B is ${scoreB}`);
    } else {
        console.log("No values in file");
    }
}

main();

module.exports = { main };
