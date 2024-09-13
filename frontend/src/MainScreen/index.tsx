import { PortfoliosSummary } from "./PortfoliosSummary";
import { usePortfoliosQuery } from "./usePortfoliosQuery";
import { Section } from "../Common/components/Section";
import { Portfolios } from "./Portfolios";
import { PortfolioApi } from "../Api/PortfolioApi";
import PortfoliosSummary_s from "./Skeletoned/PortfoliosSummary_skeletoned";
import Portfolios_s from './Skeletoned/Portfolios_skeletoned';
import { useMemo, useState } from "react";
import { PortfolioViewModal } from "../Modals/PortfolioViewModal";
import { useModalState } from "../Common/ModalStateProvider";

const MainScreen = () => {
    const modalState = useModalState("specificPortfolio");
    const { data, isLoading, isRefetching, refetch } = usePortfoliosQuery();
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

    useFakeFetch();

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
        <>
            <PortfolioViewModal selectedPortfolio={selectedPortfolio} onClose={closePortfolio} />
            <Section>
                <PortfoliosSummary totalAmount={data!.meta.overallVolume} difference={data!.meta.gainLoss} /> 
            </Section>
            <Section enableDelimiter={false}>
                <Portfolios items={data!.items} selectPortfolio={selectPortfolio} />
            </Section>
        </>
    );
}

const useFakeFetch = async () => {
    try {
        const response = await PortfolioApi.getGson();
        alert(`Backend data: ${JSON.stringify(response)}`);
    } catch (error)
    {
        console.error(error);
    }
}
export default MainScreen;