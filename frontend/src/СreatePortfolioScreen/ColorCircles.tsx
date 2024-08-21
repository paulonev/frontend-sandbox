import { Input } from "reactstrap";
import { PortfolioSecondaryColorScheme } from "../Common/colors";
import { Control, Controller } from "react-hook-form";
import { NewPortfolioFormData } from "./types";
import { CSSProperties } from "react";
import { FormFieldStyled, LabelStyled } from "./styles";
import { Vocab } from "./vocabulary";
import { PortfolioCardTheme } from "../MainScreen/PortfolioCardTheme";
import { CustomCircle } from "./CustomCircle";

type ColorsToHexMap = { [key in PortfolioSecondaryColorScheme | string]: string; }
type HexToColorsMap = { [key: string]: PortfolioSecondaryColorScheme | string; }

const colorsToHexMap: ColorsToHexMap = {
    "pattensBlue": PortfolioCardTheme.pattensBlue.bgColor,
    "blueChalk": PortfolioCardTheme.blueChalk.bgColor,
    "bridalHeath": PortfolioCardTheme.bridalHeath.bgColor,
    "hintOfGreen": PortfolioCardTheme.hintOfGreen.bgColor,
    "pinkLace": PortfolioCardTheme.pinkLace.bgColor,
    "springSun": PortfolioCardTheme.springSun.bgColor,
}

const hexToColorsMap: HexToColorsMap = {
    "#dcebff": "pattensBlue",
    "#fff9ef": "bridalHeath",
    "#ffe7fa": "pinkLace",
    "#e1fee5": "hintOfGreen",
    "#f8ffde": "springSun",
    "#f6e4ff": "blueChalk" 
}

interface IColorCirclesProps {
    readonly control: Control<NewPortfolioFormData>;
}

export const ColorCircles = ({ control }: IColorCirclesProps) => {
    return (
        <Controller 
            name="portfolioColor"
            control={control}
            render={({ field: { onChange, name, value, ref } }) => (
                <FormFieldStyled>
                    <LabelStyled htmlFor="portfolioColor">{Vocab.ChoosePortfolioColorRu}</LabelStyled>
                    <Input type="hidden" name={name} value={value} innerRef={ref} />
                    <CustomCircle
                        colors={Object.keys(hexToColorsMap)}
                        color={colorsToHexMap[value]} 
                        onChange={(color) => {
                            onChange(hexToColorsMap[color.hex]);
                        }}
                        pointProps={{ style: PointStyleRules }}
                        rectProps={{ style: SelectedStyleRules }}
                    />
                </FormFieldStyled>
            )}
            rules={{ required: true}}
            shouldUnregister // to remove portfolioColor from the form data
        />
    )
}

// [== STYLES ==]
const PointStyleRules = {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: "50%",
    boxSizing: "border-box",
} as CSSProperties;

const SelectedStyleRules = {
    backgroundColor: "transparent",
    border: "none",
}