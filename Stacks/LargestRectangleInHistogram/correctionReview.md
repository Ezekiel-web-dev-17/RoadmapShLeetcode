# Largest Rectangle in Histogram — Deep Review

## What Your Intuition Gets Right

Your core idea is actually sound:

> "For each bar, find how far left and right it can stretch as a rectangle."

That **is** the correct question to ask. Every bar defines a potential rectangle whose height equals that bar. The area is `height × width`, where width = how many consecutive bars (including itself) are ≥ that height. The answer is the maximum across all bars.

Your "fly over" analogy is also the right instinct — when you hit a shorter bar, taller bars behind it can't extend through it. That's exactly the insight that makes the monotonic stack work.

---

## The Three Problems With Your Approach

### Problem 1: You only pop ONE element — but multiple may need popping

```js
if (heights[i] < stack[stack.length - 1][1]) {
    let popped = stack.pop();  // ← only one pop
    ...
}
```

Walk through `[2, 5, 6, 1]`:

```
i=0: stack = [2]
i=1: 5 > 2, push.   stack = [2, 5]
i=2: 6 > 5, push.   stack = [2, 5, 6]
i=3: 1 < 6, pop 6.  stack = [2, 5]  ← but 5 > 1 and 2 > 1 too!
```

Height 5 and height 2 also can't extend past this point, but they never get popped. Your `forEach` at the end partially compensates (it processes what's left on the stack), but the popped area formula is different from the forEach formula, so results are inconsistent.

> [!IMPORTANT]
> The standard approach uses a `while` loop: keep popping as long as the top of the stack is taller than the current bar.

---

### Problem 2: The recursion defeats the purpose of the stack — O(n²) instead of O(n)

```js
startIndex = recursion(heights[i], i);           // walks left — O(n)
stack.push([..., recursion(heights[i], i, +1)]);  // walks right — O(n)
```

For **every** element, you walk left and right through the array to find boundaries. That's O(n) work per element → **O(n²) total**.

The entire reason we use a monotonic stack is to avoid this. The stack gives you both boundaries **for free**:
- **Left boundary**: when you push a bar, whatever is currently on top of the stack is the nearest shorter bar to the left
- **Right boundary**: when a bar gets popped, whatever caused the pop (the current index `i`) is the nearest shorter bar to the right

No recursion needed. Each element is pushed and popped at most once → **O(n) total**.

---

### Problem 3: Two different area formulas create confusion

When popping (line 14):
```js
poppedArea = popped[1] * (popped[2] - popped[0] + 1);
//           height    × (originalIndex - startIndex + 1)
```

In forEach (line 35):
```js
width = area[3] - area[0];
//      rightBound - startIndex    (exclusive right boundary)
```

These are two fundamentally different calculations for what should be the same thing. This is a sign that the data model (`[startIndex, height, originalIndex, rightBound]`) is carrying redundant or conflicting information.

---

## The Mental Model That Sticks

### Think of it like a game of Tetris columns

Imagine you're scanning bars left to right, stacking them up. You maintain one rule:

> **The stack must always be in increasing height order** (monotonic increasing).

