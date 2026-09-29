/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles = [3, 6, 7, 11], h = 8) {
    let left = 1, right = Math.max(...piles), mid = Math.floor((right - left) / 2);

    const timeTaken = (k) => {
        let hrsSpent = 0;

        piles.forEach((pile) => hrsSpent += Math.ceil(pile / k));

        return hrsSpent <= h;
    }

    while (left < right) {
        mid = left + Math.floor((right - left) / 2);
        let time = timeTaken(mid);

        console.log("mid", mid, "time", time, "left", left, "right", right);

        if (time) right = mid;
        else left = mid + 1;
    }

    return right;
};

console.log(minEatingSpeed(), "\n"); // 4
// console.log(minEatingSpeed([30, 11, 23, 4, 20], 5), "\n"); // 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6), "\n"); // 23
console.log(minEatingSpeed([312884470], 312884469)); // 2