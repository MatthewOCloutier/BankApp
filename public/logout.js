function Logout(props){
    return (   
        
        <>
        <Card
          bgcolor="secondary"
          header="Logout"
          status=''
          body={<>
                
                <p>Lxxogout?</p>
                <a className="nav-link" href="#/login/"><button type="submit" 
                    className="btn btn-light" 
                    onClick={() => props.logOut()}>Yes</button></a>
                
                    
                    </>
                
          }        
        />
        
    </>
      
      );  
}
