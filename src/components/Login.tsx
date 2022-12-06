import { signIn } from 'next-auth/react';
import React, { FC } from 'react'

export const Login: FC = () => {
  return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="flex flex-col items-center">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Login</h2>
        <button className="flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 focus-visible:ring ring-gray-300 text-gray-800 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3" onClick={() => signIn('google')}>
          Google Login
        </button>
          </div>
        </div>
      </div>
  );
};
