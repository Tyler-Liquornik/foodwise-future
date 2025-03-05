
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Detects if the current device is a mobile device
 * @returns boolean indicating if the device is mobile
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent || navigator.vendor
  )
}

/**
 * Returns appropriate platform-specific terminology
 * @returns Object containing platform-specific terms
 */
export function getPlatformTerms() {
  const isMobile = isMobileDevice()
  
  return {
    tap: isMobile ? "tap" : "click",
    cameraAccessText: isMobile ? "Access Camera Roll" : "Upload Photo",
    cameraIcon: isMobile ? "GalleryHorizontal" : "ImageIcon"
  }
}
