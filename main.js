"use strict";
/* Delaring get id , query select functions */
const docID = selector => document.getElementById(selector);
const docQ = selector => document.querySelector(selector);
const docQall = selector => document.querySelectorAll(selector);

/* ns-menu toggle btn action */
const toggle = docQ(".ns_btn-toggle");
toggle.addEventListener("click", event => {
    if (
        event.target.className === "fa fa-bars" ||
        event.target.className === "fa fa-times"
    ) {
        var items = docQall(".ns_menu-item");
        items.forEach(item => {
            item.classList.toggle("active");
        });
        var icon = toggle.querySelector("i");
        if (icon.className === "fa fa-bars") {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    }
});

/* ns slider function */
var allElments = {
    wrapper: docID("ns_slide-wrapper"),
    slides: Array.from(docQall("#ns_slide")),
    currentSlide: docQ(".ns_slide.current"),
    nextBtn: docQ(".ns_slider-btn--next"),
    prevBtn: docQ(".ns_slider-btn--prev"),
    indicators: Array.from(docQall(".ns_slider-indicators--item"))
};

var property = {
    id: 0,
    slideTime: 4000,
    autoSlide: true
};

let autoInterval = void 0;

function initSlider(id) {
    addActiveClass(id);
    changeIndicator(id);
    clickIndicator();
    autoPlay();
    stopAutoPlay();
}

function addActiveClass(numOfSlide) {
    reset("slides", "current");
    allElments.slides[numOfSlide].classList.add("current");
}

function reset(elements, className) {
    allElments[elements].forEach(function(element) {
        element.classList.remove(className);
    });
}

function changeSlide(num) {
    let lastSlide = allElments.slides.length - 1;
    let currentSlide = property.id + num;
    if (currentSlide > lastSlide) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = lastSlide;
    }
    property.id = currentSlide;
    addActiveClass(currentSlide);
    changeIndicator(currentSlide);
}

function changeIndicator(id) {
    reset("indicators", "active");
    allElments.indicators[id].classList.add("active");
}

function autoPlay() {
    if (property.autoSlide) {
        autoInterval = setInterval(() => {
            changeSlide(1);
        }, property.slideTime);
    }
}

function stopAutoPlay() {
    let slider = docQ(".ns_slider");
    slider.addEventListener("mouseenter", () => {
        clearInterval(autoInterval);
    });
    slider.addEventListener("mouseleave", () => {
        autoPlay();
    });
}

function clickIndicator() {
    allElments.indicators.forEach(indicator => {
        indicator.addEventListener("click", event => {
            reset("indicators", "active");
            event.target.classList.add("active");
            let currIndicator = event.target.dataset.slideTo * 1;
            console.log(event.target.dataset.slideTo);
            property.id = currIndicator;
            addActiveClass(currIndicator);
        });
    });
}

initSlider(property.id);
allElments.nextBtn.addEventListener("click", () => {
    changeSlide(1);
});
allElments.prevBtn.addEventListener("click", () => {
    changeSlide(-1);
});

/* ================ */
/* lightbox gallery */
//=================//

const galleryItems = Array.from(docQ(".ns_gallery-items").children);
const nslightBox = docQ(".ns_lightbox");
const nsCounter = docQ(".ns_lightbox-counter");
const lightBoxText = docQ(".ns_lightbox-text");
let _index;

galleryItems.forEach((item, i) => {
    item.querySelector(".ns_gallery-item--overlay").addEventListener(
        "click",
        () => {
            _index = i;
            changeImage();
            lightBox();
        }
    );
});

/* next and prev function */
const lightBoxNext = docQ(".ns_lightbox-next");
lightBoxNext.addEventListener("click", e => {
    if (_index == galleryItems.length - 1) {
        _index = 0;
    } else {
        _index++;
    }
    changeImage();
});
const lightBoxPrev = docQ(".ns_lightbox-prev");
lightBoxPrev.addEventListener("click", e => {
    if (_index == 0) {
        _index = galleryItems.length - 1;
    } else {
        _index--;
    }
    changeImage();
});

/* lightbox open */
function lightBox() {
    nslightBox.classList.toggle("open");
}
/* closing when click the overlay*/
nslightBox.addEventListener("click", e => {
    if (e.target.className === "ns_lightbox open") {
        lightBox();
    }
});

/* lightbox close function */
const lightBoxClose = docQ(".ns_lightbox-close");
lightBoxClose.addEventListener("click", lightBox);

