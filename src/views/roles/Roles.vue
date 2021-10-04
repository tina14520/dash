<template>
  <div>
     <!-- <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="getShuffledUsersData()"
          hover
          striped
          border
          small
          fixed
          caption="Combined All Table"
        />
      </CCol>
    </CRow> -->
    <CRow>
      <CCol  md="12" class="td">
        <CCard>
          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              :items="tableItems"
              :fields="tableFields"
              head-color="black"
              no-sorting
            >
              <td class="td" slot="user" slot-scope="{item}">
                <div >{{item.AdminType}}</div>
              </td>
              <td 
                slot="taxi booking"
              >
                <input type="checkbox" id="checkbox" value="NOT Allowd" v-model="checked">
              </td>
              <td
                slot="reports"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
              </td>
              <td
                slot="settings"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
              </td>
              <td
                slot="users"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
              </td>
              
              <td
                slot="attendens / break"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
              </td>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>

// import CTableWrapper from '../base/Table.vue'
export default {
  name: 'Dashboard',
    // components: { CTableWrapper },

  data () {
    return {
      tableItems: [
        {
         AdminType:'Sub Admin',

        },
        {
          AdminType:'Super Admin',

        },
        {
         AdminType:'Accountent',

        }
      ],
      tableFields: [
        { key: 'AdminType', label: 'Admin Type', _classes: 'text-center' },
        // { key: 'country', _classes: 'text-center' },
        { key:'taxi booking'},
        { key:"reports"},
        { key:"users"},
        {key:"settings"},
        { key:"attendens / break"}
        // { key: 'usage' },
        // { key: 'payment', label: 'Payment method', _classes: 'text-center' },
        // { key: 'activity' },
      ]
    }
  },
  methods: {
    function(e) {
  if (
    // no bubbling, should always fire.
    // this is just a safety net in case event.timeStamp is unreliable in
    // certain weird environments...
    e.target === e.currentTarget ||
    // event is fired after handler attachment
    // bail for environments that have buggy event.timeStamp implementations
    // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
    // #9681 QtWebEngine event.timeStamp is negative value
    e.timeStamp <= 0 ||
    // #9448 bail if event is fired in another document in a multi-page
    // electron/nw.js app, since event.timeStamp will be using a different
    // starting reference
    e.target.ownerDocument !== document
  ) {
    return this.checked.apply(this, arguments)
  }
},
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },

    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    }
  }
}
</script>
<style scoped>
input[type="checkbox"]:checked {
    border-color: var(--checkbox-checked-border-color);
    background-color: var(--checkbox-checked-bgcolor);
    background-image: url("chrome://global/skin/icons/check.svg");
    background-position: center;
    background-repeat: no-repeat;
    -moz-context-properties: fill;
    fill: currentColor;
    color: var(--checkbox-checked-color);
    color-adjust: exact;
}
input[type="checkbox"] {
    -webkit-box-sizing: border-box;
    box-sizing: revert;
    padding-inline-end: 4px;
    margin-right: revert;
    margin-left: revert;
    box-sizing: 6%;
    block-size: fit-content;
    border-block-end-width: revert;
}
/* input[type="checkbox"] {
    appearance: none;
    height: 16px;
    width: 16px;
    border: 1px solid var(--checkbox-border-color);
    background-color: var(--checkbox-unchecked-bgcolor);
    border-radius: 2px;
    margin-inline: 0 6px;
    flex-shrink: 0;
}
input[type="checkbox"] {
    margin-block: 2px;
} */
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid;
    color: white;
    background-color: slategrey;
    border-bottom-color: #d8dbe0;
}
.td {
    vertical-align: middle;
    font-size: initial;
    font-family: inherit;
    font-weight: 700;
}
</style>
