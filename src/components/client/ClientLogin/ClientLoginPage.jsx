 
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setEmail } from '../../../redux/actions/Client/StoreEmail/EmailActions';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';
 
// const ClientLoginPage = () => {
//   // State variables for email, password, and error messages
//   const [email, setEmailInput] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const dispatch = useDispatch();  
//   const navigate = useNavigate();  
 
//   // Initialize email from Redux store (or from localStorage if Redux state is empty)
//   const storedEmail = useSelector((state) => state.email.email);
 
//   // Set the email input field from the Redux store or localStorage
//   React.useEffect(() => {
//     if (storedEmail) {
//       setEmailInput(storedEmail);
//     }
//   }, [storedEmail]);
 
//   // Handle email change
//   const handleEmailChange = (e) => {
//     setEmailInput(e.target.value);
//     setEmailError(''); // Clear error message on change
//   };
 
//   // Handle password change
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setPasswordError(''); // Clear error message on change
//   };
 
//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
 
//     let isValid = true;
 
//     // Simple email validation (check if email is empty or doesn't contain @gmail.com)
//     if (!email) {
//       setEmailError('Email is required!');
//       isValid = false;
//     } else if (!email.includes('@gmail.com')) {
//       setEmailError('Email must be a Gmail address!');
//       isValid = false;
//     }
 
//     // Simple password validation (check if password is empty)
//     if (!password) {
//       setPasswordError('Password is required!');
//       isValid = false;
//     }
 
//     if (!isValid) {
//       toast.error('Please fix the errors and try again!');
//       return;  // Stop form submission if validation fails
//     }
 
//     // If everything is fine, dispatch the email to Redux and localStorage
//     dispatch(setEmail(email));
 
//     toast.success('Logged in successfully!');
 
//     navigate('/clientdashboard'); // Redirect to dashboard
//   };
 
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
//         <h2 className="text-2xl font-semibold text-center text-[#27235C] mb-6">Login</h2>
 
//         <form onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             {/* Display email error */}
//             {emailError && <p className="text-red-600 text-sm mt-2">{emailError}</p>}
//           </div>
 
//           {/* Password Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             {/* Display password error */}
//             {passwordError && <p className="text-red-600 text-sm mt-2">{passwordError}</p>}
//           </div>
 
//           {/* Submit Button */}
//           <div className="flex justify-center mb-4">
//             <button
//               type="submit"
//               className="w-full py-3 bg-[#27235C] text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#524F7D] focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Login
//             </button>
//           </div>
//         </form>
 
//         {/* Links below the Login Button */}
//         <div className="flex justify-center text-sm text-[#27235C]">
//           <Link to="/forgetpassword" className="hover:text-[#6791ed]">
//             Forgot Password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default ClientLoginPage;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail } from '../../../redux/actions/Client/StoreEmail/EmailActions';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti'; // Import the canvas-confetti library
import axios from 'axios';
 
const ClientLoginPage = () => {
  // State variables for email, password, and error messages
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Initialize email from Redux store (or from localStorage if Redux state is empty)
  const storedEmail = useSelector((state) => state.email.email);
 
  // Set the email input field from the Redux store or localStorage
  useEffect(() => {
    if (storedEmail) {
      setEmailInput(storedEmail);
    }
  }, [storedEmail]);
 
  // Handle email change
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setEmailError(''); // Clear error message on change
  };
 
  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(''); // Clear error message on change
  };
 
  // Function to trigger the confetti effect for 2 seconds (only for Vendor login)
  const triggerBuckeyesConfetti = () => {
    const end = Date.now() + 2000; // Confetti effect runs for 2 seconds
    const colors = ['#bb0000', '#ffffff']; // Buckeyes Colors (Red and White)
 
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
 
      // Stop after 2 seconds
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
 
    let isValid = true;
 
    // Simple email validation (check if email is empty or doesn't contain "@gmail.com" or "@vendor.com")
    if (!email) {
      setEmailError('Email is required!');
      isValid = false;
    } else if (!email.includes('@vendor.com') && !email.includes('@gmail.com')) {
      setEmailError('Email must be either a vendor or Gmail address!');
      isValid = false;
    }
 
    // Simple password validation (check if password is empty)
    if (!password) {
      setPasswordError('Password is required!');
      isValid = false;
    }
 
    if (!isValid) {
      toast.error('Please fix the errors and try again!');
      return;  // Stop form submission if validation fails
    }
 
    // If everything is fine, dispatch the email to Redux and localStorage
    dispatch(setEmail(email));
 
    // Trigger the Buckeyes confetti effect for 2 seconds only for Vendor login
  //   if (email.includes('@vendor.com')) {
  //     const id = axios get('http://localhost/8080/api/vendors/email')
  //     .then(response => {
  //     sessionStorage.setItem("vendorId", id);

  //     toast.success('Logged in successfully as Vendor!');
  //     triggerBuckeyesConfetti(); // Trigger confetti effect for Vendor login
  //     navigate('/vendordashboard');
  //     } // Redirect to Vendor Dashboard
  //   } else if (email.includes('@gmail.com')) {
  //     toast.success('Logged in successfully as Client!');
  //     navigate('/clientdashboard'); // Redirect to Client Dashboard
  //   }
  // };

  if (email.includes('@vendor.com')) {
    // Fetch the vendor ID based on email
    axios.get('http://localhost:8080/api/vendors/email', {
      params: {
          email: email
      }
    })
      
      .then(response => {
        const id = response.data; 
        sessionStorage.setItem("vendorId", id);
  
        toast.success('Logged in successfully as Vendor!');
        triggerBuckeyesConfetti(); 
        navigate('/vendordashboard'); 
      })
      .catch(error => {
        console.error("There was an error fetching the vendor ID!", error);
        toast.error('Error logging in as Vendor. Please try again later.');
      });
  } else if (email.includes('@gmail.com')) {
    axios.get('http://localhost:8080/tap/api/client-email',{
      params: {
        email: email
      }
    })
    .then(response => {
      const idd = response.data;
      sessionStorage.setItem("clientId", idd);
    })
    toast.success('Logged in successfully as Client!');
    navigate('/clientdashboard'); // Redirect to Client Dashboard
  } else {
    toast.error('Invalid email domain. Please use a vendor or Gmail account.');
  }
}
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl z-10">
        <h2 className="text-2xl font-semibold text-center text-[#27235C] mb-6">Login</h2>
 
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {/* Display email error */}
            {emailError && <p className="text-red-600 text-sm mt-2">{emailError}</p>}
          </div>
 
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* Display password error */}
            {passwordError && <p className="text-red-600 text-sm mt-2">{passwordError}</p>}
          </div>
 
          {/* Submit Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full py-3 bg-[#27235C] text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#524F7D] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
 
        {/* Links below the Login Button */}
        <div className="flex justify-center text-sm text-[#27235C]">
          <Link to="/forgetpassword" className="hover:text-[#6791ed]">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};
 
export default ClientLoginPage;