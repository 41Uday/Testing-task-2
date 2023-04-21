import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Button, Form } from "react-bootstrap";

const EmailForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send email to user
    emailjs
      .send(
        "service_q4ilh7s",
        "template_91th0ym",
        { to_email: email },
        "00x8ZD5v3NARNUhHC"
      )
      .then(() => {
        // Redirect to signup page
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Email failed to send: ", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Enter your email</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;

// import React from "react";

// function EmailForm() {
//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto w-full">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Department</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//           <tr className="bg-white border-b">
//             <td className="px-4 py-2">John Doe</td>
//             <td className="px-4 py-2">johndoe@example.com</td>
//             <td className="px-4 py-2">Sales</td>
//             <td className="px-4 py-2">2023-04-19</td>
//             <td className="px-4 py-2">
//               <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                 Enable
//               </button>
//             </td>
//           </tr>
//           <tr className="bg-gray-100 border-b">
//             <td className="px-4 py-2">Jane Smith</td>
//             <td className="px-4 py-2">janesmith@example.com</td>
//             <td className="px-4 py-2">Marketing</td>
//             <td className="px-4 py-2">2023-04-18</td>
//             <td className="px-4 py-2">
//               <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                 Disable
//               </button>
//             </td>
//           </tr>
//           {/* Add more rows as needed */}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EmailForm;
