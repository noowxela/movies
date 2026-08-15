'use client';

import { useRef } from 'react';

import PersonLink from './PersonLink';

const ITEM_WIDTH = 70;

const Cast = ({
  cast,
  baseUrl
}) => {
  const scrollerRef = useRef(null);

  if (!cast?.length) {
    return null;
  }

  const scrollByDirection = direction => {
    scrollerRef.current?.scrollBy({
      left: direction * ITEM_WIDTH * 3,
      behavior: 'smooth'
    });
  };

  return (
    <div className='cast'>
      <button
        type='button'
        className='cast-arrow prev'
        aria-label='Previous cast'
        onClick={() => scrollByDirection(-1)}>
        «
      </button>
      <div
        ref={scrollerRef}
        className='cast-scroller'>
        {cast.map(person => (
          <div
            className='cast-item'
            key={person.credit_id || `${person.id}-${person.cast_id || person.order}`}>
            <PersonLink
              person={person}
              baseUrl={baseUrl} />
          </div>
        ))}
      </div>
      <button
        type='button'
        className='cast-arrow next'
        aria-label='Next cast'
        onClick={() => scrollByDirection(1)}>
        »
      </button>
      <style jsx>{`
        .cast {
          position: relative;
          margin: 0 20px;
        }

        .cast-scroller {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .cast-scroller::-webkit-scrollbar {
          display: none;
        }

        .cast-item {
          flex: 0 0 ${ITEM_WIDTH}px;
          width: ${ITEM_WIDTH}px;
          min-width: ${ITEM_WIDTH}px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cast-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          border: 0;
          padding: 0;
          background: transparent;
          color: #666;
          font-size: 32px;
          line-height: 1;
          cursor: pointer;
        }

        .cast-arrow:hover {
          color: #ccc;
        }

        .cast-arrow.prev {
          left: -20px;
        }

        .cast-arrow.next {
          right: -20px;
        }
      `}</style>
    </div>
  );
};

export default Cast;
