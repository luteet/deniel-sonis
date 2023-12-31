
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

const headerLang = document.querySelector('.header__lang')

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-lang> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerLangTarget = $(".header__lang--target")
	if(headerLangTarget) {
	
		headerLang.classList.toggle('_active');
	
	} else if(!$('.header__lang')) {
		if(document.querySelector('.header__lang._active')) document.querySelector('.header__lang._active').classList.remove('_active')
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-lang> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <coockies-message-preferences> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const cookiesMessagePreferencesLink = $(".cookies-message__preferences a")
	if(cookiesMessagePreferencesLink) {
	
		event.preventDefault();
		const cookieMessage = cookiesMessagePreferencesLink.closest('.cookies-message');

		cookieMessage.classList.add('_hidden');
		setTimeout(() => {
			cookieMessage.remove();
		},1000)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </coockies-message-preferences> -=-=-=-=-=-=-=-=-=-=-=-=

	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize = 0;
const wrapper2 = document.querySelector('.wrapper')

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

const headerNavList = document.querySelector('.header__lang--list'), aside = document.querySelector('.aside');

let portfolioMinGallery, contactsBlock;

/* setTimeout(() => {
	html.style.setProperty('--wrapper-height', wrapper2.offsetHeight + 'px');
},0) */

if(wrapper2) {
	setInterval(() => {
		html.style.setProperty('--wrapper-height', wrapper2.offsetHeight + 'px');
	},100)
}



function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	

	
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}

	if(headerNavList) {
		const headerLang = headerNavList.parentElement;
		headerLang.style.setProperty('--list-size', headerNavList.offsetHeight + 'px');
	}

	windowSize = window.innerWidth;

	resizeCheckFunc(992,
	function () {  // screen > 992px

		if(document.querySelector('.portfolio-page__min-gallery')) {
	
			if(portfolioMinGallery) portfolioMinGallery.destroy(true,true)
			portfolioMinGallery = new Swiper('.portfolio-page__min-gallery', {
				speed: 500,
				effect: "fade",
				navigation: {
					nextEl: ".portfolio-page__min-gallery--arrow.swiper-button-next",
					prevEl: ".portfolio-page__min-gallery--arrow.swiper-button-prev",
				},
				on: {
					init: function () {
						setTimeout(() => {
							if(portfolioMinGallery.isEnd) {
								document.querySelector('.portfolio-page__min-gallery').classList.add('hide-arrows');
							}
						},300)
					}
				}
			})

		}

		if(document.querySelector('.contacts__block')) {

			contactsBlock = new Swiper('.contacts__block', {
				slidesPerView: "auto"
			})
		
		}

	},
	function () {  // screen < 992px

		if(document.querySelector('.portfolio-page__min-gallery')) {

			if(portfolioMinGallery) portfolioMinGallery.destroy(true,true)
			portfolioMinGallery = new Swiper('.portfolio-page__min-gallery', {
				speed: 500,
				effect: 'coverflow',
				slidesPerView: 'auto',
				direction: "vertical",
				centeredSlides: true,
				on: {
					init: function () {
						setTimeout(() => {
							if(portfolioMinGallery.isEnd) {
								document.querySelector('.portfolio-page__min-gallery').classList.add('hide-arrows');
							}
						},300)
					}
				},
				coverflowEffect: {
					rotate: 0,
					scale: 1,
					stretch: 40,
					depth: 100,
					modifier: 3,
					slideShadows: false,
				},
			})

		}

		if(document.querySelector('.contacts__block')) {

			if(contactsBlock) {
				contactsBlock.destroy(true, true)				
			}
		
		}

	});
	
	
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.hero__slider')) {
	
	const popup = document.querySelector('#portfolio-project-popup'),
	link = document.querySelector('.hero__open-project--link:not(.open-popup)'),
	heroName = document.querySelector('.hero__name span'),
	heroBg = document.querySelector('.hero-bg');
	
	const heroSlider = new Swiper('.hero__slider', {
		speed: 1000,
		navigation: {
			nextEl: ".hero__slider--arrow.swiper-button-next",
			prevEl: ".hero__slider--arrow.swiper-button-prev",
		},
		loop: true,
		initialSlide: localStorage.getItem('deniel-sonis-portfolio-slide-index') ? Number(localStorage.getItem('deniel-sonis-portfolio-slide-index')) : 0,
		centeredSlides: true,
		effect: 'coverflow',
		slidesPerView: 'auto',
		on: {
			slideChangeTransitionEnd: function () {
				document.querySelector('.hero__slider').classList.add('drag-active');
			},
			slideChange: function () {
				setTimeout(() => {
					popup.style.setProperty('--theme', heroSlider['slides'][heroSlider.activeIndex].dataset.theme);
					const image = heroSlider['slides'][heroSlider.activeIndex].querySelector('picture').cloneNode(true, true),
					popupImage = popup.querySelector('.portfolio-project__image');
	
					popupImage.querySelector('picture').remove();
					popupImage.append(image);
	
					link.setAttribute('href', heroSlider['slides'][heroSlider.activeIndex].dataset.url);

					html.style.setProperty('--theme-accent', heroSlider['slides'][heroSlider.activeIndex].dataset.themeColor)
					localStorage.setItem('deniel-sonis-theme-accent', heroSlider['slides'][heroSlider.activeIndex].dataset.themeColor);
					
					heroName.querySelectorAll('mark').forEach((mark, index) => {
						mark.classList.remove('active')
						if(index == heroSlider['slides'][heroSlider.activeIndex].dataset.index) mark.classList.add('active')
					})

					heroBg.querySelectorAll('.hero-bg__item').forEach((item, index) => {
						item.classList.remove('_active')
					})

					//console.log(heroSlider)
					heroBg.querySelectorAll('.hero-bg__item')[Number(heroSlider['slides'][heroSlider.activeIndex].dataset.index)].classList.add('_active')
					html.style.setProperty('--theme-gradient', heroSlider['slides'][heroSlider.activeIndex].dataset.themeBg);
					localStorage.setItem('deniel-sonis-theme-bg', heroSlider['slides'][heroSlider.activeIndex].dataset.themeBg);
					localStorage.setItem('deniel-sonis-portfolio-slide-index', Number(heroSlider['slides'][heroSlider.activeIndex].dataset.swiperSlideIndex));
					
				},400)
			},
			init: function () {
				setTimeout(() => {
					link.setAttribute('href', heroSlider['slides'][heroSlider.activeIndex].dataset.url);

					heroBg.innerHTML = '';

					for(let index = 0; index < heroSlider['slides'].length; index++) {

						if(heroSlider['slides'][index].dataset.themeBg) {
							heroBg.insertAdjacentHTML('beforeend', `<div class="hero-bg__item" style="--theme: ${heroSlider['slides'][index].dataset.themeBg}"></div>`)
						} else {
							heroBg.insertAdjacentHTML('beforeend', `<div class="hero-bg__item"></div>`)
						}

						const clone = heroName.querySelector('mark').cloneNode(true);
						clone.style.setProperty('--theme', heroSlider['slides'][index].dataset.themeText)
						clone.setAttribute('data-index', index);
						if(index == 0) heroName.innerHTML = '';
						heroName.append(clone);
					}

					Array.from(heroSlider['slides']).forEach((slide, index) => {
						slide.setAttribute('data-index', index);
					})

					if(heroSlider['slides'].length <= 1) {
						document.querySelector('.hero__slider').classList.add('drag-active');
					}
				},300)
			}
		},
		coverflowEffect: {
			rotate: 0,
			scale: 1,
			stretch: 0,
			depth: 200,
			modifier: 2,
			slideShadows: false,
		},
		breakpoints: {
			992: {
				coverflowEffect: {
					rotate: -20,
					scale: 0.9,
					stretch: 0,
					depth: 300,
					modifier: 2,
					slideShadows: false,
				},		
			}
		}
	})

	console.log(Number(localStorage.getItem('deniel-sonis-portfolio-slide-index')))
	
}

