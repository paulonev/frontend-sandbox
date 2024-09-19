import { PortfolioAssetsPanel } from "./PortfolioAssetsPanel";
import { PortfolioBalancePanel } from "./PortfolioBalancePanel";
import { PortfolioStatisticsPanel } from "./PortfolioStatisticsPanel";
import PortfolioStatisticsPanel_s from "./Skeletoned/PortfolioStatisticsPanel_skeletoned";
import PortfolioBalancePanel_s from "./Skeletoned/PortfolioBalancePanel_skeletoned";
import PortfolioAssetsPanel_s from "./Skeletoned/PortfolioAssetsPanel_skeletoned";
import { usePortfolioQuery } from "./usePortfolioQuery";
import { AddTransactionModal } from "../Modals/AddTransactionModal";

interface IPortfolioScreenProps {
    readonly id: number;
}

const PortfolioScreen = (props: IPortfolioScreenProps): JSX.Element => {
    const { data, error, isLoading, isRefetching } = usePortfolioQuery({ id: props.id });

    // if error - show a native TG alert
    if (error) {
        throw error;
    }

    return (isLoading || isRefetching) ? (
        <>
            <PortfolioStatisticsPanel_s />
            <PortfolioBalancePanel_s />
            <PortfolioAssetsPanel_s />
        </>
    ) : (
        <>
            <AddTransactionModal />
            <PortfolioStatisticsPanel data={data!} />
            <PortfolioBalancePanel data={data!.balance} />
            <PortfolioAssetsPanel data={data!.assets} />
        </>
    );
}

export default PortfolioScreen;
