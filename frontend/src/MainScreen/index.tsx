import { PortfoliosSummary } from "./PortfoliosSummary";
import { usePortfoliosQuery } from "./usePortfoliosQuery";
import { Section } from "../Common/components/Section";
import { Portfolios } from "./Portfolios";
import PortfoliosSummary_s from "./Skeletoned/PortfoliosSummary_skeletoned";
import Portfolios_s from './Skeletoned/Portfolios_skeletoned';
import { useMemo, useState } from "react";
import { PortfolioViewModal } from "../Modals/PortfolioViewModal";
import { useModalState } from "../Common/ModalStateProvider";
import { CreatePortfolioModal } from "../Modals/CreatePortfolioModal";
import { useCoinsQuery } from "../AddTransactionScreen/useCoinsQuery";
import { ProvidePopularCoins } from "../AddTransactionScreen/PopularCoinsProvider";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { CustomQueryErrorBoundary } from "../CustomQueryErrorBoundary";
import { FallbackWithGoBackButton } from "../Common/components/FallbackWithGoBack";

const MainScreen = () => {
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
                        <CreatePortfolioModal hasPortfolios={!!data?.items.length} />
                    </CustomQueryErrorBoundary>
                )}
            </QueryErrorResetBoundary>
            <Section>
                <PortfoliosSummary totalAmount={data!.meta.overallVolume} difference={data!.meta.gainLoss} /> 
            </Section>
            <Section enableDelimiter={false}>
                <Portfolios items={data!.items} selectPortfolio={selectPortfolio} />
            </Section>
        </ProvidePopularCoins>
    );
}

export default MainScreen;