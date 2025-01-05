import React, { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface QueryContextProps {
  refParam: string | null;
  cidParam: string | null;
}

const QueryContext = createContext<QueryContextProps | undefined>(undefined);

export const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  const refParam = router.query.ref ? String(router.query.ref) : null;
  const cidParam = router.query.cid ? String(router.query.cid) : null;

  return (
    <QueryContext.Provider value={{ refParam, cidParam }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};