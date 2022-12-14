

function Spa(props) {
  const ctx = React.useContext(UserContext);
  const [count, setCount] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState({});
  const [show, setShow] = React.useState(true);
  const [page, setPage] = React.useState(false);
  const [balance, setBalance] = React.useState('');



  function logIn() {
    setCount(1);

  }
  function logOut() {
    setCount(0);
  }
  function create() {
    handle(props);
  }
  function setUser(props){
    balance = information[0].users[0].balance;
    console.log(balance);
    setBalance(balance);
  }


  return (



    <HashRouter>

      <UserContext.Provider value={{ users: [{ name: '', email: '', password: '', balance: 0 }] }}>
        <NavBar count={count} currentUser={currentUser} logIn={logIn} show={show} />
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/"> <CreateAccount page={page} CreateAccount={create} count={count} logIn={logIn} currentUser={currentUser} /></Route>
          <Route path="/login/"> <Login count={count} logIn={logIn} currentUser={currentUser} /></Route>
          <Route path="/logout/"> <Logout count={count} logOut={logOut} /> </Route>
          <Route path="/deposit/"> <Deposit setUser={setUser} currentUser={currentUser} /></Route>
          <Route path="/withdraw/" component={Withdraw} />
          {/* <Route path="/transactions/" component={Transactions} /> */}
          <Route path="/balance/" component={Balance} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>

  )


};


ReactDOM.render(
  <Spa />,
  document.getElementById('root')
);