/* image change */
function changeImage() {
    let imgsrc = galleryItems[_index].querySelector("img").getAttribute("src");
    let lightBoxImg = nslightBox.querySelector("img");
    lightBoxImg.src = imgsrc;
    nsCounter.innerHTML = `${_index + 1} of ${galleryItems.length}`;
    lightBoxText.innerHTML = galleryItems[_index].querySelector("h2").innerHTML;
}

/* lightbox ends */

/* accordion/ collapsible */
/* ====================== */
const accordionBox = Array.from(docQ(".ns_accordion").children);

accordionBox.forEach(item => {
    const heading = item.querySelector(".ns_accordion--heading");
    const accordionBody = item.querySelector(".ns_accordion--body");
    const accordionIcon = item.querySelector("span");
    let open = false;
    // active accordion
    if (item.classList.contains("active")) {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
        accordionIcon.classList.remove("fa-plus");
        accordionIcon.classList.add("fa-minus");
        open = true;
    }

    heading.onclick = () => {
        if (open) {
            open = false;
            accordionBody.style.maxHeight = "0px";
            accordionIcon.classList.remove("fa-minus");
            accordionIcon.classList.add("fa-plus");
        } else {
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            accordionIcon.classList.remove("fa-plus");
            accordionIcon.classList.add("fa-minus");
            open = true;
        }
    };
});

/* ============== */
/* modal function */
/* ============== */
const modalBtn = docQ(".ns_modal-open");
const nsModal = docQ(".ns_modal");
const modalClose = docQ(".ns_modal-header span");
const modalCancle = docQ(".ns_modal--cancel");
const modalAccept = docQ(".ns_modal--agree");

modalBtn.addEventListener("click", () => {
    nsModal.classList.add("open");
});
modalClose.addEventListener("click", () => {
    nsModal.classList.remove("open");
});
modalCancle.addEventListener("click", () => {
    nsModal.classList.remove("open");
});
modalAccept.addEventListener("click", () => {
    nsModal.classList.remove("open");
});

/* ============== */
/* alert box function */
/* ============== */

const alertBox = docQ(".ns_alert-box");
const alertBtn = docQ(".ns_alert-open");
const alertCloseBtn = docQ(".ns_alert-close");
let timer;

alertBtn.addEventListener("click", () => {
    showAlertBox();
});

alertCloseBtn.addEventListener("click", () => {
    hideAlertBox();
    clearTimeout(timer);
});

function showAlertBox() {
    alertBtn.disabled = true;
    alertBox.classList.remove("hide");
    alertBox.classList.add("show");

    if (alertBox.classList.contains("hidden")) {
        alertBox.classList.remove("hidden");
    }

    timer = setTimeout(() => {
        hideAlertBox();
    }, 6000);
}

function hideAlertBox() {
    alertBtn.disabled = false;
    alertBox.classList.remove("show");
    alertBox.classList.add("hide");
}

/* ============== */
/* Progress bar function */
/* ============== */

window.onscroll = function() {
    var bodyScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    var elHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    var scrolling = (bodyScroll / elHeight) * 100;
    var ProgressBar = docQ(".ns_progress-bar");

    ProgressBar.style.width = scrolling + "%";
};

/* ============== */
/* tab function */
/* ============== */
const tabBtns = Array.from(docQall(".ns_tab-btn"));
const tabContents = Array.from(docQall(".ns_tab-content"));

tabBtns.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabBtns.forEach(content => {
            if (content.classList.contains("active")) {
                content.classList.remove("active");
            }
        });
        tab.classList.add("active");

        tabContents.forEach(content => {
            if (content.classList.contains("active")) {
                content.classList.remove("active");
            }
        });
        tabContents[index].classList.toggle("active");
    });
});

/* ====================== */
/* buttons ripple effect  */
/* ====================== */
var root = docQ(".ns_btns-all");
const rippleBtn = docQ(".ns_btn-ripple2");

rippleBtn.addEventListener("mousedown", event => {
    var el = event.target;
    var x = (event.clientX - el.offsetLeft) / el.offsetWidth;
    var y = (event.clientY - el.offsetTop) / el.offsetHeight;
    root.style.setProperty("--ripple-x", x);
    root.style.setProperty("--ripple-y", y);
});

/* ====================== */
/* buttons ripple effect  */
/* ====================== */

const pagnitionBtns = Array.from(docQall(".ns_paginition-btns a"));

