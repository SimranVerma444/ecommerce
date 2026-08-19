
let cartDiv=document.createElement("div");
mainframe.appendChild(cartDiv);
cartDiv.classList="bg-pink-100 border-3 border-red-900 rounded-lg w-300";
cartDiv.style.display="none";

let emptyCart=document.createElement("div");
cartDiv.appendChild(emptyCart);
emptyCart.innerText="TOUR CART IS EMPTY";

function removeItemsFromCart(Id){
    let item = document.getElementById(Id);
    console.log(item);
    item.remove();
    if(cartDiv.length == 0) emptyCart.innerText="TOUR CART IS EMPTY";
    //local storage
    localArray = localArray.filter(p => p.id!= Id);
    setToLocalStorage(localArray); 
    if(localArray.length == 0) emptyCart.innerText="TOUR CART IS EMPTY";

}

function searchAndIncreaseInCart(id, stock) {
  let findItemInCart = document.getElementById(id);
  if (findItemInCart) {
    let counter = findItemInCart.children[3].innerText;
    counter++;
    if (counter > stock) {
      alert("product is out of stock");
      counter--;
    }
    findItemInCart.children[3].innerText = counter;
    //local storage
     let item = localArray.find(p => p.id == id);
    if(item) item.count = counter;
    setToLocalStorage(localArray);

    return true;
  } else {
    return false;
  }
}

function searchAndDecreaseInCart(id) {
  let findItemInCart = document.getElementById(id);
  if (findItemInCart) {
    let counter = findItemInCart.children[3].innerText;
    counter--;
    console.log(counter);
    if (counter == 0) removeFromCart(id);
    findItemInCart.children[3].innerText = counter;
    //locl storage
     let item = localArray.find(p => p.id == id);
    if(item) item.count = counter;
    setToLocalStorage(localArray);
    return true;
  } else {
    return false;
  }
}
function setToLocalStorage(arr){
    let item=JSON.stringify(arr);
    localStorage.setItem("products",item);
}
function getFromLocalStorage(){
  let get = localStorage.getItem("products");
    let item = JSON.parse(get);
    return item || [];
}

function loadNow() { 
    emptyCart.innerText="";
    localArray.forEach((item) => {
        let cartElement = document.createElement("div");
        cartElement.id = item.id;
        cartElement.classList = "border-4 m-2 border-blue-900 bg-blue-200";
        cartElement.innerHTML = `
        <div class="bg">${item.title}</div>
        <div>$${item.price}</div>
        <span>Count:</span>
        <span>${item.count}</span>
        <button onclick="removeItemsFromCart(${item.id})" class="bg-red-400 border w-20 rounded-xl">Remove</button>
        <button onclick="searchAndDecreaseInCart(${item.id})" class="bg-green-400 border rounded-xl p-2 ml-3">-</button>
        <button onclick="searchAndIncreaseInCart(${item.id}, ${item.stock})" class="bg-green-400 border rounded-xl p-2 ml-3">+</button>
        `;
        cartDiv.appendChild(cartElement);
    });
}

