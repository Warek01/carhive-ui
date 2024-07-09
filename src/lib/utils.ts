import { UserRole } from '@faf-cars/lib/user';

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('Failed to read file as base64'));
    };

    reader.onerror = (error) => reject(error);
  });
}

export function getUserRoles(
  roles: string | string[] | undefined | null,
): UserRole[] {
  if (!roles) return [];
  return (typeof roles === 'string' ? [roles] : roles) as unknown as UserRole[];
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
