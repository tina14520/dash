<template>
<div>
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
      <div class="tab">

            <CCard>
                  <br>
                  <CRow>
                        <CCol class="colm" sm="2" md="2">
                              <CWidgetProgressIcon text="Number of live trips " color="gradient-info" inverse>
                                    <CIcon name="cil-location-pin" height="36" />
                                    <h4 class="header">{{ this.numberOfLiveTrips }}</h4>
                              </CWidgetProgressIcon>
                        </CCol>
                        <CCol sm="2" md="2">
                              <CWidgetProgressIcon text="Number of completed trips (per Day)" color="gradient-success" inverse>
                                    <CIcon name="cil-task" height="36" />
                                    <h4 class="header">{{ this.numberOfCompletedTrips }}</h4>
                              </CWidgetProgressIcon>
                        </CCol>
                        <CCol sm="2" md="2">
                              <CWidgetProgressIcon text="Number of cancelled trips" color="gradient-danger" inverse>
                                    <CIcon name="cil-ban" height="36" />
                                    <h4 class="header">{{ this.numberOfCancelledTrips }}</h4>
                              </CWidgetProgressIcon>
                        </CCol>
                        <CCol sm="2" md="2">
                              <CWidgetProgressIcon text="Number of trips cost (per Day)" color="gradient-primary" inverse>
                                    <CIcon name="cil-cash" height="36" />
                                    <h4 class=" h header">{{ this.numberOfTripsCost }} SDG</h4>
                              </CWidgetProgressIcon>
                        </CCol>
                        <CCol sm="2" md="2">
                              <CWidgetProgressIcon text="Number of free vehicles" color="gradient-warning" inverse>
                                    <CIcon name="cil-group" height="36" />
                                    <h4 class="header">{{ this.numberOfOnlineDrivers }}</h4>
                              </CWidgetProgressIcon>
                        </CCol>
                  </CRow>
            </CCard>
      </div>
      <CCardBody class="tab">
            <div class="cdiv">
                  <div class="col-sm-6 form-inline p-0">
                        <Datepicker :range="true" lang="en" firstDayOfWeek="sunday" />
                  </div>
                  <div class="cd col-sm-6 form-inline p-0">
                        <CButton class="btn d-sm-down-none btn-success" variant="outline" square size="sm" @click="csvExport(csvData)">
                              <CIcon color="white" name="cil-print" />
                        </CButton>
                  </div>
            </div>
            <div class="row">
                  <div class="search-wrapper panel-heading col-sm-12">
                        <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
                  </div>
            </div>
            <div class="u" v-if="trips">

                  <CDataTable :items="trips" :fields="fields" column-filter table-filter items-per-page-select :items-per-page="5" striped border small fixed hover sorter pagination class="font-weight-bold">
                        
                        <td slot="passenger" slot-scope="{ item }">
                                    {{item.client.name}}
                        </td>
                        <td slot="driver" slot-scope="{ item }">
                              <span v-if="item.driver">{{item.driver.name}}</span>
                              <span v-else class="sp">-</span>
                        </td>
                        <!-- <template #details="{item}">
      <td>
          {{item.client.name}}
      </td>
    </template>-->
                        <template #show_details="{ item }">
                              <td class="py-2">
                                    <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item)">
                                          {{ Boolean(item.client.disabled) ? "Hide" : "Details" }}
                                    </CButton>
                              </td>
                        </template>
                        <template #details="{ item }">
                              <CCollapse :show="Boolean(item.client.disabled)">
                                    <CCardBody>
                                          <div>
                                                <div class="info-modal" v-if="item">

                                                      <!-- {{ infoModalTrip }} -->
                                                      <div class="info-group">
                                                            <h2>
                                                                  Client
                                                            </h2>
                                                            <div class="info-row">
                                                                  <span class="info-key">Client id: </span>
                                                                  <span class="info-value"> {{ item.client._id }}</span>
                                                            </div>

                                                            <div class="info-row">
                                                                  <span class="info-key">Client name: </span>
                                                                  <span class="info-value"> {{ item.client.name }}</span>
                                                            </div>

                                                            <div class="info-row">
                                                                  <span class="info-key">Client phone: </span>
                                                                  <span class="info-value"> {{ item.client.phone }}</span>
                                                            </div>
                                                      </div>

                                                      <hr />

                                                      <div class="info-group">
                                                            <h2>
                                                                  Driver
                                                            </h2>
                                                            <div class="info-group-body" v-if="item.driver">
                                                                  <div class="info-row">
                                                                        <span class="info-key">Driver id: </span>
                                                                        <span class="info-value"> {{ item.driver._id }}</span>
                                                                  </div>

                                                                  <div class="info-row">
                                                                        <span class="info-key">Driver name: </span>
                                                                        <span class="info-value"> {{ item.driver.name }}</span>
                                                                  </div>

                                                                  <div class="info-row">
                                                                        <span class="info-key">Driver phone: </span>
                                                                        <span class="info-value"> {{ item.driver.phone }}</span>
                                                                  </div>
                                                            </div>

                                                            <div class="no" v-if="!item.driver">
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
                                                                  <span class="info-value"> {{ item.addFrom }}</span>
                                                            </div>

                                                            <div class="info-row">
                                                                  <span class="info-key">Drop off location: </span>
                                                                  <span class="info-value"> {{ item.addTo }}</span>
                                                            </div>

                                                            <div class="info-row">
                                                                  <span class="info-key">Price: </span>
                                                                  <span class="info-value"> {{ item.price }} SDG</span>
                                                            </div>

                                                            <div class="info-row">
                                                                  <span class="info-key">Estimated duration: </span>
                                                                  <span class="info-value"> {{ item.duration }}</span>
                                                            </div>

                                                            <div class="info-row">
                                                                  <span class="info-key">Distance: </span>
                                                                  <span class="info-value"> {{ item.distance }}</span>
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <gmApi id="map" ref="map"></gmApi>
                                                      </div>
                                                </div>
                                          </div>
                                    </CCardBody>
                              </CCollapse>
                        </template>
                  </CDataTable>
            </div>
      </CCardBody>

      <!-- <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              head-color="light"
              no-sorting
            >
              <td slot="avatar" class="text-center" slot-scope="{ item }">
                <div class="c-avatar">
                  <img :src="item.avatar.url" class="c-avatar-img" alt="" />
                  <span
                    class="c-avatar-status"
                    :class="`bg-${item.avatar.status || 'secondary'}`"
                  ></span>
                </div>
              </td>
              <td slot="user" slot-scope="{ item }">
                <div>{{ item.user.name }}</div>
                <div class="small text-muted">
                  <span>
                    <template v-if="item.user.new">New</template>
                    <template v-else>Recurring</template>
                  </span>
                  | Registered: {{ item.user.registered }}
                </div>
              </td>
              <td slot="country" slot-scope="{ item }" class="text-center">
                <CIcon :name="item.country.flag" height="25" />
              </td>
              <td slot="usage" slot-scope="{ item }">
                <div class="clearfix">
                  <div class="float-left">
                    <strong>{{ item.usage.value }}%</strong>
                  </div>
                  <div class="float-right">
                    <small class="text-muted">{{ item.usage.period }}</small>
                  </div>
                </div>
                <CProgress
                  class="progress-xs"
                  v-model="item.usage.value"
                  :color="color(item.usage.value)"
                />
              </td>
              <td slot="payment" slot-scope="{ item }" class="text-center">
                <CIcon :name="item.payment.icon" height="25" />
              </td>
              <td slot="activity" slot-scope="{ item }">
                <div class="small text-muted">Last login</div>
                <strong>{{ item.activity }}</strong>
              </td>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow> -->
