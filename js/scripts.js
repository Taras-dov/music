jQuery(function ($) {
	//Temp function start
	$('.join').on('click', function (e) {
		e.preventDefault();
		window.location.href = '/html/signUp.php';
	});
	$(".sign_up input[type='submit']").on('click', function (e) {
		e.preventDefault();
		window.location.href = '/pages/signUpSteps.php';
	});
	$('.forgot form input[type=submit]').on('click', function (e) {
		e.preventDefault();
		window.location.href = '/html/resend.php';
	});
	$(".payments input[type='submit']").on("click", function (e) {
		e.preventDefault();
		$(".congratulations").fadeIn();
		$(".payment").fadeOut();
	})
	//Temp function end
	

	//media
	$(window).resize(function () {
		resize_page();
	});
	resize_page();

	function resize_page() {
		if (window.matchMedia('(max-width: 425px)').matches) {
			//add slider to connect block
			$('.connect__items').addClass('owl-carousel owl-theme');
			let owl = $('.connect__items.owl-carousel');
			if (owl.length > 0) {
				owl.owlCarousel({
					loop: true,
					nav: false,
					items: 1,
				});
			}

			$('.network_with .blc_body').addClass('owl-carousel owl-theme');
			let owl_item = $('.network_with .blc_body.owl-carousel');
			if (owl_item.length > 0) {
				owl_item.owlCarousel({
					loop: false,
					nav: false,
					dots: false,
					items: 2,
					margin: -20,
				});
			}

			//move block
			move_elem($('.top_blc__text_blc .create_account'), $('section.top_blc .header__starts'), 'prepend');
			move_elem($('.sign_up_steps header .help'), $('.sign_up_steps main>.container'), 'prepend');
			move_elem($('header .profile_info .profile_photo'), $('header .left_side'), 'prepend');
			move_elem($('.content .input_blc .newPost'), $('.add_post__text'), 'prepend');
			$('.item .menage .button.blk').text('');
			move_elem($('header.pages nav .work_sub'), $('header.pages .container'), 'prepend');
			move_elem($('.jobdescription-company__like'), $('.jobdescription-headerdescription'), 'append');
			move_elem($('.companydetails-blocks__divflex1 .companydetails-blocks__1.specialties'), $('.companydetails-blocks__divflex2'), 'append');
			$(".saved_item").each(function (){
				move_elem($(this).find(".pic_blc"), $(this).find(".post_description"), 'prepend')
			})
			move_elem($(".payments input[type='submit']"), $(".payments .payment_blc .body"), 'append')
		} else {
			$('.connect__items.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			$('.network_with .blc_body.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			move_elem($('.header__starts .create_account'), $('.top_blc__text_blc'), 'append');
			move_elem($('.sign_up_steps main>.container .help'), $('header .container'), 'append');
			$('header .profile_info .message').after($('header .left_side .profile_photo'));
			move_elem($('.add_post__text .newPost'), $('.content form .input_blc'), 'append');
			$('.item .menage .button.blk').text('Delete');
			move_elem($('header.pages .container .work_sub'), $('header.pages nav li.work'), 'append');
			move_elem($('.jobdescription-company__like'), $('.jobdescription-company'), 'append');
			move_elem($('.companydetails-blocks__divflex2 .companydetails-blocks__1.specialties'), $('.companydetails-blocks__divflex1'), 'append');
			$(".saved_item").each(function (){
				move_elem($(this).find(".pic_blc"), $(this), 'prepend')
			})
			move_elem($(".payments .payment_blc input[type='submit']"), $(".payments .connect"), 'append')
		}
	}

	let owlForm = $('form.owl-carousel');
	if (owlForm.length > 0) {
		owlForm.owlCarousel({
			loop: false,
			nav: true,
			navText: ['', 'Next'],
			items: 1,
			mouseDrag: false,
			touchDrag: false,
		});
	}

	$('form .owl-next').on('click', function () {
		let active_step = $('.owl-dots .owl-dot.active').index();
		let step_block = $('.steps>div');
		step_block.eq(active_step).addClass('active');
		step_block.eq(active_step - 1).addClass('done');
	});

	// select start
	$('form .select p').on('click', function () {
		$(this).next('ul.professionals').slideToggle();
		$('.owl-stage-outer').addClass('open');
	});

	$('ul.professionals>li').on('click', function () {
		$('ul.sub_professionals').hide();
		$(this).find('ul.sub_professionals').slideToggle();
		$(this).toggleClass('open');
	});	

	// select end
	$(document).mouseup(function (e) {
		// событие клика по веб-документу
		let div = $('form .select'); // тут указываем ID элемента
		if (!div.is(e.target) && // если клик был не по нашему блоку
			div.has(e.target).length === 0) {// и не по его дочерним элементам
			$('ul.professionals').slideUp(); // скрываем его
			$('.owl-stage-outer').removeClass('open');
			$('ul.professionals li .sub_professionals').hide();
		}
	});

	//one select
	$('.select.one .sub_professionals li label input').on('click', function (){
		$(this).parents(".sub_professionals, .professionals").slideUp();
		let select_val_one = $(this).parent().text();
		$(".select.one .selected_item").text(select_val_one);
	})
	
	//multi select
	$('.select.multi .sub_professionals li label input').on('click', function () {
		$(this).parents(".sub_professionals, .professionals").slideUp();
		let select_val = $(this).attr("value")
		let select_item = $(this).parent().text();
		$(this)
			.parents('.select.multi')
			.next('.multi_selected_items')
			.append("<p class='selected' data-value="+select_val+">" + select_item + '<span></span></p>');
	});
	$('.multi_selected_items').on('click', '.selected span', function () {
		let select_val = $(this).parent(".selected").attr("data-value");
		console.log(select_val)
		$('.select.multi .sub_professionals input[value="' + select_val + '"]').prop('checked', false);
		$(this).parent().remove();
	});
	

	$('.sign_up_steps .owl-next').on('click', function () {
		let dot_active = $('.owl-dots .owl-dot.active');
		let help_text = $('.help p');
		if (
			dot_active.index() === 3 &&
			!$('.sign_up_steps .owl-nav button.skip').length > 0
		) {
			$('.sign_up_steps .owl-nav')
				.prepend("<button class='skip' type='button'>Skip</button>")
				.css('text-align', 'center');
		}
		switch (dot_active.index()) {
			case 1:
				help_text.html(
					'Tell us what sector and career field of the music industry you occupy.<br> This will help us connect you with the right music professionals.',
				);
				break;
			case 2:
				help_text.html(
					'Great! Now tell us the music professionals you are looking to network with. Choose from the sectors below. <br> Our Artificial Intelligence (AI) software will connect you directly with these people. Aim for 15 to start.',
				);
				break;
			case 3:
				help_text.html(
					"Last Step! Don't forget to add a photo so people can recognize you. <br> People with a profile photo get up to <span>21X</span> more profile views.",
				);
				break;
		}
	});

//HOMEPAGE START
	let elem = $('p.profile_name');
	let hide_elem = elem.next('ul');
	elem.on('click', function (e) {
		e.preventDefault();
		$(this).next('ul').slideToggle();
	});

	$('li.work>a, .work_sub li.btn').on('click', function (e) {
		e.preventDefault();
		$('.work_sub').slideToggle();
	});

	let workSub = $('.work_sub');
	clickOut(workSub, workSub);

	clickOut(elem, hide_elem);

	$('label.newPost, .newPost_popUp .close').on('click', function () {
		$('.newPost_popUp').toggle();
		$('body').toggleClass('openPopUp');
	});

	$('.time_line__items li').on('click', function () {
		$('.time_line__items li').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.likes p').on('click', function () {
		$(this).parent().toggleClass('liked');
	});

	$('.item_body__text .view_more').on('click', function () {
		$(this).prev('.item_text').toggleClass('show');
		$(this).hide();
	});

	$('.item_body__text .item_text').each(function () {
		let blc_height = $(this).height();
		if (blc_height < 30) {
			$(this).next('.view_more').hide();
		}
	});

	$('.item_interactive .likes').on('click', function () {
		$(this).toggleClass('liked');
	});

	$('.post_item .post_comments').hide();
	$('.post_footer .message').on('click', function () {
		$(this).parent().next('.post_comments').slideToggle();
	});

	follow($('.follow_item .button'));

	$('.follow_item .button').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('followed');
		follow($(this));
	});

	$('.post_header .header_action').on('click', function () {
		$(this).find('.action_dropdown').slideToggle();
	});
//HOMEPAGE END

//JOBS PAGE START
	$('.dropdown .dropbtn').on('click', function () {
		$(this).next('#myDropdown').slideToggle();
		$(this).toggleClass('show');
	});

	$('#myDropdown a').on('click', function () {
		let selected = $(this).text();
		$('.dropdown .dropbtn').text(selected).toggleClass('show');
		$(this).parent().slideToggle();
	});

	$(document).mouseup(function (e) {
		// событие клика по веб-документу
		let div = $('#myDropdown, .dropbtn'); // тут указываем ID элемента
		if (
			!div.is(e.target) && // если клик был не по нашему блоку
			div.has(e.target).length === 0
		) {
			// и не по его дочерним элементам
			$('#myDropdown').slideUp(); // скрываем его
			$('.dropdown .dropbtn').removeClass('show');
		}
	});

	$('.dropdown-check-list .anchor').on('click', function () {
		$(this).next().slideToggle();
		$(this).toggleClass('show');
	});

	$('.dropdown-check-list input.custom-checkbox').on('click', function () {
		$(this).parent().next('span').toggleClass('select');
	});

	$('.select-job__post-a-job .filters_open').on('click', function (e) {
		e.preventDefault();
		$('.select-job__jobs-filter').slideToggle();
		$('body').addClass('openPopUp');
	});
	$('.form_submit input[type=reset]').on('click', function () {
		$('.select-job__jobs-filter').slideToggle();
		$('body').removeClass('openPopUp');
	});
//JOBS PAGE END

//GROW NETWORK START
	$('.another .button').on('click', function (e) {
		e.preventDefault();
		let temp = $(this).index();
		$('.grow_item')
			.hide()
			.eq(temp - 1)
			.show();
	});
	$('.grow_item .button.back').on('click', function (e) {
		e.preventDefault();
		$('.grow_item').hide().eq(0).show();
	});
	$('.drop_zone .button.upload').on('click', function (e) {
		e.preventDefault();
		$(this).prev().trigger('click');
	});
//GROW NETWORK END

//MARKETPLACE PAGE START
	let marketplace = $('.slider_items.owl-carousel');
	if (marketplace.length > 0) {
		marketplace.owlCarousel({
			loop: false,
			nav: false,
			dots: true,
			items: 1,
			margin: 10,
		});
	}
//MARKETPLACE PAGE END

//COMPANY PAGE START
	if ($('#tabs').length > 0) {
		var $tabs = $('#tabs').tabs();
	}

	$('.abuse_btn').on('click', function (e) {
		e.preventDefault();
		openPopUp('.abuse');
	});

	$('.popup_blc.abuse .close').on('click', function () {
		$('.popup_blc.abuse').fadeOut();
		$('.popup').fadeOut();
		$('body').removeClass('openPopUp');
	});

//COMPANY PAGE END

//PROFILE PAGE START
	$('.play_button').on('click', function () {
		$('.play_button').find('audio').trigger('pause');
		let audio = $(this).find('audio');
		$(this).toggleClass('playing');
		if ($(this).hasClass('playing')) {
			audio.trigger('play');
		} else {
			audio.trigger('pause');
		}
	});

	$('.drop_open').on('click', function (e) {
		e.preventDefault();
		$(this).next('.dropdown_content').slideToggle();
	});

	$('.accordion .title').on('click', function () {
		if ($(this).parents('.info_blc').length > 0) {
			$('.accordion .title')
				.removeClass('open')
				.next('.accordion_content')
				.slideUp();
		}
		$(this).next('.accordion_content').slideToggle();
		$(this).toggleClass('open');
	});

	let dropdown = $('.drop_open, .dropdown_content');
	clickOut(dropdown, $('.dropdown_content'));

	$('.progressbar .progress_item').each(function () {
		if ($(this).hasClass('done')) {
			var done_elem_index = $(this).index();
			if (done_elem_index < 6) {
				$('.steps_completed li')
					.eq(done_elem_index - 1)
					.addClass('done');
			} else {
				$('.steps_completed li')
					.eq(done_elem_index - 2)
					.addClass('done');
			}
			let step = $('.steps_completed');
			switch (
				done_elem_index //-106
				) {
				case 1:
					step.css('left', '2.5vw');
					break;
				case 2:
					step.css('left', '7.917vw');
					break;
				case 3:
					step.css('left', '13.4375vw');
					break;
				case 4:
					step.css('left', '19.167vw');
					break;
				case 5:
					step.css('left', '24.375vw');
					$('.check.center').addClass('done');
					break;
				case 7:
					step.css('left', '29.896vw');
					break;
				case 8:
					step.css('left', '35vw');
					break;
				case 9:
					step.css('left', '38.021vw');
					$('.check.finish').addClass('done');
					break;
			}
		}
	});

	let owlphoto = $('section.item.photos .body.owl-carousel');
	if (owlphoto.length > 0) {
		owlphoto.owlCarousel({
			loop: false,
			nav: false,
			dots: true,
			margin: 15,
			items: 2,
			responsive: {
				426: {
					margin: 29,
					items: 3,
				},
			},
		});
	}

	let owlprogress = $('.progress_items.owl-carousel');
	if (owlprogress.length > 0) {
		owlprogress.owlCarousel({
			loop: false,
			nav: true,
			navText: [
				'<img src="/img/icons/arrow_prev.svg" alt="Prev">',
				'<img src="/img/icons/arrow_next.svg" alt="Next">',
			],
			dots: false,
			items: 1,
			margin: 10,
			mouseDrag: false,
			touchDrag: false,
			startPosition: 5,
			navContainer: '.progress_nav',
		});
	}

	//Crop Photo start
	var $uploadCrop;

	function readFile(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('.upload-demo').addClass('ready');
				$uploadCrop
					.croppie('bind', {
						url: e.target.result,
					})
					.then(function () {
						console.log('jQuery bind complete');
					});
			};

			reader.readAsDataURL(input.files[0]);
		}
	}

	if ($('.crop_pic').length > 0) {
		$uploadCrop = $('.crop_pic').croppie({
			url: '/img/icons/profile_avatar.png',
			enableExif: true,
			viewport: {
				type: 'circle',
			},
		});
	}

	$('#upload').on('change', function () {
		readFile(this);
	});

	$('.crop_pic').on('update.croppie', function (ev, cropData) {
		$uploadCrop
			.croppie('result', {
				type: 'canvas',
				size: 'viewport',
			})
			.then(function (resp) {
				$('.crop_pic_result img').attr('src', resp);
			});
	});

	$('input.button.blk.delete').on('click', function () {
		$uploadCrop.croppie('bind', {
			url: '/img/icons/profile_avatar.png',
		});
		$('input#upload').val('');
	});
	//Crop Photo end

	//popup for profile page
	$('.profile_page .info_blc .edit').on('click', function (e) {
		e.preventDefault();
		openPopUp('.edit_profile');
	});

	$('.edit_profile .profile_photo').on('click', function () {
		openPopUp('.change_picture');
		$('.crop_pic').croppie('bind');
	});

	$('.change_picture input.close').on('click', function () {
		$('.popup .change_picture').fadeOut();
	});

	$('.contact_info_edit input.close').on('click', function () {
		openPopUp('.contact_info_edit');
	});

	$('.team_builder_btn').on('click', function (e) {
		e.preventDefault();
		openPopUp('.team_builder');
	});

	$('.lead_finder_btn').on('click', function (e) {
		e.preventDefault();
		openPopUp('.lead_finder');
	});

	$('.contact_info').on('click', function (e) {
		e.preventDefault();
		openPopUp('.contact_info_edit');
	});

	$(".contact_info_edit input[value='Edit']").on('click', function () {
		$('.popup, .popup .contact_info_edit_form').fadeIn();
		$('.popup .contact_info_edit').fadeOut();
	});

	$('.item.about .head .pic_blc').on('click', function () {
		openPopUp('.about_edit');
	});

	$('.item.experience .head .pic_blc').on('click', function () {
		openPopUp('.experience_edit');
	});
	$('.experience_edit input.close').on('click', function () {
		$('.popup, .popup .experience_edit').fadeOut();
		$('body').removeClass('openPopUp');
		$('.experience_edit .accordion_content').slideUp();
		$('.experience_edit .accordion .title').removeClass('open');
	});

	$('.item.talent .head .pic_blc').on('click', function () {
		openPopUp('.talent_edit');
	});
	$('.talent_edit input.close').on('click', function () {
		$('.popup, .popup .talent_edit').fadeOut();
		$('body').removeClass('openPopUp');
		$('.talent_edit .accordion_content').slideUp();
		$('.talent_edit .accordion .title').removeClass('open');
	});

	$('.item.photos .head .pic_blc').on('click', function () {
		openPopUp('.photo_edit');
	});
	$('.photo_edit input.close').on('click', function () {
		$('.popup, .popup .photo_edit').fadeOut();
		$('body').removeClass('openPopUp');
	});

	$('.item.skills .head .pic_blc').on('click', function () {
		openPopUp('.skills_edit');
	});

	$("input[type='reset']").on('click', function () {
		$(this).parents('form').parent().fadeOut();
		$(this).parents('form').parent().parent().fadeOut();
		$('body').removeClass('openPopUp');
	});