When a new bar **violates** this rule (it's shorter than the top), you resolve it by popping taller bars until the rule holds again. Each popped bar has now "found its boundaries" — it can't go any further.

### The three key moments:

```
┌─────────────────────────────────────────────────────┐
│  When you PUSH bar[i]:                              │
│    The bar below it on the stack (or -1 if empty)   │
│    is the left boundary.                            │
│                                                     │
│  When you POP bar[j] (because bar[i] is shorter):   │
│    index i is the right boundary.                   │
│    width = i - leftBoundary - 1                     │
│    area  = height × width                           │
│                                                     │
│  After the loop, POP everything remaining:          │
│    Their right boundary is heights.length            │
│    (they never met a shorter bar to the right).     │
└─────────────────────────────────────────────────────┘
```

### Visual example: `[2, 1, 5, 6, 2, 3]`

```
         ┌┐
       ┌┐││
       ││││  ┌┐
 ┌┐    ││││┌┐││
 ││ ┌┐ ││││││││
 ││ ││ ││││││││
 2  1  5  6  2  3    heights
 0  1  2  3  4  5    indices
```

The stack stores **indices** (not full tuples). Heights are looked up from the array.

```
i=0: push 0.         stack = [0]       — heights: [2]
i=1: 1 < 2 → pop 0.
       popped height = 2
       right boundary = 1, left boundary = -1 (stack empty)
       width = 1 - (-1) - 1 = 1, area = 2 × 1 = 2
     push 1.          stack = [1]       — heights: [1]

i=2: 5 > 1 → push 2. stack = [1, 2]   — heights: [1, 5]
i=3: 6 > 5 → push 3. stack = [1,2,3]  — heights: [1, 5, 6]

i=4: 2 < 6 → pop 3.
       height = 6, right = 4, left = stack.top = 2
       width = 4 - 2 - 1 = 1, area = 6
     2 < 5 → pop 2.
       height = 5, right = 4, left = stack.top = 1
       width = 4 - 1 - 1 = 2, area = 10  ★ this is the answer
     2 ≥ 1 → stop popping.
     push 4.          stack = [1, 4]    — heights: [1, 2]

i=5: 3 > 2 → push 5. stack = [1,4,5]  — heights: [1, 2, 3]

Done. Pop remaining:
  pop 5: height=3, right=6, left=4, width=6-4-1=1, area=3
  pop 4: height=2, right=6, left=1, width=6-1-1=4, area=8
  pop 1: height=1, right=6, left=-1, width=6-(-1)-1=6, area=6

Max = 10 ✓
```

### The clean implementation:

```js
var largestRectangleArea = function(heights) {
    let stack = [];  // stores indices
    let max = 0;

    for (let i = 0; i <= heights.length; i++) {
        // treat end of array as height 0 to flush remaining bars
        let currHeight = i === heights.length ? 0 : heights[i];

        while (stack.length && currHeight < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()];
            let left = stack.length ? stack[stack.length - 1] : -1;
            let width = i - left - 1;
            max = Math.max(max, height * width);
        }

        stack.push(i);
    }

    return max;
};
```

Notice:
- **Stack stores indices only** — heights are looked up from the array
- **`while` loop**, not `if` — pops ALL taller bars
- **One area formula** everywhere: `height × (right - left - 1)`
- **`i <= heights.length`** with a virtual height-0 bar at the end — this naturally flushes all remaining bars, no separate `forEach` needed
- **No recursion** — the stack itself tracks the boundaries
- **O(n) time** — each index is pushed and popped at most once

---

## Comparing Your Approach to the Standard

| Aspect | Your Approach | Standard Monotonic Stack |
|--------|--------------|------------------------|
| Stack stores | `[start, height, index, rightBound]` | Just the index |
| Finding left boundary | Recursion (walks left) | Stack top after popping = left boundary |
| Finding right boundary | Recursion (walks right) | Current index `i` = right boundary |
| Popping | One `if` (single pop) | `while` loop (all taller bars) |
| Area computation | Two formulas (pop vs forEach) | One formula everywhere |
| Time complexity | O(n²) | O(n) |
| When areas are computed | Some at pop time, rest in forEach | All at pop time |

---

## The Pattern to Remember

This pattern appears in many problems. The core template is:

> **"Maintain a monotonic stack. When the invariant breaks, pop and process."**

You'll see it in:
- **Largest Rectangle in Histogram** — pop when shorter bar appears
- **Trapping Rain Water** — pop when taller bar appears (monotonic decreasing)
- **Next Greater Element** — pop when greater element appears
- **Daily Temperatures** — same idea, find next warmer day
- **Sum of Subarray Minimums** — find boundaries of where each element is the minimum
- **Maximal Rectangle (2D)** — this exact problem applied row by row

The mental anchor: **the stack tracks "unresolved" bars. A bar gets resolved (popped) when something arrives that makes its boundary clear.** No need to search left/right — the stack already has that information baked in.
