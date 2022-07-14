import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRef, useEffect } from 'react';
import {SunIcon, MoonIcon} from '@heroicons/react/solid';

const Nav = () => {
  const useIsMounted = () => {
    const isMounted = useRef(true);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = true);
    }, []);
    return isMounted;
  };
  const isMounted = useIsMounted();
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <nav className="w-screen flex place-content-between p-4 top-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono font-bold text-xl ">
        <div>
          <Link href="/">
            <a className='text-base md:text-xl'>cartas para um astronauta.</a>
          </Link>
        </div>
        <div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="p-2 focus:outline-none h-8 w-8"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {isMounted.current && (
              theme === 'dark' ? (
                  <SunIcon/>
                ) : (
                  <MoonIcon/>
                )
              
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
