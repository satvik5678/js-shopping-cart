let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "grey shirt",
    tag: "greyshirts",
    price: 15.0,
    inCart: 0,
  },
  {
    name: "green shirt",
    tag: "greenshirts",
    price: 20.0,
    inCart: 0,
  },
  {
    name: "b&w check shirt",
    tag: "b&wchecksbhirts",
    price: 10.0,
    inCart: 0,
  },
  {
    name: "grey check shirt",
    tag: "greycheckshirts",
    price: 25.0,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);

    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let cartCost = localStorage.getItem("totalCost");

  cartItems = JSON.parse(cartItems);
  console.log(cartItems);

  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class= "products">
        <ion-icon name="close-circle-outline"></ion-icon>
        <img src="./images/${item.tag}.jpeg"/>
        <span>${item.name}</span>
        <div class="price"><span>${item.price}</span></div>
        <div class="quantity"><span>${item.inCart}</span></div>
        <div class="total">
        ${item.inCart * item.price}
        </div>
        </div>
        `;
    });

    productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Grand Total:</h4>
            <h4 class="basketTotal">$${cartCost}</h4>
        </div>
    `;
  }
}
onLoadCartNumbers();
displayCart();
