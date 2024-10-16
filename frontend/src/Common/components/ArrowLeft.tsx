import { PortfolioCardTheme } from "../../MainScreen/PortfolioCardTheme"

export const ArrowLeft = (): JSX.Element => {
    return (
        <svg 
            id="Layer_1" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg"
            fill={PortfolioCardTheme.main.bgColor}
            height="2em" 
            width="2em" 
            viewBox="-10 -10 120.00 120.00"
            enableBackground="new 0 0 100 100"
            stroke={PortfolioCardTheme.main.bgColor}
            strokeWidth={5}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <path id="XMLID_227_" d="M33.934,54.458l30.822,27.938c0.383,0.348,0.864,0.519,1.344,0.519c0.545,0,1.087-0.222,1.482-0.657 c0.741-0.818,0.68-2.083-0.139-2.824L37.801,52.564L64.67,22.921c0.742-0.818,0.68-2.083-0.139-2.824 c-0.817-0.742-2.082-0.679-2.824,0.139L33.768,51.059c-0.439,0.485-0.59,1.126-0.475,1.723 C33.234,53.39,33.446,54.017,33.934,54.458z"></path> 
                </g>
        </svg>
    );
}