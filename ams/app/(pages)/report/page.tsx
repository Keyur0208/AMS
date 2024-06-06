import clsx from "clsx";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { Button, Input } from "@nextui-org/react";
import { Graph } from "../../../componets/graph";
import { BreadCrumb } from "../../../componets/breadcrumbs";

export default function page() {
    return (
        <>
            <div className={clsx("bg-light-blue-bg  ")}  >
                <DefaultLayout>

                    {/* Page Title  */}

                    <div>
                        <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl " >Report</h1>
                    </div>

                    {/* Breadcrumbs  */}

                    <BreadCrumb  name="Report"  />

                    <div className="flex justify-between items-center  bg-white rounded-lg p-5  mt-2  overflow-scroll lg:overflow-hidden " >
                        <div>
                            <Input
                                label="Date"
                                type="month"
                                isRequired
                                value="2024-06"
                                size="sm"
                                className="w-8/12 lg:w-full"
                            />
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

                    <div>
                        <Graph/>
                    </div>

                </DefaultLayout>
            </div>
        </>
    )
}
