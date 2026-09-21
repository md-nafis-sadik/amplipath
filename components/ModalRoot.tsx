'use client';
import React, { useEffect } from 'react';
import RFPModal from './Popups/RFPModal';
import LetsTalkModal from './Popups/LetsTalkModal';
import { useModal, hasShownToday, markShownToday } from './ModalContext';

export default function ModalRoot() {
  const { openModal } = useModal();

  useEffect(() => {
    // Only auto-open if not already shown or closed within the last 24 hours
    if (hasShownToday()) return;

    const timer = setTimeout(() => {
      if (!hasShownToday()) {
        openModal('lead');
        markShownToday();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [openModal]);

  return (
    <>
      <RFPModal />
      <LetsTalkModal />
    </>
  );
}
