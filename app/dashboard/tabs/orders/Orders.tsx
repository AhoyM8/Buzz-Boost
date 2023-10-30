'use client';
import { BuzzContext } from '@/lib/BuzzContext';
import { useContext, useState, useEffect } from 'react';


export function Orders() {
  const { user } = useContext(BuzzContext);
  const { loggedIn, username, email, _id } = user;

  return (
    <>
      <h1>Orders Page</h1>
    </>
  );
}