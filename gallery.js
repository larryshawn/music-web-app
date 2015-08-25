
function fetchData() {
  var rawTemplate = $('#music-template').html();
  var resultString = '';

  $.get('https://ga-music.firebaseio.com/artists.json', function(artists) {

    // Slightly different approach: every time we stamp out a new template, we "concatenate" (or glue) the string into a giant string that ultimately contains all our cards. We then take this giant string and append it in its entirety into the thumbnails-container <div>.
    for (var i = 0; i < artists.length; i++) {
      resultString += Mustache.render(rawTemplate, artists[i]);
    }

    $('#thumbnails-container').append(resultString);
    handleClickEvents();
  });
}

function handleClickEvents() {
  // If any movie thumbnail gets clicked, slide the mask curtain down.
  $('.movie-thumbnail').click(function(e) {
    // the e.target is the event target. It means, "whichever DOM element was clicked referring to .movie-thumbnail"
    var mask = $(e.target).children('.mask');
    // transform has a bunch of methods like 
    // translate(x-axis-in px) y-axis-in-px); - moves it around 
    // rotate(90deg) - rotates clockwise and counter clockwise
    // scale(0.1,14) - everything under 1 goes smaller
    // skewX(139deg) - top and bottom slant
    // skewY(-20deg) - sides slant
    // skew(25deg,186deg) - skews on x and y axis unless you only put one value in. In that case it functions just like a skewX()
    // matrix(scalex, rotate, scaley, translatex, translatey) - all at once
    mask.css('transform', 'translateY(0)');
  })

  // If any close button gets clicked, slide the mask curtain up.
  $('.close-btn').click(function(e) {
    var mask = $(e.target).parent();
    mask.css('transform', 'translateY(-365px)');
  });
}

fetchData();

