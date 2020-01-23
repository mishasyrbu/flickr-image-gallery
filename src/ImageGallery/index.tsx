import React, { SyntheticEvent } from 'react';
import { debounce } from 'lodash';

import SearchInput from '../components/SearchInput';
import ImageItem from '../components/ImageItem';
import { getImageUrl } from '../utils';
import './styles.scss';

export interface Props {
  
}

interface PhotoObjet {
  id: string,
  owner: string,
  secret: string,
  server: string,
  farm: number,
  title: string,
}

export interface State {
  photo: Array<PhotoObjet>,
}

class ImageGallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      photo: [],
    };
    this.onScrollList = debounce(this.onScrollList.bind(this), 100);
  }

  onScrollList = (scrollTop: number, offsetHeight: number, scrollHeight: number) => {
    console.log(scrollTop, offsetHeight, scrollHeight, 'kek...');
    if (scrollTop + offsetHeight === scrollHeight) {
      console.log('loading...');
    }
  };

  handleOnScrollEvent = (event: SyntheticEvent<HTMLDivElement>) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.currentTarget;
    
    this.onScrollList(scrollTop, offsetHeight, scrollHeight);
  };

  render() {
    const { photo } = this.state;

    return (
      <div className="image-gallery">
        <SearchInput placeholder="Search..." value="" onChange={() => {}} />
        <div className="image-list" onScroll={this.handleOnScrollEvent}>
          {photo.map(({ id, secret, server, farm, title }) => (
            <ImageItem key={id} src={getImageUrl({ server, id, secret, farm })} alt={title} />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const api = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&content_type=1&is_getty=1';
    fetch(api)
      .then(response => response.json())
      .then(({ photos }) => {
        console.log(photos);
        this.setState(photos);
      });
  }
}

export default ImageGallery;
