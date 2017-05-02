/*following elements needed:
- The name of the restaurant
- A large image of the restaurant
- A section for reservations that includes:
- A form to make reservations
- A table to view existing reservations
- A section to view the map of its location
- A customer review
*/

function initMap() {

    //define an object literal restaurantLocation that contains properties lat and lng who have their respective values.
    //you will need to retrieve the latitude and longitude values which both live on on the coords property of the position object.
    var restaurantLocation = {
      lat: 40.8054491,
      lng: -73.9654415
    };

    //styles variable code will go here
  
    //map options object code will go here
    //element to target is #map, but function is getElementById so we only pass in the name 'map'
    //properties you need to define are: center whose value will be your restaurantLocation object and zoom which can have various values but feel free to stick with 10 for now.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: restaurantLocation,
      zoom: 10
      //scrollwheel: false
    });
    
    //marker variable code will go here
    //one argument, a configuration object with properties position, map and title which must be defined. position is the position of where you want your marker to be, map's value should be your constructed map and the value of title will describe the marker. You can use 'User Location' for the title value. Assign your Marker instance to a variable marker
    var marker = new google.maps.Marker({
    position: restaurantLocation,
    map: map,
    title: "Monk's Cafe"
  });

    //Log restaurantLocation to inspect its value.
     console.log(restaurantLocation);
    
}

initMap();