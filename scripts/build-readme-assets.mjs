import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rootDir = 'p:/project/Portfolio Website';
const docsAssetsDir = path.join(rootDir, 'docs/assets');
const brandSourceDir = path.join(rootDir, 'brand-source');
const brainDir = 'C:/Users/prath/.gemini/antigravity/brain/7ed82ed1-d04f-4b69-b98d-066d9320e6aa';

if (!fs.existsSync(docsAssetsDir)) {
  fs.mkdirSync(docsAssetsDir, { recursive: true });
}

async function run() {
  console.log('Generating README assets...');

  // 1. Logo White (for dark GitHub theme) - width 420
  const whiteRaw = path.join(brandSourceDir, 'logo-mono-white-raw.png');
  const whiteTrimmed = await sharp(whiteRaw).trim().toBuffer();
  await sharp(whiteTrimmed)
    .resize(420)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(docsAssetsDir, 'logo-mono-white.png'));
  console.log('Created logo-mono-white.png');

  // 2. Logo Black (for light GitHub theme) - width 420
  const blackRaw = path.join(brandSourceDir, 'logo-mono-black-raw.png');
  const blackTrimmed = await sharp(blackRaw).trim().toBuffer();
  await sharp(blackTrimmed)
    .resize(420)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(docsAssetsDir, 'logo-mono-black.png'));
  console.log('Created logo-mono-black.png');

  // 3. Banner (1280x640) on solid navy #050816 with subtle radial indigo glow
  const bannerWidth = 1280;
  const bannerHeight = 640;

  // Create subtle radial glow SVG
  const glowSvg = Buffer.from(`
    <svg width="${bannerWidth}" height="${bannerHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="indigoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.28"/>
          <stop offset="50%" stop-color="#4f46e5" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#050816" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#050816"/>
      <circle cx="${bannerWidth / 2}" cy="${bannerHeight / 2}" r="380" fill="url(#indigoGlow)"/>
    </svg>
  `);

  // Full-color stacked lockup or horizontal lockup centered
  const stackedRaw = path.join(brandSourceDir, 'logo-stacked-color-raw.png');
  const stackedTrimmed = await sharp(stackedRaw).trim().toBuffer();
  const stackedResized = await sharp(stackedTrimmed)
    .resize(480)
    .toBuffer();

  const stackedMeta = await sharp(stackedResized).metadata();
  const left = Math.round((bannerWidth - stackedMeta.width) / 2);
  const top = Math.round((bannerHeight - stackedMeta.height) / 2);

  await sharp(glowSvg)
    .composite([
      {
        input: stackedResized,
        left,
        top,
      }
    ])
    .png({ quality: 95 })
    .toFile(path.join(docsAssetsDir, 'banner.png'));

  // Also copy to social-preview.png
  fs.copyFileSync(path.join(docsAssetsDir, 'banner.png'), path.join(docsAssetsDir, 'social-preview.png'));
  console.log('Created banner.png and social-preview.png (1280x640)');

  // 4. Post-process real captured screenshots with 1px #1E212E border and 16px rounded corners
  const shots = [
    { name: 'screenshot-home', file: path.join(brainDir, 'homepage-1440.png') },
    { name: 'screenshot-about', file: path.join(brainDir, 'about-1440.png') },
    { name: 'screenshot-projects', file: path.join(brainDir, 'projects-1440.png') },
    { name: 'screenshot-contact', file: path.join(brainDir, 'contact-1440.png') },
    { name: 'screenshot-mobile-home', file: path.join(brainDir, 'homepage-375.png') }
  ];

  for (const shot of shots) {
    if (fs.existsSync(shot.file)) {
      const inputMeta = await sharp(shot.file).metadata();
      const targetW = Math.min(inputMeta.width, 1200);
      const targetH = Math.round((inputMeta.height / inputMeta.width) * targetW);

      // Rounded rectangle mask with border
      const roundedMaskSvg = Buffer.from(`
        <svg width="${targetW}" height="${targetH}">
          <rect x="0" y="0" width="${targetW}" height="${targetH}" rx="16" ry="16" fill="#fff" />
        </svg>
      `);

      const borderSvg = Buffer.from(`
        <svg width="${targetW}" height="${targetH}">
          <rect x="0.5" y="0.5" width="${targetW - 1}" height="${targetH - 1}" rx="16" ry="16" fill="none" stroke="#1E212E" stroke-width="1"/>
        </svg>
      `);

      const roundedBuf = await sharp(shot.file)
        .resize(targetW, targetH, { fit: 'cover' })
        .composite([
          { input: roundedMaskSvg, blend: 'dest-in' }
        ])
        .toBuffer();

      const finalWithBorder = await sharp(roundedBuf)
        .composite([{ input: borderSvg }])
        .toBuffer();

      await sharp(finalWithBorder)
        .png({ quality: 90, compressionLevel: 8 })
        .toFile(path.join(docsAssetsDir, `${shot.name}.png`));

      await sharp(finalWithBorder)
        .webp({ quality: 85 })
        .toFile(path.join(docsAssetsDir, `${shot.name}.webp`));

      console.log(`Processed ${shot.name}.png and .webp`);
    }
  }

  // 5. Create Composite Preview: Desktop shot with mobile shot overlapping at the right on navy #050816
  const compW = 1200;
  const compH = 680;

  const bgCompSvg = Buffer.from(`
    <svg width="${compW}" height="${compH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="compGlow" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.18"/>
          <stop offset="60%" stop-color="#4f46e5" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#050816" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#050816"/>
      <rect width="100%" height="100%" fill="url(#compGlow)"/>
    </svg>
  `);

  // Resize desktop shot to ~880px wide
  const deskFile = path.join(docsAssetsDir, 'screenshot-home.png');
  const mobFile = path.join(docsAssetsDir, 'screenshot-mobile-home.png');

  if (fs.existsSync(deskFile) && fs.existsSync(mobFile)) {
    const deskResized = await sharp(deskFile)
      .resize(860, 520, { fit: 'cover', position: 'top' })
      .toBuffer();

    const mobResized = await sharp(mobFile)
      .resize(260, 540, { fit: 'cover', position: 'top' })
      .toBuffer();

    // Add soft shadow around mobile frame
    const mobShadowed = await sharp(mobResized)
      .extend({
        top: 10, bottom: 10, left: 10, right: 10,
        background: { r: 5, g: 8, b: 22, alpha: 0 }
      })
      .toBuffer();

    await sharp(bgCompSvg)
      .composite([
        {
          input: deskResized,
          left: 40,
          top: 80
        },
        {
          input: mobShadowed,
          left: 880,
          top: 60
        }
      ])
      .png({ quality: 92 })
      .toFile(path.join(docsAssetsDir, 'hero-composite.png'));

    await sharp(path.join(docsAssetsDir, 'hero-composite.png'))
      .webp({ quality: 88 })
      .toFile(path.join(docsAssetsDir, 'hero-composite.webp'));

    console.log('Created hero-composite.png and .webp');
  }

  console.log('README asset generation completed successfully.');
}

run().catch(console.error);

