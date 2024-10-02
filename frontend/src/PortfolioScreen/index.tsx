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
    const { data, isLoading, isRefetching, isFetching, error } = usePortfolioQuery({ id: props.id });

    if (error && !isFetching) {
        // 404 - { title: "Coin Not Found" } - error boundary
        // 500 - error boundary 
        throw error;
    }

    if (data === null) {
        // 404 - portfolio not found page { title: "Portfolio Not Found" }
        // TODO: add portfolio not found page
        return <div>Portfolio Not Found</div>;
    }
    

    return (isLoading || isRefetching) ? (
        <>
            <PortfolioStatisticsPanel_s />
            <PortfolioBalancePanel_s />
            <PortfolioAssetsPanel_s />
        </>
    ) : (
        <>
            <AddTransactionModal portfolioId={props.id} />
            <PortfolioStatisticsPanel data={data!} />
            <PortfolioBalancePanel data={data!.balance} />
            <PortfolioAssetsPanel data={data!.assets} />
        </>
    );
}

export default PortfolioScreen;
