import React, { PropTypes } from 'react';

const FacebookBtn = ({ className, onClick, children }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

FacebookBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default FacebookBtn;
