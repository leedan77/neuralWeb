import React from 'react';
import style from './style.scss';

const CheckBox = () => (
  <div>
    <input type="checkbox" id="checkBtn" value="hehe" />
    <label htmlFor="checkBtn" className={style.checkBtn}>QQ</label>
  </div>
);

export default CheckBox;
