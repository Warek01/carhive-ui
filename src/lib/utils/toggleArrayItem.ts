/**
 * Remove item if present in array, otherwise push it
 * @returns New array with toggle item
 * */
const toggleArrayItem = <T>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((elem) => elem !== item) : [...arr, item]

export default toggleArrayItem
