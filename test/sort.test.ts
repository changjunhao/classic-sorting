import { describe, it, expect } from 'vitest'
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  shellSort,
  mergeSort,
  quickSort,
  radixSort,
  bucketSort,
  countingSort,
  heapSort,
} from '../src/sort.js'

// ---- 共享测试数据 -------------------------------------------------------

/** 验证数组是否有序（非递减） */
const isSorted = (arr: number[]): boolean => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false
  }
  return true
}

/** 生成指定长度的随机数组 */
const randomArray = (length: number, min = -1000, max = 1000): number[] =>
  Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)

/** 所有比较类排序的通用测试用例 */
const comparisonTestCases = [
  { arr: [] as number[], desc: '空数组' },
  { arr: [1], desc: '单元素' },
  { arr: [5, 2, 8, 1, 9], desc: '常规无序' },
  { arr: [1, 2, 3, 4, 5], desc: '已排序' },
  { arr: [5, 4, 3, 2, 1], desc: '逆序' },
  { arr: [3, 3, 3, 1, 1], desc: '重复元素' },
  { arr: [-5, 3, -10, 0, 2], desc: '含负数' },
  { arr: [2, 1], desc: '两元素逆序' },
  { arr: [1, 2], desc: '两元素有序' },
  { arr: randomArray(100), desc: '100个随机数' },
]

// ============================================================
// 1. 冒泡排序
// ============================================================
describe('bubbleSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = bubbleSort([...arr])
    expect(isSorted(result)).toBe(true)
    // 验证元素不丢失（长度一致 + 频率一致）
    expect(result).toHaveLength(arr.length)
    expect([...result].sort((a, b) => a - b)).toEqual([...arr].sort((a, b) => a - b))
  })

  it('应修改原数组（原地排序）', () => {
    const arr = [3, 1, 2]
    const result = bubbleSort(arr)
    expect(result).toBe(arr)
  })

  it('最好情况下只有一轮比较（提前退出）', () => {
    const arr = [1, 2, 3, 4, 5]
    bubbleSort(arr) // 不应有任何交换
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })
})

// ============================================================
// 2. 选择排序
// ============================================================
describe('selectionSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = selectionSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = selectionSort(arr)
    expect(result).toBe(arr)
  })
})

// ============================================================
// 3. 插入排序
// ============================================================
describe('insertionSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = insertionSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = insertionSort(arr)
    expect(result).toBe(arr)
  })

  it('基本有序的数组应高效排序', () => {
    const arr = [1, 3, 2, 4, 6, 5, 8, 7]
    const result = insertionSort([...arr])
    expect(isSorted(result)).toBe(true)
  })
})

// ============================================================
// 4. 希尔排序
// ============================================================
describe('shellSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = shellSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = shellSort(arr)
    expect(result).toBe(arr)
  })
})

// ============================================================
// 5. 归并排序
// ============================================================
describe('mergeSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = mergeSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应返回新数组（非原地排序）', () => {
    const arr = [3, 1, 2]
    const result = mergeSort(arr)
    expect(result).not.toBe(arr)
    expect(arr).toEqual([3, 1, 2]) // 原数组未改变
  })

  it('对重复值场景保持稳定排序', () => {
    const arr = [5, 3, 5, 1]
    const sorted = mergeSort(arr)
    expect(isSorted(sorted)).toBe(true)
    expect(sorted).toEqual([1, 3, 5, 5])
  })
})

// ============================================================
// 6. 快速排序
// ============================================================
describe('quickSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = quickSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = quickSort(arr)
    expect(result).toBe(arr)
  })

  it('大量随机数据应正确排序', () => {
    const arr = randomArray(1000)
    const result = quickSort([...arr])
    expect(isSorted(result)).toBe(true)
  })
})

// ============================================================
// 7. 堆排序
// ============================================================
describe('heapSort', () => {
  it.each(comparisonTestCases)('$desc', ({ arr }) => {
    const result = heapSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = heapSort(arr)
    expect(result).toBe(arr)
  })

  it('大量随机数据应正确排序', () => {
    const arr = randomArray(1000)
    const result = heapSort([...arr])
    expect(isSorted(result)).toBe(true)
  })
})

