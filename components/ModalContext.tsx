'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

type ModalType = 'rfp' | 'lead' | null;

const MODAL_STORAGE_KEY = 'amplipath_lead_modal_auto_shown';
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function hasShownToday(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const lastShown = localStorage.getItem(MODAL_STORAGE_KEY);
    if (!lastShown) return false;

    const lastTime = parseInt(lastShown, 10);
    if (isNaN(lastTime)) {
      const today = new Date().toISOString().slice(0, 10);
      return lastShown === today;
    }
    return Date.now() - lastTime < ONE_DAY_MS;
  } catch (e) {
    return false;
  }
}

export function markShownToday(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MODAL_STORAGE_KEY, Date.now().toString());
  } catch (e) {
    // ignore
  }
}

interface ModalContextType {
  activeModal: ModalType;
  selectedIndustry: string;
  openModal: (type: 'rfp' | 'lead', industry?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  activeModal: null,
  selectedIndustry: '',
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  const openModal = useCallback((type: 'rfp' | 'lead', industry = '') => {
    setSelectedIndustry(industry);
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedIndustry('');
    markShownToday();
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, selectedIndustry, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
