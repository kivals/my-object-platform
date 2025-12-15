export const DOCUMENT_EXTENSIONS = ['.doc', '.odt', '.pdf', '.docx'] as const;
export const PHOTO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const;

export const ACCEPT_DOCUMENTS = DOCUMENT_EXTENSIONS.join(',');
export const ACCEPT_PHOTOS = PHOTO_EXTENSIONS.join(',');
