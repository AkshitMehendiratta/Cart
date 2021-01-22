let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name: "Pizza",
        tag: "pizza",
        price:50,
        incart:0,

    },
    {

        name: "Burger",
        tag: "burger",
        price:30,
        incart:0,
    },
    { 
        name: "Garlic bread",
        tag: "garlicbread",
        price:40,
        incart:0,

    },
    {  name: "pasta",
        tag: "pasta",
        price:80,
        incart:0,

    },
    {
        name: "Noodles",
        tag: "noodles",
        price:25,
        incart:0,

    }
]
for( let i=0;i<carts.length;i++)
{
    carts[i].addEventListener('click',function(){

        cartNumbers(products[i]);
        totalcost(products[i]);
    });


}
function onLoadCartNumbers()
{
   let productNumbers=localStorage.getItem('cartNumbers');
   
    if(productNumbers)
    {
        document.querySelector('.cart span').textContent= productNumbers;
    }
    
}
function cartNumbers(product,action)
{
   
    let productNumbers = localStorage.getItem('cartNumbers');
   

    productNumbers=parseInt(productNumbers);

    if(action=="decrease")
    {
        localStorage.setItem("cartNumbers",productNumbers-1);
        document.querySelector('.cart span').textContent=productNumbers-1;

    }
    else if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;

    }
   
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }


    setItems(product);
}
function setItems(product)
{
    let cartItems=localStorage.getItem('ProductsIncart');
    cartItems=JSON.parse(cartItems);
    if(cartItems!=null)
{
    if(cartItems[product.tag]==undefined)
    {
        cartItems={
            ...cartItems,
            [product.tag]:product
        }
    }
    cartItems[product.tag].incart+=1;
}
else{
    product.incart=1;
    cartItems={
        [product.tag]:product
    }
}
    

    
    localStorage.setItem("ProductsIncart",JSON.stringify(cartItems));
}
function totalcost(pro,action)
{
   // console.log("product pice is",pro.price)
   let cartcost=localStorage.getItem("totalcost");

   if(action=="decrease")
   {
    cartcost=parseInt(cartcost);
    localStorage.setItem("totalcost",cartcost-pro.price);
   }
  
  else if(cartcost!=null)
   {
    cartcost=parseInt(cartcost);
       localStorage.setItem("totalcost",cartcost+pro.price);

   }
   else{
    localStorage.setItem("totalcost",pro.price)

   }
  
}

const display=()=>
{
    let cartcost=localStorage.getItem("totalcost");
    let cartitems=localStorage.getItem("ProductsIncart")
    cartitems=JSON.parse(cartitems)//we used json.parse because when the object come from localstorg they come in the form of JSON as a object so wwe need to convert them in javascript form
    //console.log(cartitems)
    let productContainer=document.querySelector(".products");
    if(cartitems && productContainer)
    {
        
        productContainer.innerHTML="";
        Object.values(cartitems).map(item =>{
            
            productContainer.innerHTML+=`
        <div style="display:flex;">
            <div class="product">
            <ion-icon name="close-outline" style="margin-bottom: 73px;
            color: darkred;"></ion-icon>
              <img src="./images/${item.tag}.jpg" height="90px" width="90px">
              <span>${item.name}</span>
            
            </div>
            <div class="price"><span>$${item.price}.00</span></div>

            <div class="quantity">
            
            <ion-icon name="remove-outline" style="color:darkred" class="decrease"></ion-icon>
             <span>${item.incart}</span>
             <ion-icon name="add-outline" style="color:darkred" class="increase"></ion-icon>
             
            </div>
            <div class="total">
             <span>$${item.incart * item.price}.00</span>
            </div>
        </div>
           
            `

        });
        productContainer.innerHTML+=`
        <br>
        <div class="basketotalcontainer">
          <h4 class="baskettotaltitle>
              Basket Total
          </h4> 
          <h4 class="baskettotal>
             basket total:$${cartcost}.00

          </h4>
         </div> 
          `  
        
    }
    deletebutton();
    managequantity();

}
function deletebutton()
{
    let deletebuttons=document.querySelectorAll('.product ion-icon');
    let pname;
    let pnumbers=localStorage.getItem('cartNumbers');
    let cartitem=localStorage.getItem('ProductsIncart');
    cartitem=JSON.parse(cartitem);
    let cartcosts=localStorage.getItem('totalcost');
    for(let i=0;i<deletebuttons.length;i++)
    {

       deletebuttons[i].addEventListener('click' ,() => {
          pname= deletebuttons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g,"");
          localStorage.setItem('cartNumbers',pnumbers-cartitem[pname].incart);
          localStorage.setItem('totalcost',cartcosts-(cartitem[pname].price * cartitem[pname].incart));
          delete cartitem[pname];
          localStorage.setItem('ProductsIncart',JSON.stringify(cartitem));
          display();
          onLoadCartNumbers();

          
           

       });
    }
}
function managequantity()
{
    let decreasebutton=document.querySelectorAll(".decrease");
    let increasebutton=document.querySelectorAll(".increase");
    let cartitem=localStorage.getItem('ProductsIncart');
    cartitem=JSON.parse(cartitem);
   // console.log(cartitem);
    let cbutton=0;
    let currentproduct="";


    for(let i=0;i<decreasebutton.length;i++)
    {
        decreasebutton[i].addEventListener('click' ,()=>{
             cbutton=decreasebutton[i].parentElement.querySelector('span').textContent;
             console.log(cbutton);
             currentproduct=decreasebutton[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
            currentproduct= currentproduct.toLowerCase().trim().replace(/ /g,"");
            
             if(cartitem[currentproduct].incart > 1)
             {
                 cartitem[currentproduct].incart-=1;
                 cartNumbers(cartitem[currentproduct],"decrease");
                 totalcost(cartitem[currentproduct],"decrease");
                 localStorage.setItem('ProductsIncart',JSON.stringify(cartitem));
                 display();
             }

        });
    }
    for(let i=0;i<increasebutton.length;i++)
    {
        increasebutton[i].addEventListener('click' ,()=>{
            cbutton=increasebutton[i].parentElement.querySelector('span').textContent;
             console.log(cbutton);
             currentproduct=increasebutton[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
             currentproduct= currentproduct.toLowerCase().trim().replace(/ /g,"");
             
           
                  cartitem[currentproduct].incart+=1;
                  cartNumbers(cartitem[currentproduct]);
                  totalcost(cartitem[currentproduct]);
                  localStorage.setItem('ProductsIncart',JSON.stringify(cartitem));
                  display();
              
           

        });
    }
}
// function abcd()
// {
//     var remove=document.getElementsByClassName("asd")
//     for(var i=0;i<remove.length;i++)
//     {
//         var button=remove[i];
//         button.addEventListener('click',function(event){
//             var buttonclicked=event.target
//             buttonclicked.parentElement.parentElement.remove()

     
        


//         })
//     }


//     var akst=   localStorage.getItem('cartNumbers');
//     var ak=parseInt(akst);
  
//     localStorage.setItem('cartNumbers',ak-1);


//     document.querySelector('.cart span').textContent=ak-1;
//    // localStorage.removeItem('ProductsIncart');
   
//    // localStorage.set

//   //  console.log(remove);

// }

onLoadCartNumbers();
display();