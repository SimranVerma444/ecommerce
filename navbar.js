let mainframe = document.getElementById("main-frame");
let navBar=document.createElement("span");
mainframe.appendChild(navBar);


let homeBtn=document.createElement("button");
homeBtn.classList="border-2 m-5 w-100 rounded-lg text-white bg-blue-800";
homeBtn.innerText="HOME PAGE";
navBar.appendChild(homeBtn);
homeBtn.addEventListener("click",()=>{
    cartDiv.style.display="none";
    productBox.style.display="grid";
   
})

let cartBtn=document.createElement("button");
cartBtn.classList="border-2 w-100 rounded-lg text-white m-5 bg-blue-800";
cartBtn.innerText="MY CART";
navBar.appendChild(cartBtn);
cartBtn.addEventListener("click",()=>{
    productBox.style.display="none";
    cartDiv.style.display="grid";
})