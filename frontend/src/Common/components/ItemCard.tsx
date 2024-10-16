import React from "react";
import { StyledObject } from "styled-components";

interface IItemCardProps {
    readonly title?: string;
    readonly containerStyles?: StyledObject;
    readonly titleStyles?: StyledObject;
    readonly primaryParagraphStyles?: StyledObject;
    readonly secondaryParagraphStyles?: StyledObject;
    readonly renderPrimaryText: () => string | React.ReactNode;
    readonly renderSecondaryText: () => string | React.ReactNode;
    readonly onBoxClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    readonly Footer?: () => JSX.Element;
}

export const ItemCard = (props: IItemCardProps): JSX.Element => {
    return (
        <div onClick={props.onBoxClick} style={{...containerStyles, ...props.containerStyles}}>
            <div>
                <p style={{...titleStyles, ...props.titleStyles}}>{props.title ?? ""}</p>
                <div style={{...primaryParagraphStyles, ...props.primaryParagraphStyles}}>{props.renderPrimaryText()}</div>
                <div style={{...secondaryParagraphStyles, ...props.secondaryParagraphStyles}}>{props.renderSecondaryText()}</div>
            </div>
            {props.Footer ? <props.Footer /> : null}
        </div>
    );
}

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
} as StyledObject;

const titleStyles = {
    fontFamily: "\"Inter\", sans-serif",
    fontWeight: 500,
    fontSize: 16,
    margin: 0,
} as StyledObject;

const primaryParagraphStyles = {
    fontFamily: "\"Inter\", sans-serif",
    fontWeight: 600,
    marginTop: 10,
    marginBottom: 0,
};

const secondaryParagraphStyles = {
    fontFamily: "\"Inter\", sans-serif",
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 10,
};