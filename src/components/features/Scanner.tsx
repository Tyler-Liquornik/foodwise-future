import React, { useState, useRef } from 'react';
import { Camera, Barcode, Image as ImageIcon, Plus, Info } from 'lucide-react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { recognizeFoodItems, RecognizedItem } from '@/utils/imageRecognition';
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

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Item added to inventory", {
        description: "Milk - Expires in 7 days",
        action: {
          label: "View",
          onClick: () => console.log("View item"),
        },
      });
    }, 2000);
  };

  const addItemsToInventory = () => {
    toast.success(`Added ${recognizedItems.length} items to inventory`);
    setShowResults(false);
    setRecognizedItems([]);
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
          {/* Camera / Image Preview */}
          <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {uploadedImage ? (
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
          "Position barcode" instructions, only show if not scanning
          and no uploaded image
        */}
          {!isScanning && !uploadedImage && (
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
              {isScanning ? "Scanning..." : "Scan Item"}
            </Button>

            <Button
                size="lg"
                variant="secondary"
                className="w-full gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
            >
              <ImageIcon className="h-4 w-4" />
              Upload Photo
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