//PROFILE PAGE END

//JOIN PREMIUM PAGE START

	$('.help_blc .all_plans').on('click', function (e) {
		e.preventDefault();
		$('.help_blc').hide();
		$('.plan_items').fadeIn();
	});

	$('.help_blc li').on('click', function () {
		$('.help_blc').hide();
		$('.plan_items').fadeIn();
		if ($(this).hasClass('career_select')) {
			$('.plan_items .item.career').addClass('selected');
			$('.plan_description.career').fadeIn();
		}
		if ($(this).hasClass('business_select')) {
			$('.plan_items .item.business').addClass('selected');
			$('.plan_description.business').fadeIn();
		}
	});

	$('.plan_items .item').on('click', '.learn_more', function (e) {
		e.preventDefault();
		$('.plan_description').fadeOut();
		if ($(this).parents('.item').hasClass('career')) {
			$.when($('.plan_description.career').fadeIn()).done(function () { 
				smooth_scrolling("#description_career") 
			})
		}
		if ($(this).parents('.item').hasClass('business')) {
			$.when($('.plan_description.business').fadeIn()).done(function (){
				smooth_scrolling("#description_business")
			})
		}
	});
	
	//smooth scrolling by anchor
	function smooth_scrolling(n_id){
		let from_top = $(n_id).offset().top;
		$('html,body').stop().animate({scrollTop: from_top}, 1200);
	}
	

	$('.tabs_nav a').on('click', function () {
		$tabs.tabs({active: $(this).attr('rel')});
		let rel = parseInt($(this).attr('rel'));
		$('.tabs_nav a').removeClass('not_active');
		if (rel == 2 || rel == 0) {
			$(this).addClass('not_active');
		}
		if ($(this).hasClass('next') && rel < 2) {
			$(this).attr('rel', rel + 1);
			rel = parseInt($(this).prev().attr('rel')) + 1;
			$(this).prev().attr('rel', rel);
		}

		if ($(this).hasClass('prev') && rel > 0) {
			$(this).attr('rel', rel - 1);
			rel = parseInt($(this).next().attr('rel')) - 1;
			$(this).next().attr('rel', rel);
		}

		return false;
	});

	$('.billing_types .item').on('click', function () {
		$('.billing_types .item').removeClass('selected');
		$(this).addClass('selected');
	});

	$('.plan_description .button.start_free').on('click', function (e) {
		e.preventDefault();
		$('.payment').fadeIn();
		$('.plan_description, .plan_items, main>.top_blc').fadeOut();
	});

	$(".congratulations label.search input").on("input", function () {
		let val = $(this).val().toLowerCase();
		if (val === "") {
			$(".accordion .title").removeClass("open");
			$(".accordion_content").slideUp();
			$(".accordion_content label").each(function () {
				if ($(this).find("span").length > 0) {
					let span_val = $(this).find("span").text();
					$(this).find("span").replaceWith(span_val);
					$(this).text($(this).text());
				}
			})
		} else {
			$(".accordion_content").each(function () {
				let isOpen = false;
				$(this).find("label").each(function () {
					let labels_val = $(this).text();
					if (labels_val.toLowerCase().indexOf(val) !== -1) {
						isOpen = true;
						const start_position = labels_val.toLowerCase().indexOf(val);
						const end_position = start_position + val.length;
						$(this).html([
							labels_val.slice(0, start_position), '<span>',
							labels_val.slice(start_position, end_position),
							'</span>',
							labels_val.slice(end_position)
						].join(''));
					} else {
						$(this).text(labels_val);
					}
				})
				if (isOpen) {
					$(this).slideDown();
					$(this).prev(".title").addClass("open");
				} else {
					$(this).slideUp();
					$(this).prev(".title").removeClass("open");
				}
			})
		}

	})

	$(".accordion_content label").on("click", function () {
		setTimeout(function () {
			let select_items = $(".accordion_content input:checked")
			$(".count_blc span").text(select_items.length + " ")
			if (select_items.length > 9) {
				$(".accordion_content input[type='checkbox']:not(:checked)").attr("disabled", "disabled");
			} else {
				$(".accordion_content input[type='checkbox']:not(:checked)").removeAttr("disabled");
			}
		}, 100)
	})
	
	$(".button.start_free").on("click", function (){
		if ($(this).parents(".plan_description").hasClass("career")){
			$(".payment .top_blc").addClass("career");
		}else if ($(this).parents(".plan_description").hasClass("business")){
			$(".payment .top_blc").addClass("business");
		}
	})

