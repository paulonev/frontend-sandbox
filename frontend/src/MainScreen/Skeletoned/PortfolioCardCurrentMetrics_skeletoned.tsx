import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "../../Common/components/SkeletonWrapper";

const PortfolioCardCurrentMetrics_skeletoned = (): JSX.Element => {
    return (
        <>
            <Skeleton wrapper={SkeletonWrapper} style={{ lineHeight: 1.7, marginTop: 20 }}/>
            <Skeleton wrapper={SkeletonWrapper} style={{ marginTop: 10 }} />
        </>
    );
}

export default PortfolioCardCurrentMetrics_skeletoned;