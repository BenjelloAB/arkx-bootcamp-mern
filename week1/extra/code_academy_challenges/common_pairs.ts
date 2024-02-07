type Goose = {
    isPettable: boolean;
    hasFeathers: boolean;
    canThwartAPicnic: boolean;
}


type Moose = {
    isPettable: boolean;
    hasHoofs?: boolean;
}

const pettingZooAnimal: Goose | Moose = {isPettable: true};

console.log(pettingZooAnimal.isPettable); // No TypeScript error
console.log(pettingZooAnimal.hasHoofs); // TypeScript error