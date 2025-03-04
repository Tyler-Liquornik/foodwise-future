
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageTransition from '@/components/transitions/PageTransition';

import Scanner from '@/components/features/Scanner';
import Inventory from '@/components/features/Inventory';
import Recipes from '@/components/features/Recipes';
import Statistics from '@/components/features/Statistics';

const Index: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />
      
      <main className="flex-1 overflow-auto pt-2 pb-2">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <Scanner />
              </PageTransition>
            } />
            <Route path="/inventory" element={
              <PageTransition>
                <Inventory />
              </PageTransition>
            } />
            <Route path="/recipes" element={
              <PageTransition>
                <Recipes />
              </PageTransition>
            } />
            <Route path="/stats" element={
              <PageTransition>
                <Statistics />
              </PageTransition>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Index;
