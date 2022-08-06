
  function NavBar(props){
  // const [show, setShow] = React.useState(false);
     const ctx = React.useContext(UserContext);
      const [status, setStatus] = React.useState({});
   console.log(ctx.users);  
const information = React.useState(ctx)
console.log(information);
 let name = information[0].users[0].name;
  console.log(name);
  let balance = information[0].users[0].balance;
     let setNav =  props.count;
console.log(setNav);
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="bank.png" width="30" height="30" alt=""></img>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {setNav == 0 &&
              <> 
              <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
           
                <li className="nav-item">
                  <a className="nav-link" href="#/login/">Login</a>
                </li>  
              </>
            }
          </ul>          
            {setNav == 1 && 
            <> 
            <ul className="navbar-nav"> 
            <li className="nav-item">
                  <a className="nav-link" href="#/login/">Login</a>
                </li>             
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">Deposit/Withdraw</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/logout/">Logout</a>
              </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">All Data</a>
            </li>          
            </ul>   
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" status={status}>
                <a className="nav-link" href="#/logout/">{name} <br/> ${balance}</a>
              </li>
            </ul>            
            </>
            }          
        </div>
      </nav>
);
        }
 

  

