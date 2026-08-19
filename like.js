function like(id){
    //ui
    let btn=document.getElementById(`like-${id}`);
    let heart=btn.children[0];
    if(heart.style.stroke=="black"){
        heart.style.stroke="red";
    }
    else{
        heart.style.stroke="black";
    }
    //local storage
    let check=checkPresenceOfLike(id);
    if(check){return;}
     likeProduct.push({
         "likeId":`like-${id}`,
         "flag":true
     })
    setLikeToLocalStorage(likeProduct);
}

function restoreLike(item){   
    if(item.flag){
    let btn=document.getElementById(item.likeId);
    console.log(btn);
    let heart=btn.children[0];
        heart.style.stroke="red";
    }
    else{return;}
}

 function checkPresenceOfLike(id){
    let filteredProduct = likeProduct.find((p) => p.likeId == `like-${id}`);
    if(filteredProduct){
        if(filteredProduct.flag==true)
             filteredProduct.flag=false;
        else
             filteredProduct.flag=true;
    setLikeToLocalStorage(likeProduct);
    return true;
    }
     else{return false;}  
 }

  function setLikeToLocalStorage(arr){
     let item=JSON.stringify(arr);
     localStorage.setItem("like",item);
 }

 function getLikeFromLocalStorage(){
   let get = localStorage.getItem("like");
     let item = JSON.parse(get);
     return item || [];
 }