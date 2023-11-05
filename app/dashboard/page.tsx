'use client';
import { BuzzContext } from '@/lib/BuzzContext';
import { useContext, useState, useEffect } from 'react';
import MyAppShell from './AppShell';

export default function Page() {
  const { user } = useContext(BuzzContext);
  const { loggedIn, username, email, _id } = user;

  return (
    <>
      <h1>Page Demo</h1>
      <MyAppShell />
    </>
  );
}