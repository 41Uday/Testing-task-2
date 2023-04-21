import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const initialValues = {
  to: "",
};

const validationSchema = Yup.object().shape({
  to: Yup.string().email("invalid email format").required("email is required"),
});

function EmailPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleEmailSubmit = (values) => {
    console.log("Success", values);
    axios
      .post("http://192.168.1.85:8095/api/sendMail", values)
      .then((res) => {
        console.log(res);
        toast.info(
          "Email Successfully sent to your email id please check your email",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        setTimeout(() => {
          navigate("/signup", { replace: true });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastMethod = () => (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );

  return (
    <div className="flex justify-end items-center mb-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={togglePopup}
      >
        Invite
      </button>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg  p-8 md:w-2/6 w-5/6 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Send Email</h2>
              <button onClick={togglePopup}>
                <FiX className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleEmailSubmit}
            >
              <Form>
                <div className="mb-4">
                  <Field
                    className="border rounded-lg py-2 px-3 text-gray-700 w-full outline-blue-300"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    // onChange={emailChange}
                    name="to"
                  />
                  <div className="text-left mt-2 ml-2 text-red-500">
                    <ErrorMessage name="to" />
                  </div>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Send
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
      {toastMethod()}
    </div>
  );
}

export default EmailPopup;
