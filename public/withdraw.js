function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  const ctx = React.useContext(UserContext);
  let newBalance = props.setBalance;
  return(<>
    <h5>Success</h5>
    <p>Your balance is {newBalance}</p>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const ctx = React.useContext(UserContext);
  const [withdraw, setWithdraw] = React.useState('');
  let balance = ctx.users[0].balance;
  const email = ctx.users[0].email;
  console.log(ctx);
  // const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  // function handle(){
  //   fetch(`/account/update/${email}/${amount}`)
  //   .then(response => response.text())
  //   .then(text => {
  //       try {
  //           const data = JSON.parse(text);
  //           props.setStatus(JSON.stringify(data.value));
  //           props.setShow(false);
  //           console.log('JSON:', data);
  //       } catch(err) {
  //           props.setStatus('Deposit failed')
  //           console.log('err:', text);
  //       }
  //   });
  // }
  function handle(){
    console.log(email, balance);     
    
    // if (!validate(isNaN(deposit),     'Enter numbers only'))     return;
    // if (!validate((deposit < 0),     'Enter positive value'))     return;

    // //find current balance
    const url = `account/findone/${email}`;
    
    (async () => {

      //find current balance
      let resFind = await fetch(url);
      console.log(resFind);
      let dataFind = await resFind.json();
      console.log(dataFind);

      
      let currentBalance = dataFind.balance;        
      console.log(currentBalance);
      let newBalance = Number(currentBalance)- Number(deposit);        
      console.log(newBalance);
      ctx.users[0].balance = newBalance;

      //update current balance
      const urlUpdate = `account/update/${email}/${newBalance}`;
      let resDeposit = await fetch(urlUpdate);
      let dataDeposit = await resDeposit.json(); 
      console.log(dataDeposit);

    })(fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    }));  
      props.setBalance
    props.setShow(false);
  }    

  return(<>

<p><b>User: </b>{email}</p>
      <p><b>Balance: </b>{balance}</p>  
  
      Withdraw<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter withdraw amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}/><br/>
          
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Withdraw Money</button>
  
    
      </>);
    }