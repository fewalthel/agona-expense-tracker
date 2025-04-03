import chroma, { Color } from "chroma-js";
import { useTotalCost } from "../../hooks/useTotalCost.ts";
import { ICategoryCost } from "../../store/slices/expensesStatisticsSlice.ts";
import React from "react";

export const themeColors = (baseColor: Color): string[] => {
    const colors = chroma.scale([baseColor.darken(2), baseColor.saturate(5), baseColor.mix(baseColor, 7, "rgb")])
        .mode('lab')
        .colors(7);

    return colors;
}

interface IStatisticsCircleProps {
    statistics: ICategoryCost[];
    size: number;
    themeColor: Color;
}

export const StatisticsCircle: React.FC<IStatisticsCircleProps> = ({ statistics, size, themeColor }: IStatisticsCircleProps) => {
    const {totalCost} = useTotalCost();

    const data = statistics.map((stat, index) => ({
        color: themeColors(themeColor)[index],
        percent: (stat.cost / totalCost) * 100,
    }));

    let cumulativePercent = 0;

    const polarToCartesian= (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    };

    return (
        <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {data.map((item, index) => {
                const startAngle: number = cumulativePercent * 3.6;
                cumulativePercent += item.percent;
                const endAngle: number = cumulativePercent * 3.6;
                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                const { x: x1, y: y1 } = polarToCartesian(50, 50, 50, startAngle);
                const { x: x2, y: y2 } = polarToCartesian(50, 50, 50, endAngle);

                const pathData: string = [
                    "M", 50, 50,
                    "L", x1, y1,
                    "A", 50, 50, 0, largeArcFlag, 1, x2, y2,
                    "Z"
                ].join(" ");

                return <path key={index} d={pathData} fill={item.color} />;
            })}
        </svg>
    );
};