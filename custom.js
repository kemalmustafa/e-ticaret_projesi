fetch("https://dummyjson.com/products")
.then((resp) => resp.json())
.then((data) => {
  console.log(data)
  var carouselItems = document.querySelectorAll("#products .item img");
  data.products.forEach((product, index) => {
    if (carouselItems[index]) {
      carouselItems[index].src = product.thumbnail;
      carouselItems[index].alt = product.name;
      carouselItems[index].setAttribute("data-id", product.id);
      var itemDiv = carouselItems[index].closest(".item");
      var titleElement = document.createElement("p");
      titleElement.textContent = product.title;
      itemDiv.appendChild(titleElement);

      var itemDiv = carouselItems[index].closest(".item");
      var titleElement = document.createElement("p");
      titleElement.textContent = product.price+" $";
      itemDiv.appendChild(titleElement);

    }
  });
});

var limit = 16;
var page =  1;

function getProducts() {
  fetch(`https://dummyjson.com/products?limit=${limit}&skip=${limit * (page - 1)}`)
    .then((resp) => resp.json())
    .then((data) => {
      var listCon = document.querySelector("#list-con");
      listCon.innerHTML = "";

      for (let i = 0; i < limit; i++) {
        var product = data.products[i];
        
        var row = document.createElement("div");
        row.className = "row";

        var div = document.createElement("div");
        div.className = "card";
        div.id = `${product.id}`
        div.style = "height: 100%; width: 200px";
        
        var img = document.createElement("img");
        img.src = product.images[0];
        div.appendChild(img);

        var div2 = document.createElement("div");
        div2.className = "card-body";

        var h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerHTML = product.title;
        div2.appendChild(h5);

        var p = document.createElement("p");
        p.className = "card-text";
        p.innerHTML = truncateDescription(product.description, 50); // Description'ı kırp
        div2.appendChild(p);

        var a = document.createElement("a");
        a.className = "btn btn-primary";
        a.innerHTML = "Satın Al";
        a.href = `detay.html?id=${product.id}`
        div2.appendChild(a);
        div.appendChild(div2);
        row.appendChild(div);
        listCon.appendChild(row);

      }

      const pageNumber = Math.ceil(data.total / data.limit);
      if (page == 1) {
        setPaginate(pageNumber);
      } 
    });
}

function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.substring(0, maxLength - 3) + "...";
  }
}


function setPaginate(pageNumber) {
  const pagi = document.querySelector(".pagi-class");
  pagi.innerHTML = "";
  
  for(let i = 1; i <= pageNumber; i++){ 
    var li = document.createElement("li");
    li.className = "pagination-btn__link";
    li.innerHTML = i;
    li.id = i;
    li.addEventListener("click", () => pageSetter(i));
    pagi.appendChild(li);
  }
}

function pageSetter(pageNumber){
  page = pageNumber;
  getProducts();
}

getProducts();


          var cardDetail = document.querySelector("#card__detail");
          var urlParams = new URLSearchParams(window.location.search);
          var productId = urlParams.get("id");
          var cardImgs = document.querySelector("#cardimgs");
          // Ürünü al ve detayları görüntüle
          fetch(`https://dummyjson.com/product/${productId}`)
            .then((resp) => resp.json())
            .then((product) => {
              cardDetail.innerHTML = ""; // Detayları temizle

              var cardH1 = document.createElement("h1");
              cardH1.className = "card-title";
              cardH1.innerHTML = product.title;

              var cardDes = document.createElement("p");
              cardDes.className = "card-text";
              cardDes.innerHTML = `<b>${product.description}</b>`;
              

              var cardPrice = document.createElement("p");
              cardPrice.className = "card-text";
              cardPrice.innerHTML = `<b>Price : </b>` + product.price + " $";
              
              

              var cardDis = document.createElement("p");
              cardDis.className = "card-text";
              cardDis.innerHTML = `<b>Discount : </b>%` + product.discountPercentage;
            
              
              var cardStock = document.createElement("p");
              cardStock.className = "card-text";
              cardStock.innerHTML = `<b>Stock : </b> ` + product.stock;
              cardStock.style = "";

              var cardCat = document.createElement("p");
              cardCat.className = "card-text";
              cardCat.innerHTML = "<b>Category : </b>" + product.category;
              
              
              
              cardDetail.appendChild(cardH1);
              cardDetail.appendChild(cardDes);
              cardDetail.appendChild(cardPrice);
              cardDetail.appendChild(cardDis);
              cardDetail.appendChild(cardStock);
              cardDetail.appendChild(cardCat);
              cardImgs.src = product.thumbnail;
              
              
              


  });