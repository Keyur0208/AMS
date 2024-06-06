"use client"
import { fontRobot } from "../config/fonts";
import { Button, Input } from "@nextui-org/react";
import { Image } from '@nextui-org/react'
import MailIcon from "../style/icon/mailIcon";
import clsx from "clsx";
import { Checkbox } from "@nextui-org/react";
import React from "react";
import { useFormik } from "formik";
import LockIcon from "../style/icon/lockIcon";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'

export default function Login() {

    const router = useRouter()

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            router.push('/dashboard');
            formik.resetForm();
        }
    })

    return (
        <>
            <div className="flex justify-end p-2">
                <Image
                    src="/login-page-image/logo.svg"
                    alt="logo"
                    className="h-14 lg:h-16"
                />
            </div>
            <div className="w-full flex justify-center items-center" >
                <div className="w-11/12 lg:w-10/12  sm:flex justify-center items-center"  >
                    <div className=" size-6/12 hidden lg:block">
                        <Image
                            src="/login-page-image/ads.svg"
                            alt="ads"
                        />
                    </div>
                    <div  >
                        <div className="py-5">
                            <h1 className={clsx(
                                "text-4xl sm:text-5xl font-bold text-title-color drop-shadow-text-shadow",
                                fontRobot.className
                            )}
                            >Sing in to ToForZero</h1>
                        </div>
                        <div className="mx-0 sm:mx-10" >
                            <form onSubmit={formik.handleSubmit} autoComplete="off" >
                                <div>
                                    <label className="font-normal text-sm  text-gray-font" >Email address</label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required={true}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        placeholder="alex@email.com"
                                        className="w-full sm:w-80 my-2"
                                        color={formik.touched.email && formik.errors.email ? ("danger") : ("default")}
                                        endContent={<MailIcon />}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className=" text-error-color  text-xs">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mt-6">
                                    <label className="font-normal text-sm text-gray-font" >Password</label>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="•••••••••••••"
                                        className="w-full sm:w-80 my-2"
                                        required={true}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        type={"password"}
                                        color={formik.touched.password && formik.errors.password ? ("danger") : ("default")}
                                        endContent={<LockIcon />}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-error-color text-xs">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mt-4">
                                    <Button type="submit" className={clsx("w-full sm:w-80 my-2 bg-blue-theme text-white", fontRobot.className)}>Login now</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}