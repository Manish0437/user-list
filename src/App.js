
//        working code-1


// import React, { Component } from "react";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import { TailSpin } from "react-loader-spinner";
// import UserDetails from "./components/UserDetails";
// import FormContainer from "./components/FormContainer";
// import "./App.css";

// const apiStatusConstants = {
//   initial: "INITIAL",
//   success: "SUCCESS",
//   failure: "FAILURE",
//   inProgress: "IN_PROGRESS",
// };

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.tableContainerRef = React.createRef();
//     this.state = {
//       userList: [],
//       apiStatus: apiStatusConstants.initial,
//       isFormVisible: false,
//       selectedUserDetails: null,
//       isAddingUser: false,
//       page: 1,
//       hasMore: true,
//       isLoading: false,
//     };
//   }

//   componentDidMount() {
//     console.log(this.tableContainerRef.current);
//     this.getUserList();
//     this.tableContainerRef.current?.addEventListener("scroll", this.handleScroll);
//   }

//   componentWillUnmount() {
//     this.tableContainerRef.current?.removeEventListener("scroll", this.handleScroll);
//   }

//   handleScroll = () => {
//     console.log("scroll detected");
//     const container = this.tableContainerRef.current;
//     const { hasMore, isLoading, apiStatus } = this.state;
//     if (!container || !hasMore || isLoading || apiStatus === apiStatusConstants.inProgress) {
//       return;
//     }

//     const { scrollTop, scrollHeight, clientHeight } = container;
//     if (scrollHeight - scrollTop - clientHeight <50) {
//       console.log(clientHeight);
//       this.loadMoreUsers();
//     }
//   };

//   getUserList = async () => {
//     const { page, isLoading } = this.state;
    
//     if (isLoading) return;

//     this.setState({ 
//       isLoading: true,
//       apiStatus: apiStatusConstants.inProgress 
//     });

    

//     try {
//       const apiUrl = process.env.REACT_APP_API_URL;
//       console.log(`${apiUrl}/users?_page=${page}&_limit=5`);
//       const response = await fetch(`${apiUrl}/users?_page=${page}&_limit=5`);
//       if (response.ok) {
//         const data = await response.json();
        
//         const updatedData = data.map((user) => ({
//           id: user.id,
//           firstName: user.firstname,
//           lastName: user.lastname,
//           email: user.email,
//           department: user.department,
//         }));

//         this.setState((prevState) => ({
//           userList: page === 1 ? updatedData : [...prevState.userList, ...updatedData],
//           apiStatus: apiStatusConstants.success,
//           hasMore: updatedData.length > 0,
//           isLoading: false
//         }));
//       } else {
//         this.setState({ 
//           apiStatus: apiStatusConstants.failure,
//           isLoading: false,
//           hasMore:false 
//         });
//       }
//     } catch (error) {
//       console.log("Error fetching data:", error);
//       this.setState({ 
//         apiStatus: apiStatusConstants.failure,
//         isLoading: false 
//       });
//     }
//   };

//   loadMoreUsers = () => {
//     console.log("load more initiated");
//     this.setState(
//       (prevState) => ({
//         page: prevState.page + 1,
//       }),
//       () => this.getUserList()
//     );
//   };

//   onSaveUserDetails = async (updateduserData) => {
//     if (!updateduserData) {
//       this.setState({
//         isFormVisible: false,
//         selectedUserDetails: null,
//         isAddingUser: false,
//       });
//       return;
//     }

//     const { isAddingUser } = this.state;
//     const apiUrl = process.env.REACT_APP_API_URL;

//     try {
//       const options = {
//         method: isAddingUser ? "POST" : "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: updateduserData.id,
//           firstname: updateduserData.firstName,
//           lastname: updateduserData.lastName,
//           email: updateduserData.email,
//           department: updateduserData.department,
//         }),
//       };

//       const url = isAddingUser
//         ? `${apiUrl}/users`
//         : `${apiUrl}/users/${this.state.selectedUserDetails.id}`;

//       const response = await fetch(url, options);
//       if (response.ok) {
//         this.setState({
//           isFormVisible: false,
//           selectedUserDetails: null,
//           isAddingUser: false,
//           page: 1,
//           userList: [],
//           hasMore: true,
//           isLoading: false
//         }, () => this.getUserList());
//       }
//     } catch (error) {
//       console.error("Error saving user:", error);
//     }
//   };

//   showAddUserForm = () => {
//     this.setState({
//       isFormVisible: true,
//       isAddingUser: true,
//       selectedUserDetails: {
//         id: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         department: "",
//       },
//     });
//   };

