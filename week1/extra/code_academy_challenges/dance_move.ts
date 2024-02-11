function performDanceMove(...dance_moves: [string, number, boolean][]): void {
    let i:number;
    for ( i = 0; i < dance_moves.length; i++) {
        let [moveName, moveReps, hasFlair] = dance_moves[i];
        console.log(`I do the ${moveName} ${moveReps} times !`);
        if (hasFlair) {
            console.log('I do it with flair!');
        }
    }

}

let danceMoves: [string, number, boolean][] = [
    ['chicken beak', 4, false],
    ['wing flap', 4, false],
    ['tail feather shake', 4, false],
    ['clap', 4, false],
    ['chicken beak', 4, true],
    ['wing flap', 4, true],
    ['tail feather shake', 4, true],
    ['clap', 4, true],
];

performDanceMove(...danceMoves);


