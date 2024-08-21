import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import MainScreen from './MainScreen';
import { useState } from 'react';
import { ProvideModalState } from './Common/ModalStateProvider';
import { CreatePortfolioModal } from './Modals/CreatePortfolioModal';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Black, Green, Red } from './Common/colors';
import { PortfolioCardTheme } from './MainScreen/PortfolioCardTheme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'error'], //by default 'tracked', https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries
    },
  },
});

// 1. screen-overlay routing - CreatePortfolioScreen screen over MainScreen, not as separate urls like /home, /new
function App() {
  const [createPortfolioModalOpen, setCreatePortfolioModalOpen] = useState(false);

  return (
      <ThemeProvider theme={{...defaultTheme, ...PortfolioCardTheme}}>
        <ProvideModalState value={
            { createPortfolio: { open: createPortfolioModalOpen, setOpen: setCreatePortfolioModalOpen } }
        }>
            <QueryClientProvider client={queryClient}>
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                      <GlobalErrorBoundary reset={reset}>
                          <MainScreen />
                          <CreatePortfolioModal />
                      </GlobalErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
            </QueryClientProvider>
        </ProvideModalState>
      </ThemeProvider>
  )
}

export default App

const defaultTheme: DefaultTheme = {
  card_default: {
    bgColor: "#DCEBFF",
    textColor: Black,
    tagsBgColor: "rgba(255, 255, 255, 0.2)",
    gainColor: Green,
    lossColor: Red,
  }
};