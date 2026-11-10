import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:/Users/prath/.gemini/antigravity/brain/7ed82ed1-d04f-4b69-b98d-066d9320e6aa/.user_uploaded';

const files = [
  'media_1794304502088_65a55996.png',
  'media_1794304502068_cb8ed643.png',
  'media_1794304502062_64419434.png',
  'media_1794304502074_a18b66ff.png',
  'media_1794304502062_797fb569.png',
  'media_1794304502079_10a156e2.png'
];

async function inspect() {
  const results = [];
  for (const file of files) {
    const filePath = path.join(uploadedDir, file);
    if (!fs.existsSync(filePath)) {
      results.push({ file, error: 'File not found' });
      continue;
    }

    const image = sharp(filePath);
    const metadata = await image.metadata();
    const raw = await image.raw().toBuffer({ resolveWithObject: true });
    const { data, info } = raw;
    const { width, height, channels } = info;

    // Check alpha channel
    let hasTransparentPixels = false;
    let minAlpha = 255;
    let maxAlpha = 0;
    let zeroAlphaCount = 0;
    let fullAlphaCount = 0;
    let partialAlphaCount = 0;

    // Corner colors (top-left, top-right, bottom-left, bottom-right)
    const corners = [
      { name: 'TL', x: 0, y: 0 },
      { name: 'TR', x: width - 1, y: 0 },
      { name: 'BL', x: 0, y: height - 1 },
      { name: 'BR', x: width - 1, y: height - 1 }
    ].map(c => {
      const idx = (c.y * width + c.x) * channels;
      return {
        name: c.name,
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2],
        a: channels >= 4 ? data[idx + 3] : 255
      };
    });

    if (channels >= 4) {
      for (let i = 3; i < data.length; i += channels) {
        const a = data[i];
        if (a < minAlpha) minAlpha = a;
        if (a > maxAlpha) maxAlpha = a;
        if (a === 0) zeroAlphaCount++;
        else if (a === 255) fullAlphaCount++;
        else partialAlphaCount++;
      }
      hasTransparentPixels = zeroAlphaCount > 0 || partialAlphaCount > 0;
    }

    // Try sharp trim to see bounding box
    let trimResult = null;
    try {
      const trimmed = await sharp(filePath).trim().toBuffer({ resolveWithObject: true });
      trimResult = {
        trimmedWidth: trimmed.info.width,
        trimmedHeight: trimmed.info.height,
        trimOffsetLeft: trimmed.info.trimOffsetLeft,
        trimOffsetTop: trimmed.info.trimOffsetTop
      };
    } catch (err) {
      trimResult = { error: err.message };
    }

    results.push({
      file,
      width,
      height,
      channels,
      hasAlpha: metadata.hasAlpha,
      hasTransparentPixels,
      minAlpha,
      maxAlpha,
      zeroAlphaCount,
      fullAlphaCount,
      partialAlphaCount,
      corners,
      trimResult
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});

