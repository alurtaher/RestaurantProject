let apiUrl='https://crudcrud.com/api/8fd17d39dedd480194541498db5880f3';
let btn=document.querySelector("button")
let form=document.querySelector("#my-form")
let table1Orders = document.querySelector("#table1-orders"); 
let table2Orders = document.querySelector("#table2-orders"); 
let table3Orders = document.querySelector("#table3-orders"); 

document.addEventListener("DOMContentLoaded",()=>{
    
    // For displaying all the table 1 content
    axios.get(`${apiUrl}/Table1`)
    .then((response)=>{
        for(let i=0;i<response.data.length;i++)showUserOnScreen(response.data[i])      
    })
    .catch((error)=>console.log(error))

     // For displaying all the table 2 content
     axios.get(`${apiUrl}/Table2`)
     .then((response)=>{
         for(let i=0;i<response.data.length;i++)showUserOnScreen(response.data[i])      
     })
     .catch((error)=>console.log(error))

      // For displaying all the table 3 content
    axios.get(`${apiUrl}/Table3`)
    .then((response)=>{
        for(let i=0;i<response.data.length;i++)showUserOnScreen(response.data[i])      
    })
    .catch((error)=>console.log(error))

})

btn.addEventListener("click",(event)=>{
        event.preventDefault();
        let dishName = document.querySelector("#dish-name").value;
        let price =document.querySelector("#price").value;
        let table = document.querySelector("#table").value;

        let obj={
            DishName:dishName,
            Price:price,
            TableNumber:table
        }
        axios.post(`${apiUrl}/${table}`,obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            form.reset();
        })
        .catch(((error)=>console.log(error)));
})

function showUserOnScreen(user){
    let li = document.createElement('li');
    li.setAttribute('data-id', user._id); // Add a custom attribute to uniquely identify the li element
    let details = document.createTextNode(`${user.DishName} : ${user.Price}  :${user.TableNumber} `);
    let dltItem = document.createElement('input');
    dltItem.type = 'button';
    dltItem.value = "Delete Item";
    dltItem.onclick=()=>{
        axios.delete(`${apiUrl}/${user.TableNumber}/${user._id}`)
        li.remove();
    }
    li.style.margin="10px"
    dltItem.style.background="red"
    dltItem.style.color="yellow"
    li.appendChild(details)
    li.appendChild(dltItem)

    if(user.TableNumber==="Table1")table1Orders.appendChild(li);
    else if(user.TableNumber==="Table2")table2Orders.appendChild(li)
    else table3Orders.appendChild(li);
}