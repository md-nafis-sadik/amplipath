'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import RFPModal from './Popups/RFPModal';
import LetsTalkModal from './Popups/LetsTalkModal';
import { useModal, hasShownToday, markShownToday } from './ModalContext';

export default function ModalRoot() {
  const pathname = usePathname();
  const { openModal } = useModal();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    // Only auto-open if not already shown or closed within the last 24 hours
    if (hasShownToday()) return;

    const timer = setTimeout(() => {
      if (!hasShownToday()) {
        openModal('lead');
        markShownToday();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [openModal, pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <RFPModal />
      <LetsTalkModal />
    </>
  );
}
