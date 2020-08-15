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
        <li> <Link to="profile"  style={{color:"red",padding:"0px"}}>Profile</Link></li>,
        <li  > <Link to="create"  >Upload</Link></li>,
        <li key="4"><Link to="/myfollowingpost" >following</Link></li>,
        <li style={{color:"red",padding:"0px"}}  
         > 
        
        <button className="btn waves-effect  waves-light #e53935 red darken-1" onClick={()=>{localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin')
        }} >
          
          Logout
    
        </button>
        
        
        </li>,
       
       

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








