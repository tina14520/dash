<template>
  <div>
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
              <td
                slot="roles"
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

export default {
  name: 'Dashboard',
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
        { key: 'AdminType', label: 'Admin Type'},
        { key:'taxi booking' },
        { key:"reports"},
        { key:"users"},
        { key:"settings"},
        { key:"attendens / break"},
        { key:"roles" }
      ]
    }
  },
  methods: {
    function(e) {
  if (
    e.target === e.currentTarget ||
    e.timeStamp <= 0 ||
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