
function CreateAccount(props) {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [information, setInformation] = React.useState('');
  console.log(information);
  let setNav = props.logIn;
  let setUser = props.logIn;
  let setPage = props.Login;

  return (

    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ?
        <CreateForm setShow={setShow} setInformation={setInformation} setStatus={setStatus} logIn={setNav && setUser} /> :
        <CreateMsg setShow={setShow} setPage={setPage} setStatus={setStatus} information={information} />}
    />
  )
}

function CreateMsg(props) {
  const ctx = React.useContext(UserContext);
 let information = React.useState(ctx);
  console.log({ props });

  console.log(information.users);
  ctx.users[0] = props.information;
  console.log(ctx.users[0]);
  console.log(information[0].users[0]);
let user;
  return (<>
    <h5>Success {user}!</h5>
   <p>Login to continue</p>
  </>);
}

function CreateForm(props) {
  const ctx = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
      
  function handle() {
    
    console.log(name, email, password);
            console.log(name)
      const url = `/account/create/${name}/${email}/${password}`;

        async function getData() {       
      var findings = await fetch(url);
      let info = [];
     info = await findings.json();
      console.log(info);
      console.log(thisUser);
      let thisUser = info.name;
      let thisPassword = info.password;
      let thisBalance = info.balance;
      let thisEmail = info.email; 
 
 
     if(info = findings){
info = ctx;
      
   
        ctx.users[0].name = thisUser;
        ctx.users[0].password = thisPassword;
        ctx.users[0].balance = thisBalance;
        ctx.users[0].email = thisEmail;
        console.log(thisEmail);
        props.logIn();
        props.setShow(false)
        props.setStatus("udrt");
      } else {
        props.setStatus("user exists");
        console.log(info);
       
        props.setShow('');
      }

      return info;
    };
    getData().then((info) => {
      console.log(info);
      props.setInformation(info); 
    })
  }
 
  return (<>

    Name<br />
    <input type="input"
      className="form-control"
      placeholder="Enter name"
      value={name}
      onChange={e => setName(e.currentTarget.value)} /><br />

    Email address<br />
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)} /><br />

    Password<br />
    <input type="password"
      className="form-control"
      placeholder="Enter password"
      value={password}
      onChange={e => setPassword(e.currentTarget.value)} /><br />

    <button type="submit"
      className="btn btn-light"
      onClick={handle} href="/login">Create Account</button>

  </>);
}
