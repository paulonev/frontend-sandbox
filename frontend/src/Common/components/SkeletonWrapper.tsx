import { PropsWithChildren } from "react";

const Box = ({ children }: PropsWithChildren<unknown>) => 
    <div style={{ width: 100 }}>{children}</div>

export default Box;