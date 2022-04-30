function showOptions(){
    var options = document.getElementById("category").value;
    return options;
}
async function saveExpense(event){
    event.preventDefault();
    const expenseA = event.target.expenseA.value;
    const expenseD = event.target.expenseD.value;
    const category = event.target.category.value;

    const expenses={
        ExpenseAmount:expenseA,
        ExpenseDiscription:expenseD,
        ExpenseCategory:category
    }
    const post = axios.post('https://crudcrud.com/api/0eee76d341ac400d8eff0868a5bb9c5c/appointmentdata',expenses)
            try{
                let response = await post;
                showExpenseOnScreen(response.data);
                console.log(response)
            }catch(err){
                console.log(err)
            }


}
window.addEventListener("DOMContentLoaded",async () =>{
    const get = axios.get('https://crudcrud.com/api/0eee76d341ac400d8eff0868a5bb9c5c/appointmentdata',this.expenses)
    try{
        let response = await get;
        for(var i=0;i<response.data.length;i++){
            showExpenseOnScreen(response.data[i]);
        }
    }catch(err){
        console.log(err);
    }
})

function showExpenseOnScreen(user){
    parentNode=document.getElementById("enteredExpenses");
    childhtml=`<li id=${user._id}>${user.ExpenseAmount} | ${user.ExpenseDiscription} | ${user.ExpenseCategory}
        <button onclick=deletedata('${user._id}')>Delete</button>
        <button onclick=editdata('${user.ExpenseAmount}','${user.ExpenseDiscription}','${user.ExpenseCategory}','${user._id}')>Edit</button>
        </li>`
    parentNode.innerHTML=parentNode.innerHTML+childhtml
}
function editdata(expenseA,expenseD,category,userid){
    document.getElementById('expenseA').value = expenseA;
    document.getElementById('expenseD').value = expenseD;
    document.getElementById('category').value = category;
    deletedata(userid);
}
async function deletedata(enteredExpenses){
    const delete1=axios.delete(`https://crudcrud.com/api/0eee76d341ac400d8eff0868a5bb9c5c/appointmentdata/${enteredExpenses}`)
    try{
        const response = await delete1;
        removefromScreen(enteredExpenses);
    }catch(err){
        console.log(err);
    }

}
function removefromScreen(enteredExpenses){
    parentNode=document.getElementById('enteredExpenses');
    childtoberemoved=document.getElementById(enteredExpenses);
    parentNode.removeChild(childtoberemoved);
}
