// Slider

var swiper = new Swiper(".mySwiper", {
    loop: true, // Vòng lặp vô hạn
    autoplay: {
        delay: 3000, // Chuyển ảnh sau 3 giây
        disableOnInteraction: false, // Không tắt autoplay khi người dùng tương tác
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Slider


// alert

const alertAddCartSuccess = () => {
    const elementAlert = document.querySelector('[alert-add-cart-success]')
    if (elementAlert) {
        elementAlert.classList.remove("alert-hidden")

        setTimeout(() => {
            elementAlert.classList.add("alert-hidden")
        }, 3000)
    }
}

// Close alert
const closeAlert = document.querySelector('[close-alert]');
if (closeAlert) {
    closeAlert.addEventListener("click", () => {
        document.querySelector('[alert-add-cart-success]').classList.add("alert-hidden")
    })
}

// alert



// Local storage

const cart = localStorage.getItem('cart')
if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}


// Show Mini Cart 

const showMiniCart = () => {
    const miniCart = document.querySelector('[mini-cart]');
    if (miniCart) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        miniCart.innerHTML = cart.length;
    }
}

showMiniCart()

// Show Mini Cart 




const formAddToCart = document.querySelector("[form-add-to-cart]")
if (formAddToCart) {
    formAddToCart.addEventListener("submit", (event) => {
        event.preventDefault();
        const quantity = parseInt(formAddToCart.quantity.value);
        const tourId = parseInt(formAddToCart.getAttribute('tour-id'))
        if (quantity > 0 && tourId) {
            const cart = JSON.parse(localStorage.getItem('cart'));
            const indexExitsTour = cart.findIndex(item => item.tourId == tourId)

            if (indexExitsTour < 0) {
                cart.push({
                    tourId: tourId,
                    quantity: quantity
                })
            }
            else {
                cart[indexExitsTour].quantity = cart[indexExitsTour].quantity + quantity;
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            showMiniCart()
            alertAddCartSuccess()
        }
    })
}
// Local storage


// fetch data cart 

const drawCart = () => {
    const tableCart = document.querySelector('[table-cart]');

    if (tableCart) {
        fetch(`/cart/list-json`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: localStorage.getItem("cart")
        })
            .then(res => res.json())
            .then(data => {
                const htmlArray = data.cart.map((item, index) => {
                    return `
               <tr>
                    <td>${index + 1}</td>
                    <td>
                        <img src=${item.infoTour.image} 
                            alt=${item.infoTour.title}
                            width="100px">
                    </td>
                    <td>
                        <a href="/tours/detail/${item.infoTour.slug}">${item.infoTour.title}</a>
                    </td>
                    <td>${item.infoTour.special_price.toLocaleString()} đ/ khách</td>
                    <td>
                        <input type="number" 
                            name="quantity" 
                            value=${item.quantity}
                            min="1" 
                            item-id=${item.id}
                            style="width: 60px">
                    </td>
                    <td>${item.infoTour.total.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" btn-delete=${item.id}>
                            Xóa
                        </button>
                    </td>
                </tr>

                `
                })
                const totalPrice = document.querySelector('[total-price]')
                totalPrice.innerHTML = data.total.toLocaleString()
                const tbody = tableCart.querySelector("tbody")
                tbody.innerHTML = htmlArray.join("")


                deleteItemInCart();
                updateQuantity()
            })

    }
}


// fetch data cart 


// Button delete cart
const deleteItemInCart = () => {
    const listButtonDelete = document.querySelectorAll('[btn-delete]');
    if (listButtonDelete && listButtonDelete.length > 0) {
        listButtonDelete.forEach((button) => {
            button.addEventListener("click", () => {
                const tourId = button.getAttribute("btn-delete")
                const cart = JSON.parse(localStorage.getItem('cart'));
                const newCart = cart.filter(item => item.tourId != tourId)
                localStorage.setItem("cart", JSON.stringify(newCart))
                drawCart()
                showMiniCart()
            })
        })
    }
}

// Button delete cart

// Update quantity

const updateQuantity = () => {
    const listInputQuantity = document.querySelectorAll("input[name='quantity']");
    if (listInputQuantity && listInputQuantity.length > 0) {
        listInputQuantity.forEach((input) => {
            input.addEventListener("change", () => {
                const quantity = parseInt(input.value);
                const cart = JSON.parse(localStorage.getItem('cart'));
                const tourId = input.getAttribute('item-id')
                const indexExitsTour = cart.findIndex(item => item.tourId == tourId)
                cart[indexExitsTour].quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(cart))
                drawCart()
            })
        })
    }
}

// Update quantity


drawCart()




// Book tour

const formOrder = document.querySelector('[form-order]')
if (formOrder) {
    formOrder.addEventListener("submit", (e) => {
        e.preventDefault()
        const fullName = formOrder.fullName.value;
        const phone = formOrder.phone.value;
        const note = formOrder.note.value;
        const cart = JSON.parse(localStorage.getItem('cart'));
        const data = {
            info: {
                fullName: fullName,
                phone: phone,
                note: note
            },
            cart: cart
        }

        fetch(`/order`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
            
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == 200){
                    localStorage.setItem("cart", JSON.stringify([]));
                    window.location.href = `/order/success?orderCode=${data.orderCode}`
                }
                else {
                    alert("Đơn hàng của bạn đã được đặt thành công!")
                }
            })
    })
}

// Book tour



// Sort

const sortTour = document.querySelector('select[name="sort"]');
if (sortTour){
    let url = new URL(location.href);
    sortTour.addEventListener("change", () => {
        const sortValue = sortTour.value;
        url.searchParams.set("sortValue", sortValue);
        location.href = url.href;
    })
    const selectedSortValue = url.searchParams.get("sortValue");
    if(selectedSortValue){
        const optionSelected = sortTour.querySelector(`option[value='${selectedSortValue}'`);
        optionSelected.selected = true;
    }
}

// Sort