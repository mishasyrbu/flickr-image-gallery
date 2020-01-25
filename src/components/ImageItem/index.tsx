import React from 'react';
import classNames from 'classnames';

import './styles.scss';

export interface ImageItemProps {
  placeholder?: string,
  className?: string,
  src: string,
  alt?: string,
}

const ImageItem: React.FC<ImageItemProps> = ({ className, src, alt }) => {
  return (
    <img
      className={classNames('image-item', className)}
      src={src}
      alt={alt}
    />
  );
}

export default ImageItem;
