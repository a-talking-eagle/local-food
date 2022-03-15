var searchInput = 'input';
var marker;
var request;

window.onload = function() {
    // josh

    var location = {
        // lat: (40, 000),
        // lng: (-79, 000)
        lat: 40,
        lng: -79
    }
    var options = {
        center: location,
        zoom: 9
    }

    if (navigator.geolocation) {
        //console.log('geolocation is here');

        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            // write the map
            map = new google.maps.Map(document.getElementById("map"), options);
        },
            (err) => {
                console.log('location request denied');
                // map = new google.maps.Map(document.getElementById("map"), options);
            }
        )
    } else {
        console.log('geolocation not supported');
        map = new google.maps.Map(document.getElementById("map"), options);
    }


    // Autocomplete
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['establishment'],
        componentRestrictions: {
            country: "USA"
        },
        fields: ['geometry', 'name']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        const place = autocomplete.getPlace();
        if(marker) marker.setMap(null);
        marker = new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map
        })
    });

    // Nearby search request
    request = {
        location: location,
        radius: '50',
        types: ['restaurant']
    };

    servce = new google.maps.places.PlacesService(map);
    service.nearbysearch(request, callback);
}

    // handle results of nearby search
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results);
        }
    }

        // set markers at the location of each place result
    function createMarker(places) {
        places.forEach(place1 => {
            let marker1 = new google.maps.Marker({
                position: place1.geometry.location,
                map: map,
                title: place1.name
            });
    
            // add click listeners to each marker
            google.maps.event.addListener(marker1, 'click', () => {
                let request1 = {
                    placeId: place.placeId,
                    fields: ['name', 'formatted_address', 'geometry', 'rating']
                };
                // only fetch details on a place when the user clicks on a marker. 
                service.getDetails(request1, (placeresult, status) => {
                    showDetails(placeresult, marker1, status)
                });
            });
    
        });
    }








// //setting up a map, not really Places quite yet;

// function initGoogle() {
//     var location = {
//         lat: (40,000), 
//         lng: (-79,000)
//     }
//     var options = {
//         center: location,
//         zoom: 9
//     }
    
//     if(navigator.geolocation) {
//         console.log('geolocation is here');

//         navigator.geolocation.getCurrentPosition((loc) => {
//             location.lat = loc.coords.latitude;
//             location.lng = loc.coords.longitude;

//             // write the map
//             map= new google.maps.Map(document.getElementById("map"), options);
//         },
//         (err) => {
//             console.log('location request denied');
//             map= new google.maps.Map(document.getElementById("map"), options);
//         }
//         )
//     }else { 
//         console.log('geolocation not supported');
//             map = new google.maps.Map(document.getElementById("map"), options);
//             }
// //autocomplete buffoonery
//     autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"), 
//     {
//         componentrestrictions: {'country': ['us']},
//         fields: ['geometry', 'name'],
//         types: ['establishments']
//     })

//     autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         new google.maps.Marker({
//             position: place.geometry.location,
//             title: place.name,
//             map: map
//         })
//     });
// }