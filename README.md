# classic-sorting

十大经典排序算法的 TypeScript 实现。

## 安装

```bash
npm install classic-sorting
```

## 使用

```ts
import { bubbleSort, quickSort, mergeSort, countingSort } from 'classic-sorting'

// 比较类排序（原地排序，返回原数组引用）
bubbleSort([5, 2, 8, 1, 9])  // [1, 2, 5, 8, 9]
quickSort([5, 2, 8, 1, 9])   // [1, 2, 5, 8, 9]

// 归并排序（返回新数组，不修改原数组）
const arr = [3, 1, 2]
mergeSort(arr)  // [1, 2, 3]，原数组不变

// 计数排序（需要 maxValue 参数）
countingSort([5, 2, 8, 1, 9], 9)  // [1, 2, 5, 8, 9]

// 基数排序（需要 maxDigit 参数）
radixSort([10, 200, 3000, 40, 5], 4)  // [5, 10, 40, 200, 3000]

// 桶排序（可选 bucketSize，默认 5）
bucketSort([5, 2, 8, 1, 9], 3)  // [1, 2, 5, 8, 9]
```

## 算法一览

| 算法 | 函数 | 时间复杂度（平均） | 空间复杂度 | 稳定性 | 原地排序 |
|------|------|--------------------|------------|--------|----------|
| 冒泡排序 | `bubbleSort` | \(O(n^2)\) | \(O(1)\) | 稳定 | ✅ |
| 选择排序 | `selectionSort` | \(O(n^2)\) | \(O(1)\) | 不稳定 | ✅ |
| 插入排序 | `insertionSort` | \(O(n^2)\) | \(O(1)\) | 稳定 | ✅ |
| 希尔排序 | `shellSort` | \(O(n \log^2 n)\) | \(O(1)\) | 不稳定 | ✅ |
| 归并排序 | `mergeSort` | \(O(n \log n)\) | \(O(n)\) | 稳定 | ❌ |
| 快速排序 | `quickSort` | \(O(n \log n)\) | \(O(\log n)\) | 不稳定 | ✅ |
| 堆排序 | `heapSort` | \(O(n \log n)\) | \(O(1)\) | 不稳定 | ✅ |
| 计数排序 | `countingSort` | \(O(n + k)\) | \(O(k)\) | 稳定 | ✅ |
| 桶排序 | `bucketSort` | \(O(n + k)\) | \(O(n + k)\) | 稳定 | ✅ |
| 基数排序 | `radixSort` | \(O(d \cdot (n + k))\) | \(O(n + k)\) | 稳定 | ✅ |

## API

### `bubbleSort(arr: number[]): number[]`
重复遍历数组，比较相邻元素并交换，每轮将最大元素"浮"到最后。优化：若某轮无交换则提前退出。

### `selectionSort(arr: number[]): number[]`
每轮选出未排序部分的最小元素，与当前轮首位置交换。

### `insertionSort(arr: number[]): number[]`
将未排序元素依次插入到已排序区段的正确位置，对小规模或基本有序的数据效率很高。

### `shellSort(arr: number[]): number[]`
插入排序的改进版，按间隔 gap 分组进行插入排序，逐步缩小 gap 至 1。使用 Knuth 序列。

### `mergeSort(arr: number[]): number[]`
分治策略，递归地将数组拆成两半，分别排序后再合并。返回新数组，原数组不变。

### `quickSort(arr: number[], left?: number, right?: number): number[]`
选取 pivot，将小于 pivot 的放左边、大于的放右边，递归排序两侧。使用三数取中法优化 pivot 选取。

### `heapSort(arr: number[]): number[]`
利用大顶堆不断取出堆顶（最大值）放到数组末尾。

### `countingSort(arr: number[], maxValue: number): number[]`
统计每个值出现的次数，按顺序输出。仅支持 `[0, maxValue]` 范围内的非负整数。元素超出范围时抛出 `RangeError`。

### `bucketSort(arr: number[], bucketSize?: number): number[]`
将数据按范围分配到多个桶中，每个桶内使用插入排序，最后拼接。

### `radixSort(arr: number[], maxDigit: number): number[]`
从低位到高位（LSD）按每个数位分别进行计数排序。仅支持非负整数。

## 开发

```bash
npm install      # 安装依赖
npm run build    # 构建
npm test         # 运行测试
npm run lint     # 代码检查
```

## License

[MIT](LICENSE)
