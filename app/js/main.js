const swup = new Swup();



let documentActions = (e) => {
    const targetElement = e.target;
}
document.addEventListener('click', documentActions);



function main () {
    if(document.querySelector('.header')){
        let headerElement = document.querySelector('.header');
        let callback = (entries) => {
    if(entries[0].isIntersecting){
        headerElement.classList.remove('_scroll');
    }else{
        headerElement.classList.add('_scroll');
    }
        }
        let headerObserver = new IntersectionObserver(callback);
        headerObserver.observe(headerElement)
    }
    function dinamicAdaptive(){
        function DynamicAdapt(type) {
            this.type = type;
        }
        
        DynamicAdapt.prototype.init = function () {
            const _this = this;
            // массив объектов
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            // массив DOM-элементов
            this.nodes = document.querySelectorAll("[data-da]");
        
            // наполнение оbjects объктами
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
        
            this.arraySort(this.оbjects);
        
            // массив уникальных медиа-запросов
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
                return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
        
            // навешивание слушателя на медиа-запрос
            // и вызов обработчика при первом запуске
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
        
                // массив объектов с подходящим брейкпоинтом
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function () {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        
        DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
            if (matchMedia.matches) {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    оbject.index = this.indexInParent(оbject.parent, оbject.element);
                    this.moveTo(оbject.place, оbject.element, оbject.destination);
                }
            } else {
                for (let i = 0; i < оbjects.length; i++) {
                    const оbject = оbjects[i];
                    if (оbject.element.classList.contains(this.daClassname)) {
                        this.moveBack(оbject.parent, оbject.element, оbject.index);
                    }
                }
            }
        };
        
        // Функция перемещения
        DynamicAdapt.prototype.moveTo = function (place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === 'last' || place >= destination.children.length) {
                destination.insertAdjacentElement('beforeend', element);
                return;
            }
            if (place === 'first') {
                destination.insertAdjacentElement('afterbegin', element);
                return;
            }
            destination.children[place].insertAdjacentElement('beforebegin', element);
        }
        
        // Функция возврата
        DynamicAdapt.prototype.moveBack = function (parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].insertAdjacentElement('beforebegin', element);
            } else {
                parent.insertAdjacentElement('beforeend', element);
            }
        }
        
        // Функция получения индекса внутри родителя
        DynamicAdapt.prototype.indexInParent = function (parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        
        // Функция сортировки массива по breakpoint и place 
        // по возрастанию для this.type = min
        // по убыванию для this.type = max
        DynamicAdapt.prototype.arraySort = function (arr) {
            if (this.type === "min") {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
        
                        if (a.place === "first" || b.place === "last") {
                            return -1;
                        }
        
                        if (a.place === "last" || b.place === "first") {
                            return 1;
                        }
        
                        return a.place - b.place;
                    }
        
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                Array.prototype.sort.call(arr, function (a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
        
                        if (a.place === "first" || b.place === "last") {
                            return 1;
                        }
        
                        if (a.place === "last" || b.place === "first") {
                            return -1;
                        }
        
                        return b.place - a.place;
                    }
        
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        
        const da = new DynamicAdapt("max");
        da.init();
    }
    function phoneMask(){
        [].forEach.call( document.querySelectorAll('.tel'), function(input) {
            var keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                var pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                var matrix = "+7 (___) ___ ____",
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, ""),
                    new_value = matrix.replace(/[_\d]/g, function(a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                    });
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i)
                }
                var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                    function(a) {
                        return "\\d{1," + a.length + "}"
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5)  this.value = ""
            }
        
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false)
        
          });
        
    }
    phoneMask();
    dinamicAdaptive();
    if(document.querySelector('.stages')){
        if(document.querySelector('.stages__swiper')){
            let stages__swiper = new Swiper('.stages__swiper', {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 40,
                speed: 500,
                pagination: {
                    el:'.stages__slider-dotts',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.stages__slider-arrow-right',
                    prevEl: '.stages__slider-arrow-left'
                },
                breakpoints: {
                },
            })
        }
    }
    if(document.querySelector('.participants__swiper')){
        if(document.querySelector('.participants__swiper')){
            let participants__swiper = new Swiper('.participants__swiper', {
                observer: true,
                observeParents: true,
                spaceBetween: 30,
                slidesPerView: 3,
                
                pagination: {
                    el:'.participants__dotts',
                    type: 'fraction',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.participants__arrow-right',
                    prevEl: '.participants__arrow-left'
                },
                breakpoints: {
                    320:{
                        slidesPerView: 1,
                    },
                    720:{
                        slidesPerView: 2,
                    },
                    1024:{
                        slidesPerView: 3,
                    }
                },
            })
        }
    }
}

swup.on('contentReplaced', function() {
    main()
});

main()