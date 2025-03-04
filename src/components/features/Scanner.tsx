
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ChevronDown, Info, Zap } from 'lucide-react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
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

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-4 pt-16 pb-24">
      <div className="text-center mb-6 animate-slide-down">
        <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
          Scan Items
        </span>
        <h1 className="text-2xl font-display font-medium mt-2">
          Add Food to Your Inventory
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Scan barcodes to track your food and reduce waste
        </p>
      </div>

      <div className="w-full aspect-square relative mb-8 rounded-xl overflow-hidden shadow-medium">
        <div className="absolute inset-0 bg-black/5 z-10 flex flex-col items-center justify-center">
          {isScanning ? (
            <div className="flex flex-col items-center">
              <motion.div
                className="h-1 w-full bg-primary absolute top-1/2"
                animate={{ y: [-150, 150], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <div className="text-white text-center mt-32 bg-black/50 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium">Scanning...</p>
                <p className="text-xs">Hold steady</p>
              </div>
            </div>
          ) : (
            <div className="text-white text-center bg-black/50 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium">Position barcode in frame</p>
              <p className="text-xs">Tap the button below to scan</p>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 border-2 border-white/40 rounded-xl z-20" />
        
        {/* Camera preview placeholder */}
        <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <Camera className="h-16 w-16 text-white/20" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 animate-slide-up">
        <Button 
          size="lg" 
          className="w-full gap-2"
          onClick={handleScan}
          disabled={isScanning}
        >
          <Zap className="h-4 w-4" />
          {isScanning ? "Scanning..." : "Scan Barcode"}
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            className="flex-1"
            onClick={() => toast.info("Manual entry coming soon!")}
          >
            Enter Manually
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => toast.info("Scanner tips: Position the barcode within the frame and ensure adequate lighting.")}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-muted-foreground">
            <p className="text-xs">Recently scanned items</p>
            <ChevronDown className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
