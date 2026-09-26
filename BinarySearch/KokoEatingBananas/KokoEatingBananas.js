/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles = [3, 6, 7, 11], h = 8) {
    let left = 0, right = piles.length - 1, mid = Math.floor(right / 2), total = 0;

    while (left <= right) {
        mid = left + Math.floor((right - left) / 2);
        total = calculator(mid);

        if (total === h) return total;
        else if (total < h) left = mid + 1;
        else right = mid - 1;
    }

    function calculator(val) {
        let tots = 0;

        for (let i = 0; i < piles.length; i++) tots += Math.ceil(piles[i] / val);

        return tots;
    }

    return total;
};

console.log(minEatingSpeed())