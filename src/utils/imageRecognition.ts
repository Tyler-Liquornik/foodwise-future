
import { pipeline } from '@huggingface/transformers';

export interface RecognizedItem {
  name: string;
  confidence: number;
  bbox?: [number, number, number, number]; // [x, y, width, height]
}

export const recognizeFoodItems = async (imageElement: HTMLImageElement): Promise<RecognizedItem[]> => {
  try {
    const detector = await pipeline('object-detection', 'Xenova/yolos-tiny', {
      // Using CPU as fallback with preference for WebGPU when available
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
