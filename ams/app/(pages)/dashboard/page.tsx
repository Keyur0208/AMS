import clsx from "clsx";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../componets/breadcrumbs";
import { CalendarModule } from "../../../section/calender";
import { AttdanceModule } from "../../../section/attendance";


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

                    <CalendarModule/>

                    {/* Main Part  */}

                    <AttdanceModule/>
                   

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