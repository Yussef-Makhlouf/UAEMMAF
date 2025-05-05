'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from './loader';

interface ClientPageLoaderProps {
  children: React.ReactNode;
}

const ClientPageLoader: React.FC<ClientPageLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This effect will run when the route changes
  useEffect(() => {
    setIsLoading(true);
    
    // Set a timeout to simulate loading and show the spinner
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return isLoading ? <Loader /> : <>{children}</>;
};

export default ClientPageLoader; 