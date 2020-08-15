import React ,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {userContext} from '../App';

function Navbar() {
  const {state,dispatch}=useContext(userContext);
  const history=useHistory()
const renderList=()=>{
  if(state){
return [
  <>
        <li> <Link to="profile">Profile</Link></li>,
        <li> <Link to="create">Upload</Link></li>,
        <li key="4"><Link to="/myfollowingpost">following</Link></li>,
        <li style={{color:"red"}}   onClick={()=>{localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin')
        }} > <Link to="profile" >Logout</Link></li>,
       
       

        </>

]

  }

  else{
 return [

        <li> <Link to="/signin">Login</Link></li>,
        <li> <Link to="signup">Signup</Link></li>
      

 ]
  }
}
  return (
     <nav>
    <div className="nav-wrapper white">
    <Link to={state?"/":'/signin'} className="brand-logo left ">M</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
  </nav>
        );
}
export default Navbar;








