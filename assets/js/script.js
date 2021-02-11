document.addEventListener("DOMContentLoaded", function() {
  "use strict";

    // меню бургер и мобильное меню
    let burgerButton = document.getElementById('nav-icon');
    let mainMenu = document.querySelector('.header-menu');
    let linkMenu = document.querySelectorAll('.header-menu__link, .header-menu__phone');
    for(let link of linkMenu) {
      link.addEventListener('click', () => {
        mainMenu.classList.remove('active');
        burgerButton.classList.remove('open');
      });
    }
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle('open');
      if ( burgerButton.classList.contains('open') ) {
        mainMenu.classList.add('active');
      } else {
        mainMenu.classList.remove('active');
      }
    });
    // закрыть меню при клике извне
    document.addEventListener('click', function(event) {
        let menu_button = document.querySelector('.header-toggler');
        let isClickInside = mainMenu.contains(event.target);
        if (menu_button.contains(event.target)) {
          return true;
        } else if (!isClickInside && mainMenu.classList.contains('active')) {
           mainMenu.classList.remove('active');
           menu_button.querySelector('#nav-icon').classList.remove('open');
        }
    });
    // слайдер gallsery
    const sliders = document.querySelectorAll('.gallery .splide');
    sliders.forEach(slider => {
        new Splide( slider, {
            /*type: 'loop',*/
            direction: 'ttb',
            height: '400px',
            perPage: 1,
            perMove: 1,
            arrows: false,
            /*autoplay: true,
            interval: 4000,*/
            breakpoints: {
                1199: {
                    height: '322px',
                },
                991: {
                    height: '240px',
                },
                767: {
                    destroy: true,
                },
            }
        } ).mount();
    });
    // слайдер vip
    const vips = document.querySelectorAll('.vip-gallery');
    vips.forEach(vip => {
        new Splide( vip, {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            arrows: true,
            autoplay: true,
            interval: 3000,
        } ).mount();
    });
    // кнопка подняться наверх
    document.querySelector('.header-logo').addEventListener('click', (e) => {
        e.preventDefault();
        window.scroll({
            top: 0, 
            behavior: 'smooth' 
        });
    });
    // при скроле вниз фиксируем шапку
    let scrollpos = window.scrollY;
    const header = document.querySelector(".header");
    const header_height = header.offsetHeight;
    const slider = document.querySelector(".slider");

    const add_class_on_scroll = () => {
      header.classList.add("fixed-top");
      slider.style.paddingTop = document.querySelector(".header.fixed-top").offsetHeight + 'px'
    };
    const remove_class_on_scroll = () => {
      header.classList.remove("fixed-top");
      slider.style.paddingTop = '0'
    };

    window.addEventListener('scroll', function() { 
      scrollpos = window.scrollY;

      if (scrollpos >= header_height)
        add_class_on_scroll()
      else
        remove_class_on_scroll()
    });

    // Модальные окна
    const buttons = document.querySelectorAll('[data-modal-trigger]');
    const modals = document.querySelectorAll('.modal');
    for(let button of buttons) {
        modalEvent(button);
    }
    function modalEvent(button) {
        button.addEventListener('click', () => {
            const trigger = button.getAttribute('data-modal-trigger');
            const modal = document.querySelector(`[data-modal=${trigger}]`);
            const contentWrapper = modal.querySelector('.content-wrapper');
            const close = modal.querySelector('.close');

            [].forEach.call(modals, function(modal) {            
                if ( modal.classList.contains('open') ) {
                    modal.classList.remove('open');
                }
            });

            close.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', () => modal.classList.remove('open'));
            contentWrapper.addEventListener('click', (e) => e.stopPropagation());

            modal.classList.toggle('open');
        });
    }
    // Валидатор
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
        
      }, false)
    });

    // Текст
    var words = document.getElementsByClassName('slider-text__word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    function changeWord() {
      var cw = wordArray[currentWord];
      var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
      for (var i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }
      
      for (var i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }
      
      currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
    }

    function animateLetterOut(cw, i) {
      setTimeout(function() {
            cw[i].className = 'letter out';
      }, i*80);
    }

    function animateLetterIn(nw, i) {
      setTimeout(function() {
            nw[i].className = 'letter in';
      }, 340+(i*80));
    }

    function splitLetters(word) {
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'letter';

        letter.innerHTML = content.charAt(i).replace(/ /g,"&nbsp;");
        word.appendChild(letter);
        letters.push(letter);
      }
      
      wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);
});
