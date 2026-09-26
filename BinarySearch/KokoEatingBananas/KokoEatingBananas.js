/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles = [3, 6, 7, 11], h = 8) {
    piles.sort((a, b) => a - b);
    let left = 0, right = piles.length - 1, mid = Math.floor(right / 2), total = 0, tries = [];

    while (left <= right) {
        mid = left + Math.floor((right - left) / 2);
        total = calculator(piles[mid]);

        console.log("Mid:", mid, "Total:", total);

        if (total[0] === h) return total[1];
        else if (total[0] < h) right = mid - 1;
        else left = mid + 1;

        tries.push(total);
    }

    function calculator(val) {
        let tots = 0;

        for (let i = 0; i < piles.length; i++) {
            tots += Math.ceil(piles[i]);
            console.log("Tots:", tots, "Pile:", piles[i], "Value Pile:", "ValIndex:", val, "i:", i, "curr_eats:", Math.ceil(piles[i]))
        };

        return [tots];
    }

    console.log(tries, tries[tries.length - 1][0] > h && tries[tries.length - 2][0] < h)

    // if (tries[tries.length - 1][0] > h && tries[tries.length - 2][0] < h) {
    //     for (let j = tries[tries.length - 1][1]; j < tries[tries.length - 2][1]; j++) {
    //         const newTotal = calculator(j, j);
    //         console.log(j, newTotal)

    //         if (newTotal[0] === h) {
    //             return newTotal[1];
    //         } else continue
    //     }
    // }

    for (let j = tries.length; j < 0; j--) {
        while (tries[j][1] > tries[j - 1][1]) {
            const newTotal = calculator(j);
            console.log(j, newTotal)

            if (newTotal[0] === h) {
                return newTotal[1];
            } else continue
        }
    }

    return total[0];
};

console.log(minEatingSpeed()); // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6)); // 23
console.log(minEatingSpeed([312884470], 312884469)); // 2