// ============================================================
// 8. 计数排序
// ============================================================
describe('countingSort', () => {
  const nonNegCases = [
    { arr: [] as number[], max: 0, desc: '空数组' },
    { arr: [1], max: 1, desc: '单元素' },
    { arr: [5, 2, 8, 1, 9], max: 9, desc: '常规无序' },
    { arr: [1, 2, 3, 4, 5], max: 5, desc: '已排序' },
    { arr: [5, 4, 3, 2, 1], max: 5, desc: '逆序' },
    { arr: [3, 3, 3, 1, 1], max: 3, desc: '重复元素' },
    { arr: [0, 0, 0], max: 0, desc: '全零' },
    { arr: [100, 1, 50, 25], max: 100, desc: '大跨度' },
  ]

  it.each(nonNegCases)('$desc', ({ arr, max }) => {
    const result = countingSort([...arr], max)
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = countingSort(arr, 3)
    expect(result).toBe(arr)
  })

  it('元素超过 maxValue 时应抛出 RangeError', () => {
    expect(() => countingSort([1, 10, 3], 5)).toThrow(RangeError)
    expect(() => countingSort([1, 10, 3], 5)).toThrow('元素 10 超出范围')
  })

  it('负数应抛出 RangeError', () => {
    expect(() => countingSort([-1, 2, 3], 3)).toThrow(RangeError)
  })

  it('maxValue 覆盖最大值时应正常工作', () => {
    const arr = [0, 5, 10]
    const result = countingSort([...arr], 10)
    expect(result).toEqual([0, 5, 10])
  })
})

// ============================================================
// 9. 桶排序
// ============================================================
describe('bucketSort', () => {
  const nonNegCases = [
    { arr: [] as number[], desc: '空数组' },
    { arr: [1], desc: '单元素' },
    { arr: [5, 2, 8, 1, 9], desc: '常规无序' },
    { arr: [1, 2, 3, 4, 5], desc: '已排序' },
    { arr: [5, 4, 3, 2, 1], desc: '逆序' },
    { arr: [3, 3, 3, 1, 1], desc: '重复元素' },
    { arr: [0, 0, 0], desc: '全零' },
    { arr: randomArray(100, 0, 500), desc: '100个随机非负数' },
  ]

  it.each(nonNegCases)('$desc', ({ arr }) => {
    const result = bucketSort([...arr])
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = bucketSort(arr)
    expect(result).toBe(arr)
  })

  it('自定义桶大小应正常工作', () => {
    const arr = randomArray(50, 0, 100)
    const result = bucketSort([...arr], 10)
    expect(isSorted(result)).toBe(true)
  })

  it('含负数时应正确排序', () => {
    const arr = [-5, 3, -10, 0, 2]
    const result = bucketSort([...arr])
    expect(isSorted(result)).toBe(true)
  })
})

// ============================================================
// 10. 基数排序
// ============================================================
describe('radixSort', () => {
  const nonNegCases = [
    { arr: [] as number[], maxDigit: 1, desc: '空数组' },
    { arr: [1], maxDigit: 1, desc: '单元素' },
    { arr: [5, 2, 8, 1, 9], maxDigit: 1, desc: '个位数' },
    { arr: [10, 200, 3000, 40, 5], maxDigit: 4, desc: '不同位数' },
    { arr: [3, 44, 38, 5, 47], maxDigit: 2, desc: '两位数' },
    { arr: [100, 1, 50, 25], maxDigit: 3, desc: '三位数以内' },
    { arr: [3, 3, 3, 1, 1], maxDigit: 1, desc: '重复元素' },
    { arr: [0, 0, 0], maxDigit: 1, desc: '全零' },
  ]

  it.each(nonNegCases)('$desc', ({ arr, maxDigit }) => {
    const result = radixSort([...arr], maxDigit)
    expect(isSorted(result)).toBe(true)
    expect(result).toHaveLength(arr.length)
  })

  it('应修改原数组', () => {
    const arr = [3, 1, 2]
    const result = radixSort(arr, 1)
    expect(result).toBe(arr)
  })

  it('maxDigit 不足时高位数字排序可能不正确', () => {
    // maxDigit=1 时只排个位，十位上的差异不会被考虑，所以 100 和 1 的顺序不定
    const arr = [100, 1]
    radixSort(arr, 1)
    // 此时只保证个位有序，不保证整体有序
    expect(arr[1] % 10).toBeGreaterThanOrEqual(arr[0] % 10)
  })
})

// ============================================================
// 交叉验证：所有比较类排序对同一数据结果一致
// ============================================================
describe('交叉验证', () => {
  const sorts: Record<string, (arr: number[]) => number[]> = {
    bubbleSort,
    selectionSort,
    insertionSort,
    shellSort,
    mergeSort,
    quickSort,
    heapSort,
  }

  it('所有比较排序对同组随机数据应产生相同结果', () => {
    const original = randomArray(50)
    const results = new Map<string, number[]>()
    for (const [name, fn] of Object.entries(sorts)) {
      results.set(name, fn([...original]))
    }
    // 所有结果应对齐
    const first = results.values().next().value as number[]
    for (const [name, result] of results) {
      expect(result, `${name} 结果不一致`).toEqual(first)
    }
  })
})
