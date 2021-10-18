<template>
  <div>Financial Reports
   <div id="map" ref="map"></div>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  components: {
      gmapApi
  },
  data() {
    return {
      item: {
          accepted: false,
          addFrom: "الجريف غرب الشيطة، الخرطوم،،, الخرطوم، Sudan",
          addTo: "أمبدة،، Ombada, Sudan",
          admin: "605c938fb0cd2c51a0623d61",
          canceled: false,
          client: {
            active: true,
            balance: 0,
            createdAt: "2021-08-09T10:24:24.074Z",
            disabled: false,
            favourite_placese:{},
            is_online: true,
            last_otp: 1234,
            name: "Mahmoud Ahmed",
            password: "$2a$10$KyJljdnynZRrfggiayEogefAmR3riKnwvJimHHGShrGQVfiosfbKC",
            phone: 249111111111,
            profile_img: "image.png",
            updatedAt: "2021-10-13T12:07:28.394Z",
            __v: 0,
            _id: "61110258802f2699b73afb8f"
          },
          createdAt: "2021-08-21T13:06:17.153Z",
          distance: "25.9 km",
          driver_arrived_to_passenger: false,
          dropoff_location_lat: "15.633759424010787",
          dropoff_location_lng: "32.43038328392259",
          duration: "43 mins",
          ended: false,
          passenger_on_board: false,
          pickup_location_lat: "15.56920559574701",
          pickup_location_lng: "32.578047891883095",
          price: "310980",
          trip_chat: [],
          trip_source: "dashboard",
          updatedAt: "2021-08-21T13:06:17.153Z",
          __v: 0,
          _id: "6120fa49689ef05894bd57a7"
        }
    }
  },
  methods:{
    initMap(item) {
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const directionsService = new google.maps.DirectionsService();
        const {
          pickup_location_lat,
          pickup_location_lng,
          dropoff_location_lat,
          dropoff_location_lng,
        } = item;
        var map = new window.google.maps.Map(this.$refs["map"], {
          center: {
            lat: parseFloat(dropoff_location_lat),
            lng: parseFloat(dropoff_location_lng),
          },
          zoom: 12,
        });

        directionsRenderer.setMap(map);
        this.calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          item
        );
      },
      calculateAndDisplayRoute(directionsService, directionsRenderer, item) {
        const {
          pickup_location_lat,
          pickup_location_lng,
          dropoff_location_lat,
          dropoff_location_lng,
        } = item;
        const selectedMode = "DRIVING";
        directionsService.route({
            origin: {
              lat: parseFloat(pickup_location_lat),
              lng: parseFloat(pickup_location_lng),
            },
            destination: {
              lat: parseFloat(dropoff_location_lat),
              lng: parseFloat(dropoff_location_lng),
            },
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode],
          },
          (response, status) => {
            if (status == "OK") {
              directionsRenderer.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      },
  }
}
  </script>
