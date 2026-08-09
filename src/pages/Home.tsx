import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServiceCards } from '../components/ServiceCards';
import { QuoteBox } from '../components/QuoteBox';
import { ChatAgent} from '../components/ChatAgent';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceCards />
        <ChatAgent/>
        <QuoteBox />
      </main>
      <Footer />
    </>);

}