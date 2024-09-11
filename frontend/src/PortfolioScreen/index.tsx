import { PortfolioAssetsPanel } from "./PortfolioAssetsPanel";
import { PortfolioBalancePanel } from "./PortfolioBalancePanel";
import { PortfolioStatisticsPanel } from "./PortfolioStatisticsPanel";
import { usePortfolioQuery } from "./usePortfolioQuery";

interface IPortfolioScreenProps {
    readonly id: number;
}

const PortfolioScreen = (props: IPortfolioScreenProps): JSX.Element => {
    const { data, error } = usePortfolioQuery({ id: props.id });

    // if error - show a native TG alert
    if (error) {
        throw error;
    }

    return data ? (
        <>
            <PortfolioStatisticsPanel data={data} />
            <PortfolioBalancePanel data={data.balance} />
            <PortfolioAssetsPanel data={data.assets} />
        </>
    ) : <></>;
}

export default PortfolioScreen;
