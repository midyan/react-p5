/**
 * React App SDK (https://github.com/kriasoft/react-app)
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';

function Header() {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <a className={s.title} href='https://github.com/midyan/react-p5'>
          p5.js <strong>Using React-App</strong>
        </a>
      </div>
    </header>
  );
}

export default Header;
