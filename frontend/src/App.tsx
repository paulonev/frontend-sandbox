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
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, SDKProvider, useLaunchParams, useMiniApp, usePopup, useThemeParams, useViewport } from '@telegram-apps/sdk-react';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { telegram_showAlert } from './Telegram/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'error', 'fetchStatus'], //by default 'tracked', https://tkdodo.eu/blog/react-query-render-optimizations#tracked-queries
    },
  },
});

// 1. screen-overlay routing - CreatePortfolioScreen screen over MainScreen, not as separate urls like /home, /new
function Inner() {
  const popup = usePopup();
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const viewPort = useViewport();
  const themeParams = useThemeParams();
  // swipeBehavior not implemented
  miniApp.ready();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewPort !== undefined) {
      if (!viewPort.isExpanded) viewPort.expand();
      bindViewportCSSVars(viewPort);
    }
  }, [viewPort]);

  const [createPortfolioModalOpen, setCreatePortfolioModalOpen] = useState(false);
  const [specificPortfolioModalOpen, setSpecificPortfolioModalOpen] = useState(false);
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);

  telegram_showAlert(popup, `The theme is ${miniApp.isDark ? 'dark' : 'light'}. Theme params: ${JSON.stringify(themeParams)}`)
  return (
    <AppRoot
      appearance={miniApp.isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ProvideModalState value={{ 
          createPortfolio: { open: createPortfolioModalOpen, setOpen: setCreatePortfolioModalOpen },
          specificPortfolio: { open: specificPortfolioModalOpen, setOpen: setSpecificPortfolioModalOpen },
          addTransaction: { open: addTransactionModalOpen, setOpen: setAddTransactionModalOpen }
        }}>
          <MainScreen />
        </ProvideModalState>
      </LocalizationProvider>
    </AppRoot>
  )
}

export const App = () => {
  return (
    <React.StrictMode>
      <SDKProvider debug={false} acceptCustomStyles={false}>
        <ThemeProvider theme={{...defaultTheme, ...PortfolioCardTheme}}>
          <GlobalStyle />
          <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <CustomQueryErrorBoundary reset={reset}>
                  <Inner />
                </CustomQueryErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </QueryClientProvider>
        </ThemeProvider>
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