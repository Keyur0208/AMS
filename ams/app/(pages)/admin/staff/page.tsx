"use client"
import { Button, Autocomplete, AutocompleteItem} from "@nextui-org/react";
import DefaultLayout from "../../../../componets/Layouts/DefaultLayout";
import { BreadCrumb } from "../../../../componets/breadcrumbs";
import { Input } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import SearchIcon from '@mui/icons-material/Search';
import AddStaff from "../../../../componets/addstaff";
import { RootState } from "../../../../src/store/store";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getuserAllData } from "../../../../src/store/auth/Authslice";
import { useState } from "react";
import { UpdateStaff } from "../../../../componets/updateStaff";
import { DeleteStaff } from "../../../../componets/deleteStaff";
import { AppDispatch } from "../../../../src/store/store";

export default function page() {

    type Key = string | number;

    const dispatch: AppDispatch = useDispatch();

    const [selectedRole, setSelectedRole] = useState("all");
    const [search, setSearch] = useState("");
    const { data } = useSelector((state: RootState) => state.auth.userSearch);

    useEffect(() => {
        dispatch(getuserAllData(selectedRole,search))
    }, [dispatch, selectedRole, search])


    const role = [
        {
            label: "Admin",
            value: 'admin',
            icon: '🧑🏻‍💻'
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
        },
        {
            label: "All",
            value: "all",
            icon: "🧑🏻‍💻🧑‍💼🧑‍🎓"
        }
    ]


    const handleRoleChange = (key: Key | null) => {
        if (key !== null) {
            setSelectedRole(key.toString());
        } else {
            setSelectedRole("all"); 
        }
    };

    return (
        <div className="bg-light-blue-bg">
            <DefaultLayout>

                {/* Page Title  */}

                <div>
                    <h1 className="text-navigation-subitem font-semibold text-2xl  lg:text-3xl " >Staff</h1>
                </div>

                {/* Breadcrumbs  */}

                <BreadCrumb name="Staff" />

                {/* Downlond CSV */}

                <div className="text-end  my-5" >
                    <Button 
                    color="success"
                    className="text-white" >
                        Dowlonad CSV
                    </Button>
                </div>

                {/* Main Part  */}

                <div className="flex  justify-between items-center  bg-white rounded-lg p-5  mt-2  overflow-scroll  lg:overflow-hidden"  >
                    <div className="pr-5 lg:pr-0"  >
                        <Autocomplete
                            label="Role"
                            variant="bordered"
                            className="w-48"
                            placeholder="Select a role"
                            onSelectionChange={handleRoleChange}
                            defaultSelectedKey="all"
                            defaultItems={role}
                        >
                            {role.map((role:any) => (
                                <AutocompleteItem key={role.value} value={role.value} startContent={role.icon}>
                                    {role.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>
                    <div>
                        <AddStaff />
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
                                classNames={{ inputWrapper: ["rounded-full"] }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                startContent={<SearchIcon className="text-black pointer-events-none flex-shrink-0" />}
                            />
                        </div>
                    </div>
                    <Table aria-label="Example static collection table" className="mt-4" classNames={{th:"text-center",tr:"text-center"}}   >
                        <TableHeader className="bg-red-500"  >
                            <TableColumn>NO</TableColumn>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>EMAIL</TableColumn>
                            <TableColumn>PASSWORD</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                            <TableColumn>ACTION</TableColumn>
                        </TableHeader>
                        <TableBody
                        className="text-center"
                        >
                            {data.length && data.map((user: any, index:number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user?.first_name} {user?.last_name}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell>•••••••••••••</TableCell>
                                    <TableCell>{user?.roles}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2  justify-center">
                                            <UpdateStaff userid={user?._id}  />
                                            <DeleteStaff  userid={user?._id}/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DefaultLayout>
        </div>

    )
}