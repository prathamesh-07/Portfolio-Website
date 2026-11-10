import React from 'react';
import { Link } from 'react-router-dom';

// Color Icon
import icon48Webp from '../../assets/brand/logo-icon-48.webp';
import icon96Webp from '../../assets/brand/logo-icon-96.webp';
import icon192Webp from '../../assets/brand/logo-icon-192.webp';
import icon48Png from '../../assets/brand/logo-icon-48.png';
import icon96Png from '../../assets/brand/logo-icon-96.png';
import icon192Png from '../../assets/brand/logo-icon-192.png';

// Color Horizontal
import horiz240Webp from '../../assets/brand/logo-horizontal-240.webp';
import horiz320Webp from '../../assets/brand/logo-horizontal-320.webp';
import horiz480Webp from '../../assets/brand/logo-horizontal-480.webp';
import horiz640Webp from '../../assets/brand/logo-horizontal-640.webp';
import horiz240Png from '../../assets/brand/logo-horizontal-240.png';
import horiz320Png from '../../assets/brand/logo-horizontal-320.png';
import horiz480Png from '../../assets/brand/logo-horizontal-480.png';
import horiz640Png from '../../assets/brand/logo-horizontal-640.png';

// Color Stacked
import stacked240Webp from '../../assets/brand/logo-stacked-240.webp';
import stacked400Webp from '../../assets/brand/logo-stacked-400.webp';
import stacked640Webp from '../../assets/brand/logo-stacked-640.webp';
import stacked240Png from '../../assets/brand/logo-stacked-240.png';
import stacked400Png from '../../assets/brand/logo-stacked-400.png';
import stacked640Png from '../../assets/brand/logo-stacked-640.png';

// Mono White Icon
import monoWhiteIcon48Webp from '../../assets/brand/logo-mono-white-icon-48.webp';
import monoWhiteIcon96Webp from '../../assets/brand/logo-mono-white-icon-96.webp';
import monoWhiteIcon192Webp from '../../assets/brand/logo-mono-white-icon-192.webp';
import monoWhiteIcon48Png from '../../assets/brand/logo-mono-white-icon-48.png';
import monoWhiteIcon96Png from '../../assets/brand/logo-mono-white-icon-96.png';
import monoWhiteIcon192Png from '../../assets/brand/logo-mono-white-icon-192.png';

// Mono White Horizontal
import monoWhiteHoriz240Webp from '../../assets/brand/logo-mono-white-horizontal-240.webp';
import monoWhiteHoriz320Webp from '../../assets/brand/logo-mono-white-horizontal-320.webp';
import monoWhiteHoriz480Webp from '../../assets/brand/logo-mono-white-horizontal-480.webp';
import monoWhiteHoriz640Webp from '../../assets/brand/logo-mono-white-horizontal-640.webp';
import monoWhiteHoriz240Png from '../../assets/brand/logo-mono-white-horizontal-240.png';
import monoWhiteHoriz320Png from '../../assets/brand/logo-mono-white-horizontal-320.png';
import monoWhiteHoriz480Png from '../../assets/brand/logo-mono-white-horizontal-480.png';
import monoWhiteHoriz640Png from '../../assets/brand/logo-mono-white-horizontal-640.png';

// Mono Black Icon
import monoBlackIcon48Webp from '../../assets/brand/logo-mono-black-icon-48.webp';
import monoBlackIcon96Webp from '../../assets/brand/logo-mono-black-icon-96.webp';
import monoBlackIcon192Webp from '../../assets/brand/logo-mono-black-icon-192.webp';
import monoBlackIcon48Png from '../../assets/brand/logo-mono-black-icon-48.png';
import monoBlackIcon96Png from '../../assets/brand/logo-mono-black-icon-96.png';
import monoBlackIcon192Png from '../../assets/brand/logo-mono-black-icon-192.png';

