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
      <CCol md="12">
        <CCard>
          <CCardBody>
            <CDataTable
              class="mb-0 table-outline"
              hover
              :items="tableItems"
              :fields="tableFields"
              head-color="light"
              no-sorting
            >
              <td slot="avatar" class="text-center" slot-scope="{item}">
                <div class="c-avatar">
                  <img :src="item.avatar.url" class="c-avatar-img" alt="">
                  <span
                    class="c-avatar-status"
                    :class="`bg-${item.avatar.status || 'secondary'}`"
                  ></span>
                </div>
              </td>
              <td slot="user" slot-scope="{item}">
                <div>{{item.user.name}}</div>
                <div class="small text-muted">
                  <span>
                    <template v-if="item.user.new">New</template>
                    <template v-else>Recurring</template>
                  </span> | Registered: {{item.user.registered}}
                </div>
              </td>
              <!-- <td
                slot="country"
                slot-scope="{item}"
                class="text-center"
              >
                <CIcon
                  :name="item.country.flag"
                  height="25"
                />
              </td> -->
              <td
                slot="taxi booking"
              >
                <input type="checkbox" id="checkbox" value="NOT Allowd" v-model="checked">
                  <label for="checkbox">{{ checked }}</label>
              </td>
              <td
                slot="reports"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
                  <label for="checkbox">{{ checked }}</label>
              </td>
              <td
                slot="settings"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
                  <label for="checkbox">{{ checked }}</label>
              </td>
              <td
                slot="users"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
                  <label for="checkbox">{{ checked }}</label>
              </td>
              
              <td
                slot="attendens / break"
              >
                <input type="checkbox" id="checkbox" v-model="checked">
                  <label for="checkbox">Allowed</label>
              </td>
              
              <!-- <td slot="usage" slot-scope="{item}">
                <div class="clearfix">
                  <div class="float-left">
                    <strong>{{item.usage.value}}%</strong>
                  </div>
                  <div class="float-right">
                    <small class="text-muted">{{item.usage.period}}</small>
                  </div>
                </div>
                <CProgress
                  class="progress-xs"
                  v-model="item.usage.value"
                  :color="color(item.usage.value)"
                />
              </td> -->
              <!-- <td
                slot="payment"
                slot-scope="{item}"
                class="text-center"
              >
                <CIcon
                  :name="item.payment.icon"
                  height="25"
                />
              </td>
              <td slot="activity" slot-scope="{item}">
                <div class="small text-muted">Last login</div>
                <strong>{{item.activity}}</strong>
              </td> -->
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>

// import CTableWrapper from '../base/Table.vue'
import usersData from './UsersData'
export default {
  name: 'Dashboard',
    // components: { CTableWrapper },

  data () {
    return {
      checked: "Not Allowd",
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'cif-us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
          activity: '10 sec ago',
          checked:"true"
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'cif-br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'cib-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'cif-in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'cib-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'cif-fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'cib-paypal' },
          activity: 'Last month'
          
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'cif-es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'cib-google-pay' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'cif-pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'cib-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: [
        { key: 'avatar', label: '', _classes: 'text-center' },
        { key: 'user' },
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
</style>