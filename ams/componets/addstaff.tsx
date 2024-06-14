"use client"
import { Button, Modal, ModalContent, Autocomplete, AutocompleteItem, Input, useDisclosure } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Register } from "../src/store/auth/Authslice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../src/store/store";
import { RootState } from "../src/store/store";
import { checkEmail } from "../src/store/auth/Emailslice";
import { getuserAllData } from "../src/store/auth/Authslice";

export default function AddStaff() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { emailExists, error } = useSelector((state: RootState) => state.emailCheck);

    const dispatch: AppDispatch = useDispatch();

    const roles = [
        { label: "admin", value: 'admin', icon: '🧑🏻‍💻' },
        { label: "employee", value: "employee", icon: "🧑‍💼" },
        { label: "intern", value: "intern", icon: "🧑‍🎓" }
    ];

    const formik = useFormik({
        initialValues: {
            role: '',
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            role: Yup.string().required('Role is required'),
            first_name: Yup.string().required('First Name is required'),
            last_name: Yup.string().required('Last Name is required'),
            email: Yup.string().
            email('Invalid email address').
            required('Email is required').
            test('check-email', 'Email already exists', async function (value) {
                if (!value) return true; 
                try {
                    let emailExists = await dispatch(checkEmail(value));
                    return true;
                } catch {
                    return this.createError({ message: 'Error checking email' });
                }
            }),            
            password: Yup.string().required('Password is required')
        }),
        onSubmit: values => {
            dispatch(Register(values));
            onOpenChange();
            formik.resetForm();
        }
    });

    const handleRoleChange = (value: any) => {
        formik.setFieldValue('role', value);
    };


    return (
        <>
            <Button
                color="primary"
                className="w-10/12 lg:w-full"
                onPress={onOpen}
            >
                Add Staff
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="transparent"
                size="2xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-11/12 lg:w-full flex flex-col justify-center items-center gap-5 p-0 lg:p-5">
                                    <div className="w-full text-start">
                                        <h1 className="text-xl font-semibold pt-5">
                                            Add Staff
                                        </h1>
                                    </div>
                                    <div className="w-full">
                                        <Autocomplete
                                            label="Role"
                                            variant="bordered"
                                            id="role"
                                            defaultItems={roles}
                                            allowsCustomValue={true}
                                            onSelectionChange={handleRoleChange}
                                            onInputChange={(value) => formik.setFieldValue('role', value)}
                                        >
                                            {roles.map((role) => (
                                                <AutocompleteItem key={role.value} value={role.value} startContent={role.icon}>
                                                    {role.label}
                                                </AutocompleteItem>
                                            ))}
                                        </Autocomplete>
                                        {formik.touched.role && formik.errors.role ? (
                                            <div className="text-error-color text-xs">{formik.errors.role}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full flex flex-wrap lg:flex-nowrap justify-between gap-4">
                                        <div className="w-full lg:w-6/12">
                                            <Input
                                                label="First Name"
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                required={true}
                                                variant="bordered"
                                                value={formik.values.first_name}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.first_name && formik.errors.first_name ? (
                                                <div className="text-error-color text-xs">{formik.errors.first_name}</div>
                                            ) : null}
                                        </div>
                                        <div className="w-full lg:w-6/12">
                                            <Input
                                                label="Last Name"
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                required={true}
                                                variant="bordered"
                                                value={formik.values.last_name}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.last_name && formik.errors.last_name ? (
                                                <div className="text-error-color text-xs">{formik.errors.last_name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-wrap lg:flex-nowrap justify-between gap-4">
                                        <div className="w-full lg:w-6/12">
                                            <Input
                                                label="Email"
                                                id="email"
                                                name="email"
                                                type="email"
                                                required={true}
                                                variant="bordered"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="text-error-color text-xs">{formik.errors.email}</div>
                                            ) : null}
                                            {formik.touched.email && emailExists && !formik.errors.email && (
                                                <div className="text-error-color text-xs">Email already exists</div>
                                            )}
                                            {error && <div className="text-error-color text-xs">{error}</div>}
                                        </div>
                                        <div className="w-full lg:w-6/12">
                                            <Input
                                                label="Password"
                                                id="password"
                                                name="password"
                                                type="password"
                                                required={true}
                                                variant="bordered"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className="text-error-color text-xs">{formik.errors.password}</div>
                                            ) : null}
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
        </>
    );
}
