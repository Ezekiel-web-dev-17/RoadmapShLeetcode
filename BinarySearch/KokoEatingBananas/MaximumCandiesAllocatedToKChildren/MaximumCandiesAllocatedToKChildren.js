/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function (candies = [5, 8, 6], k = 3) {
    let left = 0, right = Math.max(...candies), mid = 0, res = 0;

    while (left < right) {
        mid = left + Math.floor((right - left) / 2);

        let forAll = distribute(mid)

        console.log(forAll, left, mid, right, res)
        if (forAll) { res = mid; left = mid + 1; }
        else right = mid - 1;
    }

    function distribute(trial) {
        console.log("trial: ", trial)
        if (!trial) {
            return false
        }

        let candiesCopy = [...candies], childrenCount = k;

        for (let i = 0; i < candiesCopy.length; i++) {
            if (trial < candiesCopy[i]) {
                let diff = candiesCopy[i] - trial;
                candiesCopy[i] = trial;
                candiesCopy.push(diff)
            }
        }

        let equalToTrial = candiesCopy.filter((candy) => candy === trial).reduce((acc, curr) => { return acc += curr }, 0);

        return Math.floor(equalToTrial / trial) >= childrenCount;
    }

    return res;
};

console.log(maximumCandies())
console.log(maximumCandies([2, 5], 11))
console.log(maximumCandies([4, 7, 5], 4))
console.log(maximumCandies([4, 7, 5], 16))
console.log(maximumCandies([5, 8, 6], 3)) // 5