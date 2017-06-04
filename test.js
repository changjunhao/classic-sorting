const sort = require('./sort')

const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 15, 46, 4, 19, 50, 48, 124]
console.log(sort.radixSort(arr, 3))
console.log(sort.heapSort(arr))
console.log(sort.countingSort(arr, 50))
