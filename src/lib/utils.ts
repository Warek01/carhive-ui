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

export const objectToFormData = (obj: object) => {
  const formData = new FormData();

  for (const [field, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.flat().forEach((v) => formData.append(field, v));
    } else {
      formData.append(field, value);
    }
  }

  return formData;
};

// const debounce = <T extends Function>(cb: T, delay: number) => {
//   let timerId: NodeJS.Timeout;
//
//   const callable = (...args: any) => {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => cb(...args), delay);
//   };
//
//   return <T>(<any>callable);
// };
