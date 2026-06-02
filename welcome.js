let wlcmbtn = document.getElementById("wlcbtn");
let usernameInput = document.getElementById("user-name");

wlcmbtn.addEventListener('click' , function(){

    const sanitizedName = usernameInput.value.trim();

    if (sanitizedName !== "")
        { 
            localStorage.setItem("penny_user",sanitizedName);
            window.location.href = "expense.html";
        }
   else{
    alert("Please Enter Name First");
   }
   
})