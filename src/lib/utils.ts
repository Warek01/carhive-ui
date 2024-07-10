export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error(`Failed to read file "${file.name}" as base64`));
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}

/**
 * Remove item if present in array, otherwise push it
 * @returns New array with toggle item
 * */
export function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item)
    ? arr.filter((elem) => elem !== item)
    : arr.concat(item);
}
