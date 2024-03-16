import { Group } from "@vkontakte/vkui"
import React from "react";

interface IAgeContentProps {
    id: string;
    ariaLabelledby: string;
}

export const AgeContent: React.FC<IAgeContentProps> = (props) => {
    const { ariaLabelledby, id } = props;
    return (
        <Group
            id={id}
            aria-labelledby={ariaLabelledby}
        >here</Group>
    )
}