$(document).ready(function(){
  $("button").on("click", function(e){
    let search = $("#query").val()
    e.preventDefault();
    $('#boxes').empty();
    // Call to wikipedia API
    $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: {
      action: 'query',
      list: 'search',
      srsearch: search,
      format: 'json',
      formatversion: 2
      },
      dataType: 'jsonp',
      success: function (x) {
      // ES6 can use forEach() method
        let boxes = "";
        for (let i = 0; i < x.query.search.length; i++) {
          let title = x.query.search[i].title;
          let snippet = x.query.search[i].snippet;
          /*
          ***may have to replace " " with "_" in title for URL
          Use function to do so... The check for whitespace          might be best done before calling the function***
          funtion(title) {
            console.log(title.indexOf(' ') >= 0);
            if (title.indexOf(' ') >= 0) {
               return title.split(" ").join("_");
            }
          }  */
          let url = "https://en.wikipedia.org/wiki/" + title;
          // Adds boxes to the html and makes it visible and link to wikipedia article
          boxes += '<a href="' + url + '" > <div class="box jumbotron"><h2 id="title">' + title + '</h2>   <p>' + snippet + ' ... </p>      </div>    </a>';
        }
        $(boxes).appendTo("#boxes");
      }
    });
    $("#query").val('');
    console.log("hello");

  });
});
