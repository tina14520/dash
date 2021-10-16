<template>
  <section>
    <div class="input-fields loading-container">
      <input
        class="c"
        type="text"
        placeholder="Client Name"
        v-model="searchQuery"
      />
      <ul class="search-result" v-if="clientsSearchResult">
        <li
          v-for="client in clientsSearchResult.slice(0, 9)"
          :key="client.id"
          @click="chooseClient(client)"
        >
          <span class="client-name">{{ client.name }} </span>
          <span class="client-email"> {{ client.phone }}</span>
        </li>
      </ul>
      <input
        class="c"
        type="phone"
        placeholder="Client Phone Number"
        v-model="selectedClientPhone"
      />
    </div>
    <div class="trip-price">
      <h4>
        Price :
      </h4>
      <p v-if="priceLoading">Calculating price.....</p>
      <p v-if="tripPrice" class="price">{{ tripPrice.tripPrice }} SDG</p>
    </div>
    <input id="pac-input" class="c" type="text" placeholder="Search Box" />
    <div
      class="booking-btn"
      
    >
      <button @click="sendTripRequest"
      :disabled="!selectedClientId || !pickUpLocationLat || !dropOffLocationLng"
      >Confirm booking</button>
    </div>

    <div id="map" ref="map"></div>
  </section>
</template>

