import React, { PropTypes } from 'react';
import style from './style.scss';
import classnames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
// import CheckBox from './CheckBox';

const PhotoCollection = ({ handleClick, photos, category }) => (
  <div>
    {(photos != null) ?
      <div className={style.collection}>{photos.data.map((photo, i) => {
        let className = classnames(style.photo, { [style.selected]: photo.selected });
        return (
          <div key={i} className={style.imgWrapper}>
            <div className={style.checkBtn}>
              <Checkbox
                checked={photo.selected}
                iconStyle={{ width: 30, height: 30, fill: 'rgb(255, 64, 129)' }}
                onCheck={() => handleClick(photo.id, photo.images[0].source, category)}
              />
            </div>
            <img
              onClick={() => handleClick(photo.id, photo.images[0].source, category)}
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
  category: PropTypes.string,
};

export default PhotoCollection;
