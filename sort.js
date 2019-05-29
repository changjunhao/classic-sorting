exports.bubbleSort = (arr) => {
  const len = arr.length
  let temp
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

exports.selectionSort = (arr) => {
  const len = arr.length
  let minIndex,
    temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) { // 寻找最小的数
        minIndex = j // 将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

const insertionSort = (arr) => {
  const len = arr.length
  let preIndex,
    current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}
exports.insertionSort = insertionSort

exports.shellSort = (arr) => {
  const len = arr.length
  let temp, j
  let gap = 1
  while (gap < len / 3) { // 动态定义间隔序列
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}

const merge = (left, right) => {
  const result = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) { result.push(left.shift()) }
  while (right.length) { result.push(right.shift()) }
  return result
}
const mergeSort = (arr) => { // 采用自上而下的递归方法
  const len = arr.length
  if (len < 2) {
    return arr
  }
  const middle = Math.floor(len / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}
exports.mergeSort = mergeSort

const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
const partition = (arr, left, right) => { // 分区操作
  const pivot = left // 设定基准值（pivot）
  let index = pivot + 1
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  swap(arr, pivot, index - 1)
  return index - 1
}
const quickSort = (arr, left, right) => {
  const len = arr.length
  left = typeof left !== 'number' ? 0 : left
  right = typeof right !== 'number' ? len - 1 : right
  let partitionIndex
  if (left < right) {
    partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}
exports.quickSort = quickSort

exports.radixSort = (arr, maxDigit) => {
  let mod = 10
  let dev = 1
  const counter = []
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      const bucket = parseInt((arr[j] % mod) / dev)
      if (!counter[bucket]) {
        counter[bucket] = []
      }
      counter[bucket].push(arr[j])
    }
    let pos = 0
    for (let j = 0; j < counter.length; j++) {
      let value = null
      if (counter[j]) {
        while ((value = counter[j].shift())) {
          arr[pos++] = value
        }
      }
    }
  }
  return arr
}

exports.bucketSort = (arr, bucketSize) => {
  if (arr.length === 0) {
    return arr
  }
  let i
  let minValue = arr[0]
  let maxValue = arr[0]
  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i] // 输入数据的最小值
    } else if (arr[i] > maxValue) {
      maxValue = arr[i] // 输入数据的最大值
    }
  }
  // 桶的初始化
  const DEFAULT_BUCKET_SIZE = 5 // 设置桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  const buckets = new Array(bucketCount)
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = []
  }
  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
  }
  arr.length = 0
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]) // 对每个桶进行排序，这里使用了插入排序
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j])
    }
  }
  return arr
}

exports.countingSort = (arr, maxValue) => {
  const bucket = new Array(maxValue + 1)
  let sortedIndex = 0
  const arrLen = arr.length
  const bucketLen = maxValue + 1
  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0
    }
    bucket[arr[i]]++
  }
  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j
      bucket[j]--
    }
  }
  return arr
}

let len // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
const buildMaxHeap = (arr) => { // 建立大顶堆
  len = arr.length
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}
const heapify = (arr, i) => { // 堆调整
  let left = 2 * i + 1
  let right = 2 * i + 2
  let largest = i
  if (left < len && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < len && arr[right] > arr[largest]) {
    largest = right
  }
  if (largest !== i) {
    swap(arr, i, largest)
    heapify(arr, largest)
  }
}
exports.heapSort = (arr) => {
  buildMaxHeap(arr)
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i)
    len--
    heapify(arr, 0)
  }
  return arr
}
