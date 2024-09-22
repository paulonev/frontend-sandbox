import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import MainScreen from './MainScreen';
import { useState } from 'react';
import { ProvideModalState } from './Common/ModalStateProvider';
import { CreatePortfolioModal } from './Modals/CreatePortfolioModal';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Black, Green, Red } from './Common/colors';
import { PortfolioCardTheme } from './MainScreen/PortfolioCardTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'error', 'fetchStatus'], //by default 'tracked', https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries
    },
  },
});

// 1. screen-overlay routing - CreatePortfolioScreen screen over MainScreen, not as separate urls like /home, /new
function App() {
  const [createPortfolioModalOpen, setCreatePortfolioModalOpen] = useState(false);
  const [specificPortfolioModalOpen, setSpecificPortfolioModalOpen] = useState(false);
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);

  return (
      <ThemeProvider theme={{...defaultTheme, ...PortfolioCardTheme}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ProvideModalState value={{ 
                createPortfolio: { open: createPortfolioModalOpen, setOpen: setCreatePortfolioModalOpen },
                specificPortfolio: { open: specificPortfolioModalOpen, setOpen: setSpecificPortfolioModalOpen },
                addTransaction: { open: addTransactionModalOpen, setOpen: setAddTransactionModalOpen }
          }}>
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
        </LocalizationProvider>
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