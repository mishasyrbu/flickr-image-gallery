import React, { SyntheticEvent } from 'react';
import { debounce } from 'lodash';

import SearchInput from '../components/SearchInput';
import ImageItem from '../components/ImageItem';
import { getImageUrl } from '../utils';
import { loadPhotosApi } from '../services';
import './styles.scss';

export interface ImageGalleryProps {
  
}

export interface PhotoObjet {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

export interface ImageGalleryState {
  searchQuery: string;
  photo: Array<PhotoObjet>;
  pages: number;
  perpage: number;
  total: string;
  page: number;
  loading: boolean;
}

class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
  constructor(props: ImageGalleryProps) {
    super(props);

    this.state = {
      searchQuery: '',
      photo: [],
      pages: 0,
      page: 1,
      perpage: 0,
      total: '0',
      loading: true,
    };

    this.onScrollList = debounce(this.onScrollList, 100);
    this.loadPhotos = debounce(this.loadPhotos, 500);
  }

  onScrollList = (scrollTop: number, offsetHeight: number, scrollHeight: number) => {
    const { page, pages } = this.state;
    if (scrollTop + offsetHeight >= scrollHeight - 350 && page < pages) {
      this.setState({ loading: true }, () => this.loadPhotos(true));
    }
  };

  handleOnScrollEvent = (event: SyntheticEvent<HTMLDivElement>) => {
    const { scrollTop, offsetHeight, scrollHeight } = event.currentTarget;
    
    this.onScrollList(scrollTop, offsetHeight, scrollHeight);
  };

  handleSearchChange = (searchQuery: string) => {
    this.setState({ searchQuery, page: 1, loading: true }, this.loadPhotos);
  };

  /**
   * Call load photos API and save result in state
   * 
   * scrollLoading {boolean} - flag indicates if we are in infinite scrolling state
   */
  loadPhotos = (scrollLoading = false) => {
    const { searchQuery, page, pages } = this.state;
    let nextPage = page;

    if (scrollLoading && page < pages) {
      nextPage++;
    }

    loadPhotosApi(searchQuery, nextPage).then((photos) => {
      if (scrollLoading) {
        this.setState((state) => ({ ...photos, photo: [...state.photo, ...photos.photo], loading: false }));
      } else {
        this.setState({ ...photos, loading: false });
      }
    });
  };

  render() {
    const { searchQuery, photo, total, loading } = this.state;

    return (
      <div className="image-gallery">
        {loading && <div className="loading-overlay">Loading...</div>}
        <SearchInput placeholder="Search..." value={searchQuery} onChange={this.handleSearchChange} />
        <div className="results-count">Found: {total}</div>
        <div className="image-list" onScroll={this.handleOnScrollEvent}>
          {photo.map(({ id, secret, server, farm, title }) => (
            <ImageItem key={`${farm}_${id}`} src={getImageUrl(farm, server, id, secret)} alt={title} />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadPhotos();
  }
}

export default ImageGallery;