//JOIN PREMIUM PAGE END

//WRITING SESSIONS PAGE START
	// var Size = Quill.import('attributors/style/size');
	// Quill.register(Size, true);
	
	// var toolbarOptions = [
	// 	[{ 'font': [] }],
	// 	[{ 'size': ['16', '18', '20', '22', '24', '26', '28'] }],  // custom dropdown
	// 	['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	// 	[{ 'background': [] }, { 'color': [] }],          // dropdown with defaults from theme
	// 	[{ 'list': 'bullet' }, { 'list': 'ordered'}, { 'indent': '-1'}, { 'indent': '+1' }],
	// 	[{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }],
	// 	['link', 'image'],
	// 	['clean']                                         // remove formatting button
	// ];
	// if ($("#editor")){
	// 	var quill = new Quill('#editor', {
	// 		modules: {
	// 			toolbar: toolbarOptions
	// 		},
	// 		theme: 'snow'
	// 	});
	// }
	
//WRITING SESSIONS PAGE END

//FUNCTION START
	function move_elem(moved_elem, where, pos) {
		if (moved_elem.length > 0) {
			if (pos === 'prepend') {
				where.prepend(moved_elem);
			}
			if (pos === 'append') {
				where.append(moved_elem);
			}
		}
	}

	function clickOut(elem, hide_elem) {
		$(document).mouseup(function (e) {
			// событие клика по веб-документу
			// let div = $("li.work a, p.profile_name"); // тут указываем ID элемента
			if (
				!elem.is(e.target) && // если клик был не по нашему блоку
				elem.has(e.target).length === 0
			) {
				// и не по его дочерним элементам
				hide_elem.slideUp(); // скрываем его
			}
		});
	}

	function follow(item) {
		item.each(function () {
			if ($(this).hasClass('followed')) {
				$(this).text('Followed');
			} else {
				$(this).text('Follow');
			}
		});
	}

	function openPopUp(popUpName) {
		$('.popup, .popup ' + popUpName).fadeIn();
		$('body').addClass('openPopUp');
	}

