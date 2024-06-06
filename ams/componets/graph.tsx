"use client"
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from '@mui/x-charts';

export function Graph() {
    // const data = [
    //     { name: 'Present', value: 26, color: '#147AD6' },
    //     { name: 'Absent', value: 5, color: '#7388A9' },
    // ];

    const data = [
        { id: 0, value: 60, label: 'Present', color: "#147AD6" },
        { id: 1, value: 40, label: 'Absent', color: "#7388A95A" }
    ];

    return (
        <div >
            <div className="text-center p-5" >
                <h3 className="text-lg"  >Month - Jun 2024</h3>
            </div>
            <div className="flex justify-center  items-center ">
                <div className=' w-full  flex  flex-wrap sm:w-8/12  items-center  justify-center gap-y-5 lg:justify-around' >
                    <div className='bg-white overflow-scroll lg:overflow-hidden rounded-lg p-2 border-2  ' >
                        <Gauge width={250} height={250} value={60} sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 40,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: '#4154F1',
                            },
                        })} />
                    </div>
                    <br></br>
                    <div className='bg-white overflow-scroll  lg:overflow-hidden rounded-lg border-2'>
                        <PieChart
                            series={[
                                {
                                    arcLabel: 'value',
                                    data,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    arcLabelMinAngle: 45,
                                    outerRadius: 100,
                                },
                            ]}
                            height={260}
                            width={380}
                            sx={{
                                fontSize: "1.2rem"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
