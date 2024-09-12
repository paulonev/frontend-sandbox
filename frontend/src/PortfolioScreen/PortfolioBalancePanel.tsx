import styled from "styled-components";
import { PortfolioBalance } from "./types"
import { PortfolioScreen } from "./vocabulary";
import { PortfolioBalanceRecord } from "./PortfolioBalanceRecord";
import { Black } from "../Common/colors";
import { EiQuestionSvg } from "../Common/EiQuestionSvg";
import { PopoverBody, UncontrolledPopover } from "reactstrap";

interface IPortfolioBalancePanelProps {
    readonly data: PortfolioBalance; 
}

//TODO: fix color matching for popover
export const PortfolioBalancePanel = ({ data }: IPortfolioBalancePanelProps): JSX.Element => {
    return (
        <ContainerStyled>
            <SectionStyled>
                <SectionTitleStyled>{PortfolioScreen.BalanceRu}</SectionTitleStyled>
                <ButtonStyled id="MoreInfoBtn" onClick={() => void 0}>
                    <EiQuestionSvg />
                </ButtonStyled>
                <UncontrolledPopover
                    placement="bottom-start"
                    target="MoreInfoBtn"
                    trigger="click"
                >
                    <PopoverBody>
                        <TooltipHeaderStyled>{PortfolioScreen.BalanceTooltipHeaderRu}</TooltipHeaderStyled>
                        <br/>
                        <br/>                
                        <TextStyled>
                            {PortfolioScreen.BalanceTooltipBodyLine1Ru}<br/>
                            {PortfolioScreen.BalanceTooltipBodyLine2Ru}<br/>
                            {PortfolioScreen.BalanceTooltipBodyLine3Ru}<br/>
                            {PortfolioScreen.BalanceTooltipBodyLine4Ru}<br/>
                            {PortfolioScreen.BalanceTooltipBodyLine5Ru}<br/>
                            {PortfolioScreen.BalanceTooltipBodyLine6Ru}<br/><br/>
                            {PortfolioScreen.BalanceTooltipBodyLine7Ru}
                        </TextStyled>
                    </PopoverBody>
                </UncontrolledPopover>
            </SectionStyled>
            <PortfolioBalanceRecord volume={data.volume} currencyCode={data.currencyCode} />
        </ContainerStyled>
    );
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 35px;
`;

const SectionStyled = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
`;

const SectionTitleStyled = styled.p`
    display: inline;
    font-weight: 500;
    font-size: 14px;
    color: ${Black};
    margin: 0;
    margin-right: 10px;
`;

const ButtonStyled = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    display: flex;
`;

const TextStyled = styled.span`
    font-size: 12px;
    font-weight: 500;
`;

const TooltipHeaderStyled = styled.span`
    font-size: 14px;
    margin-bottom: 5px;
`;
