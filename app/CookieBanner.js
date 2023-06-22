'use client';

import { useEffect, useState } from 'react';
import { parseJson } from '../util/json';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import style from './CookieBanner.module.scss';

export function CookieBanner() {
  const [areCookiesTermsAccepted, setAreCookiesTermsAccepted] = useState(true);

  useEffect(() => {
    const localStorageValue = getLocalStorage('cookiePolicy');
    if (localStorageValue) {
      setAreCookiesTermsAccepted(parseJson(localStorageValue));
    } else {
      setAreCookiesTermsAccepted(false);
    }
  }, []);

  return (
    <div
      className={`${style.cookieBanner} ${
        areCookiesTermsAccepted ? style.closed : style.open
      }`}
    >
      <div>
        This is the cookie policy. Please accept the terms and conditions.
      </div>
      <button
        className={style.cookiebutton}
        onClick={() => {
          setLocalStorage('cookiePolicy', JSON.stringify(true));
          setAreCookiesTermsAccepted(true);
        }}
      >
        Accept
      </button>
    </div>
  );
}
