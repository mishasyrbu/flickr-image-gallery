import React from 'react';
import classNames from 'classnames';

import './styles.scss';

export interface Props {
  placeholder?: string,
  className?: string,
  src: string,
  alt?: string,
}

const ImageItem: React.FC<Props> = ({ className, src, alt }) => {
  return (
    <img
      className={classNames('image-item', className)}
      src={src}
      alt={alt}
    />
  );
}

export default ImageItem;
