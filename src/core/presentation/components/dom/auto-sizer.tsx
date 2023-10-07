'use client'
import React, { useEffect, useRef, useState } from 'react';

export interface AutoSizerProps {
  children: (size: { width: number, height: number }) => React.ReactNode;
  className: string
}

export const AutoSizer = ({ children, ...props }: AutoSizerProps) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    }
  }, []);

  return (
    <div ref={ref} {...props}>
      {Boolean(width && height) && children({ width, height })}
    </div>
  );
}