//FUNCTION END

// marketplace-provider-profile.-----------------
	if (
		document.querySelector('.slider-toggle') !== null &&
		document.querySelector('.text-buyer') !== null &&
		document.querySelector('.text-provider') !== null &&
		document.querySelector('.music .list') !== null
	) {
		const refs = {
			toggleLable: document.querySelector('.slider-toggle'),
			toggleTextBuyer: document.querySelector('.text-buyer'),
			toggleTextProvider: document.querySelector('.text-provider'),
			itemMusicList: document.querySelector('.music .list'),
		};
		refs.toggleLable.addEventListener('click', () => {
			refs.toggleTextBuyer.classList.toggle('active');
			refs.toggleTextProvider.classList.toggle('active');
		});
		let activeImg;

		refs.itemMusicList.addEventListener('click', e => {
			if (activeImg) {
				if (activeImg !== e.target) {
					removeClass();
				}
			}
			if (e.target.tagName === 'DIV') {
				e.target.classList.toggle('play');
				e.path[1].classList.toggle('active-track');

				activeImg = e.target;
			}
		});
	}
	function removeClass() {
		const activeTrack = document.querySelector('.active-track');
		const play = document.querySelector('.play');

		if (activeTrack && play) {
			activeTrack.classList.remove('active-track');
			play.classList.remove('play');
		}
	}

