/**
 * Cloudinary configuration for admin-panel image uploads.
 *
 * SETUP (one time, ~2 minutes):
 * 1. Create a free account at https://cloudinary.com
 * 2. Your Cloud name is shown at the top of the dashboard — paste it below.
 * 3. Go to Settings (gear icon) → Upload → Upload presets → "Add upload preset".
 *    - Set "Signing Mode" to **Unsigned** and Save.
 *    - Optionally restrict it: Allowed formats = jpg,png,webp · Max file size = 10MB.
 * 4. Paste the preset name below.
 *
 * Uploads go straight from the browser to Cloudinary — no CORS setup needed.
 */
export const CLOUDINARY_CLOUD_NAME = '';

export const CLOUDINARY_UPLOAD_PRESET = '';

export function isCloudinaryConfigured(): boolean {
  return CLOUDINARY_CLOUD_NAME.trim() !== '' && CLOUDINARY_UPLOAD_PRESET.trim() !== '';
}
