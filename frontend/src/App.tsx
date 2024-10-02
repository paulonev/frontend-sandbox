import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import MainScreen from './MainScreen';
import { useEffect, useState } from 'react';
import { ProvideModalState } from './Common/ModalStateProvider';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Black, Green, Red } from './Common/colors';
import { PortfolioCardTheme } from './MainScreen/PortfolioCardTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CustomQueryErrorBoundary } from './CustomQueryErrorBoundary';
import React from 'react';
import { GlobalStyle } from './globalStyle';
import { SDKProvider, useMiniApp, useViewport } from '@telegram-apps/sdk-react';
import 'react-loading-skeleton/dist/skeleton.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'error', 'fetchStatus'], //by default 'tracked', https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries
    },
  },
});

// 1. screen-overlay routing - CreatePortfolioScreen screen over MainScreen, not as separate urls like /home, /new
function Inner() {
  const miniApp = useMiniApp();
  const viewPort = useViewport();
  // swipeBehavior not implemented
  miniApp.ready();

  useEffect(() => {
    if (viewPort !== undefined) {
      if (!viewPort.isExpanded) viewPort.expand();
    }
  }, [viewPort]);
  
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
                        <CustomQueryErrorBoundary reset={reset}>
                            <MainScreen />
                        </CustomQueryErrorBoundary>
                    )}
                  </QueryErrorResetBoundary>
              </QueryClientProvider>
          </ProvideModalState>
        </LocalizationProvider>
      </ThemeProvider>
  )
}

export const App = () => {
  return (
    <React.StrictMode>
      <SDKProvider debug={false} acceptCustomStyles={false}>
        <GlobalStyle />
        <Inner />
      </SDKProvider>
    </React.StrictMode>
  )
}

const defaultTheme: DefaultTheme = {
  card_default: {
    bgColor: "#DCEBFF",
    textColor: Black,
    tagsBgColor: "rgba(255, 255, 255, 0.2)",
    gainColor: Green,
    lossColor: Red,
  }
};