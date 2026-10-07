/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function (candies = [5, 8, 6], k = 3) {
    let left = 0, right = Math.max(...candies), mid = 0, res = 0;

    while (left <= right) {
        mid = left + Math.floor((right - left) / 2);

        let forAll = distribute(mid)

        console.log(forAll, left, mid, right, res)
        if (forAll) { res = mid; left = mid + 1; }
        else right = mid - 1;
    }

    function distribute(trial) {
        let children = k;

        for (let candy = 0; candy < candies.length; candy++) {
            let i = candies[candy];
            console.log("curr pile:", i, "children:", children, "trial:", trial, "on idx:", candy)
            children -= Math.floor(i / trial);
        }

        return children <= 0;
    }

    return res;
};

console.log("\nAnswer is: ", maximumCandies(), "\n")
console.log("\nAnswer is: ", maximumCandies([2, 5], 11), "\n")
console.log("\nAnswer is: ", maximumCandies([4, 7, 5], 4), "\n")
console.log("\nAnswer is: ", maximumCandies([4, 7, 5], 16), "\n")
console.log("\nAnswer is: ", maximumCandies([5, 8, 6], 3), "\n") // 5
console.log("\nAnswer is: ", maximumCandies([1], 1), "\n")
console.log("\nAnswer is: ", maximumCandies([10000000], 1000000000000), "\n")