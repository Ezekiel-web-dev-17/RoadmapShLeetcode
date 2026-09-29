/**
 * @param {number[]} ranks
 * @param {number} cars
 * @return {number}
 */
var repairCars = function (ranks = [4, 2, 3, 1], cars = 10) {
    let maxTime = 0, remCars = cars, durations = [], iter = 0, n = 0;
    ranks.sort();

    ranks.forEach((rank) => {
        remCars--;
        durations.push([rank, 1])
        maxTime = Math.max(maxTime, rank * 1 * 1);
    })

    console.log("MaxTime:", maxTime, "\t", ranks, "Duration:", durations, "Remaining cars:", remCars);
    function miner(mute) {
        let mins = [], min = 0;

        for (let i = 0; i < ranks.length; i++) {
            mins.push(timing(i, mute));
        }

        min = Math.min(...mins)
        if (!mute) console.log("miner:", min, mins)
        return min
    }

    while (remCars && n <= 20) {
        console.log(`\n===== When n = ${n} =====`);
        let newMax = Math.max(maxTime, miner(true));
        console.log("Whiler:", maxTime, iter, durations);

        if (maxTime < timing(iter)) {
            maxTime = newMax;
            console.log("Whiler: not within maxTime", maxTime, durations, remCars);
            // iter > 0 ? iter-- : iter = 0;
            // continue;
        } else {
            console.log("Same or greater");
            durations[iter][1]++;
            remCars--;
            console.log("Whiler: within maxTime", durations, remCars);
        }

        iter < ranks.length - 1 ? iter++ : iter = 0;

        n++
    }


    function timing(valIndex, mute) {
        let val = durations[valIndex], inc = val[1] + 1;
        if (!mute) console.log("Timing:", valIndex, durations[valIndex], durations[valIndex][1], val[1], "inc:", inc, "time:", val[0] * inc * inc)
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
