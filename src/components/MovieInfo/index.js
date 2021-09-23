import React from 'react';
import PropTypes from 'prop-types';

// Components
import Thumb from '../Thumb';

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';

// Styles
import { Wrapper, Content, Text } from './MovieInfo.styles';

// Images
import NoImage from '../../images/no_image.jpg';

const MovieInfo = ({ movie }) => (
  <Wrapper backdrop={movie.backdrop_path}>
    <Content>
      <Thumb
        image={ movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`: NoImage }
        clickable={false}
      />
      <Text>
        <h1>{movie.title}</h1>
        <h3>PLOT</h3>
        <p>{movie.overview}</p>
        <div className="rating-directors">
          <div>
            <h3>Rating</h3>
            <div className="score">{movie.vote_average}</div>
          </div>
          <div className="director">
            <h3>Director{movie.directors.length > 1 ? 's' : ''}</h3>
            {movie.directors.map(director => <p key={director.credit_id}>{director.name}</p>)}
          </div>
        </div>
      </Text>
    </Content>
  </Wrapper>
);

MovieInfo.propTypes = {
  movie: PropTypes.object
}

export default MovieInfo;;
