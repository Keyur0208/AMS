"use client"
import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
  dateRange: {
    start: any; // Replace with the correct type for your date library
    end: any; // Replace with the correct type for your date library
  };
}

const validationSchema = Yup.object({
  dateRange: Yup.object({
    start: Yup.mixed().required("Start date is required"),
    end: Yup.mixed().required("End date is required"),
  }).required("Date range is required"),
});

export default function App() {
  const formik = useFormik<FormValues>({
    initialValues: {
      dateRange: {
        start: null,
        end: null,
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  let formatter = useDateFormatter({ dateStyle: "long" });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-y-2">
        <DateRangePicker
          label="Date range (controlled)"
          value={formik.values.dateRange}
          onChange={(value) => formik.setFieldValue("dateRange", value)}
        />
        <p className="text-default-500 text-sm">
          Selected date:{" "}
          {formik.values.dateRange.start && formik.values.dateRange.end
            ? formatter.formatRange(
                formik.values.dateRange.start.toDate(getLocalTimeZone()),
                formik.values.dateRange.end.toDate(getLocalTimeZone())
              )
            : "--"}
        </p>
        {formik.errors.dateRange && formik.touched.dateRange ? (
          <div className="text-error-color text-xs">
            {formik.errors.dateRange.start?.toString() ||
              formik.errors.dateRange.end?.toString()}
          </div>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
