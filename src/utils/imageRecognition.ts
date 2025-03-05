
import { pipeline } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

export interface RecognizedItem {
  name: string;
  confidence: number;
  bbox?: [number, number, number, number]; // [x, y, width, height]
}

export const recognizeFoodItems = async (imageElement: HTMLImageElement): Promise<RecognizedItem[]> => {
  try {
    const detector = await pipeline('object-detection', 'Xenova/yolos-tiny', {
      device: 'webgpu',
    });
    
    const results = await detector(imageElement);
    
    return results
      .filter(result => result.score > 0.5) // Only keep confident detections
      .map(result => ({
        name: result.label,
        confidence: result.score,
        bbox: result.box
      }));
  } catch (error) {
    console.error('Error in food recognition:', error);
    throw error;
  }
};
