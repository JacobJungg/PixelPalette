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
  const [sliderValue, setSliderValue] = useState(4);
  const imageAreaSize = 400

  
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
    const img = new Image();
    img.onload = () => {
      const squareSize = img.width / numSquaresPerSide;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
  
      // Drawing the grid lines
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'black';
      for (let y = 0; y <= numSquaresPerSide; y++) {
        ctx.moveTo(0, y * squareSize);
        ctx.lineTo(img.width, y * squareSize);
        ctx.stroke();
      }
      for (let x = 0; x <= numSquaresPerSide; x++) {
        ctx.moveTo(x * squareSize, 0);
        ctx.lineTo(x * squareSize, img.height);
        ctx.stroke();
      }
  
      // Creating an array of squares with the grid
      const squaresArray: string[] = [];
      for (let y = 0; y < numSquaresPerSide; y++) {
        for (let x = 0; x < numSquaresPerSide; x++) {
          const squareCanvas = document.createElement('canvas');
          squareCanvas.width = squareSize;
          squareCanvas.height = squareSize;
          const squareCtx = squareCanvas.getContext('2d')!;
          squareCtx.drawImage(canvas, x * squareSize, y * squareSize, squareSize, squareSize, 0, 0, squareSize, squareSize);
          squaresArray.push(squareCanvas.toDataURL());
        }
      }
      setSquares(squaresArray);
    };
    img.src = imgSrc;
  };

  useEffect(() => {
    if (imageSrc) {
      splitImageIntoSquares(imageSrc, sliderValue);
    }
  }, [imageSrc, sliderValue]);

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
            <div style={{ width: `${imageAreaSize}px`, height: `${imageAreaSize}px`, position: 'relative' }}>
              {squares.map((squareSrc, index) => (
                <img
                  key={index}
                  src={squareSrc}
                  alt={`Square ${index}`}
                  style={{
                    width: `${imageAreaSize / sliderValue}px`,
                    height: `${imageAreaSize / sliderValue}px`,
                    position: 'absolute',
                    left: `${(index % sliderValue) * (imageAreaSize / sliderValue)}px`,
                    top: `${Math.floor(index / sliderValue) * (imageAreaSize / sliderValue)}px`,
                  }}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Slider 
              defaultValue={[5]} 
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