/**
 * @param {number[]} ranks
 * @param {number} cars
 * @return {number}
 */
var repairCars = function (ranks = [4, 2, 3, 1], cars = 10) {
    let right = Math.min(...ranks) * cars * cars, left = 1, mid = 0;

    while (left < right) {
        mid = left + Math.floor((right - left) / 2);
        rep = canRepair(mid);

        if (rep) right = mid;
        else left = mid + 1;
    }

    function canRepair(time) {
        const total = ranks.reduce((acc, curr) => { return acc += Math.floor(Math.sqrt(time / curr)) }, 0);
        return cars <= total;
    }

    return left;
};

console.log(repairCars()) // 16
console.log("\n=================\n")
console.log(repairCars([5, 1, 8], 6)); // 16
console.log("\n=================\n")
console.log(repairCars([1, 2, 2, 1, 2, 3, 2, 2, 2], 4)); // 2
console.log("\n=================\n")
console.log(repairCars([4, 3, 1, 4, 3, 4, 6, 3, 6, 6, 4, 6, 1, 3, 5, 1, 1, 1, 4, 6, 6, 3, 1, 7, 4, 5, 4, 5, 7, 2, 2, 3, 1, 2, 6, 5, 3, 2, 6, 3, 7, 7, 2, 4], 35)); // 4
