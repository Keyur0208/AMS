"use client"
import { Button, Image, Input } from "@nextui-org/react";
import DefaultLayout from "../../../componets/Layouts/DefaultLayout";
import { Textarea } from "@nextui-org/react";
import clsx from "clsx";
import * as Yup from 'yup';
import { useFormik } from "formik";
import ImageUploading from 'react-images-uploading';
import { useState } from "react";

export default function Page() {


    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone number is required'),
        bio: Yup.string().required('Bio is required'),
    })

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: 'k@gamil.com',
            phone: '',
            bio: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            formik.resetForm();
        }
    })

    const defaultImage = {
        data_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvW-HGs8COLnT7_i9vQqnZSg7r3ABbKrOYIQ&s',
    };

    const [images, setImages] = useState([defaultImage]);
    const maxNumber = 69;

    const onChange = (imageList: any, addUpdateIndex: any) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const resetToDefault = () => {
        setImages([defaultImage]);
    };


    return (
        <>
            <div className={clsx("bg-light-blue-bg  ")}  >
                <DefaultLayout>

                    {/* Page Title  */}

                    <div>
                        <h1 className="text-navigation-subitem font-semibold text-2xl lg:text-3xl ">Profile</h1>
                    </div>

                    {/* Main Part */}

                    <div className="flex  flex-col justify-center items-center" >
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({ imageList, onImageUpdate }) => (
                                <div className="flex flex-wrap justify-center gap-5 lg:gap-10">
                                    {imageList.map((image, index) => (
                                        <div key={index} className="flex flex-wrap justify-center flex-row items-center gap-5 lg:gap-10">
                                            <div className="image-item">
                                                <div className="relative">
                                                    <Image
                                                        src={image['data_url']}
                                                        alt="Profile Image"
                                                        className="size-48 rounded-full border-4 p-1 animated-profile"
                                                    />
                                                    <span className="badge z-99999 "></span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 lg:gap-5">
                                                <Button
                                                    color="secondary"
                                                    className="p-2 lg:p-6"
                                                    variant="shadow"
                                                    onClick={() => onImageUpdate(index)}
                                                >
                                                    Change Image
                                                </Button>
                                                <Button
                                                    color="danger"
                                                    className="p-2 lg:p-6"
                                                    variant="shadow"
                                                    onClick={resetToDefault}
                                                >
                                                    Default Image
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>


                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className=" w-full flex justify-center" >
                                <div className="flex  flex-wrap  lg:flex-row justify-center items-center  mt-5 gap-y-5 md:gap-x-2 md:gap-y-8 w-11/12  ">
                                    <div className="w-full md:w-5/12">
                                        <label className="font-normal text-sm  text-gray-font" >First Name</label>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            placeholder="Your First Name"
                                            required={true}
                                            onChange={formik.handleChange}
                                            style={{ textTransform: 'capitalize' }}
                                            value={formik.values.first_name}
                                            color={formik.touched.first_name && formik.errors.first_name ? ("danger") : ("default")}
                                        />
                                        {formik.touched.first_name && formik.errors.first_name ? (
                                            <div className=" text-error-color  text-xs">{formik.errors.first_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <label className="font-normal text-sm  text-gray-font" >Last Name</label>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            required={true}
                                            placeholder="Your Last Name"
                                            onChange={formik.handleChange}
                                            style={{ textTransform: 'capitalize' }}
                                            value={formik.values.last_name}
                                            color={formik.touched.last_name && formik.errors.last_name ? ("danger") : ("default")}
                                        />
                                        {formik.touched.last_name && formik.errors.last_name ? (
                                            <div className=" text-error-color  text-xs">{formik.errors.last_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <label className="font-normal text-sm  text-gray-font" >Emaili Address</label>
                                        <Input
                                            id="eamil"
                                            name="email"
                                            type="email"
                                            required={true}
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            color={formik.touched.email && formik.errors.email ? ("danger") : ("default")}
                                            isReadOnly
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className=" text-error-color  text-xs">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full md:w-5/12">
                                        <label className="font-normal text-sm  text-gray-font" >Phone Number</label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            required={true}
                                            placeholder="Your Mobile Number"
                                            pattern="\d{10}"
                                            maxLength={10}
                                            inputMode="numeric"
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            color={formik.touched.phone && formik.errors.phone ? ("danger") : ("default")}
                                        />
                                        {formik.touched.phone && formik.errors.phone ? (
                                            <div className=" text-error-color  text-xs">{formik.errors.phone}</div>
                                        ) : null}
                                    </div>
                                    <div className=" w-full md:w-10/12">
                                        <label className="font-normal text-sm  text-gray-font" >Bio</label>
                                        <Textarea
                                            placeholder="Write your bio here..............."
                                            name="bio"
                                            required={true}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.bio}
                                            style={{ textTransform: 'capitalize' }}
                                            color={formik.touched.bio && formik.errors.bio ? "danger" : "default"}
                                        />
                                        {formik.touched.bio && formik.errors.bio ? (
                                            <div className="text-error-color text-xs">{formik.errors.bio}</div>
                                        ) : null}
                                    </div>
                                    <div className=" w-full md:w-10/12">
                                        <Button
                                            color="primary"
                                            className="w-full"
                                            type="submit"
                                        >Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div >
                </DefaultLayout >
            </div >
        </>
    )
}