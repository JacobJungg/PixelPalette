import React, { useState,  } from 'react';

const [squares, setSquares] = useState<string[]>([]);

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