pagnitionBtns.forEach((btn, i) => {
    btn.addEventListener("click", event => {
        event.preventDefault();
        pagnitionBtns.forEach(btn => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});

/* ====================== */
/* dropdown function  */
/* ====================== */

const dropdownBtn = docQ("#ns_dropdown-click");
const dropupBtn = docQ("#ns_dropup-click");
const dropdownContent = docQ(".ns_dropdown-content");
const dropupContent = docQ(".ns_dropup");

dropdownBtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("active");
});

dropdownContent.addEventListener("mouseenter", () => {
    dropdownContent.classList.add("active");
});
dropdownContent.addEventListener("mouseleave", () => {
    dropdownContent.classList.remove("active");
});

dropupBtn.addEventListener("click", () => {
    dropupContent.classList.toggle("active");
});

/* ====================== */
/* Floating action btn  */
/* ====================== */

const fabBtn = docQ(".ns_toolbar-fab");
const fabBtns = docQ(".ns_toolbar-btns");
const fabBtnsArr = Array.from(fabBtns.children);
let toolbarTime;

fabBtn.addEventListener("click", () => {
    if (fabBtns.style.display === "flex") {
        fabBtnsArr.forEach(btn => {
            btn.classList.add("hide");
        });
        toolbarTime = setTimeout(() => {
            fabBtns.style.display = "none";
        }, 200);
    } else {
        clearTimeout(toolbarTime);
        fabBtnsArr.forEach(btn => {
            btn.classList.remove("hide");
        });
        fabBtns.style.display = "flex";
    }
});

/* ====================== */
/*   FAB to Toolbar  */
/* ====================== */

const fabToolbar = docQ(".ns_fab-toolbar-btns");
const fabToolbarBtn = docQ(".ns_fab-toolbar-fab");
const Toolbarlist = Array.from(docQall(".ns_fab-toolbar-btn"));

fabToolbarBtn.addEventListener("click", () => {
    fabToolbar.classList.toggle("active");
});

/* ====================== */
/*   FAB to Toolbar  */
/* ====================== */

const parallax = docID("ns_prallax-special");

window.addEventListener("scroll", () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.4 + "px";
});

/* ====================== */
/*   Sidebar open   */
/* ====================== */

const Sidebar = docQ(".ns_sidebar");
const sidebarBtn = docQ("#ns_sidebar-btn");
const sidebarLi = Array.from(docQall(".ns_sidebar-icon a"));

sidebarLi.forEach(a => {
    a.addEventListener("click", () => {
        Sidebar.classList.remove("show");
        sidebarBtnPos();
    });
});

sidebarBtn.addEventListener("click", () => {
    Sidebar.classList.toggle("show");
    sidebarBtnPos();
});

function sidebarBtnPos() {
    if (Sidebar.classList.contains("show")) {
        sidebarBtn.style.paddingLeft = 5 + "px";
    } else {
        sidebarBtn.style.padding = 15 + "px";
    }
}

/* ====================== */
/*   Filter list function  */
/* ====================== */

const filterInput = docID("filterInput");
const filterListItem = docQ(".ns_list-filter-items");
const lists = filterListItem.getElementsByTagName("li");

filterInput.addEventListener("keyup", () => {
    let filterValue = filterInput.value.toUpperCase();
    for (var i = 0; i < lists.length; i++) {
        var a = lists[i].getElementsByTagName("a")[0];
        var txtVal = a.textContent || a.innerText;
        if (txtVal.toUpperCase().indexOf(filterValue) > -1) {
            lists[i].style.display = "";
        } else {
            lists[i].style.display = "none";
        }
    }
});

/* ====================== */
/*   Image Modal function  */
/* ====================== */

const modalImages = Array.from(docQall(".ns_modal-images img"));
const modalImg = docID("ns_image-modal-img");
const modalCaption = docID("modal-caption");
const imgModal = docQ(".ns_image-modal");
const imgModalClose = docQ(".ns_modal-close");

modalImages.forEach(img => {
    img.addEventListener("click", () => {
        imgModal.classList.add("open");
        modalImg.src = img.src;
        modalCaption.innerText = img.alt;
    });
});

imgModalClose.addEventListener("click", () => {
    imgModal.classList.remove("open");
});

imgModal.addEventListener("click", e => {
    if (e.target.className == "ns_image-modal open") {
        imgModal.classList.remove("open");
    }
});
