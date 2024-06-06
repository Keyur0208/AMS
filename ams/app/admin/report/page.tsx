"use client"
import { Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../componets/breadcrumbs";
import SearchIcon from '@mui/icons-material/Search';
import { Modal, ModalContent, useDisclosure, Input } from "@nextui-org/react";

export default function page() {

    const role = [
        {
            label: "Employee",
            value: "employee",
            icon: "🧑‍💼"
        },
        {
            label: "Intern",
            value: "intern",
            icon: "🧑‍🎓"
        }
    ]

    const staff_data = [
        {
            name: "Keyur Pansuriya",
            day_1: "A",
            day_2: "P",
            day_3: "P",
            day_4: "P",
        },
        {
            name: "Haresh Chudasma",
            day_1: "P",
            day_2: "A",
            day_3: "A",
            day_4: "P",
        },
    ]

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="bg-light-blue-bg">
            <DefaultLayout>

                {/* Page Title  */}

                <div>
                    <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl " >Reports</h1>
                </div>

                {/* Breadcrumbs  */}

                <BreadCrumb name="Report" first_name="Manage" />

                {/* Main Part */}

                <div className="flex  justify-between items-center  bg-white rounded-lg p-5  mt-2  overflow-scroll  lg:overflow-hidden"  >
                    <div className="pr-5 lg:pr-0"  >
                        <Autocomplete
                            label="Role"
                            defaultItems={"Inter"}
                            variant="bordered"
                            className="w-48"
                            defaultSelectedKey="inter"
                        >
                            {role.map((role) => (
                                <AutocompleteItem key={role.value} value={role.value} startContent={role.icon} >
                                    {role.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>
                    <div>
                        <Input
                            label="Date"
                            type="month"
                            variant="bordered"
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
                                    inputWrapper:[
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
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>01/04/2024</TableColumn>
                            <TableColumn>02/04/2024</TableColumn>
                            <TableColumn>03/04/2024</TableColumn>
                            <TableColumn>04/04/2024</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                staff_data.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell style={{ color: item.day_1 === 'A' ? 'red' : 'green' }}>{item.day_1}</TableCell>
                                            <TableCell style={{ color: item.day_2 === 'A' ? 'red' : 'green' }}>{item.day_2}</TableCell>
                                            <TableCell style={{ color: item.day_3 === 'A' ? 'red' : 'green' }}>{item.day_3}</TableCell>
                                            <TableCell style={{ color: item.day_4 === 'A' ? 'red' : 'green' }}>{item.day_4}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>


                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="center"
                    backdrop="transparent"
                    size="2xl" >
                    <ModalContent >
                        {(onClose) => (
                            <form autoComplete="off">
                                <div className="w-full flex flex-col justify-center items-center">
                                    <div className="w-11/12 lg:w-full flex flex-col justify-center items-center gap-5  p-0 lg:p-5">
                                        <div className="w-full text-start">
                                            <h1 className="text-xl font-semibold pt-5">
                                                Add Staff
                                            </h1>
                                        </div>
                                        <div className="w-full" >
                                            <Autocomplete
                                                label="Role"
                                                variant="bordered"
                                                id="role"
                                            >
                                                {role.map((role) => (
                                                    <AutocompleteItem key={role.value} value={role.value} startContent={role.icon} >
                                                        {role.label}
                                                    </AutocompleteItem>
                                                ))}
                                            </Autocomplete>
                                        </div>
                                        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between  gap-4  ">
                                            <div className="w-full lg:w-6/12" >
                                                <Input
                                                    label="First Name"
                                                    id="first_name"
                                                    name="first_name"
                                                    type="text"
                                                    required={true}
                                                    variant="bordered"
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12" >
                                                <Input
                                                    label="Last Name"
                                                    id="last_name"
                                                    name="last_name"
                                                    type="text"
                                                    required={true}
                                                    variant="bordered"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between  gap-4  ">
                                            <div className="w-full lg:w-6/12" >
                                                <Input
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required={true}
                                                    variant="bordered"
                                                />
                                            </div>
                                            <div className="w-full lg:w-6/12" >
                                                <Input
                                                    label="Password"
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    required={true}
                                                    variant="bordered"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 text-center pb-5">
                                            <Button
                                                type="submit"
                                                color="primary"
                                                id="btn1"
                                            >
                                                Submit
                                            </Button>
                                            <Button
                                                color="danger"
                                                onPress={onClose}
                                                id="btn2"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </ModalContent>
                </Modal>


            </DefaultLayout>
        </div>

    )
}