import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { createIco } from './ico-util.mjs';

const rootDir = 'p:/project/Portfolio Website';
const brandSourceDir = path.join(rootDir, 'brand-source');
const assetsBrandDir = path.join(rootDir, 'src/assets/brand');
const publicDir = path.join(rootDir, 'public');
const brandExportDir = path.join(rootDir, 'brand-export');

for (const dir of [assetsBrandDir, publicDir, brandExportDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Helper to get trimmed image with square or proportional safe padding
async function getTrimmedMaster(filePath, options = {}) {
  const { makeSquare = false, paddingPercent = 0.05 } = options;
  const trimmedBuf = await sharp(filePath).trim().toBuffer();
  const meta = await sharp(trimmedBuf).metadata();
  const { width, height } = meta;

  if (makeSquare) {
    const size = Math.max(width, height);
    const paddedSize = Math.round(size * (1 + paddingPercent * 2));
    const padX = Math.round((paddedSize - width) / 2);
    const padY = Math.round((paddedSize - height) / 2);

    return sharp(trimmedBuf)
      .extend({
        top: padY,
        bottom: paddedSize - height - padY,
        left: padX,
        right: paddedSize - width - padX,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();
  } else {
    const padX = Math.round(width * paddingPercent);
    const padY = Math.round(height * paddingPercent);
    return sharp(trimmedBuf)
      .extend({
        top: padY,
        bottom: padY,
        left: padX,
        right: padX,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer();
  }
}

// Generate web derivatives: webp and png at multiple sizes
async function generateDerivativeSet(masterBuffer, baseName, widths) {
  const meta = await sharp(masterBuffer).metadata();
  const aspectRatio = meta.height / meta.width;

  for (const w of widths) {
    const h = Math.round(w * aspectRatio);

    // WebP
    const webpPath = path.join(assetsBrandDir, `${baseName}-${w}.webp`);
    await sharp(masterBuffer)
      .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90, effort: 6 })
      .toFile(webpPath);

    // PNG fallback
    const pngPath = path.join(assetsBrandDir, `${baseName}-${w}.png`);
    await sharp(masterBuffer)
      .resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(pngPath);

    const webpStat = fs.statSync(webpPath);
    const pngStat = fs.statSync(pngPath);
    console.log(`  ${baseName}-${w}: WebP ${(webpStat.size / 1024).toFixed(1)} KB | PNG ${(pngStat.size / 1024).toFixed(1)} KB (${w}x${h})`);
  }
}

async function buildAll() {
  console.log('--- Step 1: Preparing Masters ---');
  // 1. Icon Color Master (square, trimmed)
  const iconColorMaster = await getTrimmedMaster(path.join(brandSourceDir, 'logo-icon-color-raw.png'), { makeSquare: true, paddingPercent: 0.04 });
  // 2. Favicon Mark Master (square, trimmed)
  const faviconMarkMaster = await getTrimmedMaster(path.join(brandSourceDir, 'logo-favicon-raw.png'), { makeSquare: true, paddingPercent: 0.05 });
  // 3. Horizontal Color Master
  const horizColorMaster = await getTrimmedMaster(path.join(brandSourceDir, 'logo-horizontal-color-raw.png'), { paddingPercent: 0.02 });
  // 4. Stacked Color Master
  const stackedColorMaster = await getTrimmedMaster(path.join(brandSourceDir, 'logo-stacked-color-raw.png'), { paddingPercent: 0.03 });
  // 5. Mono Black Horizontal Master
  const monoBlackHorizMaster = await getTrimmedMaster(path.join(brandSourceDir, 'logo-mono-black-raw.png'), { paddingPercent: 0.02 });
  // 6. Mono White Horizontal Master
  const monoWhiteHorizMaster = await getTrimmedMaster(path.join(brandSourceDir, 'logo-mono-white-raw.png'), { paddingPercent: 0.02 });

  // Extract mono icon marks from horizontal mono masters
  // In mono black trimmed, height is H, icon width is approx H
  const monoBlackMeta = await sharp(monoBlackHorizMaster).metadata();
  const iconBoxSize = monoBlackMeta.height;
  const monoBlackIconMaster = await sharp(monoBlackHorizMaster)
    .extract({ left: 0, top: 0, width: iconBoxSize, height: iconBoxSize })
    .toBuffer();

  const monoWhiteIconMaster = await sharp(monoWhiteHorizMaster)
    .extract({ left: 0, top: 0, width: iconBoxSize, height: iconBoxSize })
    .toBuffer();

  console.log('--- Step 2: Generating Web Derivatives in src/assets/brand/ ---');
  // Icon full-color (disc): 48, 96, 192 px
  console.log('Generating logo-icon (solid disc):');
  await generateDerivativeSet(iconColorMaster, 'logo-icon', [48, 96, 192]);

  // Transparent PC Logo Mark (open gradient ring, transparent background): 48, 96, 192 px
  console.log('Generating logo-mark (transparent background):');
  await generateDerivativeSet(faviconMarkMaster, 'logo-mark', [48, 96, 192]);

  // Horizontal full-color: 240, 320, 480, 640 px
  console.log('Generating logo-horizontal:');
  await generateDerivativeSet(horizColorMaster, 'logo-horizontal', [240, 320, 480, 640]);

  // Stacked full-color: 240, 400, 640 px
  console.log('Generating logo-stacked:');
  await generateDerivativeSet(stackedColorMaster, 'logo-stacked', [240, 400, 640]);

  // Mono white horizontal: 240, 320, 480, 640 px
  console.log('Generating logo-mono-white-horizontal:');
  await generateDerivativeSet(monoWhiteHorizMaster, 'logo-mono-white-horizontal', [240, 320, 480, 640]);

  // Mono white icon: 48, 96, 192 px
  console.log('Generating logo-mono-white-icon:');
  await generateDerivativeSet(monoWhiteIconMaster, 'logo-mono-white-icon', [48, 96, 192]);

  // Mono black horizontal: 240, 320, 480, 640 px
  console.log('Generating logo-mono-black-horizontal:');
  await generateDerivativeSet(monoBlackHorizMaster, 'logo-mono-black-horizontal', [240, 320, 480, 640]);

  // Mono black icon: 48, 96, 192 px
  console.log('Generating logo-mono-black-icon:');
  await generateDerivativeSet(monoBlackIconMaster, 'logo-mono-black-icon', [48, 96, 192]);

  console.log('--- Step 3: Generating Favicons and Public Assets in public/ ---');
  // Favicons with transparent background (simplified PC mark with open ring)
  // 16x16, 32x32, 48x48
  async function createTransparentFavicon(size) {
    return sharp(faviconMarkMaster)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  const fav16 = await createTransparentFavicon(16);
  const fav32 = await createTransparentFavicon(32);
  const fav48 = await createTransparentFavicon(48);

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), fav16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), fav32);

  // Package transparent favicon.ico
  const icoBuffer = createIco([fav16, fav32, fav48], [16, 32, 48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated transparent favicon.ico (16, 32, 48), favicon-16x16.png, favicon-32x32.png, favicon.png');

  // apple-touch-icon.png (180x180)
  const appleTouchSize = 180;
  const appleMarkSize = Math.round(appleTouchSize * 0.78);
  const appleMark = await sharp(faviconMarkMaster)
    .resize(appleMarkSize, appleMarkSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const appleTouch = await sharp({
    create: {
      width: appleTouchSize,
      height: appleTouchSize,
      channels: 4,
      background: { r: 5, g: 8, b: 22, alpha: 1 }
    }
  })
    .composite([
      {
        input: appleMark,
        top: Math.round((appleTouchSize - appleMarkSize) / 2),
        left: Math.round((appleTouchSize - appleMarkSize) / 2)
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);
  console.log('Generated apple-touch-icon.png (180x180)');

  // android-chrome-192x192 and android-chrome-512x512 with safe zone
  for (const size of [192, 512]) {
    const markSize = Math.round(size * 0.70); // 70% safe zone
    const mark = await sharp(faviconMarkMaster)
      .resize(markSize, markSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const androidIcon = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 5, g: 8, b: 22, alpha: 1 }
      }
    })
      .composite([
        {
          input: mark,
          top: Math.round((size - markSize) / 2),
          left: Math.round((size - markSize) / 2)
        }
      ])
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, `android-chrome-${size}x${size}.png`), androidIcon);
    console.log(`Generated android-chrome-${size}x${size}.png`);
  }

  // site.webmanifest
  const manifest = {
    name: "Prathamesh Chiddarwar | Portfolio",
    short_name: "Prathamesh C.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#050816",
    background_color: "#050816",
    display: "standalone"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated site.webmanifest');

  // og-image.png (1200x630)
  // Navy background #050816 with subtle radial gradient glow in SVG, stacked lockup centered, clean typography
  console.log('Generating og-image.png (1200x630)...');
  const ogWidth = 1200;
  const ogHeight = 630;

  // Background SVG with subtle glow and decorative grid lines
  const bgSvg = `
  <svg width="${ogWidth}" height="${ogHeight}">
    <defs>
      <radialGradient id="glow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.25"/>
        <stop offset="45%" stop-color="#6366f1" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#050816" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0"/>
        <stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${ogWidth}" height="${ogHeight}" fill="#050816"/>
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#glow)"/>
    <line x1="200" y1="530" x2="1000" y2="530" stroke="url(#lineGrad)" stroke-width="1.5"/>
    <text x="600" y="565" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" letter-spacing="3">COMPUTER SCIENCE · CYBERSECURITY &amp; FORENSICS · MIT-WPU</text>
  </svg>
  `;

  const ogLogoWidth = 560;
  const ogLogo = await sharp(stackedColorMaster)
    .resize(ogLogoWidth, null, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const ogLogoMeta = await sharp(ogLogo).metadata();
  const ogLogoTop = Math.round((480 - ogLogoMeta.height) / 2) + 20;
  const ogLogoLeft = Math.round((ogWidth - ogLogoWidth) / 2);

  const ogImage = await sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: ogLogo,
        top: ogLogoTop,
        left: ogLogoLeft
      }
    ])
    .png({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogImage);
  console.log('Generated og-image.png (1200x630)');

  console.log('--- Step 4: Generating Off-Site Exports in brand-export/ ---');
  // 1. github-avatar-500x500.png (icon on navy, circle-safe)
  const ghSize = 500;
  const ghIconSize = Math.round(ghSize * 0.72);
  const ghIcon = await sharp(iconColorMaster)
    .resize(ghIconSize, ghIconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const ghAvatar = await sharp({
    create: {
      width: ghSize,
      height: ghSize,
      channels: 4,
      background: { r: 5, g: 8, b: 22, alpha: 1 }
    }
  })
    .composite([
      {
        input: ghIcon,
        top: Math.round((ghSize - ghIconSize) / 2),
        left: Math.round((ghSize - ghIconSize) / 2)
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandExportDir, 'github-avatar-500x500.png'), ghAvatar);
  console.log('Generated brand-export/github-avatar-500x500.png');

  // 2. linkedin-profile-400x400.png
  const liSize = 400;
  const liIconSize = Math.round(liSize * 0.72);
  const liIcon = await sharp(iconColorMaster)
    .resize(liIconSize, liIconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const liProfile = await sharp({
    create: {
      width: liSize,
      height: liSize,
      channels: 4,
      background: { r: 5, g: 8, b: 22, alpha: 1 }
    }
  })
    .composite([
      {
        input: liIcon,
        top: Math.round((liSize - liIconSize) / 2),
        left: Math.round((liSize - liIconSize) / 2)
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandExportDir, 'linkedin-profile-400x400.png'), liProfile);
  console.log('Generated brand-export/linkedin-profile-400x400.png');

  // 3. linkedin-banner-1584x396.png
  const bannerW = 1584;
  const bannerH = 396;
  const bannerBgSvg = `
  <svg width="${bannerW}" height="${bannerH}">
    <defs>
      <radialGradient id="bannerGlow" cx="65%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.28"/>
        <stop offset="50%" stop-color="#6366f1" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#050816" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${bannerW}" height="${bannerH}" fill="#050816"/>
    <rect width="${bannerW}" height="${bannerH}" fill="url(#bannerGlow)"/>
    <rect width="${bannerW}" height="${bannerH}" fill="url(#grid)"/>
    <text x="1450" y="340" text-anchor="end" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="2">WEB DEVELOPMENT · CYBERSECURITY</text>
  </svg>
  `;

  const bannerLogoW = 600;
  const bannerLogo = await sharp(horizColorMaster)
    .resize(bannerLogoW, null, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const bannerLogoMeta = await sharp(bannerLogo).metadata();

  const banner = await sharp(Buffer.from(bannerBgSvg))
    .composite([
      {
        input: bannerLogo,
        top: Math.round((bannerH - bannerLogoMeta.height) / 2),
        left: 420 // Right of profile avatar
      }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandExportDir, 'linkedin-banner-1584x396.png'), banner);
  console.log('Generated brand-export/linkedin-banner-1584x396.png');

  // 4. email-sig-400w.png & email-sig-400w-black.png
  const sigColor = await sharp(horizColorMaster)
    .resize(400, null, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(brandExportDir, 'email-sig-400w.png'), sigColor);

  const sigBlack = await sharp(monoBlackHorizMaster)
    .resize(400, null, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(brandExportDir, 'email-sig-400w-black.png'), sigBlack);
  console.log('Generated email signatures (color and black)');

  console.log('--- Step 5: Generating Portrait & Avatar Derivatives ---');
  const portrait4x5MasterPath = path.join(brandSourceDir, 'portrait-4x5-raw.jpg');
  const portrait1x1MasterPath = path.join(brandSourceDir, 'portrait-1x1-raw.jpg');

  // 1. Portrait 4:5 derivatives (480, 800, 1200, 1600 px)
  const p4x5Widths = [480, 800, 1200, 1600];
  for (const w of p4x5Widths) {
    const h = Math.round(w * 1.25); // 4:5 ratio

    // AVIF
    const avifPath = path.join(assetsBrandDir, `portrait-4x5-${w}.avif`);
    await sharp(portrait4x5MasterPath)
      .resize(w, h, { fit: 'cover', position: 'center' })
      .avif({ quality: 75, effort: 6 })
      .toFile(avifPath);

    // WebP
    const webpPath = path.join(assetsBrandDir, `portrait-4x5-${w}.webp`);
    await sharp(portrait4x5MasterPath)
      .resize(w, h, { fit: 'cover', position: 'center' })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    // JPEG
    const jpgPath = path.join(assetsBrandDir, `portrait-4x5-${w}.jpg`);
    await sharp(portrait4x5MasterPath)
      .resize(w, h, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(jpgPath);

    const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`  portrait-4x5-${w}: WebP ${webpSize} KB, AVIF ${(fs.statSync(avifPath).size / 1024).toFixed(1)} KB, JPG ${(fs.statSync(jpgPath).size / 1024).toFixed(1)} KB`);
  }

  // Low-quality blur placeholder (LQIP)
  const lqipPath = path.join(assetsBrandDir, 'portrait-4x5-lqip.webp');
  await sharp(portrait4x5MasterPath)
    .resize(32, 40, { fit: 'cover' })
    .webp({ quality: 20 })
    .toFile(lqipPath);

  // 2. Portrait 1:1 Square derivatives (480, 800, 1200 px)
  const p1x1Widths = [480, 800, 1200];
  for (const w of p1x1Widths) {
    const avifPath = path.join(assetsBrandDir, `portrait-1x1-${w}.avif`);
    await sharp(portrait1x1MasterPath)
      .resize(w, w, { fit: 'cover', position: 'center' })
      .avif({ quality: 75, effort: 6 })
      .toFile(avifPath);

    const webpPath = path.join(assetsBrandDir, `portrait-1x1-${w}.webp`);
    await sharp(portrait1x1MasterPath)
      .resize(w, w, { fit: 'cover', position: 'center' })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    const jpgPath = path.join(assetsBrandDir, `portrait-1x1-${w}.jpg`);
    await sharp(portrait1x1MasterPath)
      .resize(w, w, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(jpgPath);
  }

  // Square version for Open Graph fallback in public/
  await sharp(portrait1x1MasterPath)
    .resize(800, 800, { fit: 'cover' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(publicDir, 'portrait-square.jpg'));
  console.log('Generated public/portrait-square.jpg (Open Graph fallback)');

  // 3. Circular Avatar with transparent background (120, 240, 480 px)
  for (const size of [120, 240, 480]) {
    const resized = await sharp(portrait1x1MasterPath)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .toBuffer();

    const circleMaskSvg = `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`;

    const circleBuf = await sharp(resized)
      .composite([{ input: Buffer.from(circleMaskSvg), blend: 'dest-in' }])
      .png()
      .toBuffer();

    const pngPath = path.join(assetsBrandDir, `avatar-circle-${size}.png`);
    fs.writeFileSync(pngPath, circleBuf);

    const webpPath = path.join(assetsBrandDir, `avatar-circle-${size}.webp`);
    await sharp(circleBuf).webp({ quality: 90 }).toFile(webpPath);
  }

  // Export 480px circular avatar to brand-export/
  const avatarExport = path.join(brandExportDir, 'avatar-circle-480.png');
  fs.copyFileSync(path.join(assetsBrandDir, 'avatar-circle-480.png'), avatarExport);
  console.log('Generated circular avatars and exported to brand-export/avatar-circle-480.png');

  console.log('--- Brand Assets Build Complete! ---');
}

buildAll().catch(err => {
  console.error('Build error:', err);
  process.exit(1);
});

