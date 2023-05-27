import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/authService';

const Signup = () => {
   const [newUser, setNewUser] = useState({
      email: '',
      password: '',
      fullName: '',
      adminKey: '',
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
      setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      post('/auth/signup', newUser)
         .then((response) => {
            console.log('FRONTEND SIGNUP: ', response.data);
            navigate('/login');
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className="row justify-content-center space-above">
               <div className="col-4">
                  <div className="form-floating">
                     <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Please enter email."
                        value={newUser.email}
                        onChange={handleChange}
                     />
                     <label htmlFor="email">Email</label>
                  </div>
               </div>
            </div>

            <div className="row justify-content-center space-above">
               <div className="col-4">
                  <div className="form-floating">
                     <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Please enter password"
                        value={newUser.password}
                        onChange={handleChange}
                     />
                     <label htmlFor="password">Password</label>
                  </div>
               </div>
            </div>

            <div className="row justify-content-center space-above">
               <div className="col-4">
                  <div className="form-floating">
                     <input
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Please enter full name."
                        value={newUser.fullName}
                        onChange={handleChange}
                     />
                     <label htmlFor="fullName">Full Name</label>
                  </div>
               </div>
            </div>

            <div className="row justify-content-center space-above">
               <div className="col-4">
                  <div className="form-floating">
                     <input
                        className="form-control"
                        id="adminKey"
                        name="adminKey"
                        type="password"
                        placeholder="Please enter admin key."
                        value={newUser.adminKey}
                        onChange={handleChange}
                     />
                     <label htmlFor="adminKey">Admin Key</label>
                  </div>
                  <p>Testing key: 7QlY8Pz1&4*rF2v$k0N5Bw@3</p>
               </div>
            </div>

            <div className="row justify-content-center space-above">
               <div className="col-1">
                  <button className="btn btn-light btn-outline-success" type="submit">
                     Signup
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Signup;
