let pageCounting = 1;
let Totalpages = 1;
let myPageLimit = 12;
let myProducts=[];
let localArray = [];
let likeProduct=[];


mainframe.classList = "border-3 bg-blue-100 p-2 m-2";

let productDiv = document.createElement("div");
let productBox = document.createElement("div");
productBox.classList="grid grid-cols-4";



let prev = document.createElement("button");
prev.innerText = "<<";
prev.classList = "border-1 rounded-lg bg-green-200 p-2 m-2"
prev.addEventListener("click",()=>{
    if(pageCounting == 1){
        return;
    }
    pageCounting--;
   createPost((pageCounting-1)* myPageLimit);
})

let pagesShown = document.createElement("span");
pagesShown.innerText = "loading...";
pagesShown.classList = "border-1 rounded-lg bg-pink-100 p-2 m-2";

let next = document.createElement("button");
next.innerText = ">>";
next.classList = "border-1 rounded-lg bg-green-200 p-2 m-2"

let buyNowBtn = document.createElement("button");
buyNowBtn.innerText = "BUY NOW";
buyNowBtn.classList = "border-4 rounded-lg bg-yellow-700 text-2xl w-100 h-15 p-2 m-2";

next.addEventListener("click",()=>{
    if(pageCounting == Totalpages){
        return;
    }
    createPost((pageCounting)* myPageLimit);
    pageCounting++;
})

mainframe.appendChild(prev);
mainframe.appendChild(pagesShown);
mainframe.appendChild(next);

createPost(0).then(()=>{
    localArray = getFromLocalStorage();
    if(localArray.length>0){ loadNow();}

    likeProduct = getLikeFromLocalStorage();
    likeProduct.forEach((item)=>{
        restoreLike(item);
    })
    console.log(likeProduct);
})



async function createPost(skip = 0) {
  const url = `https://dummyjson.com/products?limit=${myPageLimit}&skip=${skip}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);

    let product = result.products;
    myProducts= result.products;
    console.log(product);
    productBox.innerHTML="";
    product.forEach((p) => {
    let itemDiv = document.createElement("div");
        itemDiv.classList = "p-2 m-2 border-2 rounded-lg bg-white";
        itemDiv.innerHTML =`
        <h1 class = "bg-pink-300"> "Title  :    " ${p.title} </h1>  
        <h2 class = "bg-blue-300">   ${p.description} </h2> 
        <span class = "bg-green-300">$${p.price} </span> 
        <button id="like-${p.id}" class=ml-3 onclick=like("${p.id}")><svg style="stroke:black" xmlns="http://www.w3.org/2000/svg" width="24" 
        height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" 
        stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path 
        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 
        2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
        <button class="bg-blue-900 w-40 text-white rounded-lg" onclick="addToCart(${p.id})">add to cart</button></div>`;
        productBox.appendChild(itemDiv);
    });

    Totalpages = Math.ceil(result.total / myPageLimit);
    pagesShown.innerText = `${pageCounting} / ${Totalpages}`;

    productDiv.appendChild(productBox);
  }
  mainframe.appendChild(productDiv);
  mainframe.appendChild(buyNowBtn);
  function addToCart(id) {

  emptyCart.innerText="";
  if (searchAndIncreaseInCart(id)) return;
   
  let filteredProduct = myProducts.filter((p) => p.id == id);
  let myproduct = filteredProduct[0];
  let cartItemId = id;
  console.log(cartItemId);
  let cartElement = document.createElement("div");
  cartElement.id = cartItemId;
  cartElement.classList = "border-4 m-2 border-blue-900 bg-blue-200";
  cartElement.innerHTML = `
  <div class="bg">${myproduct.title}</div>
  <div>$${myproduct.price}</div>
  <span>Count:</span>
  <span>${1}</span>
  <button onclick="removeItemsFromCart(${cartItemId})" class="bg-red-400 border w-20 rounded-xl">Remove</button>
  <button onclick="searchAndDecreaseInCart(${cartItemId})" class="bg-green-400 border rounded-xl p-2 ml-3">-</button>
  <button onclick="searchAndIncreaseInCart(${cartItemId},
  ${myproduct.stock})" class="bg-green-400 border rounded-xl p-2 ml-3">+</button>`;
  cartDiv.appendChild(cartElement);

//local storage
  localArray.push({
       "id": myproduct.id,
       "title": myproduct.title,
       "price": myproduct.price,
       "stock": myproduct.stock,
       "count": 1
   });
   setToLocalStorage(localArray); 
}
