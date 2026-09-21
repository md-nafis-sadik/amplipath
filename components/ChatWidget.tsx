'use client';
import React, { useEffect } from 'react';
import Script from 'next/script';
import { useModal } from './ModalContext';

export default function ChatWidget() {
  const { openModal } = useModal();
  const tawkPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const tawkWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || 'default';

  // If Tawk.to is configured, the Script component below will initialize it.
  // Otherwise, we render the stylish floating chat button that opens Let's Talk popup.
  if (tawkPropertyId) {
    return (
      <Script
        id="tawk-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
    );
  }

  return (
    <button
      id="nx-chat-btn"
      onClick={() => openModal('lead')}
      aria-label="Open live chat"
      title="Chat with us"
    >
      <div id="nx-chat-pulse"></div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  );
}
