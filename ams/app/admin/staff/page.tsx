"use client"
import { Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../componets/breadcrumbs";
import { Modal, ModalContent, useDisclosure, Input } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

export default function page() {

    const role = [
        {
            label:"Admin",
            value :'admin',
            icon:'🧑🏻‍💻'
        },
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
            name: "Gautam Patoliya",
            email: "g@gmail.com",
            password: "**********",
            role: "Employee",
        },
        {
            name: "Jay Harpal",
            email: "j@gmail.com",
            password: "**********",
            role: "Employee",
        },
    ]

    const validationSchema = Yup.object({
        leave_date: Yup.object({
            start: Yup.mixed().required("Start date is required"),
            end: Yup.mixed().required("End date is required"),
        }).required("Date range is required"),
        reason: Yup.string().required("Reason is required")
    });

    const formik = useFormik({
        initialValues: {
            leave_date: { start: null, end: null },
            reason: "",
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            onOpenChange();
            formik.resetForm();
        }
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="bg-light-blue-bg">
            <DefaultLayout>

                {/* Page Title  */}

                <div>
                    <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl " >Staff</h1>
                </div>

                {/* Breadcrumbs  */}
                <BreadCrumb name="Staff" />

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
                    <div>
                        <Button
                            color="primary"
                            className="w-10/12 lg:w-full"
                            onPress={onOpen}
                        >
                            Add Staff
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
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>EMAIL</TableColumn>
                            <TableColumn>PASSWORD</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                            <TableColumn>ACTION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                staff_data.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.password}</TableCell>
                                            <TableCell>{item.role}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2" >
                                                    <Tooltip color="foreground" content="Edit user">
                                                        <span className="text-lg  cursor-pointer active:opacity-50" onClick={onOpen}>
                                                            <EditIcon />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Delete user">
                                                        <span className="text-lg  cursor-pointer active:opacity-50"  >
                                                            <RemoveCircleOutlineIcon />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>


                {/* Add Staff Data  */}

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


                {/* Update Staff Data  */}

                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="center"
                    backdrop="transparent"
                    size="2xl" >
                    <ModalContent >
                        {(onClose) => (
                            <form onSubmit={formik.handleSubmit} autoComplete="off">
                                <div className="w-full flex flex-col justify-center items-center">
                                    <div className="w-11/12 lg:w-full flex flex-col justify-center items-center gap-5  p-0 lg:p-5">
                                        <div className="w-full text-start">
                                            <h1 className="text-xl font-semibold pt-5">
                                                Update Staff
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