async function getPost(){
    try{
        const response = await fetch('http://localhost:3001/all/img');
      
        console.log( response)
      
        if(!response.ok){
            throw new Error(`failed to fetch:${response.status}`)
        } 
        return  response.json();
    
       

    }
   catch(err){
       console.log(err)
   }
}

getPost()