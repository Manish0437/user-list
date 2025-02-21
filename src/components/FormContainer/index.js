// import { useState,useEffect } from "react";
// import { GiCancel } from "react-icons/gi";
// import './style.css';
// import {v4 as uuidv4} from 'uuid';

// const FormContainer = props => {
//     const {filteredUser,onSaveUserDetails,isAddingUser} = props;

//     const [isVisible, setIsVisible] = useState(true);

//     const [formData, setFormData] = useState({
//         id: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         department: ''
//     });

//     useEffect(() => {
//       if (filteredUser) {
//         setFormData({
//             id: filteredUser.id || uuidv4(),
//             firstName: filteredUser.firstName || '',
//             lastName: filteredUser.lastName || '',
//             email: filteredUser.email || '',
//             department: filteredUser.department || ''
//         });
//       }
//     }, [filteredUser]);

//     const onCancel = () => {
//         console.log("Cancel button clicked");
//         setIsVisible(false);
//     };

//     const onSave = (event) => {
//       event.preventDefault();

//       // if (!formData.firstName.trim()) {
//       //   alert('First Name cannot be empty');
//       //   return;
//       // }
//       // if (!formData.lastName.trim()) {
//       //     alert('Last Name cannot be empty');
//       //     return;
//       // }
//       // if (!formData.email.trim()) {
//       //     alert('Email cannot be empty');
//       //     return;
//       // }
//       // if (!formData.department.trim()) {
//       //     alert('Department cannot be empty');
//       //     return;
//       // }


//       const { firstName, lastName, email, department } = formData;
//       if (!firstName.trim() || !lastName.trim() || !email.trim() || !department.trim()) {
//         alert('All fields are required.');
//         return;
//       }

//       setIsVisible(false);
//       onSaveUserDetails(formData);
      
//     };

    
//     const onchangeFirstName = (event) => {
//         const newValue = event.target.value;
//         setFormData(prev => ({ ...prev, firstName: newValue }));
//     };

//     const onchangeLastName = (event) => {
//         const newValue = event.target.value;
//         setFormData(prev => ({ ...prev, lastName: newValue }));
//     };


//     const onchangeEmail = (event) => {
//         const newValue = event.target.value;
//         setFormData(prev => ({ ...prev, email: newValue }));
//     };

//     const onchangeDepartment = (event) => {
//         const newValue = event.target.value;
//         setFormData(prev => ({ ...prev, department: newValue }));
//     };

//     if (isVisible==false) {
//         return null;
//     }

//     return (
//         <div className="form-bg-container">
//           <div className="form-container">
//             <button type="button" className="cancel-cross-button" onClick={onCancel}>
//             <GiCancel />
//             </button>
//         <form className="form" onSubmit={onSave}>
//             <h1 className="form-heading">
//                 {isAddingUser ? 'Add User' : 'Edit User'}
//             </h1>
//             <label htmlFor="id" className="form-label">
//             ID
//             </label>
//             <input
//             type="text"
//             id="id"
//             className="form-input"
//             placeholder="ID"
//             value={formData.id}
//             disabled={true}
//             readOnly
//             />
//           <label htmlFor="first-name" className="form-label">
//             First Name
//           </label>
//           <input
//             type="text"
//             id="first-name"
//             className="form-input"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={onchangeFirstName}
//             required
//           />
//           <label htmlFor="last-name" className="form-label">
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="last-name"
//             className="form-input"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={onchangeLastName}
//             required
//           />
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="form-input"
//             placeholder="Email"
//             value={formData.email}
//             onChange={onchangeEmail}
//             required
//           />
//           <label htmlFor="department" className="form-label">
//             Department
//           </label>
//           <input
//             type="text"
//             id="department"
//             className="form-input"
//             placeholder="Department"
//             value={formData.department}
//             onChange={onchangeDepartment}
//             required
//           />
//           <div className="button-container">
//             <button type="submit" className="submit-button" onClick={onSave}>
//             {isAddingUser ? 'Add' : 'Save'}
//             </button>
//             <button type="button" className="cancel-button" onClick={onCancel}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//         </div>
//     )
// }

// export default FormContainer;































import React from "react";
import { useState,useEffect } from "react";
// import { GiCancel } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import './style.css';
import {v4 as uuidv4} from 'uuid';

const FormContainer = props => {
    const {filteredUser,onSaveUserDetails,isAddingUser} = props;

    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });

    useEffect(() => {
      if (filteredUser) {
        setFormData({
            id: filteredUser.id || uuidv4(),
            firstName: filteredUser.firstName || '',
            lastName: filteredUser.lastName || '',
            email: filteredUser.email || '',
            department: filteredUser.department || ''
        });
      }
    }, [filteredUser]);

    const onCancel = () => {
        onSaveUserDetails(null);
    };

    const onSave = (event) => {
      event.preventDefault();
      const { firstName, lastName, email, department } = formData;
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !department.trim()) {
        alert('All fields are required.');
        return;
      }

      onSaveUserDetails(formData);
      
    };

    
    const onchangeFirstName = (event) => {
        const newValue = event.target.value;
        setFormData(prev => ({ ...prev, firstName: newValue }));
    };

    const onchangeLastName = (event) => {
        const newValue = event.target.value;
        setFormData(prev => ({ ...prev, lastName: newValue }));
    };


    const onchangeEmail = (event) => {
        const newValue = event.target.value;
        setFormData(prev => ({ ...prev, email: newValue }));
    };

    const onchangeDepartment = (event) => {
        const newValue = event.target.value;
        setFormData(prev => ({ ...prev, department: newValue }));
    };

    return (
        <div className="form-bg-container">
          <div className="form-container">
            <button type="button" className="cancel-cross-button" onClick={onCancel}>
            {/* <GiCancel /> */}
            <RxCross2 />
            </button>
        <form className="form" onSubmit={onSave}>
            <h1 className="form-heading">
                {isAddingUser ? 'Add User' : 'Edit User'}
            </h1>
            <label htmlFor="id" className="form-label">
            ID
            </label>
            <input
            type="text"
            id="id"
            className="form-input"
            placeholder="ID"
            value={formData.id}
            disabled={true}
            readOnly
            />
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            className="form-input"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onchangeFirstName}
            required
          />
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            className="form-input"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={onchangeLastName}
            required
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Email"
            value={formData.email}
            onChange={onchangeEmail}
            required
          />
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            type="text"
            id="department"
            className="form-input"
            placeholder="Department"
            value={formData.department}
            onChange={onchangeDepartment}
            required
          />
          <div className="button-container">
            <button type="submit" className="submit-button" onClick={onSave}>
            {isAddingUser ? 'Add' : 'Save'}
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
        </div>
    )
}

export default FormContainer;