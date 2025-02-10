import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";

import './style.css';

const UserDetails = props => {
    const {userDetails,editUserDetails,deleteUserDetails} = props;
    const {id,firstName,lastName,email,department} = userDetails;

    const handleEditUserDetails = () => {
        console.log(`Edit user details clicked ${id}`);
        editUserDetails(id);
    };

    const handleDeleteUserDetails = () => {
        console.log(`Delete user details clicked ${id}`);
        deleteUserDetails(id);
    };

    return (
        <tr key={id} className="user-details">
            <td className="table-data">{id}</td>
            <td className="table-data">{firstName}</td>
            <td className="table-data">{lastName}</td>
            <td className="table-data">{email}</td>
            <td className="table-data">{department}</td>
            <td className="table-data">
                <button type="button" className="edit-button" onClick={handleEditUserDetails}>
                    <MdOutlineModeEditOutline className="edit-icon"/>
                </button>
                <button type="button" className="delete-button" onClick={handleDeleteUserDetails}>
                    <RiDeleteBin6Line className="delete-icon"/>
                </button>
            </td>
        </tr>
    );
};

export default UserDetails;