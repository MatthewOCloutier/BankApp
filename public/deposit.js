function Deposit(props) {

  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const information = React.useState(ctx);
  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? (
          <DepositForm
            setShow={setShow}
            setStatus={setStatus} />
        ) : (
          <DepositMsg
            setShow={setShow}
            setStatus={setStatus} />
          )}/>);}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
        >
        See Balance/Access Funds
      </button>
    </>
  );
}

        function DepositForm(props) {
          const ctx = React.useContext(UserContext);
          const [deposit, setDeposit] = React.useState('');
          let balance = ctx.users[0].balance;
          let email = ctx.users[0].email;
          console.log(ctx);
          console.log(ctx.users[0].email);
          console.log(balance);
         
                  function handle(){
    console.log(deposit, balance);   
    const url = `account/findone/${email}`;
    (async () => {
      //find current balance
      let resFind = await fetch(url);
      console.log(resFind);
      let dataFind = await resFind.json();
      console.log(dataFind);
      let currentBalance = dataFind.balance;  
      console.log(currentBalance);      
      let newBalance = Number(deposit) + Number(currentBalance); 
      ctx.users[0].balance = newBalance;
      console.log(newBalance);
      //update current balance
      const urlUpdate = `account/update/${email}/${newBalance}`;
      let resDeposit = await fetch(urlUpdate);
      let dataDeposit = await resDeposit.json(); 
      console.log(dataDeposit);
      console.log(newBalance);
    
    })();  
    
console.log(balance);
props.setShow(false);
}    
console.log(balance);
  return (
    <>
      <p>
        <b>User: {email}</b>
      </p>
      <p>
        <b>Balance: </b>{balance}</p>
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={deposit}
        onChange={(e) => setDeposit(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Process Funds
      </button>
    </>
  );
}
