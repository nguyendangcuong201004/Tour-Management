var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });









const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");
if (listButtonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("[form-change-status]");
    listButtonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");

            const status = button.getAttribute("data-status");

            const path = formChangeStatus.getAttribute("data-path");

            const action = path + `/${status}/${id}?_method=PATCH`;
            console.log(path)
    
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}