if(document.querySelector('.mob-portfolio__slider')) {

	const mobPortfolioSlider = new Swiper('.mob-portfolio__slider', {
		speed: 1000,
		loop: false,
		//centeredSlides: true,
		effect: 'coverflow',
		slidesPerView: 'auto',
		direction: "vertical",
		on: {
			activeIndexChange: function () {
				setTimeout(() => {
					mobPortfolioSlider.el.classList.add('drag-active');
				},500)
			},
			init: function () {
				setTimeout(() => {
					if(mobPortfolioSlider['slides'].length <= 1) {
						document.querySelector('.mob-portfolio__slider').classList.add('drag-active');
					}
				},300)
			}
		},
		coverflowEffect: {
			rotate: 0,
			scale: 1,
			stretch: 30,
			depth: 100,
			modifier: 3,
			slideShadows: false,
		}
	})

}

if(document.querySelector('.portfolio__categories')) {

	const portfolioCategories = new Swiper('.portfolio__categories--slider', {
		speed: 500,
		slidesPerView: 'auto',
		//spaceBetween: 75.5,
		navigation: {
			nextEl: ".portfolio__categories--arrow.swiper-button-next",
			prevEl: ".portfolio__categories--arrow.swiper-button-prev",
		},
		on: {
			init: function () {
				setTimeout(() => {
					if(portfolioCategories.isEnd) {
						document.querySelector('.portfolio__categories').classList.add('hide-arrows');
					}
				},300)
			}
		},
	})

}

