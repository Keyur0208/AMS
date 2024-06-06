"use client"
import { Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../componets/breadcrumbs";
import { DatePicker } from "@nextui-org/date-picker";
import { StaffIcon_black } from "../../../style/icon/stafficon_black";
import { PresentIcon } from "../../../style/icon/presenticon";
import { AbsentIcon } from "../../../style/icon/absenticon";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export default function page() {

    const role = [
        {
            label: "Employee",
            value: "employee",
            icon: "🧑‍💼"
        },
        {
            label: "Inter",
            value: "intern",
            icon: "🧑‍🎓"
        }
    ]

    const result = [
        {
            name: "Total Employee",
            icon: <StaffIcon_black />,
            number: "25"
        },
        {
            name: "Presents Employee",
            icon: <PresentIcon />,
            number: "20"
        },
        {
            name: "Absents Employee",
            icon: <AbsentIcon />,
            number: "5"
        },
        {
            name: "Analysis",
            number: "80%"
        }
    ]

    return (
        <div className="bg-light-blue-bg"  >
            <DefaultLayout>

                {/* Page Title  */}
                <div>
                    <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl " >Deshboard</h1>
                </div>

                {/* Breadcrumbs  */}

                <BreadCrumb name="Deshboard" />

                {/* Main Part  */}

                <div className="flex  justify-between items-center  bg-white rounded-lg p-5  mt-2  overflow-scroll  lg:overflow-hidden"  >
                    <div className="pr-5 lg:pr-0"  >
                        <Autocomplete
                            label="Role"
                            defaultItems={"Employee"}
                            variant="bordered"
                            className="w-48"
                            defaultSelectedKey="employee"
                        >
                            {role.map((role) => (
                                <AutocompleteItem key={role.value} value={role.value} startContent={role.icon} >
                                    {role.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>
                    <div className="pr-5 lg:pr-0">
                        <DatePicker label="Date" className="w-48" variant="bordered" />
                    </div>
                    <div>
                        <Button
                            color="primary"
                            className="w-10/12 lg:w-full"
                        >
                            Generate Record
                        </Button>
                    </div>
                </div>

                <div className="flex  flex-wrap  justify-center  md:justify-center lg:justify-around items-center mt-5 gap-5" >
                    {
                        result.map((item, index) => {
                            return (
                                <div key={index} className="bg-white w-32 h-24 md:w-60 md:h-32  flex flex-col items-center justify-center  rounded-xl  shadow-custom " >
                                    <div>
                                        <div className="text-center font-semibold " >
                                            <h1 className="text-navigation-subitem  text-sm md:text-xl ">{item.name}</h1>
                                        </div>
                                        <div className="flex justify-center items-center gap-2 mt-1 " >
                                            <div >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h1 className="text-navigation-subitem  text-md md:text-3xl">{item.number}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* Graph  */}

                <div className="flex justify-center" >
                    <div className="bg-white mt-5 p-4 rounded-xl  border-2 " >
                        <span className="text-navigation-subitem" >Reports - </span>
                        <span>Date</span>
                        <Gauge
                            value={80}
                            startAngle={-110}
                            endAngle={110}
                            sx={{
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 34,
                                    transform: 'translate(0px, 0px)'
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#4355f1',
                                },
                            }}
                            
                            text={
                                ({ value, valueMax }) => `${value} / ${valueMax}`
                            }
                            width={250}
                            height={180}
                        />
                    </div>
                </div>

            </DefaultLayout >
        </div >

    )
}