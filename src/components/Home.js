import React from 'react';

//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

//Component
import HeroImage from '../components/HeroImage';
import Grid from '../components/Grid';
import Thumb from '../components/Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

// Image
import  NoImage from '../images/no_image.jpg';

const Home = () => {
  const  { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();
  const firstMovie = state.results[0];

  if(error) return <div>Something went wrong ...</div>;

  return (
    <>
      { !searchTerm && firstMovie ?
        <HeroImage 
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${firstMovie.backdrop_path}`}
          title={firstMovie.original_title}
          text={firstMovie.overview}
        /> : null
      }
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map(movie => (
          <Thumb key={movie.id} clickable 
            image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text='Load More' callback={() => setIsLoadingMore(true)}/>
      )}
    </>
  );
};

export default Home;