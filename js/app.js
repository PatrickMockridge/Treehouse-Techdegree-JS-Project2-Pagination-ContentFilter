// Phase 1: construct the basis of the search functionality and insert into the HTML
// Phase 2: get the pagination links to show/hide appropriate sections of the list
// Phase 3: enable search functionality
//use strict
"use strict";
//ensure that the document is ready before executing code
$(document).ready(function() {
//*********************************************************************
//Commence Phase 1: construct the basis of the search functionality HTML
//*********************************************************************
//construct and insert search header html
var searchHTML = "<h2>Students</h2> <div class='student-search'> <input class='search-input' placeholder='Search for students...'><button class='search-button'>Search</button>";
$(".page-header").html(searchHTML);
//declare number of students per page
var studentsPerPage = 10;
// create a global list clone at the start for manipulation, so that we are always storing a copy of the full list globally
//create no operation function
var listClone =  $(".student-list > li").clone()
  console.log(listClone)
//Call initial pagination construction (pcf) function state upon loading with full list
pcf(listClone);
//*****************************************************************************************
// Search Function
//*****************************************************************************************
//Search Function: Search Happens Automatically As Input Text Field is Updated using 'keyUp'
 $(".search-input").keyup(function() {
      // construct pagination html as it's seen in the example
      $(".pagination > ul > li > a").attr("href", "#");
      //default set active class to the first element on page load
      $(".pagination > ul > li:first-child > a").attr("class", "active");
       //grab text from text field
       var searchBoxText = $(this).val();
       //console.log(searchBoxText); - Debugging
       // looping through each li element in the local list clone
       listClone.each(function(index) {
         $(this).removeAttr("id");
         // grab inner text from the h3 child element which contains the name
         var nameText = $(this).find("h3").text();
         // grab inner text from the .email element which contains the email address
         var emailText = $(this).find(".email").text();
         // concatentate the relevant text to be searched into a single string
         var LookUpText = nameText + " " + emailText;
         // drop search text to lower case
         var textLower = LookUpText.toLowerCase();
           //console.log(textLower); -Debugging
         // if the string in the search input box does not match the search string for each li element then...
         if (textLower.indexOf(searchBoxText) == -1) {
               //console.log($(this)); - Debugging
               //empty the li element
             $(this).attr("id", "!display");
           }
         });
         // run pagination contructor function (pcf) on the new list
     pcf(listClone);
   });
//pagination constructor function (pcf)
function pcf (list) {
  list.hide();
  //populate html with new list
  $(".student-list").html(list);
  //console.log ($(".student-list").html(list));
  //Count all non-"noshows"
  var studentCount = 1;
  list.each(function(index) {
    if ($(this).attr("id") !== "!display") {
    $(this).attr("id", "show-index-"+(studentCount));
      studentCount++
  }
  });
  var totalStudents = studentCount-1;
  console.log(totalStudents);
  //count total number of links required for pagination
  var numLink = Math.ceil(totalStudents/studentsPerPage);
    //console.log(numLink); -Debugging
  //pagination link html string constructor
  var pagStr = "<ul>";
  // add one page link per ten students
  for (var i=0; i < numLink; i++) {
    pagStr += "";
    pagStr += "<li> <a>" + (i+1) + "</a> </li>";
  }
  pagStr +="</ul>";
  //console.log(pagStr); -Debugging
  // assign inner html of pagination div with constructed pagination string, 1st element class set to active
  $(".pagination").html(pagStr);
  // stop pagination links from going to the top of the page when clicked.
  $(".pagination > ul > li > a").click(function(event) {
      event.preventDefault();
    }
  );
  // construct pagination html as it's seen in the example
  $(".pagination > ul > li > a").attr("href", "#");
  //default set active class to the first element on page load
  $(".pagination > ul > li:first-child > a").attr("class", "active");
  //remove id elements created in any previous pagination events
  // assign IDs to the list items for some show/hide magic later
  //console.log($(".student-list"));
  //showing first set of students and hiding the rest
  for (var i = 1; i < studentsPerPage+1; i++) {
    $("#show-index-" + i).show();
  }
    //console.log($("#show-index-" + i) + "shown"); - Debugging
    //console.log($("#show-index-" + i) + "hidden"); - Debugging

  // PAGINATION LINK FUNCTION
  $(".pagination > ul > li > a").click(function() {
      // hide everything in the list first, but all child elements, not parent element itself
      list.hide();
      //make pagination link class active when clicked and remove from unlicked element
      $(this).parent().parent().children().children().removeClass("active");
      $(this).addClass("active");
        //console.log($(".pagination"));
      //get integer for student list show function
      var pageLinkActive = parseInt($(".active").html());
        //console.log(pageLinkActive);
      //starting id for element to show
      var startId = pageLinkActive * studentsPerPage - studentsPerPage + 1;
        //console.log(startId);
      //ending id for element to show
      var endId = (startId + studentsPerPage);
        //console.log(endId);
      //show elements between start and end ID
      for (var i = startId; i < endId; i++) {
        $("#show-index-" + i).show();
      }
//click function closing braces
  });
//pagination constructor function closing braces
};
//*****************************************************************************************
//End of Phase 2

//ready function closing braces
});
