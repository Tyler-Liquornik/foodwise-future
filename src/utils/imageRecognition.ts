
import { pipeline } from '@huggingface/transformers';

export interface RecognizedItem {
  name: string;
  confidence: number;
  bbox?: [number, number, number, number]; // [x, y, width, height]
}

/**
 * Recognizes food items in an image using the Hugging Face transformers library
 * @param imageElement The image element to analyze
 * @param dtype Optional data type for the model (defaults to 'fp32' for wasm devices)
 * @returns Array of recognized items with confidence scores
 */
export const recognizeFoodItems = async (
  imageElement: HTMLImageElement, 
  dtype: 'fp32' | 'fp16' | 'int8' | 'q8' = 'fp32'
): Promise<RecognizedItem[]> => {
  try {
    console.log(`Loading object detection model with dtype: ${dtype}`);
    
    const detector = await pipeline('object-detection', 'Xenova/yolos-tiny', {
      // Explicitly set dtype instead of relying on defaults
      dtype: dtype,
      // You can also specify the device if needed (e.g., 'cpu', 'webgpu', 'wasm')
      device: 'wasm',
    });
    
    // Convert HTMLImageElement to URL for the detector
    const imageUrl = imageElement.src;
    const results = await detector(imageUrl);
    
    if (!Array.isArray(results)) return [];
    
    return results.map(result => {
      const box = result.box as { xmin: number; ymin: number; width: number; height: number } | undefined;
      return {
        name: String(result.label),
        confidence: Number(result.score),
        bbox: box ? [box.xmin, box.ymin, box.width, box.height] : undefined
      } as RecognizedItem;
    });
  } catch (error) {
    console.error('Error in food recognition:', error);
    throw error;
  }
};

/**
 * Converts a data URL to an Image element
 * @param dataUrl The data URL to convert
 * @returns A Promise that resolves to an HTMLImageElement
 */
export const dataUrlToImage = (dataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
};
