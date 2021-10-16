<template>
  <section class="trips">
    <!-- Modals -->
    <sweet-modal ref="mapModal" title="Trip path">
      <div id="map" ref="map"></div>
    </sweet-modal>

    <sweet-modal ref="infoModal" title="Details">
      <div class="info-modal" v-if="infoModalTrip">
        <!-- {{ infoModalTrip }} -->
        <div class="info-group">
          <h2>
            Client
          </h2>
          <div class="info-row">
            <span class="info-key">Client id: </span>
            <span class="info-value"> {{ infoModalTrip.client._id }}</span>
          </div>

          <div class="info-row">
            <span class="info-key">Client name: </span>
            <span class="info-value"> {{ infoModalTrip.client.name }}</span>
          </div>

          <div class="info-row">
            <span class="info-key">Client phone: </span>
            <span class="info-value"> {{ infoModalTrip.client.phone }}</span>
          </div>

          <div class="info-row">
            <span class="info-key">Client name: </span>
            <span class="info-value"> {{ infoModalTrip.client.name }}</span>
          </div>
        </div>

        <hr />

        <div class="info-group">
          <h2>
            Driver
          </h2>
          <div class="info-group-body" v-if="infoModalTrip.driver">
            <div class="info-row">
              <span class="info-key">Driver id: </span>
              <span class="info-value"> {{ infoModalTrip.driver._id }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Driver name: </span>
              <span class="info-value"> {{ infoModalTrip.driver.name }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Driver phone: </span>
              <span class="info-value"> {{ infoModalTrip.driver.phone }}</span>
            </div>
          </div>

          <div class="no" v-if="!infoModalTrip.driver">
            <span>No driver accepted</span>
          </div>
        </div>

        <hr />

        <div class="info-group">
          <h2>
            Trip
          </h2>
          <div class="info-row">
            <span class="info-key">Pick up location: </span>
            <span class="info-value"> {{ infoModalTrip.addFrom }}</span>
          </div>

          <div class="info-row">
            <span class="info-key">Drop off location: </span>
            <span class="info-value"> {{ infoModalTrip.addTo }}</span>
          </div>

          <div class="info-row">
            <span class="info-key">Price: </span>
            <span class="info-value"> {{ infoModalTrip.price }} SDG</span>
          </div>

          <div class="info-row">
            <span class="info-key">Estimated duration: </span>
            <span class="info-value"> {{ infoModalTrip.duration }}</span>
          </div>

          <div class="info-row">
            <span class="info-key">Distance: </span>
            <span class="info-value"> {{ infoModalTrip.distance }}</span>
          </div>
        </div>
      </div>
    </sweet-modal>

    <div class="page-heading">
      <h2>
        Trips details
      </h2>
    </div>

    <div class="page-con">
      <div class="top">
        <div class="search">
          <form>
            <div class="row search-row">
              <div class="col-4">
                <div class="search-content">
                  <FormulateInput
                    type="text"
                    placeholder="Search by id"
                    name="searchById"
                    v-model="searchById"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="search-content">
                  <FormulateInput
                    type="text"
                    placeholder="Search by driver name"
                    name="searchByName"
                    v-model="searchByName"
                  />
                </div>
              </div>

              <button type="submit" @click.prevent="">
                <CIcon name="cil-search" fill="#ffffff" class="side-icon"></CIcon>
              </button>

              <div class="col search-add">
                <div class="add-menu" v-if="trips">
                  <button @click.prevent="goToAddTrip()">
                    Add trip
                    <CIcon name="cil-plus" fill="#fff" class="side-icon"></CIcon>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <table class="table table-hover table-striped" v-if="trips">
        <thead class="thead-colored">
          <tr>
            <th scope="col">Passenger</th>
            <th scope="col">Driver</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Duration</th>
            <th scope="col">Price</th>
            <th scope="col">Date</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <transition name="fade">
          <tbody v-if="trips">
            <tr v-for="(trip, index) in trips" :key="index">
              <td v-if="trip.client">{{ trip.client.name }}</td>
              <td v-if="!trip.client">-</td>
              <td v-if="trip.driver">{{ trip.driver.name }}</td>
              <td v-if="!trip.driver">-</td>

              <td>{{ trip.addFrom }}</td>
              <td>{{ trip.addTo }}</td>

              <td>{{ trip.duration }}</td>
              <td>{{ trip.price }}</td>
              <td>{{ trip.createdAt }}</td>

              <td>
                <div class="table-icons">
                  <div
                    class="map-icon table-icon"
                    @click="showMapModal(trip)"
                    content="Show trip path"
                    v-tippy="{ placement: 'left' }"
                  >
                    <CIcon
                      name="cil-location-pin"
                      fill="#717171"
                      class="side-icon"
                    ></CIcon>
                  </div>

                  <div
                    class="info-icon table-icon"
                    @click="showInfoModal(trip)"
                    content="Show more details"
                    v-tippy="{ placement: 'left' }"
                  >
                    <CIcon
                      name="cil-notes"
                      fill="#717171"
                      class="side-icon"
                    ></CIcon>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </transition>
      </table>
      <div class="api-loading" v-if="apiLoading && !trips && !apiError">
        <rotate-square2></rotate-square2>
      </div>
      <div class="api-error" v-if="apiError && !trips && !apiLoading">
        <span>
          {{ apiError }}
        </span>
        <button @click="getAllTrips">Try again</button>
      </div>
    </div>
  </section>
</template>

<script>
// import io from "socket.io-client";
import axios from "axios";
import { SweetModal, SweetModalTab } from "sweet-modal-vue";
import { RotateSquare2 } from "vue-loading-spinner";
import { gmapApi } from 'vue2-google-maps'
export default {
  components: {
      SweetModal,
      SweetModalTab, 
      RotateSquare2,
      google: gmapApi,
  },
  data() {
    return {
      isConnected: false,
      socketMessage: "",
      drivers: [],
      trips: undefined,
      // map: null,
      apiLoading: Boolean,
      apiError: undefined,
      infoModalTrip: undefined,
      searchById: "",
      searchByName: "",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU3NmI0NDAwZTlmMjZjMDgwMDdhMDEiLCJpYXQiOjE2MzMxMTkwNTcsImV4cCI6MTk0ODQ3OTA1N30.YVVv0qfttUBQgpmUcfMISg3odM3AthSDaRW-l0ELcBI",
    };
  },
  methods: {
    // Modals
    showMapModal(trip) {
      this.initMap(trip);
      this.$refs.mapModal.open();
    },
    showInfoModal(trip) {
      this.infoModalTrip = trip;
      this.$refs.infoModal.open();
    },

    // Map functions
    initMap(trip) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      const {
        pickup_location_lat,
        pickup_location_lng,
        dropoff_location_lat,
        dropoff_location_lng,
      } = trip;
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
        trip
      );
    },
    calculateAndDisplayRoute(directionsService, directionsRenderer, trip) {
      const {
        pickup_location_lat,
        pickup_location_lng,
        dropoff_location_lat,
        dropoff_location_lng,
      } = trip;
      const selectedMode = "DRIVING";
      directionsService.route(
        {
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
    // APIS
    getAllDrivers() {
      axios
        .get("https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/get_all_drivers")
        .then((response) => {
          this.drivers = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToAddTrip(){
      this.$router.push("/dashboard/trips/add/1");
    },
    getAllTrips() {
      this.apiLoading = true;
      this.apiError = undefined;
      axios
        .get("https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/trips/get_all_trips",
        {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.apiLoading = false;
          this.trips = response.data.allTrips;
          console.log(response);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          this.apiLoading = false;
          this.apiError = error;
          console.log(error);
        });
    },
  },
  created() {
    // this.getAllDrivers();
    this.getAllTrips();
  },
};
</script>

<style scoped lang="scss">
.table-icon {
  cursor: pointer;
  &:hover {
    svg {
      fill: red !important;
    }
  }
}
.table {
  margin-top: 1rem;
}
#map {
  height: 600px;
  background-color: grey;
  width: 100%;
}
.api-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
}
.info-modal {
  .info-key {
    font-weight: bold;
    color: black;
  }
}
.info-group {
  color: gray;
  h2 {
    color: black;
  }
}
.search-row {
  width: 100%;
}
.search-add {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.search-input {
  width: 100%;
}
.api-error {
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button {
    background-color: green;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 0.2rem;
    &:hover {
      background-color: green;
    }
  }
}
</style>
