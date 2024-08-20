import { PortfoliosSummary } from "./PortfoliosSummary";
import { usePortfoliosQuery } from "./usePortfoliosQuery";
import { Section } from "../Common/components/Section";
import { Portfolios } from "./Portfolios";
import { PortfolioApi } from "../Api/PortfolioApi";
import PortfoliosSummary_s from "./Skeletoned/PortfoliosSummary_skeletoned";
import Portfolios_s from './Skeletoned/Portfolios_skeletoned';

const MainScreen = () => {
    const { data, isLoading, isRefetching } = usePortfoliosQuery();

    useFakeFetch();

    return (
        <>
            <Section>
                {isLoading || isRefetching ? <PortfoliosSummary_s /> : <PortfoliosSummary totalAmount={data!.meta.overallVolume} difference={data!.meta.gainLoss} />}
            </Section>
            <Section enableDelimiter={false}>
                {isLoading || isRefetching ? <Portfolios_s /> : <Portfolios items={data!.items} />}
            </Section>
        </>
    )
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