"use client"
import clsx from "clsx";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { BreadcrumbItem, Breadcrumbs, Button, TimeInput } from "@nextui-org/react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import Clock from "../../../componets/clock/clock";
import { BreadCrumb } from "../../../componets/breadcrumbs";

export default function page() {
    return (
        <>
            <div className={clsx("bg-light-blue-bg  ")}  >

                <DefaultLayout>

                    {/* Page Title  */}

                    <div>
                        <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl " >Deshboard</h1>
                    </div>

                    {/* Breadcrumbs  */}

                    <BreadCrumb name="Deshboard" />

                    {/* user name  */}

                    <div className="pt-4" >
                        <h1 className="text-2xl lg:text-3xl font-semibold " >Hello's Virat Kohli</h1>
                    </div>

                    {/* Calendar and clock */}


                    <div className="flex justify-center" >
                        <div className="flex flex-wrap  flex-row justify-center  items-center gap-x-14 gap-y-5 lg:gap-y-5  mt-5 bg-white p-5  lg:p-10  w-full md:w-8/12  border-2  rounded-2xl " >
                            <div>
                                <h1 className="text-light-black text-start font-semibold " >Work Date And Time</h1>
                                <Calendar
                                    aria-label="Date (Show Month and Year Picker)"
                                    value={today(getLocalTimeZone())}
                                    showMonthAndYearPickers
                                />
                            </div>
                            <div>
                                <Clock />
                            </div>
                        </div>
                    </div>

                    {/* Main Part  */}

                    <div className="flex justify-center" >
                        <div className="flex flex-wrap  flex-row justify-center items-center gap-x-14 gap-y-5 lg:gap-y-5 mt-5  w-full md:w-8/12 ">
                            <div className="flex flex-wrap  lg:flex-nowrap w-full gap-5 " >
                                <TimeInput
                                    label="Check in Time"
                                    color="primary"
                                    hourCycle={24}
                                />
                                <TimeInput
                                    label="Break-Start Time"
                                    color="success"
                                    hourCycle={24}
                                />
                            </div>
                            <div className="flex  flex-col-reverse lg:flex-row  flex-wrap  lg:flex-nowrap w-full gap-5 " >
                                <TimeInput
                                    label="Check Out Time"
                                    color="primary"
                                    hourCycle={24}
                                />
                                <TimeInput
                                    label="Break-Stop Time"
                                    color="success"
                                    hourCycle={24}
                                />
                            </div>
                            <div className="flex flex-wrap  lg:flex-nowrap w-full gap-5 " >
                                <TimeInput
                                    label="Total Work Time"
                                    isReadOnly
                                    color="secondary"
                                    hourCycle={24}
                                />
                                <TimeInput
                                    label="Total Break Time"
                                    isReadOnly
                                    color="secondary"
                                    hourCycle={24}
                                />
                            </div>
                            <Button className="w-full" color="primary"  >
                                Submit
                            </Button>
                        </div>
                    </div>

                    {/* daily thoughts */}

                    <div className="flex justify-center">
                        <div className="flex flex-col mt-5  w-full md:w-8/12 ">
                            <h3 className="font-medium text-black "  >"Learn as if you will live forever, live like you will die tomorrow"</h3>
                            <div className="text-end" >
                                <h3 className="font-medium text-black">— Mahatma Gandhi</h3>
                            </div>
                        </div>
                    </div>

                </DefaultLayout>
                
            </div>

        </>
    )
}