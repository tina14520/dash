<template>
      <!-- <CCardHeader>
        <h2>Routes Google Maps</h2> 
      </CCardHeader> -->
          <CCol>
        <CCard class="bcard">
          <CCardHeader>
            <strong>Trip</strong> Booking
          </CCardHeader>
          <CCardBody>
            <input class="c" type="text" placeholder="Client Name">
            <input class="c" type="phone" placeholder="Client Phone Number">
            <GmapAutocomplete class="ma" placeholder="Start point" @place_changed="setPlace" @change="addMarker(0)" />
            <GmapAutocomplete class="ma" placeholder="End point" @place_changed="setPlace" @change="addMarker(1)" />
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="success"><CIcon name="cil-check-circle"/>Search for Drivers</CButton>
          </CCardFooter>
          <GmapMap :zoom="7" :center="center" style="width: 100%; height: 500px">
          <DirectionsRenderer travelMode="DRIVING" :origin="startLocation" :destination="endLocation" />
        </GmapMap>
        </CCard>
      </CCol>
          <!-- <table>
          
            <tr>
              <th>
                <GmapAutocomplete @place_changed="setPlace" />
              </th>
              <th style="width: 50%;"><button class="btn" @click="addMarker(0)">Add</button></th>
            </tr>
            <tr>
              <th>End Location</th>
              <th>
                <GmapAutocomplete @place_changed="setPlace" />
              </th>
              <th style="width: 50%;"><button class="btn" @click="addMarker(1)">Add</button></th>
            </tr>
          </table> -->
        
        <!-- <GmapMap :zoom="7" :center="center" style="width: 100%; height: 500px">
          <DirectionsRenderer travelMode="DRIVING" :origin="startLocation" :destination="endLocation" />
        </GmapMap> -->    
</template>
<script>
  import DirectionsRenderer from "./DirectionsRenderer";
  export default {
    name: 'StandardButtons',
    components: {
      DirectionsRenderer,
    },
    data() {
      return {
        center: {
          lat: 15.5927666,
          lng: 32.5522355
        },
        currentPlace: null,
        markers: [],
        places: [],
        startLocation: null,
        endLocation: null,
      };
    },
    methods: {
      setPlace(place) {
        this.currentPlace = place;
        // this.addMarker(index)
      },
      addMarker(index) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        if (index === 0) this.startLocation = marker;
        if (index === 1) this.endLocation = marker;
                  console.log('select')

        this.center = marker;
      },
    },
  }
</script>
<style>
.ma {
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
    margin-top:0.5rem;
    margin-bottom:0.5rem;
}
.c{
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
.bcard{
  width:100%;
 margin-top:0rem;
 padding:0rem 0rem 0rem 0rem;
}
</style>