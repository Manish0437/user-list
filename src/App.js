// import {Component} from 'react';
// import { HiOutlineUserAdd } from "react-icons/hi";
// import {TailSpin} from 'react-loader-spinner';
// import UserDetails from './components/UserDetails';
// import FormContainer from './components/FormContainer';
// import './App.css';


// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// };

// class App extends Component {
//   state={userList:[],apiStatus:apiStatusConstants.initial,isFormVisible:false,selectedUserDetails:null,isAddingUser: false,};

//   componentDidMount(){
//     this.getUserList();
//   }

//   getUserList = async () => {
//     this.setState({apiStatus:apiStatusConstants.inProgress});
//     const apiUrl="http://localhost:3005";
//     const options = {
//       method: 'GET',
//     };

//     try{
//       const response = await fetch(`${apiUrl}/users`, options);
//       if(response.ok){
//         const data = await response.json();
//         console.log("data",data);
//         const updatedData = data.map(user => ({
//           id: user.id,
//           firstName: user.firstname,
//           lastName: user.lastname,
//           email: user.email,
//           department: user.department,
//         }));
//         this.setState({userList:updatedData,apiStatus:apiStatusConstants.success});
//         console.log("updatedData",updatedData);
//       } else {
//         this.setState({apiStatus:apiStatusConstants.failure});
//       }
//     } catch(error){
//       console.log("Error fetching data:",error);
//       this.setState({apiStatus:apiStatusConstants.failure});
//     }
//   };

//   onSaveUserDetails = async(updateduserData) => {

//     const { isAddingUser} = this.state;
//     const apiUrl = "http://localhost:3005";

//     try {
//       console.log(updateduserData);
//       const options = {
//         method: isAddingUser ? 'POST' : 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: updateduserData.id,
//           firstname: updateduserData.firstName,
//           lastname: updateduserData.lastName,
//           email: updateduserData.email,
//           department: updateduserData.department,
//         }),
//       };
//       console.log("options",options);
//       const url = isAddingUser ? 
//         `${apiUrl}/users` : 
//         `${apiUrl}/users/${this.state.selectedUserDetails.id}`;
//       console.log("url:"+url);

//       const response = await fetch(url, options);
//       console.log("response",response.ok);
//       if (response.ok) {
//       //   if (isAddingUser) {
//       //     // Add new user to the list
//       //     this.setState(prevState => ({
//       //       userList: [...prevState.userList, updateduserData],
//       //       isFormVisible: false,
//       //       selectedUserDetails: null,
//       //       isAddingUser: false
//       //     }));
//       //   } else {
//       //     console.log("Updated user data",updateduserData);
//       //     // Update existing user
//       //     this.setState(prevState => ({
//       //       userList: prevState.userList.map(user => 
//       //         user.id === this.state.selectedUserDetails.id ? updateduserData : user
//       //       ),
//       //       isFormVisible: false,
//       //       selectedUserDetails: null
//       //     }),() => {
//       //       // Refresh the list from server to ensure consistency
//       //       this.getUserList();
//       //     });
//       //     console.log("after updating user",this.state.userList);
//       //   }
//       //   // await this.getUserList();
//       // } else {
//       //   console.error('Failed to save user');
//       // }

//       this.setState(prevState => ({
//         userList: isAddingUser
//           ? [...prevState.userList, updateduserData]
//           : prevState.userList.map(user =>
//               user.id === this.state.selectedUserDetails.id ? updateduserData : user
//             ),
//         isFormVisible: false,
//         selectedUserDetails: null,
//         isAddingUser: false,
//       }), this.getUserList);
//       }
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   };

//   showAddUserForm = () => {
//     this.setState({
//       isFormVisible: true,
//       isAddingUser: true,
//       selectedUserDetails: {
//         id: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         department: ''
//       },
//     });
//   };

//   editUserDetails = (id) => {
//     console.log("Edit user details clicked",id);

//     const {userList, isFormVisible} = this.state;
//     const filteredUser = userList.find(user => user.id === id);
//     // const {firstName,lastName,email,department} = filteredUser;
//     console.log(filteredUser);
//     this.setState({isFormVisible:true,isAddingUser:false,selectedUserDetails:filteredUser});
//   };

//   deleteUserDetails = async(id) => {
//     try {
//       const response = await fetch(`http://localhost:3005/users/${id}`, {
//         method: 'DELETE',
//       });

//       if(response.ok) {
//         this.setState(prevState => ({
//           userList: prevState.userList.filter(user => user.id !== id)
//         }));
//       } else {  
//         console.log("Error deleting user details");
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   }

