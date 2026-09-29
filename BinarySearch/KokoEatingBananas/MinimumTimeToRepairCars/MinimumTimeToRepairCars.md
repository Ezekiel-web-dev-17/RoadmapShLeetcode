2594. Minimum Time to Repair Cars
      Medium
      Topics
      premium lock icon
      Companies
      Hint
      You are given an integer array ranks representing the ranks of some mechanics. ranksi is the rank of the ith mechanic. A mechanic with a rank r can repair n cars in r \* n2 minutes.

You are also given an integer cars representing the total number of cars waiting in the garage to be repaired.

Return the minimum time taken to repair all the cars.

Note: All the mechanics can repair the cars simultaneously.

Example 1:

Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation:

- The first mechanic will repair two cars. The time required is 4 _ 2 _ 2 = 16 minutes.
- The second mechanic will repair two cars. The time required is 2 _ 2 _ 2 = 8 minutes.
- The third mechanic will repair two cars. The time required is 3 _ 2 _ 2 = 12 minutes.
- The fourth mechanic will repair four cars. The time required is 1 _ 4 _ 4 = 16 minutes.
  It can be proved that the cars cannot be repaired in less than 16 minutes.​​​​​
  Example 2:

Input: ranks = [5,1,8], cars = 6
Output: 16
Explanation:

- The first mechanic will repair one car. The time required is 5 _ 1 _ 1 = 5 minutes.
- The second mechanic will repair four cars. The time required is 1 _ 4 _ 4 = 16 minutes.
- The third mechanic will repair one car. The time required is 8 _ 1 _ 1 = 8 minutes.
  It can be proved that the cars cannot be repaired in less than 16 minutes.​​​​​

Constraints:

1 <= ranks.length <= 105
1 <= ranks[i] <= 100
1 <= cars <= 106

Seen this question in a real interview before?
1/6
Yes
No
Accepted
160,217/270.5K
Acceptance Rate
59.2%
Topics
Staff
Array
Binary Search
Biweekly Contest 100
icon
Companies
Hint 1
For a predefined fixed time, can all the cars be repaired?
Hint 2
Try using binary search on the answer.
Similar Questions
Sort Transformed Array
Medium
Koko Eating Bananas
Medium
