/**
 * @param {number[]} nums - Array of integers to find k most frequent elements from
 * @param {number} k - Number of most frequent elements to return
 * @return {number[]} - Array containing the k most frequent elements
 *
 * Time Complexity: O(n log n) where n is the length of nums
 * - O(n log n) for sorting the input array (not strictly necessary)
 * - O(n) for building the frequency map
 * - O(m log m) for sorting by frequency where m is unique elements (~n worst case)
 *
 * Space Complexity: O(n) for the hash map storing frequencies
 */
var topKFrequent = function (nums, k) {
  // Step 1: Sort the array (optional - helps with grouping duplicates for efficiency)
  // This groups identical numbers together, making iteration potentially cache-friendly
  nums.sort();

  // Step 2: Build a frequency map
  // Maps each unique number to its count in the array
  const Hash = new Map();
  for (let i = 0; i < nums.length; i++) {
    const currNum = nums[i];
    // Increment count if exists, otherwise initialize to 1
    if (Hash.has(currNum)) {
      Hash.set(currNum, Hash.get(currNum) + 1);
    } else {
      Hash.set(currNum, 1);
    }
  }

  // Step 3: Convert hash map to array of [number, frequency] pairs
  // Example: Map(1 => 3, 2 => 2, 3 => 1) becomes [[1, 3], [2, 2], [3, 1]]
  let map = Array.from(Hash);

  // Step 4: Sort by frequency in descending order
  // Higher frequencies come first: [1, 3] before [2, 2] before [3, 1]
  map.sort((a, b) => b[1] - a[1]);

  // Step 5: Extract the first k elements (the numbers with highest frequencies)
  // and return them as result
  let result = [];
  for (let i = 0; i < k; i++) {
    result = [...result, map[i][0]]; // map[i][0] is the number, map[i][1] is frequency
  }

  return result;
};

console.log(topKFrequent((nums = [1, 1, 1, 2, 2, 3]), (k = 2)));
console.log(topKFrequent((nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2]), (k = 2)));
