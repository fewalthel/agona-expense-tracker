import './index.css';
import chroma
    from "chroma-js";
/*import { themeColors } from '../StatisticsTable/StatisticsTable.tsx'*/

function themeColors(themeColor: string): string[] {

    // Создаем основнoй цвет, используя заданное имя цвета
    const baseColor = chroma(themeColor);

    // Генерируем 7 рандомных цветов на основе базового цвета
    const colors = chroma.scale([baseColor.darken(2), baseColor.brighten(2)])
        .mode('lab')
        .colors(7);

    return colors;
}

export const StatisticsCircle =  ({ statistics, size = 200, themeColor, totalCost }) => {


    const data = [
        {color: themeColors(themeColor)[0], percent: statistics[0].cost / totalCost * 100},
        {color: themeColors(themeColor)[1], percent: statistics[1].cost / totalCost * 100},
        {color: themeColors(themeColor)[2], percent: statistics[2].cost / totalCost * 100},
        {color: themeColors(themeColor)[3], percent: statistics[3].cost / totalCost * 100},
        {color: themeColors(themeColor)[4], percent: statistics[4].cost / totalCost * 100},
        {color: themeColors(themeColor)[5], percent: statistics[5].cost / totalCost * 100},
        {color: themeColors(themeColor)[6], percent: statistics[6].cost / totalCost * 100}
    ];

 /*   for (let i = 0; i < 7; i++) {
        data.push({
            color: themeColors(themeColor)[i],
            percent: (statistics[i].cost / totalCost * 100)
        });
    }*/


    let cumulativePercent = 0;

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    };

    return (
        <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {data.map((item, index) => {
                const startAngle = cumulativePercent * 3.6;
                cumulativePercent += item.percent;
                const endAngle = cumulativePercent * 3.6;
                const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                const { x: x1, y: y1 } = polarToCartesian(50, 50, 50, startAngle);
                const { x: x2, y: y2 } = polarToCartesian(50, 50, 50, endAngle);

                const pathData = [
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