<script>
import axios from "axios";
const io = require("socket.io-client");
// let socket = io.connect("https://alsayar-backend-vwmk7.ondigitalocean.app/", {
let socket = io.connect("https://alsayar-backend-vwmk7.ondigitalocean.app/", {
  query: {
    userId: "605c938fb0cd2c51a0623d61",
  },
});
socket.on("connect", (data) => {
  console.log("Connected to socket");
  console.log(data);
});
export default {
  data() {
    return {
      map: null,
      center: {
        lat: 15.5927666,
        lng: 32.5522355,
      },
      currentPlace: null,
      markers: [],
      places: [],
      startLocation: null,
      endLocation: null,
      pickUp: undefined,
      pickUpLocationLat: undefined,
      pickUpLocationLng: undefined,
      dropOffLocationLat: undefined,
      dropOffLocationLng: undefined,
      pickUpChoosed: false,
      drofOffChoosed: false,
      tripPrice: undefined,
      priceLoading: false,

      loadingResults: undefined,
      searchQuery: undefined,
      clientsSearchResult: undefined,

      selectedClientPhone: undefined,
      selectedClientId: undefined,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    sendTripRequest() {
      socket.emit("getNearby", {
        pickup_location_lat: this.pickUpLocationLat,
        pickup_location_lng: this.pickUpLocationLng,
        dropoff_location_lat: this.dropOffLocationLat,
        dropoff_location_lng: this.dropOffLocationLng,
        trip_source: "dashboard",
        admin: "605c938fb0cd2c51a0623d61",
        client: this.selectedClientId,
      });
      this.$router.push("trips-tracking");
      // socket.on("driverOnRequest", (data) => {
      //   console.log("driver on request: ");
      //   console.log(data);
      //   this.driverOnRequest = data
      // });
    },
    initMap() {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();

      this.pickUp = { lat: 15.6315705, lng: 32.4311799 };
      this.map = new window.google.maps.Map(this.$refs["map"], {
        center: { lat: 15.6315705, lng: 32.4311799 },
        zoom: 15,
      });
      this.map.addListener("click", (mapsMouseEvent) => {
        if (!this.pickUpChoosed && !this.drofOffChoosed) {
          this.addPickUp(mapsMouseEvent.latLng);
        } else if (this.pickUpChoosed && !this.drofOffChoosed) {
          this.addDropOff(mapsMouseEvent.latLng);
        } else if (this.pickUpChoosed && this.drofOffChoosed) {
          this.calculatePrice();
          this.calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
      });

      directionsRenderer.setMap(this.map);

      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input");
      const searchBox = new google.maps.places.SearchBox(input);

      const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["establishment"],
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.bindTo("bounds", this.map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17);
        }
      });

      this.markers = [];
    },
    addPickUp(coords) {
      var pickUpMarker = new google.maps.Marker({
        position: coords,
        map: this.map,
        draggable: false,
        title: "Pick Up",
        label: "Pick Up",
        animation: google.maps.Animation.DROP,
      });
      this.pickUpLocationLat = pickUpMarker.getPosition().lat();
      this.pickUpLocationLng = pickUpMarker.getPosition().lng();
      this.markers.push(pickUpMarker);
      this.pickUpChoosed = true;
    },
    showRoute() {},
    addDropOff(coords) {
      var dropOffMarker = new google.maps.Marker({
        position: coords,
        map: this.map,
        draggable: false,
        title: "Drop Off",
        label: "Drop Off",
        animation: google.maps.Animation.DROP,
      });
      this.dropOffLocationLat = dropOffMarker.getPosition().lat();
      this.dropOffLocationLng = dropOffMarker.getPosition().lng();
      this.markers.push(dropOffMarker);
      this.drofOffChoosed = true;
    },
    calculateAndDisplayRoute(directionsService, directionsRenderer) {
      const selectedMode = "DRIVING";
      directionsService.route(
        {
          origin: {
            lat: parseFloat(this.pickUpLocationLat),
            lng: parseFloat(this.pickUpLocationLng),
          },
          destination: {
            lat: parseFloat(this.dropOffLocationLat),
            lng: parseFloat(this.dropOffLocationLng),
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
    setPlace(place) {
      this.currentPlace = place;
      // this.addMarker(index)
    },
    setMapOnAll(map) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    hideMarkers() {
      this.setMapOnAll(null);
    },
    deleteMarkers() {
      this.hideMarkers();
      this.markers = [];
    },
    addSMarker(index) {
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      if (index === 0) this.startLocation = marker;
      if (index === 1) this.endLocation = marker;
      console.log("select");
      this.center = marker;
    },

    // APIs
    calculatePrice() {
      this.priceLoading = true;
      axios
        .get(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/client/calculate_price",
          {
            params: {
              origin_place_lat: this.pickUpLocationLat,
              origin_place_lng: this.pickUpLocationLng,
              distance_place_lat: this.dropOffLocationLat,
              distance_place_lng: this.dropOffLocationLng,
            },
          }
        )
        .then((response) => {
          this.priceLoading = false;
          this.tripPrice = response.data;
          console.log(response);
        })
        .catch((error) => {
          this.priceLoading = false;
          console.log(error);
        });
    },
    chooseClient(client) {
      this.searchQuery = client.name;
      this.selectedClientPhone = client.phone;
      this.selectedClientId = client._id;
      this.clientsSearchResult = undefined;
      console.log(client);
    },
  },
  watch: {
    searchQuery: function() {
      this.loadingResults = true;
      axios
        .get(
          `https://alsayar-backend-vwmk7.ondigitalocean.app/api/mobile/client/search?searchQuery=${this.searchQuery}`
        )
        .then((response) => {
          this.clientsSearchResult = response.data;
          this.loadingResults = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.loadingResults = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
#map {
  height: 600px;
  background-color: grey;
  width: 100%;
}
.booking-btn {
  margin-top: 0.5rem;
  button {
    border: none;
    padding: 0.4rem 0.7rem;
    color: white;
    background: #2a9d8f;
    &:disabled {
      opacity: .5;
    }
  }
}
.c {
  display: inline;
  width: 40%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  color: #768192;
  background-color: white;
  border-color: #d8dbe0;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}
.input-fields {
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.search-result {
  background-color: #dddddd50;
  list-style-type: none;
  margin-left: 0;
  padding: 0rem;
  max-height: 200px;
  overflow-y: scroll;
  li {
    cursor: pointer;
    padding: 0.5rem 1rem;
    &:hover {
      background-color: #bbbbbb50 !important;
    }
  }
}
.search-input {
  display: inline !important;
}
.loading-container {
  position: relative;
}
.loading-ele {
  position: absolute;
  top: 8px;
  right: 4px;
}
</style>