//   editUserDetails = (id) => {
//     const { userList } = this.state;
//     const filteredUser = userList.find((user) => user.id === id);
//     this.setState({
//       isFormVisible: true,
//       isAddingUser: false,
//       selectedUserDetails: filteredUser,
//     });
//   };

//   deleteUserDetails = async (id) => {
//     try {
//       const apiUrl = process.env.REACT_APP_API_URL;
//       const response = await fetch(`${apiUrl}/users/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         this.setState({
//           page: 1,
//           userList: [],
//           hasMore: true,
//           isLoading: false
//         }, () => this.getUserList());
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   renderUserListSuccess = () => {
//     const { userList } = this.state;
//     return (
//       <tbody className="user-list-container">
//         {userList.map((eachUser) => (
//           <UserDetails
//             key={eachUser.id}
//             userDetails={eachUser}
//             editUserDetails={this.editUserDetails}
//             deleteUserDetails={this.deleteUserDetails}
//           />
//         ))}
//       </tbody>
//     );
//   };

//   renderUserListInProgress = () => (
//     <tbody>
//       <tr className="loader-container" testid="loader">
//         <td colSpan="6">
//           <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
//         </td>
//       </tr>
//     </tbody>
//   );

//   renderUserListFailure = () => (
//     <tbody>
//       <tr>
//         <td colSpan="6">
//           <h1 className="failure-text">
//             Something went wrong, Please try again.
//           </h1>
//         </td>
//       </tr>
//     </tbody>
//   );

//   renderUserListBody = () => {
//     const { apiStatus, isLoading, userList } = this.state;
    
//     return (
//       <>
//         <tbody className="user-list-container">
//           {userList.map((eachUser) => (
//             <UserDetails
//               key={eachUser.id}
//               userDetails={eachUser}
//               editUserDetails={this.editUserDetails}
//               deleteUserDetails={this.deleteUserDetails}
//             />
//           ))}
//         </tbody>
//         {(apiStatus === apiStatusConstants.inProgress || isLoading) && (
//           <tbody>
//             <tr className="loader-container" testid="loader">
//               <td colSpan="6">
//                 <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
//               </td>
//             </tr>
//           </tbody>
//         )}
//         {apiStatus === apiStatusConstants.failure && (
//           <tbody>
//             <tr>
//               <td colSpan="6">
//                 <h1 className="failure-text">
//                   Something went wrong, Please try again.
//                 </h1>
//               </td>
//             </tr>
//           </tbody>
//         )}
//       </>
//     );
//   };

//   render() {
//     const { isFormVisible, selectedUserDetails, isAddingUser } = this.state;
//     return (
//       <div className="App">
//         <header>
//           <h1 className="user-list-heading">Users List</h1>
//           <button
//             type="button"
//             className="add-user-button"
//             onClick={this.showAddUserForm}
//           >
//             <HiOutlineUserAdd className="adduserLogo" />
//             Add User
//           </button>
//         </header>

//         <section className="user-list-table" ref={this.tableContainerRef}>
//             <div>
//           <table>
//             <thead>
//               <tr className="table-headings-row">
//                 <th className="table-headings">ID</th>
//                 <th className="table-headings">FIRST NAME</th>
//                 <th className="table-headings">LAST NAME</th>
//                 <th className="table-headings">EMAIL</th>
//                 <th className="table-headings">DEPARTMENT</th>
//                 <th className="table-headings">ACTIONS</th>
//               </tr>
//             </thead>
//             {this.renderUserListBody()}
//           </table>
//           </div>
//         </section>

//         {isFormVisible && (
//           <FormContainer
//             filteredUser={selectedUserDetails}
//             onSaveUserDetails={this.onSaveUserDetails}
//             isAddingUser={isAddingUser}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;





































































// //  working code-2

// import React, { Component } from "react";
// import { HiOutlineUserAdd } from "react-icons/hi";
// import { TailSpin } from "react-loader-spinner";
// import UserDetails from "./components/UserDetails";
// import FormContainer from "./components/FormContainer";
// import "./App.css";

// const apiStatusConstants = {
//   initial: "INITIAL",
//   success: "SUCCESS",
//   failure: "FAILURE",
//   inProgress: "IN_PROGRESS",
// };

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.tableContainerRef = React.createRef();
//     this.state = {
//       userList: [],
//       apiStatus: apiStatusConstants.initial,
//       isFormVisible: false,
//       selectedUserDetails: null,
//       isAddingUser: false,
//       page: 1,
//       hasMore: true,
//       isLoading: false,
//     };
//   }

//   componentDidMount() {
//     this.getUserList();
//     this.tableContainerRef.current?.addEventListener("scroll", this.handleScroll);
//   }

//   componentWillUnmount() {
//     this.tableContainerRef.current?.removeEventListener("scroll", this.handleScroll);
//     if (this.scrollTimeout) {
//       clearTimeout(this.scrollTimeout);
//     }
//   }

//   handleScroll = () => {
//     const container = this.tableContainerRef.current;
//     if (!container) return;

//     const { scrollTop, clientHeight, scrollHeight } = container;
//     const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

//     const { hasMore, isLoading } = this.state;

//     if (scrolledToBottom && hasMore && !isLoading) {
//       this.loadMoreUsers();
//     }
//   };

//   getUserList = async () => {
//     const { page, isLoading, hasMore } = this.state;

//     if (isLoading || !hasMore) return;

//     this.setState({
//       isLoading: true,
//       apiStatus: apiStatusConstants.inProgress
//     });

//     try {
//       const apiUrl = process.env.REACT_APP_API_URL;
//       const response = await fetch(`${apiUrl}/users?_page=${page}&_limit=5`);
      
//       if (response.ok) {
//         const data = await response.json();

//         // Check if we received any data
//         if (data.length === 0) {
//           this.setState({
//             hasMore: false,
//             isLoading: false,
//             apiStatus: apiStatusConstants.success
//           });
//           return;
//         }

//         const updatedData = data.map((user) => ({
//           id: user.id,
//           firstName: user.firstname,
//           lastName: user.lastname,
//           email: user.email,
//           department: user.department,
//         }));

//         this.setState((prevState) => ({
//           userList: page === 1 ? updatedData : [...prevState.userList, ...updatedData],
//           apiStatus: apiStatusConstants.success,
//           isLoading: false,
//           hasMore: data.length === 5 // If we got less than 5 items, there's no more data
//         }));
//       } else {
//         this.setState({
//           apiStatus: apiStatusConstants.failure,
//           isLoading: false,
//           hasMore: false
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       this.setState({
//         apiStatus: apiStatusConstants.failure,
//         isLoading: false,
//         hasMore: false
//       });
//     }
//   };

//   loadMoreUsers = () => {
//     this.setState(
//       (prevState) => ({
//         page: prevState.page + 1,
//       }),
//       () => this.getUserList()
//     );
//   };

//   onSaveUserDetails = async (updateduserData) => {
//     if (!updateduserData) {
//       this.setState({
//         isFormVisible: false,
//         selectedUserDetails: null,
//         isAddingUser: false,
//       });
//       return;
//     }

//     const { isAddingUser } = this.state;
//     const apiUrl = process.env.REACT_APP_API_URL;

//     try {
//       const options = {
//         method: isAddingUser ? "POST" : "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: updateduserData.id,
//           firstname: updateduserData.firstName,
//           lastname: updateduserData.lastName,
//           email: updateduserData.email,
//           department: updateduserData.department,
//         }),
//       };

//       const url = isAddingUser
//         ? `${apiUrl}/users`
//         : `${apiUrl}/users/${this.state.selectedUserDetails.id}`;

//       const response = await fetch(url, options);
//       if (response.ok) {
//         this.setState({
//           isFormVisible: false,
//           selectedUserDetails: null,
//           isAddingUser: false,
//           page: 1,
//           userList: [],
//           hasMore: true,
//           isLoading: false
//         }, () => this.getUserList());
//       }
//     } catch (error) {
//       console.error("Error saving user:", error);
//     }
//   };

//   showAddUserForm = () => {
//     this.setState({
//       isFormVisible: true,
//       isAddingUser: true,
//       selectedUserDetails: {
//         id: "",
//         firstName: "",
//         lastName: "",
//         email: "",
//         department: "",
//       },
//     });
//   };

//   editUserDetails = (id) => {
//     const { userList } = this.state;
//     const filteredUser = userList.find((user) => user.id === id);
//     this.setState({
//       isFormVisible: true,
//       isAddingUser: false,
//       selectedUserDetails: filteredUser,
//     });
//   };

//   deleteUserDetails = async (id) => {
//     try {
//       const apiUrl = process.env.REACT_APP_API_URL;
//       const response = await fetch(`${apiUrl}/users/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         this.setState({
//           page: 1,
//           userList: [],
//           hasMore: true,
//           isLoading: false
//         }, () => this.getUserList());
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   renderUserListSuccess = () => {
//     const { userList } = this.state;
//     return (
//       <tbody className="user-list-container">
//         {userList.map((eachUser) => (
//           <UserDetails
//             key={eachUser.id}
//             userDetails={eachUser}
//             editUserDetails={this.editUserDetails}
//             deleteUserDetails={this.deleteUserDetails}
//           />
//         ))}
//       </tbody>
//     );
//   };

//   renderUserListInProgress = () => (
//     <tbody>
//       <tr className="loader-container" testid="loader">
//         <td colSpan="6">
//           <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
//         </td>
//       </tr>
//     </tbody>
//   );

//   renderUserListFailure = () => (
//     <tbody>
//       <tr>
//         <td colSpan="6">
//           <h1 className="failure-text">
//             Something went wrong, Please try again.
//           </h1>
//         </td>
//       </tr>
//     </tbody>
//   );

//   renderUserListBody = () => {
//     const { apiStatus, isLoading, userList } = this.state;

//     return (
//       <>
//         <tbody className="user-list-container">
//           {userList.map((eachUser) => (
//             <UserDetails
//               key={eachUser.id}
//               userDetails={eachUser}
//               editUserDetails={this.editUserDetails}
//               deleteUserDetails={this.deleteUserDetails}
//             />
//           ))}
//         </tbody>
//         {(apiStatus === apiStatusConstants.inProgress || isLoading) && (
//           <tbody>
//             <tr className="loader-container" testid="loader">
//               <td colSpan="6">
//                 <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
//               </td>
//             </tr>
//           </tbody>
//         )}
//         {apiStatus === apiStatusConstants.failure && (
//           <tbody>
//             <tr>
//               <td colSpan="6">
//                 <h1 className="failure-text">
//                   Something went wrong, Please try again.
//                 </h1>
//               </td>
//             </tr>
//           </tbody>
//         )}
//       </>
//     );
//   };

//   render() {
//     const { isFormVisible, selectedUserDetails, isAddingUser } = this.state;
//     return (
//       <div className="App">
//         <header>
//           <h1 className="user-list-heading">Users List</h1>
//           <button
//             type="button"
//             className="add-user-button"
//             onClick={this.showAddUserForm}
//           >
//             <HiOutlineUserAdd className="adduserLogo" />
//             Add User
//           </button>
//         </header>

//         <section className="user-list-table" ref={this.tableContainerRef}>
//           <div>
//             <table>
//               <thead>
//                 <tr className="table-headings-row">
//                   <th className="table-headings">ID</th>
//                   <th className="table-headings">FIRST NAME</th>
//                   <th className="table-headings">LAST NAME</th>
//                   <th className="table-headings">EMAIL</th>
//                   <th className="table-headings">DEPARTMENT</th>
//                   <th className="table-headings">ACTIONS</th>
//                 </tr>
//               </thead>
//               {this.renderUserListBody()}
//             </table>
//           </div>
//         </section>

//         {isFormVisible && (
//           <FormContainer
//             filteredUser={selectedUserDetails}
//             onSaveUserDetails={this.onSaveUserDetails}
//             isAddingUser={isAddingUser}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;


























































// Final-working-code


import React, { Component } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { TailSpin } from "react-loader-spinner";
import UserDetails from "./components/UserDetails";
import FormContainer from "./components/FormContainer";
import "./App.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.tableContainerRef = React.createRef();
    this.state = {
      userList: [],
      apiStatus: apiStatusConstants.initial,
      isFormVisible: false,
      selectedUserDetails: null,
      isAddingUser: false,
      page: 1,
      hasMore: true,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getUserList();
    this.tableContainerRef.current?.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.tableContainerRef.current?.removeEventListener("scroll", this.handleScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  handleScroll = () => {
    const container = this.tableContainerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight, scrollHeight } = container;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight-50;

    const { hasMore, isLoading } = this.state;

    if (scrolledToBottom && hasMore && !isLoading) {
      this.loadMoreUsers();
    }
  };

  getUserList = async () => {
    const { page, isLoading, hasMore } = this.state;

    if (isLoading || !hasMore) return;

    this.setState({
      isLoading: true,
      apiStatus: apiStatusConstants.inProgress
    });

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/users?_page=${page}&_limit=5`);
      
      if (response.ok) {
        const data = await response.json();

        // Check if we received any data
        if (data.length === 0) {
          this.setState({
            hasMore: false,
            isLoading: false,
            apiStatus: apiStatusConstants.success
          });
          return;
        }

        const updatedData = data.map((user) => ({
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          department: user.department,
        }));

        this.setState((prevState) => ({
          userList: page === 1 ? updatedData : [...prevState.userList, ...updatedData],
          apiStatus: apiStatusConstants.success,
          isLoading: false,
          hasMore: data.length === 5 // If we got less than 5 items, there's no more data
        }));
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          isLoading: false,
          hasMore: false
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({
        apiStatus: apiStatusConstants.failure,
        isLoading: false,
        hasMore: false
      });
    }
  };

  loadMoreUsers = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => this.getUserList()
    );
  };

  onSaveUserDetails = async (updateduserData) => {
    if (!updateduserData) {
      this.setState({
        isFormVisible: false,
        selectedUserDetails: null,
        isAddingUser: false,
      });
      return;
    }

    const { isAddingUser } = this.state;
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const options = {
        method: isAddingUser ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updateduserData.id,
          firstname: updateduserData.firstName,
          lastname: updateduserData.lastName,
          email: updateduserData.email,
          department: updateduserData.department,
        }),
      };

      const url = isAddingUser
        ? `${apiUrl}/users`
        : `${apiUrl}/users/${this.state.selectedUserDetails.id}`;

      const response = await fetch(url, options);
      if (response.ok) {
        this.setState({
          isFormVisible: false,
          selectedUserDetails: null,
          isAddingUser: false,
          page: 1,
          userList: [],
          hasMore: true,
          isLoading: false
        }, () => this.getUserList());
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  showAddUserForm = () => {
    this.setState({
      isFormVisible: true,
      isAddingUser: true,
      selectedUserDetails: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      },
    });
  };

  editUserDetails = (id) => {
    const { userList } = this.state;
    const filteredUser = userList.find((user) => user.id === id);
    this.setState({
      isFormVisible: true,
      isAddingUser: false,
      selectedUserDetails: filteredUser,
    });
  };

  deleteUserDetails = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        this.setState({
          page: 1,
          userList: [],
          hasMore: true,
          isLoading: false
        }, () => this.getUserList());
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  renderUserListSuccess = () => {
    const { userList } = this.state;
    return (
      <tbody className="user-list-container">
        {userList.map((eachUser) => (
          <UserDetails
            key={eachUser.id}
            userDetails={eachUser}
            editUserDetails={this.editUserDetails}
            deleteUserDetails={this.deleteUserDetails}
          />
        ))}
      </tbody>
    );
  };

  renderUserListInProgress = () => (
    <tbody>
      <tr className="loader-container" testid="loader">
        <td colSpan="6">
          <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
        </td>
      </tr>
    </tbody>
  );

  renderUserListFailure = () => (
    <tbody>
      <tr>
        <td colSpan="6">
          <h1 className="failure-text">
            Something went wrong, Please try again.
          </h1>
        </td>
      </tr>
    </tbody>
  );

  renderUserListBody = () => {
    const { apiStatus, isLoading, userList } = this.state;

    return (
      <>
        <tbody className="user-list-container">
          {userList.map((eachUser) => (
            <UserDetails
              key={eachUser.id}
              userDetails={eachUser}
              editUserDetails={this.editUserDetails}
              deleteUserDetails={this.deleteUserDetails}
            />
          ))}
        </tbody>
        {(apiStatus === apiStatusConstants.inProgress || isLoading) && (
          <tbody>
            <tr className="loader-container" testid="loader">
              <td colSpan="6">
                <TailSpin type="TailSpin" color="#0284c7" height={60} width={100} />
              </td>
            </tr>
          </tbody>
        )}
        {apiStatus === apiStatusConstants.failure && (
          <tbody>
            <tr>
              <td colSpan="6">
                <h1 className="failure-text">
                  Something went wrong, Please try again.
                </h1>
              </td>
            </tr>
          </tbody>
        )}
      </>
    );
  };

  render() {
    const { isFormVisible, selectedUserDetails, isAddingUser } = this.state;
    return (
      <div className="App">
        <header>
          <h1 className="user-list-heading">Users List</h1>
          <button
            type="button"
            className="add-user-button"
            onClick={this.showAddUserForm}
          >
            <HiOutlineUserAdd className="adduserLogo" />
            Add User
          </button>
        </header>

        <section className="user-list-table">
          <div ref={this.tableContainerRef}>
            <table>
              <thead>
                <tr className="table-headings-row">
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
          </div>
        </section>

        {isFormVisible && (
          <FormContainer
            filteredUser={selectedUserDetails}
            onSaveUserDetails={this.onSaveUserDetails}
            isAddingUser={isAddingUser}
          />
        )}
      </div>
    );
  }
}

export default App;