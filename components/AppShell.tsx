'use client';

import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './chatbot/ChatWidget';
import CustomCursor from './CustomCursor';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <CustomCursor />
      <Navbar />
      <main className="py-7 md:py-10">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
