import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const techDir = 'src/assets/tech';

const pythonSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="512" height="512">
  <defs>
    <linearGradient id="py-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#387eb8"/>
      <stop offset="100%" stop-color="#366994"/>
    </linearGradient>
    <linearGradient id="py-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe873"/>
      <stop offset="100%" stop-color="#ffd43b"/>
    </linearGradient>
  </defs>
  <path fill="url(#py-blue)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475-.58 34.475-33.893V28.187S193.948.072 126.916.072zM92.802 19.66a11.52 11.52 0 1 1 0 23.04 11.52 11.52 0 0 1 0-23.04z"/>
  <path fill="url(#py-yellow)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.073-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.71c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475.58-34.475 33.894v61.222s-4.512 28.112 62.52 28.112zm34.114-19.586a11.52 11.52 0 1 1 0-23.04 11.52 11.52 0 0 1 0 23.04z"/>
</svg>`;

const nextjsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <circle cx="256" cy="256" r="236" fill="#000000" stroke="#333333" stroke-width="14"/>
  <path d="M349.5 390.5L194.2 189H164v134h28.5V225.2l138.8 179.8c6.3-4.6 12.4-9.5 18.2-14.5z" fill="url(#next-grad)"/>
  <rect x="319.5" y="189" width="28.5" height="134" fill="#ffffff"/>
  <defs>
    <linearGradient id="next-grad" x1="210" y1="210" x2="335" y2="370" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff"/>
      <stop offset="0.75" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>`;

const awsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="100" fill="#0f172a" />
  <g transform="translate(48, 70)">
    <path fill="#ffffff" d="M123.6 156.4c0 14.8-4.2 26.6-12.6 35.3-8.4 8.7-19.7 13.1-34 13.1-13.8 0-24.7-4.2-32.9-12.7-8.1-8.5-12.2-20-12.2-34.5 0-15.1 4.2-27.1 12.6-35.9 8.4-8.8 19.6-13.2 33.6-13.2 14.3 0 25.3 4.4 33.1 13.1 7.8 8.8 12.4 20.3 12.4 34.8zm-65.7 1.2c0 9.8 2.2 17.5 6.6 23.2 4.4 5.7 10.7 8.5 18.8 8.5 7.8 0 13.8-2.8 18-8.5 4.3-5.7 6.4-13.4 6.4-23.2 0-10.4-2.1-18.3-6.4-23.9-4.3-5.5-10.3-8.3-18.1-8.3-8 0-14.2 2.8-18.6 8.3-4.5 5.5-6.7 13.5-6.7 23.9zm149.2 44.8h-23.8l-29-106h25.4l16.1 69.4 15.6-69.4h23.5l15.6 69.7 16.5-69.7h24.8l-29.4 106h-23.8l-15.3-67.4-16 67.4zm164.7-27.9c-8.9 9.1-20.9 13.7-36 13.7-11.7 0-21.7-2.9-30-8.8-8.3-5.8-13.5-13.7-15.5-23.7l23.5-5.3c1.3 6.2 4.2 10.9 8.6 14.2 4.4 3.3 10 4.9 16.7 4.9 7.9 0 13.9-1.8 18-5.3 4.1-3.5 6.1-7.8 6.1-13 0-4.6-1.5-8.3-4.5-11.1-3-2.8-8.7-5.5-17.1-8-12.7-3.9-22-8.3-27.9-13.3-5.9-5-8.8-12.2-8.8-21.6 0-9.6 3.9-17.6 11.6-24 7.7-6.4 17.8-9.6 30.1-9.6 11.4 0 20.8 2.9 28.2 8.6 7.4 5.7 11.9 13 13.6 21.9l-23 4.9c-1.1-5.1-3.6-8.9-7.5-11.4-3.9-2.5-9-3.8-15.2-3.8-6.3 0-11.3 1.5-15 4.5s-5.5 6.9-5.5 11.7c0 4.4 1.5 8 4.6 10.7 3.1 2.7 8.9 5.3 17.6 7.9 12.3 3.7 21.3 8.1 27 13.1 5.8 5 8.6 12.2 8.6 21.6 0 10.2-4.1 18.7-12.2 25.4z"/>
    <path fill="#FF9900" d="M375.4 257.6c-48.7 35.8-120.3 54.4-181.7 54.4-86.4 0-164.2-32.3-222.9-86.2-4.6-4.2-.5-9.9 5.2-6.7 58.2 33.6 130.4 53.8 205.2 53.8 54.7 0 119.8-14.7 179.3-45.2 9.1-4.7 16.7 6.4 14.9 13.9z"/>
    <path fill="#FF9900" d="M394.2 238.8c-6.2-8-41.5-3.8-57.3-1.9-4.8.6-5.5-4.1-1.2-7.1 28.2-19.7 74.3-14 79.5-7.5 5.2 6.5-1.4 52.8-28.5 73.8-4.1 3.2-8.1.9-6.3-3.7 5.9-15 19.9-45.7 13.8-53.6z"/>
  </g>
</svg>`;

const wiresharkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <circle cx="256" cy="256" r="236" fill="#0b1030" stroke="#1e212e" stroke-width="12"/>
  <path d="M140 370c40-10 80-25 110-50 45-38 75-95 90-180 5 45 25 100 65 140-50 10-110 30-150 70-35 35-70 50-115 20z" fill="#005B94"/>
  <path d="M170 370c40-15 75-40 100-70 35-42 60-90 70-160-5 35-15 75-35 110-30 50-80 90-135 120z" fill="#1C86EE"/>
  <path d="M90 395c80-20 180-20 330 20-30 15-80 25-150 20-80-5-140-20-180-40z" fill="#20B2AA"/>
</svg>`;

async function main() {
  await sharp(Buffer.from(pythonSvg)).resize(512, 512).png().toFile(path.join(techDir, 'python.png'));
  console.log('Created python.png');

  await sharp(Buffer.from(nextjsSvg)).resize(512, 512).png().toFile(path.join(techDir, 'nextjs.png'));
  console.log('Created nextjs.png');

  await sharp(Buffer.from(awsSvg)).resize(512, 512).png().toFile(path.join(techDir, 'aws.png'));
  console.log('Created aws.png');

  await sharp(Buffer.from(wiresharkSvg)).resize(512, 512).png().toFile(path.join(techDir, 'wireshark.png'));
  console.log('Created wireshark.png');
}

main().catch(console.error);

