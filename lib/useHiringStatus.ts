'use client';

import { useState, useEffect } from 'react';

let globalHasActiveJobs = false;
let globalLoaded = false;
let globalPromise: Promise<boolean> | null = null;
const listeners = new Set<(val: boolean) => void>();

export function fetchHiringStatus(): Promise<boolean> {
  if (globalPromise) return globalPromise;

  globalPromise = fetch(`/api/careers?t=${Date.now()}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const active = Boolean(
        data.hasActiveJobs !== undefined
          ? data.hasActiveJobs
          : data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0
      );
      globalHasActiveJobs = active;
      globalLoaded = true;
      listeners.forEach((l) => l(active));
      return active;
    })
    .catch(() => {
      globalHasActiveJobs = false;
      globalLoaded = true;
      listeners.forEach((l) => l(false));
      return false;
    })
    .finally(() => {
      globalPromise = null;
    });

  return globalPromise;
}

export function useHiringStatus() {
  const [hasActiveJobs, setHasActiveJobs] = useState<boolean>(globalHasActiveJobs);

  useEffect(() => {
    listeners.add(setHasActiveJobs);

    // Initial check or use already loaded state
    if (!globalLoaded) {
      fetchHiringStatus();
    } else {
      setHasActiveJobs(globalHasActiveJobs);
    }

    return () => {
      listeners.delete(setHasActiveJobs);
    };
  }, []);

  return { hasActiveJobs, refreshHiringStatus: fetchHiringStatus };
}
