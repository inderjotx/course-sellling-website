'use client'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = {
    "courseAnalytics": [
        { "sales": 0, "money": 0, "courseId": 1, "title": "React JS Course" },
        { "sales": 10, "money": 500, "courseId": 2, "title": "Python Programming Course" },
        { "sales": 15, "money": 750, "courseId": 3, "title": "Machine Learning Course" },
        { "sales": 5, "money": 250, "courseId": 4, "title": "Web Development Bootcamp" },
        { "sales": 8, "money": 400, "courseId": 5, "title": "Data Science Fundamentals" },
        { "sales": 12, "money": 600, "courseId": 6, "title": "Java Masterclass" }
    ],
    "totalSales": 50,
    "totalMoney": 2500
}

export const Example = () => {


    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={dummyData.courseAnalytics}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="money" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>
    );
}

