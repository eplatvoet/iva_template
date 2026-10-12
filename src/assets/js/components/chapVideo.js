let chapVideo = {
  init: function () {
    chapVideo.cE();
    chapVideo.eL();
  },
  cE: function () {
    chapVideo.video = document.getElementById("chVideo");
    chapVideo.playBtn = $("#playVideo");
    chapVideo.chapterButtons = $(".ch-vid-btn");
    chapVideo.videoModal = document.getElementById("chVideoModal");
    chapVideo.playBtnModal = $("#playVideoModal");
    chapVideo.chapterButtonsModal = $(".ch-vid-btn-modal");
  },
  eL: function () {
    chapVideo.playBtn.on("click", function (e) {
      e.preventDefault();
      chapVideo.playVideo(false);
    });
    chapVideo.playBtnModal.on("click", function (e) {
      e.preventDefault();
      chapVideo.playVideo(true);
    });
    $.each(chapVideo.chapterButtons, function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        let section = $(this).data("chapter");
        let time = 0;
        switch (section) {
          case "one":
            time = 5;
            break;
          case "two":
            time = 17;
            break;
          case "three":
            time = 34;
            break;
        }
        chapVideo.skipAhead(time, false);
      });
    });
    $.each(chapVideo.chapterButtonsModal, function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        let section = $(this).data("chapter");
        let time = 0;
        switch (section) {
          case "one":
            time = 5;
            break;
          case "two":
            time = 17;
            break;
          case "three":
            time = 34;
            break;
        }
        chapVideo.skipAhead(time, true);
      });
    });
    chapVideo.video.addEventListener("ended", function (e) {
      chapVideo.video.classList.remove("show");
      chapVideo.playBtn.removeClass("hide");
    });
    chapVideo.videoModal.addEventListener("ended", function (e) {
      chapVideo.videoModal.classList.remove("show");
      chapVideo.playBtnModal.removeClass("hide");
    });
  },
  playVideo: function (modal) {
    if (modal) {
      chapVideo.videoModal.classList.add("show");
      chapVideo.playBtnModal.addClass("hide");
      chapVideo.videoModal.play();
    } else {
      chapVideo.video.classList.add("show");
      chapVideo.playBtn.addClass("hide");
      chapVideo.video.play();
    }
  },
  skipAhead: function (time, modal) {
    if (modal) {
      chapVideo.videoModal.classList.add("show");
      chapVideo.playBtnModal.addClass("hide");
      chapVideo.videoModal.pause();
      chapVideo.videoModal.currentTime = time;
      chapVideo.videoModal.play();
    } else {
      chapVideo.video.classList.add("show");
      chapVideo.playBtn.addClass("hide");
      chapVideo.video.pause();
      chapVideo.video.currentTime = time;
      chapVideo.video.play();
    }
  },
  resetModalVideo: function () {
    chapVideo.videoModal.classList.remove("show");
    chapVideo.playBtnModal.removeClass("hide");
    chapVideo.videoModal.pause();
    chapVideo.videoModal.currentTime = 0;
  },
  resetVideo: function () {
    chapVideo.video.classList.remove("show");
    chapVideo.playBtn.removeClass("hide");
    chapVideo.video.pause();
    chapVideo.video.currentTime = 0;
  },
};
