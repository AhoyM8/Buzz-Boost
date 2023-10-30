'use client';
import { BuzzContext } from '@/lib/BuzzContext';
import { useContext, useState, useEffect } from 'react';


export function StartBuzz() {
  const { user } = useContext(BuzzContext);
  const { loggedIn, username, email, _id } = user;

  return (
    <>
      <h1>Start Page</h1>
    </>
  );
}