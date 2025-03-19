import './index.css';

export const StatisticsCircle =  ({ data, size = 200  }) => {

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