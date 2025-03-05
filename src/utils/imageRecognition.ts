
import { pipeline, type ObjectDetectionOutput } from '@huggingface/transformers';

export interface RecognizedItem {
  name: string;
  confidence: number;
  bbox?: [number, number, number, number]; // [x, y, width, height]
}

export const recognizeFoodItems = async (imageElement: HTMLImageElement): Promise<RecognizedItem[]> => {
  try {
    const detector = await pipeline('object-detection', 'Xenova/yolos-tiny', {
      // Using CPU as fallback with preference for WebGPU when available
      quantized: false,
    });
    
    // Convert HTMLImageElement to URL for the detector
    const imageUrl = imageElement.src;
    const results = await detector(imageUrl);
    
    return Array.isArray(results) ? results.map(result => ({
      name: result.label,
      confidence: result.score,
      bbox: result.box ? [result.box.xmin, result.box.ymin, result.box.width, result.box.height] : undefined
    })) : [];
  } catch (error) {
    console.error('Error in food recognition:', error);
    throw error;
  }
};
