import { Suspense } from "react";
import { PortfoliosSummary } from "./PortfoliosSummary";
import { usePortfoliosQuery } from "./usePortfoliosQuery";
import { Section } from "../Common/components/Section";
import { Portfolios } from "./Portfolios";
import { PortfolioApi } from "../Api/PortfolioApi";

const MainScreen = () => {
    const { data } = usePortfoliosQuery();

    useFakeFetch();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Section>
                <PortfoliosSummary totalAmount={data.meta.overallVolume} difference={data.meta.gainLoss} />
            </Section>
            <Section enableDelimiter={false}>
                <Portfolios items={data.items} />
            </Section>
        </Suspense>
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