//   renderUserListSuccess = () => {
//     const {userList} = this.state;
//     return (
//       <tbody className="user-list-container">
//         {userList.map((eachUser) => (
//           <UserDetails key={eachUser.id} userDetails={eachUser} editUserDetails={this.editUserDetails} deleteUserDetails={this.deleteUserDetails} />
//         ))}
//       </tbody>
//     );
//   };

//   renderUserListInProgress = () => (
//     // <div className="loader-container" testid="loader">
//     //   <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
//     // </div>
//     <tr className="loader-container" testid="loader">
//       <td colSpan="6">
//         <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
//       </td>
//     </tr>
//   );

//   renderUserListFailure = () => (
//     // <h1 className="failure-text">Something went wrong, Please try again.</h1>
//     <tr>
//     <td colSpan="6">
//       <h1 className="failure-text">Something went wrong, Please try again.</h1>
//     </td>
//   </tr>
//   );

//   renderUserListBody = () => {
//     const {apiStatus}=this.state;
//     switch(apiStatus){
//       case apiStatusConstants.success:
//         return this.renderUserListSuccess();
//       case apiStatusConstants.failure:
//         return this.renderUserListFailure();
//       case apiStatusConstants.inProgress:
//         return this.renderUserListInProgress();
//       default: 
//         return null;
//     }
//   };

//   addUserDetails = () => {
//     this.setState({isFormVisible:true,selectedUserDetails:null});
//   };

//   render() {
//     const  {isFormVisible,selectedUserDetails,isAddingUser} = this.state;
//     return (
//       <div className="App">
//         <header>
//           <h1 className="user-list-heading">Users List</h1>
//           <button type="button" className="add-user-button" onClick={this.showAddUserForm}>
//           <HiOutlineUserAdd  className="adduserLogo"/>
//           Add User
//           </button>
//         </header>

//         <section className="user-list-table">
//           <table>
//             <thead>
//             <tr className='table-headings-row'>
//               <th className="table-headings">ID</th>
//               <th className="table-headings">FIRST NAME</th>
//               <th className="table-headings">LAST NAME</th>
//               <th className="table-headings">EMAIL</th>
//               <th className="table-headings">DEPARTMENT</th>
//               <th className="table-headings">ACTIONS</th>
//             </tr>
//             </thead>
//             {this.renderUserListBody()}
//           </table>
//         </section>

//         {isFormVisible && (
//         <FormContainer 
//         filteredUser={selectedUserDetails}
//         onSaveUserDetails={this.onSaveUserDetails}
//         isAddingUser={isAddingUser} />
//         )}
//       </div>
//     );
//   }

// }

// export default App;

















import {Component} from 'react';
import { HiOutlineUserAdd } from "react-icons/hi";
import {TailSpin} from 'react-loader-spinner';
import UserDetails from './components/UserDetails';
import FormContainer from './components/FormContainer';
import './App.css';


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

class App extends Component {
  state={userList:[],apiStatus:apiStatusConstants.initial,isFormVisible:false,selectedUserDetails:null,isAddingUser: false,};

  componentDidMount(){
    this.getUserList();
  }

  getUserList = async () => {
    this.setState({apiStatus:apiStatusConstants.inProgress});
    const apiUrl=process.env.REACT_APP_API_URL;
    const options = {
      method: 'GET',
    };

    try{
      const response = await fetch(`${apiUrl}/users`, options);
      if(response.ok){
        const data = await response.json();
        console.log("data",data);
        const updatedData = data.map(user => ({
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          department: user.department,
        }));
        this.setState({userList:updatedData,apiStatus:apiStatusConstants.success});
        console.log("updatedData",updatedData);
      } else {
        this.setState({apiStatus:apiStatusConstants.failure});
      }
    } catch(error){
      console.log("Error fetching data:",error);
      this.setState({apiStatus:apiStatusConstants.failure});
    }
  };

