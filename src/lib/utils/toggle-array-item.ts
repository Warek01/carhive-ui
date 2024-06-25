/**
 * Remove item if present in array, otherwise push it
 * @returns New array with toggle item
 * */
export default function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item)
    ? arr.filter((elem) => elem !== item)
    : arr.concat(item)
}
