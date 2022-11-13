$(function () {
  $.fn.extend({
    countdown: function (props) {
      props = jQuery.extend(
        {
          //Default props
          until: new Date(),
        },
        props
      );
      const state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      let render = (props) => {
        const { days, hours, minutes, seconds } = props;
        this.empty();
        this.append(`
          <div class="countdownProp" date-count="${
            days == 1 ? "day" : "days"
          }">${days}</div>
          <div class="countdownProp" date-count="${
            hours == 1 ? "hour" : "hours"
          }">${hours < 10 ? "0" + hours : hours}</div>
          <div class="countdownProp" date-count="${
            minutes == 1 ? "minute" : "minutes"
          }">${minutes < 10 ? "0" + minutes : minutes}</div>
          <div class="countdownProp" date-count="${
            seconds == 1 ? "second" : "seconds"
          }">${seconds < 10 ? "0" + seconds : seconds}</div>
          `);
      };
      render(state);
      let update = setInterval(function () {
        let counter = props.until - new Date().getTime();
        if (counter <= 0) {
          clearInterval(update);
          return false;
        }
        state.days = Math.floor(counter / (1000 * 60 * 60 * 24));
        state.hours = Math.floor(
          (counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        state.minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
        state.seconds = Math.floor((counter % (1000 * 60)) / 1000);
        render(state);
      }, 1000);
      return this;
    },
  });

  $(".countdown").countdown({
    until: new Date(`Dec, 25, ${new Date().getFullYear()}`), // you can add time optionally ('Dec, 25, 2020 00:00:00')
  });
});

var christmas = {
  month: 12,
  date: 25,
  year: 2022,
};

function isItChristmas() {
  var now = new Date();
  return (
    now.getMonth() + 1 === christmas.month &&
    now.getDate() === christmas.date &&
    now.getFullYear() === christmas.year
  );
}

if (isItChristmas()) {
  $("#christmas").fadeOut("slow");
  $("h1.christmas").fadeIn("slow");
}

$.fn.christmas = function () {
  $(this).each(function () {
    $(this).html(
      $(this)
        .text()
        .split("")
        .map(function (v, i) {
          return (
            '<span class="christmas-' +
            (i % 2 == 0 ? "gold" : "blue") +
            '">' +
            v +
            "</span>"
          );
        })
        .join("")
    );
  });
};

$(function () {
  $("h1.christmas").christmas();
});
