import Skeleton from "react-loading-skeleton";
import { StyledObject } from "styled-components";

interface IItemCardProps {
    readonly containerStyles?: StyledObject;
    readonly titleStyles?: StyledObject;
    readonly primaryParagraphStyles?: StyledObject;
    readonly secondaryParagraphStyles?: StyledObject;
}

const PortfolioProfitCard_skeletoned = (props: IItemCardProps): JSX.Element => {
    return (
        <div style={{...containerStyles, ...props.containerStyles}}>
            <div>
                <Skeleton style={{ lineHeight: 0.5, ...props.titleStyles}}/>
                <Skeleton style={{ marginTop: 5, ...props.primaryParagraphStyles }}/>
                <Skeleton style={{ marginTop: 5, lineHeight: 0.5, ...props.secondaryParagraphStyles }} />
            </div>
        </div>
    );
}

export default PortfolioProfitCard_skeletoned;

// [== STYLES ==]
const containerStyles = {
    borderRadius: 10,
    padding: 20,
    textAlign: "left",
    flex: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
    scrollSnapAlign: "start",
    boxSizing: "border-box",
    cursor: "pointer",
    width: "30%",
    lineHeight: 0.5,
} as StyledObject;
