
function Login(props){
  const ctx = React.useContext(UserContext); // const [user, setUser] = React.useState('');
const [show, setShow]     = React.useState(true);
const [status, setStatus] = React.useState(''); 
const [balance, setBalance] = React.useState('');
const [information, setInformation] = React.useState({});

let setNav = props.logIn;
let setUser = props.logIn;
ctx.users[0] = information;
console.log('updated', ctx.users[0]);
return (
  
  <Card
    bgcolor="secondary"
    header="Login"
    status={status}
    body={show ? 
      <LoginForm setInformation={setInformation} setShow={setShow} setStatus={setStatus} logIn={setNav && setUser}/> :
      <LoginMsg information={information} setShow={setShow} setStatus={setStatus} setBalance={setBalance}/>}
  />
) 
}

function LoginMsg(props){
const ctx = React.useContext(UserContext); 
console.log({props});
let thisUser = props.information.name;
let thisBalance = props.information.balance;
ctx.users[0] = props.information;
console.log(ctx.users[0]);
// currentUser = setCurrentUser
return(<>
  <h5>Welcome {thisUser}!</h5>

<p>Funds: ${thisBalance}</p>
</>);
}


function LoginForm(props){
const [email, setEmail]       = React.useState('');
const [password, setPassword] = React.useState('');
const ctx = React.useContext(UserContext); 
// const [data, setData] = React.useState('');
// const [balance, setBalance] = React.useState('');
function handle(){
  console.log(email, password);
  // fetch(`/account/login/${email}/${password}`)
  // .then(response => response.text())
  // .then(text => {
  //     try {
  //         const data = JSON.parse(text);
  //         props.setStatus(data.name);
  //         props.setShow(false);
  //         props.logIn();
  //         console.log('JSON',data);
  //               console.log("🥶", data.balance);                
  //     } catch(err) {
  //      props.setStatus(text.name);
  //     console.log('err', text);
  //     }   
  //   });
   
   const url = `/account/findone/${email}`;
  //  let passCheck = 0;
   
 async function getData () {
   let findings = await fetch(url);
     const info = await findings.json();
   let  thisUser = info.name;
    let thisPassword = info.password;
    let thisBalance = info.balance;
    let thisEmail = info.email;
      console.log(info);

      if (thisPassword == password){
        console.log("pwrd 👍")
      
        ctx.users[0].name = thisUser;
        ctx.users[0].password = thisPassword;
        ctx.users[0].balance = thisBalance;
        ctx.users[0].email = thisEmail;
        
        props.logIn();
      
        console.log(ctx.users[0])
        props.setShow(false);
       
      }else{
        props.setStatus('user not found');
        setEmail('');
        setPassword('');
        console.log(_err);
       return
      }
      return info;
   };
   
getData().then((info) => {
  console.log({info}); 
  props.setInformation(info);
})
} 
 
  
return (

<>

  Email<br/>
  <input type="input" 
    className="form-control" 
    placeholder="Enter email" 
    value={email} 
    onChange={e => setEmail(e.currentTarget.value)}/><br/>

  Password<br/>
  <input type="password" 
    className="form-control" 
    placeholder="Enter password" 
    value={password} 
    onChange={e => setPassword(e.currentTarget.value)}/><br/>

  <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
 
</>);


}


