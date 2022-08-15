import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import fetchImages from 'services/fetchImages';
import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

const Status = {
  START: 'start',
  LOADING: 'loading',
  SUCCSESS: 'succsess',
  FAIL: 'fail',
};

function App() {
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [queryList, setQueryList] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.START);
  const [loaderActive, setLoaderActive] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [tags, setTags] = useState(null);

  const handleFormSubmit = query => {
    if (query.trim() === '') {
      setStatus(status.START);
      setShowBtn(false);
      setPage(1);
      setQueryList([]);
      return;
    }
    setQuery(query);
    setShowBtn(false);
    setPage(1);
    setQueryList([]);
  };
  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setLoaderActive(true);
        const searchResult = await fetchImages(query, page);
        if (searchResult.total === 0) {
          setStatus(Status.FAIL);
          setShowBtn(false);
          setQueryList([]);
        }
        if (page === 1) {
          setQueryList([...searchResult.hits]);
        } else {
          setQueryList(prevQueryList => {
            return [...prevQueryList, ...searchResult.hits];
          });
        }
        if (searchResult.hits.length > 0 && searchResult.hits.length < 12) {
          setShowBtn(false);
          setStatus(Status.SUCCSESS);
        } else if (searchResult.hits.length === 0) {
          // console.log('end');
        } else {
          setShowBtn(true);
          setStatus(Status.SUCCSESS);
        }
      } catch (error) {
        setStatus(Status.FAIL);
      } finally {
        setLoaderActive(false);
      }
    };
    getData();
  }, [page, query]);

  const openModal = (largeImageURL, tags) => {
    setLargeImage(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setLargeImage(null);
    setTags(null);
  };

  const loadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };

  return (
    <MyApp>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'start' && (
        <MyNotification>welcome to FBI service. {<br />}type.</MyNotification>
      )}
      {status === 'fail' && <MyNotification>nothing found</MyNotification>}
      {status === 'succsess' && (
        <ImageGallery queryList={queryList} openModal={openModal} />
      )}
      {status === 'loading' && <MyNotification>Search {query}</MyNotification>}
      {loaderActive && <Loader />}
      {showBtn && <Button loadMore={loadMore}>Load more</Button>}
      {largeImage?.length > 0 && (
        <Modal onClose={closeModal} large={largeImage} tags={tags} />
      )}
    </MyApp>
  );
}

const MyApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
const MyNotification = styled.h3`
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
  color: rgb(92, 92, 92);
`;

export default App;
