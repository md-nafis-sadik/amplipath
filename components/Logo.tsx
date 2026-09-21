'use client';
import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'horizontal' | 'icon' | 'full';
  className?: string;
}

export default function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 cursor-pointer no-underline ${className}`}>
      <img
        src="/images/logo-horizontal.jpg"
        alt="AMPLIPATH"
        className="h-8 md:h-9 w-auto object-contain"
      />
    </Link>
  );
}