</div>
</template>

<script>
import DataTable from "vue-materialize-datatable";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import {
      SweetModal
} from "sweet-modal-vue";
import axios from "axios";
// import VueSkeletonLoader from "skeleton-loader-vue";
//   const fields = [
//   "passenger",
//   "driver",
//   "from",
//   "to",
//   "duration",
//   // {
//   //   key: "edit_roles",
//   //   label: "",
//   //   _style: "width:1%",
//   //   sorter: false,
//   //   filter: false,
//   // },
// ];
const fields = [
      "passenger",
      "driver",
      // {
      //   key: "name",
      //   label: "passenger",
      //   _classes: "font-weight-bold",
      // },
      // {
      //   key: "driverName",
      //   label: "Driver",
      //   _classes: "font-weight-bold",
      // },
      {
            key: "addFrom",
            label: "From",
            _classes: "font-weight-bold",
      },
      {
            key: "addTo",
            label: "To",
            _classes: "font-weight-bold",
      },
      {
            key: "duration",
            label: "Duration",
            _classes: "font-weight-bold",
      },
      {
            key: "price",
            label: "Price",
            _classes: "font-weight-bold",
      },
      "show_details"
];
// const items= trips
export default {
      created() {
            this.refreshData();
            this.getTestData();
            this.getAllTrips();
      },
      name: "TripTracking",
      components: {
            Datepicker: VueDatepickerUi,
            // VueSkeletonLoader,
            datatable: DataTable,
            SweetModal,
            // SweetModalTab,
      },
      data() {
            return {
                  numberOfLiveTrips: undefined,
                  numberOfTripsCost: undefined,
                  numberOfCancelledTrips: undefined,
                  numberOfOnlineDrivers: undefined,
                  numberOfCompletedTrips: undefined,
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU3NmI0NDAwZTlmMjZjMDgwMDdhMDEiLCJpYXQiOjE2MzMxMTkwNTcsImV4cCI6MTk0ODQ3OTA1N30.YVVv0qfttUBQgpmUcfMISg3odM3AthSDaRW-l0ELcBI",
                  i: 0,
                  fields,
                  isConnected: false,
                  socketMessage: "",
                  drivers: [],
                  trips: [{
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
                                    favourite_placese: {},
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
                        },
                        {
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
                                    favourite_placese: {},
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
                  ],
                  items: [],
                  map: null,
                  apiLoading: Boolean,
                  apiError: undefined,
                  infoModalTrip: undefined,
                  searchById: "",
                  searchByName: "",
                  toggle: false,
                  searchQuery: null,
            };
      },
      computed: {
            resultQuery() {
                  if (this.searchQuery) {
                        return this.resources.filter((item) => {
                              return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
                        })
                  } else {
                        return this.resources;
                  }
            },
            computedItems() {
                  return this.trips.map((item) => ({
                              ...trip,
                              name: item.client.name,
                              driverName: item.driver.name,
                        }),
                        console.log("this client")
                  )
            },
            csvData() {
                  return this.trips.map((item) => ({
                        ...item,
                        From: item.addfrom,
                        To: item.addto,
                        Duration: item.duration,
                        Price: item.price,
                        Driver: item.driver,
                        Passenger: item.client,
                  }));
            },
            // dateFilteredItems() {
            //   return this.computedItems.filter(item => {
            //     const date = item.registeredTimestamp
            //     return date >= this.startDate && date <= this.endDate
            //   })
            // }
      },
      methods: {
            toggleDetails(item) {
                  console.log(item, item._id)
                  item.client.disabled = !item.client.disabled
                  console.log(item.client.disabled);

            },
            tr() {
                  return this.trips.map((trip) => {
                        console.log(trip._id);
                        return {
                              ...trip,
                              cl: trip.client.name,
                              driverName: trip.driver.name,
                        };
                  });
            },
            print() {
                  const clonedTable = this.$refs.table.cloneNode(true);
                  this.synchronizeCssStyles(this.$refs.table, clonedTable, true);
                  clonedTable.style.maxWidth = '100%';
                  clonedTable.style.boxShadow = '0px 0px 0px 1px rgba(0,0,0,0.2)';
                  clonedTable.style.margin = '8px auto';
                  clonedTable.querySelector('.actions').remove();
                  clonedTable.querySelector('.material-pagination').remove();
                  clonedTable.querySelector('.datatable-length').remove();
                  clonedTable.querySelectorAll('button').forEach(n => n.remove());
                  let win = window.open('', '');
                  win.document.body.style.fontFamily =
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
                  win.document.body.innerHTML = (clonedTable.outerHTML);
                  win.print();
                  win.close();
            },

            getCardsInfo() {
                  console.log(this.numberOfLiveTrips);
                  axios
                        .get(
                              "https://alsayar-backend-vwmk7.ondigitalocean.app/api/trip/stats", {
                                    headers: {
                                          Authorization: `Bearer ${this.token}`,
                                    },
                              }
                        )

                        .then((response) => {
                              this.numberOfLiveTrips = response.data.activeTrips;
                              this.numberOfTripsCost = response.data.totalTodayPrice;
                              this.numberOfCompletedTrips = response.data.completedToday;
                              this.numberOfCancelledTrips = response.data.canceledTrips;
                              console.log(response.data);
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            },
            getTestData() {
                  axios
                        .get("https://jsonplaceholder.typicode.com/todos/1")
                        .then((res) => {
                              console.log("Test res");
                              console.log(res);
                        })
                        .catch((err) => {
                              console.log("Test err");
                              console.log(err.response);
                        });
            },
            getNumberOfOnlineDrivers() {
                  axios
                        .get(
                              "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/reports/online_drivers", {
                                    headers: {
                                          Authorization: `Bearer ${this.token}`
                                    },
                              }
                        )
                        .then((response) => {
                              this.numberOfOnlineDrivers = response.data.online_drivers;
                              console.log(response.data.online_drivers);
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            },
            resetData() {
                  numberOfLiveTrips = undefined;
                  numberOfTripsCost = undefined;
                  numberOfCancelledTrips = undefined;
                  numberOfOnlineDrivers = undefined;
                  numberOfCompletedTrips = undefined;
            },
            refreshData() {
                  this.getCardsInfo();
                  this.getNumberOfOnlineDrivers();
            },
            showMapModal(trip) {
                  this.initMap(trip);
                  this.$refs.mapModal.open();
            },
            showInfoModal(trip) {
                  this.infoModalTrip = trip;
                  this.$refs.infoModal.open();
            },

            // Map functions
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
            // APIS
            getAllDrivers() {
                  axios
                        .get(
                              "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/get_all_drivers", {
                                    headers: {
                                          Authorization: `Bearer ${this.token}`,
                                    },
                              }
                        )
                        .then((response) => {
                              this.drivers = response.data;
                              console.log(response);
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            },
            goToAddTrip() {
                  this.$router.push("/dashboard/trips/add/1");
            },
            getAllTrips() {
                  this.apiLoading = true;
                  this.apiError = undefined;
                  axios
                        .get(
                              "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/trips/get_all_trips", {
                                    headers: {
                                          Authorization: `Bearer ${this.token}`,
                                    },
                              }
                        )
                        .then((response) => {
                              this.apiLoading = false;
                              this.trips = response.data.allTrips;
                              // this.tr()
                              console.log(response.data);
                        })
                        .catch((error) => {
                              console.log("error");
                              console.log(error);
                              this.apiLoading = false;
                              this.apiError = error;
                              console.log(error);
                        });
            },

            //    function(e){
            //   const n = e.timeStamp || Zo();
            //   (No || n >= r.attached - 1) && Dn(Qo(e, r.value), t, 5, [e])
            // },
            color(value) {
                  let $color;
                  if (value <= 25) {
                        $color = "info";
                  } else if (value > 25 && value <= 50) {
                        $color = "success";
                  } else if (value > 50 && value <= 75) {
                        $color = "warning";
                  } else if (value > 75 && value <= 100) {
                        $color = "danger";
                  }
                  return $color;
            },
            csvExport(arrData) {
                  let csvContent = "data:text/csv;charset=utf-8,";
                  csvContent += [
                              Object.keys(arrData[0]).join(";"),
                              ...arrData.map((item) => Object.values(item).join(";")),
                        ]
                        .join("\n")
                        .replace(/(^\[)|(\]$)/gm, "");

                  const data = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", data);
                  link.setAttribute("download", "export.csv");
                  link.click();
            },
      },
      mounted() {
            fetch(
                        "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/trips/get_all_trips"
                  )
                  .then((resp) => resp.json())
                  .then((json) => (this.trips = json));
      },
};
</script>

<style scoped>
.col-md-4 {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 33.33333%;
      flex: 0 0 33.33333%;
      max-width: 33.33333%;
}

.header {
      margin-top: 0.5em;
      margin-left: 0rem;
      margin-left: 0rem;
      margin-bottom: -1rem;
      color: whitesmoke;
      display: flex;
      justify-content: flex-start;
}

.col-sm-6 {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
}

.tab {
      background-color: white;
}

.cdiv {
      display: flex;
}

.c-icon {
      color: white;
}

.cd {
      display: flex;
      justify-content: flex-end;
}

.h.header {
      display: block;
}

.sp {
      display: flex;
      justify-content: center;
}

.colm {
      margin-left: 1rem;
}

.info-modal {
      width: fit-content;
}
</style>
