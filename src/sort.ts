// ============================================================
// 十大经典排序算法
// ============================================================

// ---- 工具函数 -------------------------------------------------
/** 交换数组中两个位置的值 */
const swap = (arr: number[], i: number, j: number): void => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/** 三数取中：取 arr[left]、arr[mid]、arr[right] 的中位数作为 pivot 并交换到 left 位置 */
const medianOfThree = (arr: number[], left: number, right: number): void => {
  const mid = Math.floor((left + right) / 2)
  if (arr[left] > arr[mid]) swap(arr, left, mid)
  if (arr[left] > arr[right]) swap(arr, left, right)
  if (arr[mid] > arr[right]) swap(arr, mid, right)
  // 将中位数放到 left 位置作为 pivot
  swap(arr, left, mid)
}

// ============================================================
// 1. 冒泡排序 Bubble Sort
//    重复遍历数组，比较相邻元素，如果逆序就交换。每一轮把最大的元素"浮"到最后。
//    优化：若某轮没有发生交换则提前终止 —— 最好 O(n)，最坏 O(n²)
// ============================================================
export const bubbleSort = (arr: number[]): number[] => {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let swapped = false // 本轮是否发生过交换
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        swapped = true
      }
    }
    if (!swapped) break // 没有交换说明已经有序，提前退出
  }
  return arr
}

// ============================================================
// 2. 选择排序 Selection Sort
//    每轮选出未排序部分的最小元素，与当前轮首位置交换。
//    时间复杂度 O(n²)，不稳定。
// ============================================================
export const selectionSort = (arr: number[]): number[] => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i // 假定当前位置为最小
    // 在未排序区寻找真正的最小值
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) swap(arr, i, minIndex)
  }
  return arr
}

// ============================================================
// 3. 插入排序 Insertion Sort
//    将未排序元素依次插入到已排序区段的正确位置。
//    时间复杂度 O(n²)，对小规模数据或"基本有序"的数组效率很高。
// ============================================================
export const insertionSort = (arr: number[]): number[] => {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    const current = arr[i] // 待插入的元素
    let j = i - 1
    // 将大于 current 的元素依次右移
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = current // 插入到正确位置
  }
  return arr
}

// ============================================================
// 4. 希尔排序 Shell Sort
//    插入排序的改进版。按间隔 gap 分组进行插入排序，逐步缩小 gap 至 1。
//    使用 Knuth 序列 gap = 1, 4, 13, 40, ...（gap = 3*gap + 1）。
//    时间复杂度 O(n log² n)，不稳定。
// ============================================================
export const shellSort = (arr: number[]): number[] => {
  const len = arr.length
  // 计算 Knuth 序列的最大 gap
  let gap = 1
  while (gap < len / 3) {
    gap = gap * 3 + 1
  }
  // 逐步缩小 gap 进行分组插入排序
  for (; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      const temp = arr[i]
      let j = i
      // gap 间隔的插入排序
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap]
      }
      arr[j] = temp
    }
  }
  return arr
}

// ============================================================
// 5. 归并排序 Merge Sort
//    分治策略：将数组递归地拆成两半，分别排序后再合并。
//    时间复杂度 O(n log n)，稳定。
//    优化：合并使用双指针而非 .shift()，保证合并阶段 O(n)。
// ============================================================

/** 合并两个有序数组，双指针实现 O(n) */
const merge = (left: number[], right: number[]): number[] => {
  const result = new Array<number>(left.length + right.length)
  let i = 0 // left 指针
  let j = 0 // right 指针
  let k = 0 // result 指针
  // 双指针比较，取较小值放入结果
  while (i < left.length && j < right.length) {
    result[k++] = left[i] <= right[j] ? left[i++] : right[j++]
  }
  // 将剩余元素追加到结果
  while (i < left.length) result[k++] = left[i++]
  while (j < right.length) result[k++] = right[j++]
  return result
}

export const mergeSort = (arr: number[]): number[] => {
  if (arr.length < 2) return arr // 递归出口：长度 ≤1 时已经有序
  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  // 递归排序左右两半再合并
  return merge(mergeSort(left), mergeSort(right))
}

// ============================================================
// 6. 快速排序 Quick Sort
//    分治策略：选取 pivot，将小于 pivot 的放左边、大于的放右边，再递归排序两侧。
//    时间复杂度 O(n log n)，最坏 O(n²)，不稳定。
//    优化：三数取中法选 pivot，避免在已排序/逆序数组上退化。
// ============================================================

/** Lomuto 分区：将小于 pivot 的元素移到左侧，返回 pivot 最终位置 */
const partition = (arr: number[], left: number, right: number): number => {
  const pivotValue = arr[left] // pivot 已在 left（由 medianOfThree 保证为三数中值）
  let storeIndex = left + 1
  // 扫描并把小于 pivot 的元素交换到 storeIndex 位置
  for (let i = storeIndex; i <= right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, storeIndex)
      storeIndex++
    }
  }
  // 将 pivot 放到正确位置
  swap(arr, left, storeIndex - 1)
  return storeIndex - 1
}

