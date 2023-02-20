import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import imageLoader from '../services/api';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    imageLoader(query, page)
      .then(response => {
        const { hits, totalHits } = response;
        if (totalHits === 0) {
          toast.warn('No images match your query!');
        }
        setImages(s => [...s, ...hits]);
        setIsLoading(false);
        setTotalHits(totalHits);
      })
      .catch(err => {
        toast.error('Oops! Something went wrong...');
        setIsLoading(false);
        console.log(err);
      });
  }, [query, page]);

  const changeQuery = newQuery => {
    if (newQuery === '') {
      setImages([]);
      setTotalHits(0);
      return toast.info('Please enter something to search!');
    }
    if (newQuery !== query) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
      setTotalHits(0);
    }
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={changeQuery} />
      {images.length > 0 && <ImageGallery images={images} />}
      {totalHits > images.length && (
        <Button onClick={handleClick} disabled={isLoading} />
      )}
      {isLoading && <Loader />}
      <ToastContainer />
    </div>
  );
}
