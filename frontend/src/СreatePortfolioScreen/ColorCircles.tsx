import { Input } from "reactstrap";
import { PortfolioSecondaryColorScheme } from "../Common/colors";
import { Control, Controller } from "react-hook-form";
import { NewPortfolioFormData } from "./types";
import Circle from "@uiw/react-color-circle";
import { CSSProperties } from "react";
import { FormFieldStyled, LabelStyled } from "./styles";
import { Vocab } from "./vocabulary";
import { PortfolioCardTheme } from "../MainScreen/PortfolioCardTheme";

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

// TODO: disable reverse transform when any circle loses focus
export const ColorCircles = ({ control }: IColorCirclesProps) => {
    return (
        <Controller 
            name="portfolioColor"
            control={control}
            render={({ field: { onChange, onBlur, name, value, ref }}) => (
                <FormFieldStyled>
                    <LabelStyled htmlFor="portfolioColor">{Vocab.ChoosePortfolioColorRu}</LabelStyled>
                    <Input type="hidden" name={name} value={value} innerRef={ref} />
                    <Circle 
                        colors={Object.keys(hexToColorsMap)}
                        color={colorsToHexMap[value]} 
                        onChange={(color) => {
                            onChange(hexToColorsMap[color.hex]);
                        }}
                        onBlur={onBlur}
                        pointProps={{ style: PointStyleRules }}
                        rectProps={{ style: SelectedStyleRules }}
                    />
                </FormFieldStyled>
            )}
        />
    )
}

// [== STYLES ==]
const PointStyleRules = {
    width: 40,
    height: 40,
    marginRight: 18,
    borderRadius: "50%",
    boxSizing: "border-box",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)"
} as CSSProperties;

const SelectedStyleRules = {
    backgroundColor: "transparent",
    border: "none",
}