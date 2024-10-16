import { PortfoliosSummary } from "./PortfoliosSummary";
import { usePortfoliosQuery } from "./usePortfoliosQuery";
import { Section } from "../Common/components/Section";
import { Portfolios } from "./Portfolios";
import PortfoliosSummary_s from "./Skeletoned/PortfoliosSummary_skeletoned";
import Portfolios_s from './Skeletoned/Portfolios_skeletoned';
import { useMemo, useState } from "react";
import { PortfolioViewModal } from "../Modals/PortfolioViewModal";
import { useModalState } from "../Common/ModalStateProvider";
import { useCoinsQuery } from "../AddTransactionScreen/useCoinsQuery";
import { ProvidePopularCoins } from "../AddTransactionScreen/PopularCoinsProvider";
import { QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { CustomQueryErrorBoundary } from "../CustomQueryErrorBoundary";
import { FallbackWithGoBackButton } from "../Common/components/FallbackWithGoBack";
import CreatePortfolioModalFunction from "../Modals/CreatePortfolioModal";
import { MainScreenQueryKey } from "../constants";
import { useLaunchParams, useMiniApp, usePopup } from "@telegram-apps/sdk-react";
import { Black } from "../Common/colors";
import { telegram_showAlert } from "../Telegram/utils";

const MainScreen = () => {
    const lp = useLaunchParams();
    const queryClient = useQueryClient();
    const popup = usePopup();
    const miniApp = useMiniApp();

    const CreatePortfolioModalComponent = useMemo(() => CreatePortfolioModalFunction({ 
        modalName: "createPortfolio", 
        hasPortfolios: true,
        //reset MainScreen query to its pre-loaded (null in our case) state, and refetch the query since it's active
        onModalClosed: () => queryClient.resetQueries({ queryKey: [MainScreenQueryKey], exact: true }), 
    }), [queryClient]);

    const modalState = useModalState("specificPortfolio");
    const { data, isLoading, isRefetching, refetch } = usePortfoliosQuery();
    const { data: coins } = useCoinsQuery();
    const [portfolioId, setPortfolioId] = useState<number | null>(null);

    const selectedPortfolio = useMemo(() => {
        if (!portfolioId || !data) {
            return null;
        }

        return data.items.find(x => x.id === portfolioId) ?? null;
    }, [data, portfolioId]);

    const selectPortfolio = (id: number | null) => {
        if (Number.isSafeInteger(id)) {
            modalState?.setOpen(true);
        }

        setPortfolioId(id);
    }

    const closePortfolio = () => {
        setPortfolioId(null);
        refetch();
    }

    const onRefreshClick = async () => {
        // if (telegram_isClientEnabled() && telegram_isVersionAtLeast("6.0")) {
            await telegram_showAlert(popup, "The app will reload", () => {
                window.location.href = "https://t.me/randomtwa1_bot/app1";
                miniApp.close();
            });
        // }
    }

    return !portfolioId && (isLoading || isRefetching) ? (
        <>
            <Section>
                <PortfoliosSummary_s />
            </Section>
            <Section enableDelimiter={false}>
               <Portfolios_s />
            </Section>
        </>
    ) : (
        <ProvidePopularCoins value={coins}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <CustomQueryErrorBoundary reset={reset} Footer={<FallbackWithGoBackButton onClick={() => closePortfolio()} />}>
                        <PortfolioViewModal selectedPortfolio={selectedPortfolio} onClose={closePortfolio} />
                        <CreatePortfolioModalComponent />
                    </CustomQueryErrorBoundary>
                )}
            </QueryErrorResetBoundary>
            <Section>
                <PortfoliosSummary totalAmount={data!.meta.overallVolume} difference={data!.meta.gainLoss} /> 
            </Section>
            <Section enableDelimiter={false}>
                <Portfolios items={data!.items} selectPortfolio={selectPortfolio} />
            </Section>
            <Section>
                <button onClick={onRefreshClick}>Refresh</button>
            </Section>
            <Section>
                <span style={{ color: Black, textWrap: "wrap" }}>
                    {"auth_date: "}{lp.initData?.authDate.toString()}
                </span>
            </Section>
        </ProvidePopularCoins>
    );
}

export default MainScreen;