// Mono Black Horizontal
import monoBlackHoriz240Webp from '../../assets/brand/logo-mono-black-horizontal-240.webp';
import monoBlackHoriz320Webp from '../../assets/brand/logo-mono-black-horizontal-320.webp';
import monoBlackHoriz480Webp from '../../assets/brand/logo-mono-black-horizontal-480.webp';
import monoBlackHoriz640Webp from '../../assets/brand/logo-mono-black-horizontal-640.webp';
import monoBlackHoriz240Png from '../../assets/brand/logo-mono-black-horizontal-240.png';
import monoBlackHoriz320Png from '../../assets/brand/logo-mono-black-horizontal-320.png';
import monoBlackHoriz480Png from '../../assets/brand/logo-mono-black-horizontal-480.png';
import monoBlackHoriz640Png from '../../assets/brand/logo-mono-black-horizontal-640.png';

const ASSET_REGISTRY = {
  icon: {
    color: {
      aspectRatio: 1,
      webpSrcSet: `${icon48Webp} 48w, ${icon96Webp} 96w, ${icon192Webp} 192w`,
      pngSrcSet: `${icon48Png} 48w, ${icon96Png} 96w, ${icon192Png} 192w`,
      fallback: icon96Png,
      sizes: '(max-width: 640px) 48px, 96px',
    },
    white: {
      aspectRatio: 1,
      webpSrcSet: `${monoWhiteIcon48Webp} 48w, ${monoWhiteIcon96Webp} 96w, ${monoWhiteIcon192Webp} 192w`,
      pngSrcSet: `${monoWhiteIcon48Png} 48w, ${monoWhiteIcon96Png} 96w, ${monoWhiteIcon192Png} 192w`,
      fallback: monoWhiteIcon96Png,
      sizes: '(max-width: 640px) 48px, 96px',
    },
    black: {
      aspectRatio: 1,
      webpSrcSet: `${monoBlackIcon48Webp} 48w, ${monoBlackIcon96Webp} 96w, ${monoBlackIcon192Webp} 192w`,
      pngSrcSet: `${monoBlackIcon48Png} 48w, ${monoBlackIcon96Png} 96w, ${monoBlackIcon192Png} 192w`,
      fallback: monoBlackIcon96Png,
      sizes: '(max-width: 640px) 48px, 96px',
    },
  },
  horizontal: {
    color: {
      aspectRatio: 194 / 868, // 0.2235 (approx 4.47 : 1)
      webpSrcSet: `${horiz240Webp} 240w, ${horiz320Webp} 320w, ${horiz480Webp} 480w, ${horiz640Webp} 640w`,
      pngSrcSet: `${horiz240Png} 240w, ${horiz320Png} 320w, ${horiz480Png} 480w, ${horiz640Png} 640w`,
      fallback: horiz480Png,
      sizes: '(max-width: 640px) 240px, (max-width: 1024px) 320px, 480px',
    },
    white: {
      aspectRatio: 202 / 958, // 0.2108 (approx 4.74 : 1)
      webpSrcSet: `${monoWhiteHoriz240Webp} 240w, ${monoWhiteHoriz320Webp} 320w, ${monoWhiteHoriz480Webp} 480w, ${monoWhiteHoriz640Webp} 640w`,
      pngSrcSet: `${monoWhiteHoriz240Png} 240w, ${monoWhiteHoriz320Png} 320w, ${monoWhiteHoriz480Png} 480w, ${monoWhiteHoriz640Png} 640w`,
      fallback: monoWhiteHoriz480Png,
      sizes: '(max-width: 640px) 240px, (max-width: 1024px) 320px, 480px',
    },
    black: {
      aspectRatio: 202 / 958,
      webpSrcSet: `${monoBlackHoriz240Webp} 240w, ${monoBlackHoriz320Webp} 320w, ${monoBlackHoriz480Webp} 480w, ${monoBlackHoriz640Webp} 640w`,
      pngSrcSet: `${monoBlackHoriz240Png} 240w, ${monoBlackHoriz320Png} 320w, ${monoBlackHoriz480Png} 480w, ${monoBlackHoriz640Png} 640w`,
      fallback: monoBlackHoriz480Png,
      sizes: '(max-width: 640px) 240px, (max-width: 1024px) 320px, 480px',
    },
  },
  stacked: {
    color: {
      aspectRatio: 411 / 681, // 0.6035 (approx 1.66 : 1)
      webpSrcSet: `${stacked240Webp} 240w, ${stacked400Webp} 400w, ${stacked640Webp} 640w`,
      pngSrcSet: `${stacked240Png} 240w, ${stacked400Png} 400w, ${stacked640Png} 640w`,
      fallback: stacked400Png,
      sizes: '(max-width: 640px) 240px, 400px',
    },
    white: {
      aspectRatio: 411 / 681,
      webpSrcSet: `${stacked240Webp} 240w, ${stacked400Webp} 400w, ${stacked640Webp} 640w`,
      pngSrcSet: `${stacked240Png} 240w, ${stacked400Png} 400w, ${stacked640Png} 640w`,
      fallback: stacked400Png,
      sizes: '(max-width: 640px) 240px, 400px',
    },
    black: {
      aspectRatio: 411 / 681,
      webpSrcSet: `${stacked240Webp} 240w, ${stacked400Webp} 400w, ${stacked640Webp} 640w`,
      pngSrcSet: `${stacked240Png} 240w, ${stacked400Png} 400w, ${stacked640Png} 640w`,
      fallback: stacked400Png,
      sizes: '(max-width: 640px) 240px, 400px',
    },
  },
};

