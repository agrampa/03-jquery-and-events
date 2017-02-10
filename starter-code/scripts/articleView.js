//  REVIEW: Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() { //gets all html article elements that do not have template class, function is an anonymous callback function
    var authorName, category, optionTag; //declaring three variables, could also declare on separate lines, can assign values to each as well
    authorName = $(this).find('address a').text();  //"this" refers to each article from line 5, for each article, find the anchor tag inside the address tag that has a text value --> in this case, finds author name
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>'; //assigns a string to the variable optionTag, will appear as an HTML element with the value of authorName and content of authorName, option tags are used for <select> elements within a <li>
    $('#author-filter').append(optionTag); //appends new optionTag content to the ID
    category = $(this).attr('data-category'); //assigns new data attribute
    optionTag = '<option value="' + category + '">' + category + '</option>'; //overwrite line 8, but it was appended on line 9 so it doesn't matter
    if ($('#category-filter option[value="' + category + '"]').length === 0) { //checks anything with #category-filter, then looks at the option of those elements to see if the category value exists, and if not, append (line 13) the newly assigned option tag (from line 11), this handles duplicates
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      /* TODO: If the select box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on on the author
            that was selected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */
      $('article').hide(); //TO-DO #1 complete
      $('article[data-author="' + $(this).val() + '"]').fadeIn(); //TO-DO #2 complete
    } else {
    /* Otherwise, we should:
        1. Show all the articles except the template */
      $('article').fadeIn(); //complete
      $('article.template').hide; //complete
    }
    $('#category-filter').val(''); //limits to only one filter, resets other dropdown menu
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide;
    }
    $('#author-filter').val('');
  });
  /* TODO: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide(); //#1 complete
    $('#' + $(this).data('content')).fadeIn(); //#2 complete, .data('content') is a method that will search for "data" in HTML and find 'content' after it, in this case it is on lines 25 and 26
    /* TODO:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  /* TODO: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the default action of a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!

    // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  */
};

// TODO: Invoke all of the above functions (I mean, methods!):
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();