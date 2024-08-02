import { PropsWithChildren } from "react"
import styled from "styled-components";

interface ISectionProps {
    readonly offsetBottom?: number;
    readonly offsetTop?: number;
    readonly enableDelimiter?: boolean;
}

export const Section = ({ enableDelimiter = true, offsetBottom, offsetTop, children }: PropsWithChildren<ISectionProps>) => {
    return (
        <>
            <Content $props={{ offsetBottom: offsetBottom, offsetTop: offsetTop }} >
                {children}
            </Content>
            { enableDelimiter && <SectionDelimiter /> }
        </>
    );
}

const SectionDelimiter = styled.div`
    height: 0;
    width: auto;
    border: 1.23px solid #D3D3D3;
    margin: 0 20px;
`;

const Content = styled.div<{$props: ISectionProps}>`
    padding-top: ${x => x.$props.offsetTop ?? "8px"};
    padding-bottom: ${x => x.$props.offsetBottom ?? "8px"};
`;
