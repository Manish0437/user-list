import { useState,useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import './style.css';

const FormContainer = props => {
    const {filteredUser,onSaveUserDetails,isAddingUser} = props;

    const [isVisible, setIsVisible] = useState(true);

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
                id: filteredUser.id || '',
                firstName: filteredUser.firstName || '',
                lastName: filteredUser.lastName || '',
                email: filteredUser.email || '',
                department: filteredUser.department || ''
            });
        }
    }, [filteredUser]);

    const onCancel = () => {
        console.log("Cancel button clicked");
        setIsVisible(false);
    };

    const onSave = (event) => {
        event.preventDefault();
        setIsVisible(false);
        onSaveUserDetails(formData);
    };

    const onchangeId = (event) => {
        // const newValue = event.target.value;
        // setFormData(prev => ({ ...prev, id: newValue }));

        const newValue = event.target.value;
        const updatedData = { ...formData, id: newValue };
        setFormData(updatedData);
        // Immediately save changes when ID is updated
        // onSaveUserDetails(updatedData);

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

    if (!isVisible) {
        return null;
    }

    return (
        <div className="form-bg-container">
          <div className="form-container">
            <button type="button" className="cancel-cross-button" onClick={onCancel}>
            <GiCancel />
            </button>
        <form className="form">
            <h1 className="form-heading">
                {isAddingUser ? 'Add User' : 'Edit User'}
            </h1>
            <label htmlFor="id" className="form-label">
            ID
            </label>
            <input
            type="number"
            id="id"
            className="form-input"
            placeholder="ID"
            value={formData.id}
            onChange={onchangeId}
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