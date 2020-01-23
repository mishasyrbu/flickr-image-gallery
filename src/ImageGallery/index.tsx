import React from 'react';

import SearchInput from '../components/SearchInput';
import ImageItem from '../components/ImageItem';
import { getImageUrl } from '../utils';
import './styles.scss';

export interface Props {
  
}

class ImageGallery extends React.Component<Props> {
  render() {

    return (
      <div className="image-gallery">
        <SearchInput placeholder="Search..." value="" onChange={() => {}} />
        <ImageItem src={getImageUrl({ server: 65535, id: 3760517697, secret: '391b03f07d' })} />
      </div>
    );
  }
}

export default ImageGallery;
