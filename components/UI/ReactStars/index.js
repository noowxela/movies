'use client';

import { useMemo, useState } from 'react';

const parentStyles = {
  overflow: 'hidden',
  position: 'relative'
};

const defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'block',
  float: 'left'
};

const getHalfStarStyles = (color, uniqueness) => `
  .react-stars-${uniqueness}:before {
    position: absolute;
    overflow: hidden;
    display: block;
    z-index: 1;
    top: 0;
    left: 0;
    width: 50%;
    content: attr(data-forhalf);
    color: ${color};
  }
`;

const getStars = (count, activeCount) => Array.from({ length: count }, (_, index) => ({
  active: index <= activeCount - 1
}));

const moreThanHalf = (event, size) => {
  const mouseAt = Math.round(Math.abs(event.clientX - event.target.getBoundingClientRect().left));
  return mouseAt > size / 2;
};

const ReactStars = ({
  className,
  edit = true,
  half = true,
  value = 0,
  count = 5,
  char = '★',
  size = 15,
  color1 = 'gray',
  color2 = '#ffd700',
  onChange = () => {}
}) => {
  const uniqueness = `v${String(value ?? 0).replace('.', '_')}`;
  const [preview, setPreview] = useState(null);
  const displayValue = preview ?? value;
  const activeCount = half ? Math.floor(displayValue) : Math.round(displayValue);
  const halfStar = {
    at: Math.floor(displayValue),
    hidden: half && displayValue % 1 < 0.5
  };
  const stars = useMemo(() => getStars(count, activeCount), [count, activeCount]);

  const handleMouseOver = event => {
    if (!edit) {
      return;
    }
    let index = Number(event.target.getAttribute('data-index'));
    if (half) {
      index = moreThanHalf(event, size) ? index + 1 : index + 0.5;
    } else {
      index = index + 1;
    }
    setPreview(index);
  };

  const handleMouseLeave = () => {
    if (!edit) {
      return;
    }
    setPreview(null);
  };

  const handleClick = event => {
    if (!edit) {
      return;
    }
    let index = Number(event.target.getAttribute('data-index'));
    let nextValue;
    if (half) {
      nextValue = moreThanHalf(event, size) ? index + 1 : index + 0.5;
    } else {
      nextValue = index + 1;
    }
    setPreview(null);
    onChange(nextValue);
  };

  return (
    <div className={className} style={parentStyles}>
      {half && (
        <style dangerouslySetInnerHTML={{
          __html: getHalfStarStyles(color2, uniqueness)
        }} />
      )}
      {stars.map((star, index) => {
        const isHalf = half && !halfStar.hidden && halfStar.at === index;
        return (
          <span
            className={isHalf ? `react-stars-${uniqueness}` : ''}
            style={{
              ...defaultStyles,
              color: star.active ? color2 : color1,
              cursor: edit ? 'pointer' : 'default',
              fontSize: `${size}px`
            }}
            key={index}
            data-index={index}
            data-forhalf={char}
            onMouseOver={handleMouseOver}
            onMouseMove={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default ReactStars;
