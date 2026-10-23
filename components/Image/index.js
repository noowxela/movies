'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import NextImage from 'next/image';

import GradientImageWrapper from 'parts/GradientImageWrapper';

const Image = ({
  style,
  className,
  loadingUI,
  placeholderPath,
  gradientOverlayEnabled,
  overlayClass,
  fetchpriority,
  alt,
  width,
  height,
  src,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const srcRef = useRef(src);

  useEffect(() => {
    if (srcRef.current !== src) {
      srcRef.current = src;
      setLoaded(false);
      setError(false);
    }
  }, [src]);

  const isUsableSrc = typeof src === 'string'
    && src.length > 0
    && !src.includes('undefined')
    && !src.includes('null');
  const imageSrc = (!isUsableSrc || error) ? placeholderPath : src;
  const isSvg = typeof imageSrc === 'string' && imageSrc.endsWith('.svg');
  const toSize = (value, fallback) => {
    const size = typeof value === 'number' ? value : parseInt(String(value), 10);
    return Number.isFinite(size) && size > 0 ? size : fallback;
  };
  const imageWidth = toSize(width, 342);
  const imageHeight = toSize(height, 513);
  const imageProps = {
    className: clsx('img', className),
    onLoad: () => setLoaded(true),
    onError: () => {
      setError(true);
      setLoaded(true);
    },
    style: {
      ...style,
      opacity: loaded ? 1 : 0,
      objectFit: error ? 'contain' : 'cover'
    },
    alt: alt ?? '',
    src: imageSrc || placeholderPath,
    width: imageWidth,
    height: imageHeight
  };

  return (
    <div className='image-shell'>
      {!loaded && (
        <div className='image-loading'>
          {loadingUI}
        </div>
      )}
      <GradientImageWrapper
        className={overlayClass}
        overlayEnabled={gradientOverlayEnabled}>
        {isSvg ? (
          <img
            fetchpriority={fetchpriority}
            alt={alt ?? ''}
            {...imageProps}
            {...rest} />
        ) : (
          <NextImage
            fetchPriority={fetchpriority}
            sizes='(max-width: 768px) 50vw, 25vw'
            {...imageProps}
            {...rest} />
        )}
      </GradientImageWrapper>
      <style jsx>{`
        .image-shell {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .image-loading {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        :global(.img) {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Image;
