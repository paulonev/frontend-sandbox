// TODO: uncomment
// import WebApp from '@twa-dev/sdk'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainScreen from './MainScreen';
import { useState } from 'react';
import { ProvideModalState } from './Common/ModalStateProvider';
import { CreatePortfolioModal } from './Modals/CreatePortfolioModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'all', //by default 'tracked', https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries
    },
  },
});

// 1. screen-overlay routing - CreatePortfolioScreen screen over MainScreen, not as separate urls like /home, /new
function App() {
  const [createPortfolioModalOpen, setCreatePortfolioModalOpen] = useState(false);

  return (
      <ProvideModalState value={
          { createPortfolio: { open: createPortfolioModalOpen, setOpen: setCreatePortfolioModalOpen } }
      }>
          <QueryClientProvider client={queryClient}>
              <MainScreen />
              <CreatePortfolioModal />
          </QueryClientProvider>
      </ProvideModalState>
  )
}

export default App