  onSaveUserDetails = async(updateduserData) => {
    if (!updateduserData) {
      this.setState({
          isFormVisible: false,
          selectedUserDetails: null,
          isAddingUser: false
      });
      return;
  }
    const { isAddingUser} = this.state;
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      console.log(updateduserData);
      const options = {
        method: isAddingUser ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateduserData.id,
          firstname: updateduserData.firstName,
          lastname: updateduserData.lastName,
          email: updateduserData.email,
          department: updateduserData.department,
        }),
      };
      console.log("options",options);
      const url = isAddingUser ? 
        `${apiUrl}/users` : 
        `${apiUrl}/users/${this.state.selectedUserDetails.id}`;
      console.log("url:"+url);

      const response = await fetch(url, options);
      console.log("response",response.ok);
      if (response.ok) {
      //   if (isAddingUser) {
      //     // Add new user to the list
      //     this.setState(prevState => ({
      //       userList: [...prevState.userList, updateduserData],
      //       isFormVisible: false,
      //       selectedUserDetails: null,
      //       isAddingUser: false
      //     }));
      //   } else {
      //     console.log("Updated user data",updateduserData);
      //     // Update existing user
      //     this.setState(prevState => ({
      //       userList: prevState.userList.map(user => 
      //         user.id === this.state.selectedUserDetails.id ? updateduserData : user
      //       ),
      //       isFormVisible: false,
      //       selectedUserDetails: null
      //     }),() => {
      //       // Refresh the list from server to ensure consistency
      //       this.getUserList();
      //     });
      //     console.log("after updating user",this.state.userList);
      //   }
      //   // await this.getUserList();
      // } else {
      //   console.error('Failed to save user');
      // }

      this.setState(prevState => ({
        isFormVisible: false,
        selectedUserDetails: null,
        isAddingUser: false,
      }), this.getUserList);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  showAddUserForm = () => {
    this.setState({
      isFormVisible: true,
      isAddingUser: true,
      selectedUserDetails: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      },
    });
  };

  editUserDetails = (id) => {
    console.log("Edit user details clicked",id);

    const {userList} = this.state;
    const filteredUser = userList.find(user => user.id === id);
    // const {firstName,lastName,email,department} = filteredUser;
    console.log(filteredUser);
    this.setState({isFormVisible:true,isAddingUser:false,selectedUserDetails:filteredUser});
  };

  deleteUserDetails = async(id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE',
      });

      if(response.ok) {
        this.setState(prevState => ({
          userList: prevState.userList.filter(user => user.id !== id)
        }));
      } else {  
        console.log("Error deleting user details");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  renderUserListSuccess = () => {
    const {userList} = this.state;
    return (
      <tbody className="user-list-container">
        {userList.map((eachUser) => (
          <UserDetails key={eachUser.id} userDetails={eachUser} editUserDetails={this.editUserDetails} deleteUserDetails={this.deleteUserDetails} />
        ))}
      </tbody>
    );
  };

  renderUserListInProgress = () => (
    // <div className="loader-container" testid="loader">
    //   <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
    // </div>
    <tbody>
    <tr className="loader-container" testid="loader">
      <td colSpan="6">
        <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
      </td>
    </tr>
  </tbody>
  );

  renderUserListFailure = () => (
    // <h1 className="failure-text">Something went wrong, Please try again.</h1>
    <tbody>
    <tr>
      <td colSpan="6">
        <h1 className="failure-text">Something went wrong, Please try again.</h1>
      </td>
    </tr>
  </tbody>
  );

  renderUserListBody = () => {
    const {apiStatus}=this.state;
    switch(apiStatus){
      case apiStatusConstants.success:
        return this.renderUserListSuccess();
      case apiStatusConstants.failure:
        return this.renderUserListFailure();
      case apiStatusConstants.inProgress:
        return this.renderUserListInProgress();
      default: 
        return null;
    }
  };

  addUserDetails = () => {
    this.setState({isFormVisible:true,selectedUserDetails:null});
  };

  render() {
    const  {isFormVisible,selectedUserDetails,isAddingUser} = this.state;
    return (
      <div className="App">
        <header>
          <h1 className="user-list-heading">Users List</h1>
          <button type="button" className="add-user-button" onClick={this.showAddUserForm}>
          <HiOutlineUserAdd  className="adduserLogo"/>
          Add User
          </button>
        </header>

        <section className="user-list-table">
          <table>
            <thead>
            <tr className='table-headings-row'>
              <th className="table-headings">ID</th>
              <th className="table-headings">FIRST NAME</th>
              <th className="table-headings">LAST NAME</th>
              <th className="table-headings">EMAIL</th>
              <th className="table-headings">DEPARTMENT</th>
              <th className="table-headings">ACTIONS</th>
            </tr>
            </thead>
            {this.renderUserListBody()}
          </table>
        </section>

        {isFormVisible && (
        <FormContainer 
        filteredUser={selectedUserDetails}
        onSaveUserDetails={this.onSaveUserDetails}
        isAddingUser={isAddingUser} />
        )}
      </div>
    );
  }

}

export default App;