if(document.querySelector('.portfolio-page__gallery') && document.querySelector('.portfolio-page__gallery-nav')) {

	const portfolioGalleryNav = new Swiper('.portfolio-page__gallery-nav', {
		speed: 500,
		slidesPerView: 4,
		spaceBetween: 31,
	})

	const portfolioGallery = new Swiper('.portfolio-page__gallery', {
		speed: 500,
		effect: "fade",
		watchSlidesProgress: true,
		on: {
			activeIndexChange: function () {
				setTimeout(() => {
					portfolioGallery.el.classList.add('drag-active');
				},500)
			},
			init: function () {
				setTimeout(() => {
					if(portfolioGallery['slides'].length <= 1) {
						portfolioGallery.el.classList.add('drag-active');
					}
				},300)
			}
		},
		thumbs: {
			swiper: portfolioGalleryNav
		},

	})

}



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					body.classList.remove('_popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('_popup-active');

					if (saveHref) history.pushState('', "", id);

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('_active');
							function openFunc() {
								popupCheck = true;
								setTimeout(() => {
									popup.classList.add('_active-end');
								},0)
								popup.removeEventListener('transitionend', openFunc);
							}
							popup.addEventListener('transitionend', openFunc)
						} else {
							popup.classList.add('_transition-none');
							popup.classList.add('_active');
							popupCheck = true;
						}

					}, 100)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					popup.classList.remove('_active-end');
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.removeEventListener('transitionend', closeFunc)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
	once: true,
});

const matchMedia = gsap.matchMedia();

matchMedia.add('(min-width: 992px)', () => {
	const portfolioCards = document.querySelectorAll('.portfolio__card');
	if(document.querySelector('.portfolio__list')) {
		document.querySelector('.portfolio__list').style.setProperty('--padding-bottom', document.querySelector('.portfolio__block').offsetHeight - portfolioCards[portfolioCards.length - 1].offsetHeight - 50 + 'px');
		window.addEventListener('resize', function () {
			document.querySelector('.portfolio__list').style.setProperty('--padding-bottom', document.querySelector('.portfolio__block').offsetHeight - portfolioCards[portfolioCards.length - 1].offsetHeight - 50 + 'px');
		})
	}
	portfolioCards.forEach((portfolioCard, index) => {
		
		gsap.set(portfolioCard, {
			opacity: 0,
			transform: 'translate3d(0,0,-10px) rotateX(-2deg)'
		})
	
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: portfolioCard,
				scroller: '.portfolio__block',
				start: `${window.innerHeight*0.2} ${window.innerHeight*0.797}`,
				end: `${window.innerHeight*0.8} ${window.innerHeight*0.27}`,
				//markers: true,
				scrub: true,
			}
		});

		/* start: `${window.innerHeight*0.3} ${window.innerHeight*0.797}`,
		end: `${window.innerHeight*0.8} center`, */

		console.log(portfolioCard.offsetHeight*1.4 + ' ' + window.innerHeight*0.8)

		/* timeline.to(portfolioCard, {
			transform: 'translate3d(0,0,-50px) rotateX(2deg)',
			opacity: 1,
		}) */
	
		timeline.to(portfolioCard, {
			transform: 'translate3d(0,0,0) rotateX(0deg)',
			opacity: 1,
		})
	
		timeline.to(portfolioCard, {
			transform: 'translate3d(0,0,-10px) rotateX(2deg)',
			opacity: 0,
		})
	
		/* if(index <= 2) {
			portfolioCard.classList.add('_animated');
			gsap.to(portfolioCard, {
				transform: 'translate3d(0,0,0) rotateX(0deg)',
				opacity: 1,
			})
		} */
	})
})



/* if(document.querySelector('.portfolio__block')) {
	let scrollDownCheck = false, scrollUpCheck = false, lastIndex = 0;
	document.querySelector('.portfolio__block').addEventListener('wheel', function(event)
	
	{
		
	 if (event.deltaY < 0 && scrollUpCheck == false) {
		
	  scrollUpCheck=true;
	  scrollDownCheck = false;
	 }
	 else if (event.deltaY > 0 && scrollDownCheck == false)
	 {
	  scrollDownCheck = true;
	  scrollUpCheck=false;

	  let hideAnimatedCards = false

	  portfolioCards.forEach((portfolioCard, index) => {
		
		if(!portfolioCard.classList.contains('_animated') && index >= lastIndex) {
			if(!hideAnimatedCards) {
				lastIndex = index;
				hideAnimatedCards = true;
				const activePortfolioCards = document.querySelectorAll('.portfolio__card._animated');
				activePortfolioCards.forEach((portfolioCard, index) => {
					gsap.to(portfolioCard, {
						transform: 'translate3d(0,-100%,0) rotateX(50deg)',
						opacity: 0,
						duration: 1,
					})
					portfolioCard.classList.remove('_animated')
				})
			}
			if(index <= lastIndex+2) {
				gsap.to(portfolioCard, {
					transform: 'translate3d(0,0,0) rotateX(0deg)',
					opacity: 1,
					delay: 0.2,
					duration: 1,
				})
				portfolioCard.classList.add('_animated')
			}
		}
	
		if(index <= 2) {
			portfolioCard.classList.add('_animated');
			gsap.to(portfolioCard, {
				transform: 'translate3d(0,0,0) rotateX(0deg)',
				opacity: 1,
			})
		}
	})

	setTimeout(() => {
		scrollDownCheck = false;
	},1000)
	 }
	});
} */




// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=


