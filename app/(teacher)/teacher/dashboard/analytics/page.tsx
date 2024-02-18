import { teacherAnalytics } from '@/actions/analytics'
import React from 'react'
import { Example } from './_components/Chart'

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



export default async function page() {


    // const data = await teacherAnalytics()
    // console.log(data)

    return (
        <Example />
    )
}
