/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles = [3, 6, 7, 11], h = 8) {
    let left = 0, right = piles.length - 1, mid = Math.floor(right / 2), total = 0, tries = [];

    while (left <= right) {
        mid = left + Math.floor((right - left) / 2);
        total = calculator(piles[mid]);

        console.log("Mid:", piles[mid], "Total:", total, piles[right], piles[left]);

        if (total[0] === h) return total[1];
        else if (total[0] < h) right = mid;
        else left = mid + 1;

        tries.push(total);
    }
};

console.log(minEatingSpeed(), "\n"); // 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5), "\n"); // 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6), "\n"); // 23
console.log(minEatingSpeed([312884470], 312884469)); // 2