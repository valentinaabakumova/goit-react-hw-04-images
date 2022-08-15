import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageGallery = ({ queryList, openModal }) => {
  return (
    <MyImageGallery>
      {queryList.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={openModal}
        />
      ))}
    </MyImageGallery>
  );
};

ImageGallery.propTypes = {
  queryList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openModal: PropTypes.func.isRequired,
};

const MyImageGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export default ImageGallery;
