$('document').ready(function() {

	var musicApp = {};

	//TODO: modify this array to sync with song list on backend
	// musicApp.songs = new Array();
	musicApp.songs = [];

	//TODO: modify this Audio to sync with playing Audio on backend
	musicApp.currentSong = new Audio();

	$('.songPlay').each(function() {
		$(this).parents('.collection-item');
		musicApp.songs.push($(this));
	});


	// Onclick action for song play buttons
	$('.songPlay').on("click", function() {
		$('.collection-item[status=playing]').attr('status', 'stopped')
		var _this = $(this);
		parent = _this.parents('.collection-item');
		parent.attr('status', 'playing');

		$('.collection-item').not(parent).css({
			"background-color": '#fff',
			'color': '#000'
		})
		parent.css({
			'background-color': '#82b1ff',
			'color': '#fff'
		})

		if (_this.attr('state') == 'stop' || typeof _this.attr('state') === 'undefined') {

			$('#duration').val(0);

			$('.songPlay[state=playing]').text('play_arrow');
			$('.songPlay[state=playing]').attr('state', 'stop');

			_this.attr({
				'state': 'playing'
			})
			_this.text("pause");

			var src = _this.attr('data-link');
			$('#cover').css('background-image', 'url(images/covers/' + _this.attr('cover') + ')');

			$("#play").text('pause_circle_outline');

			musicApp.currentSong.src = 'musics/' + src;
			musicApp.currentSong.volume = 1;
			musicApp.currentSong.play();

			musicApp.currentSong.addEventListener('loadedmetadata', function() {

				var title = _this.attr('data-name');
				$('.title').text(title);

				$('#duration').attr('max', musicApp.currentSong.duration);

				var duration = musicApp.currentSong.duration;
				$('.duration').text(formatSecondsAsTime(duration));

			});

		} else if (_this.attr('state') == 'playing') {
			$("#play").text('play_circle_outline');
			_this.text('play_arrow');
			musicApp.currentSong.pause();
			_this.attr({
				'state': 'stop'
			});
		}

	});


	musicApp.currentSong.addEventListener('timeupdate', function() {
		$(".current").text(formatSecondsAsTime(musicApp.currentSong.currentTime))
		curtime = parseInt(musicApp.currentSong.currentTime, 10);
		$("#duration").val(curtime);
	});


	$('#play').on('click', function() {
		var _this = $(this);
		if (_this.text() == 'play_circle_outline') {
			musicApp.currentSong.play();
			_this.text('pause_circle_outline');
		} else if (_this.text() == 'pause_circle_outline') {
			musicApp.currentSong.pause();
			_this.text('play_circle_outline');

		}
	});


	var shuffle = 0;
	$('#shuffle').on('click', function() {
		if (shuffle === 0) {
			$(this).css({
				'color': '#ef5350'
			});
			shuffle = 1;
		} else if (shuffle === 1) {
			$(this).css({
				'color': '#fff'
			});
			shuffle = 0;
		}
	});


	var repeat = 0;


	$("#repeat").on('click', function() {
		if (repeat === 0) {
			$(this).text('repeat_one');
			repeat = 1;
		} else if (repeat === 1) {
			$(this).text('repeat');
			repeat = 0;
		}
	});


	$("#next").on('click', function() {
		var _this = $(this);
		if (shuffle === 1) {
			var random = musicApp.songs[Math.floor(musicApp.songs.length * Math.random())];
			random.trigger('click');
		} else if (shuffle === 0) {
			var item = $('.collection-item[status="playing"]').next('.collection-item');
			item.find('.songPlay').trigger('click');

		}
	});


	$("#prev").on('click', function() {
		var _this = $(this);
		if (shuffle === 1) {
			var random = musicApp.songs[Math.floor(musicApp.songs.length * Math.random())];
			random.trigger('click');
		} else if (shuffle === 0) {
			var item = $('.collection-item[status="playing"]').prev('.collection-item');
			item.find('.songPlay').trigger('click');

		}
	});
	musicApp.currentSong.addEventListener("ended", function() {
		if (repeat === 1) {
			musicApp.currentSong.currentTime = 0;
			musicApp.currentSong.play();
		} else if (repeat === 0) {
			$('#next').trigger('click');
		}
	});


	var volume = 1;


	$('#volume').on('click', function() {
		if (volume === 1) {
			$(this).text('volume_off');
			musicApp.currentSong.volume = 0;
			volume = 0;
		} else if (volume === 0) {
			$(this).text('volume_up');
			musicApp.currentSong.volume = 1;
			volume = 1;
		}
	});


	$("#duration").on("change", function() {
		musicApp.currentSong.currentTime = $(this).val();
		$("#duration").attr("max", musicApp.currentSong.duration);
	});

	function formatSecondsAsTime(secs) {
		var hr = Math.floor(secs / 3600);
		var min = Math.floor((secs - (hr * 3600)) / 60);
		var sec = Math.floor(secs - (hr * 3600) - (min * 60));

		if (min < 10) {
			min = "0" + min;
		}
		if (sec < 10) {
			sec = "0" + sec;
		}

		return min + ':' + sec;
	}

	$('#fav').on('click', function() {
		color1 = Math.floor((Math.random() * 255) + 1);
		color2 = Math.floor((Math.random() * 255) + 1);
		color3 = Math.floor((Math.random() * 255) + 1);

		color = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')';

		$('#fav').queue(function(next) {
			$('#fav').css({
				"transform": "rotate(180deg)"
			});
			next();
		});
		$('#fav').queue(function(next) {
			$('#fav').css('color', color);
			$('#fav').css({
				"transform": " rotate(360deg)"
			});
			next();
		});
		$("#fav").delay(400).queue(function(next) {
			$("#fav").css({
				'transform': 'rotate(0deg)'
			});
			next();
		});

	});

});
