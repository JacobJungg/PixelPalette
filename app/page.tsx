"use client"
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Allow imageSrc to be string or null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        // Assure TypeScript that the result is a string
        const result = readerEvent.target?.result;
        if (typeof result === 'string') {
          setImageSrc(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
