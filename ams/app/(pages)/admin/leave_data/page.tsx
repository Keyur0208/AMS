"use client"
import DefaultLayout from "../../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../../componets/breadcrumbs";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,  Input, Button} from "@nextui-org/react";
import SearchIcon from '@mui/icons-material/Search';

export default function page() {
    const staff_data = [
        {
            date:"22/04/2024",
            name: "Keyur Pansuriya",
            reason: "Final Year Exam",
            role: "Intern",
        },
        {
            date:"28/04/2024",
            name: "Gautam Patoliya",
            reason: "Sick Leave",
            role: "Employee",
        },
    ]
    return (
        <>
            <div className={"bg-light-blue-bg"}>
                <DefaultLayout>

                    {/* Page Title */}
                    <div>
                        <h1 className="text-navigation-subitem font-semibold text-2xl lg:text-3xl">
                            Leave Reports
                        </h1>
                    </div>

                    {/* Breadcrumbs  */}

                    <BreadCrumb name="Leave Reports" first_name="Manage" />

                    <div className="bg-white mt-4 p-4 rounded-md" >
                    <div className="flex justify-center" >
                        <div className="w-full  md:w-6/12" >
                            <Input
                                isClearable
                                radius="lg"
                                variant="bordered"
                                color="primary"
                                placeholder="Search...."
                                classNames={{
                                    inputWrapper: [
                                        "rounded-full"
                                    ]
                                }}
                                startContent={
                                    <SearchIcon className="text-black pointer-events-none flex-shrink-0  " />
                                }
                            />
                        </div>
                    </div>
                    <Table aria-label="Example static collection table" className="mt-4" >
                        <TableHeader className="bg-red-500" >
                            <TableColumn>NO</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>REASON</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                            <TableColumn>ACTION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                staff_data.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.reason}</TableCell>
                                            <TableCell>{item.role}</TableCell>
                                            <TableCell>
                                                <Button
                                                color="primary">
                                                Download PDF
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>

                </DefaultLayout>

               
            </div>
        </>


    )
}