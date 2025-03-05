
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Barcode, Image as ImageIcon, Plus, Info } from 'lucide-react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { recognizeFoodItems, RecognizedItem, dataUrlToImage } from '@/utils/imageRecognition';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

interface ScannedItem extends RecognizedItem {
  id: string;
  expiryDate?: Date;
  category?: string;
}

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recognizedItems, setRecognizedItems] = useState<ScannedItem[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
  }, []);

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: isMobile ? 'environment' : 'user',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Could not access camera", {
        description: "Please check camera permissions"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureImage = async () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    setUploadedImage(dataUrl);
    stopCamera();
    
    // Process the captured image
    processImage(dataUrl);
  };

  const processImage = async (dataUrl: string) => {
    setIsScanning(true);
    
    try {
      const img = await dataUrlToImage(dataUrl);
      
      // Call the Hugging Face service
      const items = await recognizeFoodItems(img, 'fp32');
      
      setRecognizedItems(items.map(item => ({
        ...item,
        id: crypto.randomUUID(),
      })));
      
      if (items.length > 0) {
        setShowResults(true);
        toast.success(`Found ${items.length} items in image`);
      } else {
        toast.info("No items detected", { 
          description: "Try taking a clearer photo or different angle"
        });
      }
    } catch (error) {
      toast.error("Error processing image");
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Start scanning and trigger the green bar animation.
    setIsScanning(true);

    // Use setTimeout(…, 0) to yield to the browser for the animation.
    setTimeout(async () => {
      try {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await img.decode(); // Wait for the image to load

        setUploadedImage(img.src);

        // Call the Hugging Face service asynchronously.
        const items = await recognizeFoodItems(img, 'fp32');

        setRecognizedItems(items.map(item => ({
          ...item,
          id: crypto.randomUUID(),
        })));
        setShowResults(true);
        toast.success(`Found ${items.length} items in image`);
      } catch (error) {
        toast.error("Error processing image");
        console.error(error);
      } finally {
        // Stop scanning (and the green bar animation) once processing is done.
        setIsScanning(false);
      }
    }, 0);
  };

  const handleScan = async () => {
    if (cameraActive) {
      // If camera is active, capture the current frame
      captureImage();
    } else {
      // If camera is not active, start it
      await startCamera();
    }
  };

  const addItemsToInventory = () => {
    toast.success(`Added ${recognizedItems.length} items to inventory`);
    setShowResults(false);
    setRecognizedItems([]);
  };

  const resetCamera = () => {
    setUploadedImage(null);
    setCameraActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-6 animate-slide-down">
          <h1 className="text-2xl font-display font-medium mt-2">
            Add Food to Your Inventory
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Scan food items to track and reduce your waste
          </p>
        </div>

        <div className="w-full aspect-square relative mb-8 rounded-xl overflow-hidden shadow-medium">
          {/* Camera View or Image Preview */}
          <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {cameraActive && videoRef.current ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                muted
                autoPlay
              />
            ) : uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="h-16 w-16 text-white/20" />
            )}
          </div>

          {/* Green scanning bar + scanning text, visible if isScanning */}
          {isScanning && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <div
                    className="h-1 w-full bg-primary absolute animate-scanning-bar"
                    style={{ top: '50%' }}
                />
                <div className="text-white text-center mt-32 bg-black/50 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">Scanning...</p>
                </div>
              </div>
          )}

          {/*
          "Position barcode" instructions, only show if not scanning,
          no uploaded image, and camera is not active
        */}
          {!isScanning && !uploadedImage && !cameraActive && (
              <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-black/50 text-white text-center px-4 py-2 rounded-lg z-10 w-[275px]">
                <p className="text-sm font-medium">Position item or barcode in frame</p>
                <p className="text-xs">Tap the button below to scan or upload</p>
              </div>
          )}

          {/* Outline border */}
          <div className="absolute inset-0 border-2 border-white/40 rounded-xl pointer-events-none" />
        </div>

        <div className="w-full flex flex-col gap-3 animate-slide-up">
          <div className="grid grid-cols-2 gap-2">
            <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleScan}
                disabled={isScanning}
            >
              <Barcode className="h-4 w-4" />
              {isScanning ? "Scanning..." : cameraActive ? "Take Photo" : "Scan Item"}
            </Button>

            <Button
                size="lg"
                variant="secondary"
                className="w-full gap-2"
                onClick={() => {
                  if (uploadedImage || cameraActive) {
                    resetCamera();
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                disabled={isScanning}
            >
              <ImageIcon className="h-4 w-4" />
              {uploadedImage || cameraActive ? "Reset" : "Upload Photo"}
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />
          </div>

          <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => toast.info("Manual entry coming soon!")}
          >
            <Plus className="h-4 w-4" />
            Enter Manually
          </Button>

          <Button
              variant="ghost"
              size="icon"
              className="self-center"
              onClick={() => toast.info("Scanner tips: Position the barcode within the frame and ensure adequate lighting.")}
          >
            <Info className="h-4 w-4" />
          </Button>

          <Dialog open={showResults} onOpenChange={setShowResults}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Recognized Items</DialogTitle>
                <DialogDescription>
                  Review the items detected in your image
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {recognizedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <Badge variant="secondary" className="mt-1">
                          {Math.round(item.confidence * 100)}% confidence
                        </Badge>
                      </div>
                    </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="ghost" onClick={() => setShowResults(false)}>
                  Cancel
                </Button>
                <Button onClick={addItemsToInventory}>
                  Add to Inventory
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
  );
};

export default Scanner;
