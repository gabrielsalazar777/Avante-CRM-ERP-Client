import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/authService';

const Login = () => {
   const { setUser, storeToken } = useContext(AuthContext);

   const [thisUser, setThisUser] = useState({
      email: '',
      password: '',
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
      setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      post('/auth/login', thisUser)
         .then((response) => {
            storeToken(response.data.authToken);
            setUser(response.data.user);
            navigate('/');
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
                        placeholder="Please enter registered email."
                        value={thisUser.email}
                        onChange={handleChange}
                     />
                     <label htmlFor="email">Email</label>
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
                           placeholder="Please enter account password."
                           value={thisUser.password}
                           onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center space-above">
               <div className="col-1">
                  <button className='btn btn-light btn-outline-success' type="submit">Login</button>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Login;