export const quickSort = (arr: number[], left?: number, right?: number): number[] => {
  const lo = left ?? 0
  const hi = right ?? arr.length - 1
  if (lo < hi) {
    // 三数取中，避免最坏情况
    medianOfThree(arr, lo, hi)
    const pivotIndex = partition(arr, lo, hi)
    quickSort(arr, lo, pivotIndex - 1) // 递归排序左半
    quickSort(arr, pivotIndex + 1, hi) // 递归排序右半
  }
  return arr
}

// ============================================================
// 7. 堆排序 Heap Sort
//    利用大顶堆（父节点 ≥ 子节点）不断取出堆顶（最大值）放到数组末尾。
//    时间复杂度 O(n log n)，不稳定。
// ============================================================

let heapLen: number // buildMaxHeap 和 heapify 共享的堆大小

/** 自底向上建堆（大顶堆） */
const buildMaxHeap = (arr: number[]): void => {
  heapLen = arr.length
  // 从最后一个非叶子节点开始向下调整
  for (let i = Math.floor(heapLen / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}

/** 以 i 为根的子树做堆调整（下沉） */
const heapify = (arr: number[], i: number): void => {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let largest = i
  // 找出父、左子、右子中最大的
  if (left < heapLen && arr[left] > arr[largest]) largest = left
  if (right < heapLen && arr[right] > arr[largest]) largest = right
  if (largest !== i) {
    swap(arr, i, largest) // 交换并继续向下调整
    heapify(arr, largest)
  }
}

export const heapSort = (arr: number[]): number[] => {
  buildMaxHeap(arr)
  // 依次将堆顶（最大）与末尾交换，缩小堆并重新调整
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i)
    heapLen--
    heapify(arr, 0)
  }
  return arr
}

// ============================================================
// 8. 计数排序 Counting Sort
//    统计每个值出现的次数，按顺序输出。适用于整数且范围不大的场景。
//    时间复杂度 O(n + k)，k = maxValue，稳定。
//    限制：仅支持 [0, maxValue] 范围内的非负整数。
// ============================================================
export const countingSort = (arr: number[], maxValue: number): number[] => {
  if (arr.length === 0) return arr
  // 计数数组，fill(0) 避免 undefined 判断
  const count: number[] = new Array(maxValue + 1).fill(0)
  // 统计每个数字出现的次数
  for (const num of arr) {
    if (num < 0 || num > maxValue) {
      throw new RangeError(`countingSort: 元素 ${num} 超出范围 [0, ${maxValue}]`)
    }
    count[num]++
  }
  // 按顺序回填
  let sortedIndex = 0
  for (let val = 0; val <= maxValue; val++) {
    while (count[val]-- > 0) {
      arr[sortedIndex++] = val
    }
  }
  return arr
}

// ============================================================
// 9. 桶排序 Bucket Sort
//    将数据按范围分配到多个桶中，每个桶内使用插入排序，最后拼接。
//    时间复杂度 O(n + k) ~ O(n²)，取决于桶内排序效率。
//    限制：仅支持非负数（负数无法正确分配到桶）。
// ============================================================
export const bucketSort = (arr: number[], bucketSize = 5): number[] => {
  if (arr.length === 0) return arr
  // 找出最大值和最小值
  let minVal = arr[0]
  let maxVal = arr[0]
  for (const num of arr) {
    if (num < minVal) minVal = num
    if (num > maxVal) maxVal = num
  }
  // 确定桶的数量
  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1
  const buckets: number[][] = Array.from({ length: bucketCount }, () => [])
  // 将每个元素放入对应桶中
  for (const num of arr) {
    buckets[Math.floor((num - minVal) / bucketSize)].push(num)
  }
  // 对每个桶排序后合并
  let pos = 0
  for (const bucket of buckets) {
    insertionSort(bucket) // 桶内使用插入排序
    for (const val of bucket) {
      arr[pos++] = val
    }
  }
  return arr
}

// ============================================================
// 10. 基数排序 Radix Sort
//     从低位到高位（LSD）按每个数位分别进行计数排序。
//     时间复杂度 O(d × (n + k))，d = 最大位数，稳定。
//     限制：仅支持非负整数（负数需特殊处理）。
// ============================================================
export const radixSort = (arr: number[], maxDigit: number): number[] => {
  let mod = 10
  let dev = 1
  // 逐位进行计数排序（LSD 最低位优先）
  for (let d = 0; d < maxDigit; d++, dev *= 10, mod *= 10) {
    // 10 个桶（0-9），直接预分配避免运行时判断
    const buckets: number[][] = Array.from({ length: 10 }, () => [])
    // 按当前位分配到桶
    for (const num of arr) {
      const digit = Math.floor((num % mod) / dev)
      buckets[digit].push(num)
    }
    // 按桶顺序写回原数组
    let pos = 0
    for (const bucket of buckets) {
      for (const val of bucket) {
        arr[pos++] = val
      }
    }
  }
  return arr
}