// marketplace-provider-profile.----------------- END

//upload photo
	$('.sign_up_steps .add_pic__pic_blc picture, .add_pic__pic_blc .change_pic').on('click', function () {
		$('#imgInp').click();
	});

	if ($('#imgInp').length > 0) {
		imgInp.onchange = evt => {
			const [file] = imgInp.files;
			if (file) {
				blah.src = URL.createObjectURL(file);
			}
		};
	}

    $('.owl-carousel.owl-theme').owlCarousel({
        items:2,
        margin: -120,
        dots: false,
        nav: false
    });

    $('.dashboard-content__item').on("click", function() {
        if(!$(this).hasClass("dashboard-content__item-active")){
            $('.dashboard-content__item').removeClass('dashboard-content__item-active');
            $(this).addClass('dashboard-content__item-active');
            $('.dashboard-content__item-drop').slideUp();
            $(this).next('.dashboard-content__item-drop').slideToggle();
        }
    });
    
	$('.owl-carousel.owl-theme').owlCarousel({
        items:2,
        margin: -120,
        dots: false,
        nav: false
    });

    $('.dashboard-content__item').on("click", function() {
        if(!$(this).hasClass("dashboard-content__item-active")){
            $('.dashboard-content__item').removeClass('dashboard-content__item-active');
            $(this).addClass('dashboard-content__item-active');
            $('.dashboard-content__item-drop').slideUp();
            $(this).next('.dashboard-content__item-drop').slideToggle();
        }
    });

    $(".dashboard-wrapper .dashboard-tabs__tab").click(function() {
        $(".dashboard-wrapper .dashboard-tabs__tab").removeClass("dashboard-tabs__tab-active").eq($(this).index()).addClass("dashboard-tabs__tab-active");
        $(".dashboard-tab_wrapper").hide().eq($(this).index()).fadeIn()
    }).eq(0).addClass("dashboard-tab_wrapper-active");
});