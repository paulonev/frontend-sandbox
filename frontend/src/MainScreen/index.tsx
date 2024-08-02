import { Suspense } from "react";
import { PortfoliosSummary } from "./PortfoliosSummary";
import { usePortfoliosQuery } from "./usePortfoliosQuery";
import { Section } from "../Common/components/Section";
import { Portfolios } from "./Portfolios";

const MainScreen = () => {
    const { data } = usePortfoliosQuery();

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

export default MainScreen;