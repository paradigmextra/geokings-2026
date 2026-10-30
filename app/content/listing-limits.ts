export const MAX_PROPERTY_PHOTOS = 6;
export const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
export const MAX_DESCRIPTION_WORDS = 300;
export const countWords = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;
