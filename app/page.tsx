"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider"

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [squares, setSquares] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(4); // Default value for the slider

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const result = readerEvent.target?.result;
        if (typeof result === 'string') {
          setImageSrc(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const splitImageIntoSquares = (imgSrc: string, numSquaresPerSide: number) => {
    // ... existing code for splitting the image
  };

  useEffect(() => {
    if (imageSrc) {
      splitImageIntoSquares(imageSrc, sliderValue);
    }
  }, [imageSrc, sliderValue]); // Depend on both imageSrc and sliderValue

  return (
    <main>
      <div className="flex h-full w-full">
        <Card>
          <CardHeader>
            <CardTitle>Pixel Palette</CardTitle>
            <CardDescription>Upload A File</CardDescription>
          </CardHeader>
          <CardContent>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleFileChange} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {squares.map((squareSrc, index) => (
                <img key={index} src={squareSrc} alt={`Square ${index}`} style={{ width: `${100 / sliderValue}%`, height: 'auto' }} />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={1} 
              onValueChange={(values) => setSliderValue(values[0])}
            />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
