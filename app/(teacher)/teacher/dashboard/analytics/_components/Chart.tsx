'use client'
import { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

type DataPoint = {
    title: string;
    money: number;
    sales: number;
    courseId: number;
};



type ChartProps = {
    data: DataPoint[];
};


export const Chart: React.FC<ChartProps> = ({ data }) => {
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient ? (
                <ResponsiveContainer height={400} className={"w-full border rounded-md p-4"} >
                    <BarChart data={data}>
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="left"
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="title" fontSize={10} interval={0} tick={<CustomTick />} />
                        <YAxis
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`
                            }
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                        />
                        <Bar dataKey="money" fill="#1c1c1c" className="rounded-md overflow-hidden" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <h2>Loading ....</h2>
            )}
        </>
    );
};


const CustomTick = (props: any) => {
    const { x, y, payload } = props;

    return (
        <foreignObject x={x} y={y} width={100} className="overflow-visible h-60" >
            <div className="-translate-x-12 py-0 text-center text-muted-foreground text-[11px]">{payload.value}
            </div>
        </foreignObject>
    );
};


interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white  rounded p-4 border">
                <p className="text-sm">{`${label}`}</p>
                <p className="text-sm">
                    {`${payload[0].name} : $${payload[0].value}`}
                </p>
            </div>
        );
    }

}



interface CustomLegendProps {
    payload?: any[];
    className?: string;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload, className }) => {
    return (
        <div className={`flex flex-wrap translate-x-4 ${className}`}>
            {payload?.map((entry, index) => (
                <div key={`item-${index}`} className="flex items-center mr-4 mb-2">
                    <div className="w-4 h-4 mr-1" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm">{entry.value}</span>
                </div>
            ))}
        </div>
    );
};