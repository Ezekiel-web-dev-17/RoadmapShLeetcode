/**
 * @param {number[]} ranks
 * @param {number} cars
 * @return {number}
 */
var repairCars = function (ranks = [4, 2, 3, 1], cars = 10) {
    let maxTime = 0, remCars = cars, durations = [], iter = 0;
    ranks.sort();

    ranks.forEach((rank) => {
        if (remCars) {
            remCars--;
            durations.push([rank, 1])
            maxTime = Math.max(maxTime, rank * 1 * 1);
        }
    })

    function miner() {
        let mins = [], min = 0;

        for (let i = 0; i < ranks.length; i++) {
            mins.push(timing(i));
        }

        min = Math.min(...mins)
        return min
    }

    while (remCars) {
        let newMax = Math.max(maxTime, miner());

        if (maxTime < timing(iter)) {
            maxTime = newMax;
        } else {
            durations[iter][1]++;
            remCars--;
        }

        iter < ranks.length - 1 ? iter++ : iter = 0;
    }


    function timing(valIndex, mute) {
        let val = durations[valIndex], inc = val[1] + 1;
        return val[0] * inc * inc;
    }

    console.log(durations)

    return durations.reduce((acc, curr) => {
        return acc = Math.max(curr[0] * curr[1] * curr[1], acc);
    }, 0);
};

console.log(repairCars())
console.log("\n=================")
console.log("== 2nd example ==")
console.log("=================\n")
console.log(repairCars([5, 1, 8], 6));
console.log("\n=================")
console.log("== 3rd example ==")
console.log("=================\n")
console.log(repairCars([1, 2, 2, 1, 2, 3, 2, 2, 2], 4));
