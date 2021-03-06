"use strict";

(function () {
  console.log('It Works!');

  // URLs for API data

  var tagSearch = "food";

  var flickrURL = 'https://api.flickr.com/services/rest?method=flickr.photos.search&tags=' + tagSearch + '&format=json&nojsoncallback=1&api_key=ba1b9d0f8d9ba8dc20eadd024c969c34';

  var menuURL = 'https://json-data.herokuapp.com/restaurant/menu/1';

  var newsURL = 'https://json-data.herokuapp.com/restaurant/news/1';

  var specialURL = 'https://json-data.herokuapp.com/restaurant/special/1';

  // newsBox

  var newsPromise = $.getJSON(newsURL);

  // append newsTitle text
  newsPromise.then(function (newsResponse) {
    $('.newsTitle').append(newsResponse.title);
  });

  // append newsPost text
  newsPromise.then(function (newsResponse) {
    $('.newsPost').append(newsResponse.post);
  });

  // menuPromise

  var menuPromise = $.getJSON(menuURL);
  var specialPromise = $.getJSON(specialURL);

  // menu Sections
  menuPromise.then(function (menuResponse) {
    // specialPromise.then(function (specialResponse) {
    //   let specialItemId = _.values(_.pick(specialResponse,'menu_item_id'));
    //   let specialItemIdValue = _.first(specialItemId);
    // });

    // pulling the name and item array of each section
    var menuSections = _.keys(menuResponse);
    console.log(menuSections);
    var arrayofArrays = _.values(menuResponse);
    console.log(arrayofArrays);

    //  Injecting Menu divs
    var menuTemplateString = $('#menuDiv').text();
    var renderTemplate = _.template(menuTemplateString);

    _.each(menuSections, function (SectionTitle) {
      var menuHTML = renderTemplate(SectionTitle);
      $('.menu').append(menuHTML);
    });

    //  Menu div injection

    _.each(arrayofArrays, function (array) {

      _.each(array, function (object) {

        var objectItem = renderTemplate(object.item);
        var objectPrice = renderTemplate(object.price);
        var objectDescrip = renderTemplate(object.description);

        $('.menuItemName').append(objectItem);
        $('.menuItemPrice').append(objectPrice);
        $('.menuItemDescription').append(objectDescrip);

        if (object.allergy > 0) {
          $('.icons').addClass($('showAllergy'));
        };

        if (object.favorite > 0) {
          $('.icons').addClass($('showFavorite'));
        };

        if (object.spicy > 0) {
          $('.icons').addClass($('showSpicy'));
        };

        if (object.vegan > 0) {
          $('.icons').addClass($('showVegan'));
        };
      });
    });

    // let arrayOfSections = _.pick(menuResponse, function (menuSection) {
    //   _.each(menuSection, function (x) {
    //     console.log(menuSection);
    //     return x.values;
    //     $('.menuSection').append(x);
    //     console.log(arrayOfSections);
    //   });
    // });
  });

  var flickrPromise = $.getJSON(flickrURL);

  flickrPromise.then(function (flickrResponse) {
    // console.log(flickrResponse);
    var arrayOfPhotos = flickrResponse.photos.photo;
    // console.log(arrayOfPhotos);
    var arrayOfImgUrls = _.map(arrayOfPhotos, function (photo) {
      return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
    });
    var numberOfImages = 5;
    var sampleOfImages = _.sample(arrayOfImgUrls, numberOfImages);
    // console.log(sampleOfImages);
    _.each(sampleOfImages, function (randomImage) {
      $('#imageContainer').append("<div class=\"imgContainerBox\">\n              <img class=\"imgBox\" src={randomImage}\n            </div>");
    });
  });
})();