const MIN_SIZES = {
  icon: 24,
  horizontal: 160,
  stacked: 120,
};

/**
 * Reusable <Logo /> component
 *
 * @param {'icon' | 'horizontal' | 'stacked'} [variant='icon']
 * @param {'color' | 'white' | 'black'} [tone='color']
 * @param {number} [width]
 * @param {number} [height]
 * @param {string} [className]
 * @param {boolean} [priority=false]
 * @param {boolean} [decorative=false]
 * @param {string} [href]
 */
export const Logo = ({
  variant = 'icon',
  tone = 'color',
  width,
  height,
  className = '',
  priority = false,
  decorative = false,
  href,
  style,
  ...props
}) => {
  const selectedVariant = ASSET_REGISTRY[variant] ? variant : 'icon';
  const selectedTone = ASSET_REGISTRY[selectedVariant][tone] ? tone : 'color';
  const asset = ASSET_REGISTRY[selectedVariant][selectedTone];

  // Calculate explicit width & height to prevent CLS
  let computedWidth = width;
  let computedHeight = height;

  if (computedWidth && !computedHeight) {
    computedHeight = Math.round(computedWidth * asset.aspectRatio);
  } else if (computedHeight && !computedWidth) {
    computedWidth = Math.round(computedHeight / asset.aspectRatio);
  } else if (!computedWidth && !computedHeight) {
    if (selectedVariant === 'icon') {
      computedWidth = 36;
      computedHeight = 36;
    } else if (selectedVariant === 'horizontal') {
      computedWidth = 240;
      computedHeight = Math.round(240 * asset.aspectRatio);
    } else {
      computedWidth = 240;
      computedHeight = Math.round(240 * asset.aspectRatio);
    }
  }

  // Minimum size enforcement check in development
  if (process.env.NODE_ENV !== 'production') {
    const min = MIN_SIZES[selectedVariant];
    if (computedWidth < min && (!computedHeight || computedHeight < min)) {
      console.warn(
        `[Logo] Rendered size (${computedWidth}x${computedHeight}) is smaller than recommended minimum (${min}px) for variant "${selectedVariant}".`
      );
    }
  }

  const altText = decorative
    ? ''
    : 'Prathamesh Chiddarwar — Full-Stack Developer & Cybersecurity';

  const picture = (
    <picture
      className={`inline-block ${className}`}
      style={{
        display: 'inline-block',
        lineHeight: 0,
        ...style,
      }}
    >
      <source
        type="image/webp"
        srcSet={asset.webpSrcSet}
        sizes={asset.sizes}
      />
      <source
        type="image/png"
        srcSet={asset.pngSrcSet}
        sizes={asset.sizes}
      />
      <img
        src={asset.fallback}
        alt={altText}
        aria-hidden={decorative ? 'true' : undefined}
        width={computedWidth}
        height={computedHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : 'auto'}
        style={{
          width: computedWidth ? `${computedWidth}px` : 'auto',
          height: computedHeight ? `${computedHeight}px` : 'auto',
          maxWidth: '100%',
          display: 'block',
          objectFit: 'contain',
        }}
        {...props}
      />
    </picture>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={decorative ? undefined : 'Home — Prathamesh Chiddarwar'}
      >
        {picture}
      </Link>
    );
  }

  return picture;
};

export default Logo;
