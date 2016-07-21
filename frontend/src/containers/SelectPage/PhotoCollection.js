import React, { PropTypes } from 'react';
import style from './style.scss';
import classnames from 'classnames';

const PhotoCollection = ({ handleClick, photos }) => (
  <div>
    {(photos != null) ?
      <div className={style.collection}>{photos.data.map((photo, i) => {
        let className = classnames(style.photo, { [style.selected]: false });
        return (
          <div key={i}>
            <img
              onClick={() => handleClick(photo.id)}
              className={className}
              src={photo.images[0].source}
              alt={photo.id}
            />
          </div>
        );
      }
    )}</div> : null}
  </div>
);


PhotoCollection.propTypes = {
  photos: PropTypes.object,
  handleClick: PropTypes.func,
};

export default PhotoCollection;
