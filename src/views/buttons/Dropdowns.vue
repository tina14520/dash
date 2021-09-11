<template>
  <div>
    <CRow>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="87,500" text="Number of live trips " color="gradient-info" inverse>
          <CIcon name="cil-location-pin" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="12,356" text="Number of completed trips (per Day)" color="gradient-success"
          inverse>
          <CIcon name="cil-task" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="10,238" text="Number of cancelled trips" color="gradient-danger" inverse>
          <CIcon name="cil-ban" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="20.098$" text="Number of trips cost (per Day)" color="gradient-primary" inverse>
          <CIcon name="cil-cash" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="5,000" text="Number of free vehicles" color="gradient-warning" inverse>
          <CIcon name="cil-group" height="36" />
        </CWidgetProgressIcon>
      </CCol>
    </CRow>
    <CCardBody class="tab">
      <div class="c">
      <div class="col-sm-6 form-inline p-0">
        <Datepicker :range="true" lang="en" firstDayOfWeek="sunday"  /> 
      </div>
      <div class="cd col-sm-6 form-inline p-0">
        <CButton class="btn d-sm-down-none btn-success" variant="outline" square size="sm">
          <!-- <CIcon name="cil-print" /> -->
          <a download="coreui-table-data.csv" rel="noonpener"
            href="data:text/csv;charset=utf-8,SEP=,%0ASamppa%20Nori%2C2012%2F01%2F01%2CMember%2CActive%0AEstavan%20Lykos%2C2012%2F02%2F01%2CStaff%2CBanned%0AChetan%20Mohamed%2C2012%2F02%2F01%2CAdmin%2CInactive%0ADerick%20Maximinus%2C2012%2F03%2F01%2CMember%2CPending%0AFriderik%20D%C3%A1vid%2C2012%2F01%2F21%2CStaff%2CActive%0AYiorgos%20Avraamu%2C2012%2F01%2F01%2CMember%2CActive%0AAvram%20Tarasios%2C2012%2F02%2F01%2CStaff%2CBanned%2Ctable-success%0AQuintin%20Ed%2C2012%2F02%2F01%2CAdmin%2CInactive%0AEn%C3%A9as%20Kwadwo%2C2012%2F03%2F01%2CMember%2CPending%0AAgapetus%20Tade%C3%A1%C5%A1%2C2012%2F01%2F21%2CStaff%2CActive%0ACarwyn%20Fachtna%2C2012%2F01%2F01%2CMember%2CActive%2Ctable-success%0ANehemiah%20Tatius%2C2012%2F02%2F01%2CStaff%2CBanned%0AEbbe%20Gemariah%2C2012%2F02%2F01%2CAdmin%2CInactive%0AEustorgios%20Amulius%2C2012%2F03%2F01%2CMember%2CPending%0ALeopold%20G%C3%A1sp%C3%A1r%2C2012%2F01%2F21%2CStaff%2CActive%0APompeius%20Ren%C3%A9%2C2012%2F01%2F01%2CMember%2CActive%0APa%C4%89jo%20Jadon%2C2012%2F02%2F01%2CStaff%2CBanned%0AMicheal%20Mercurius%2C2012%2F02%2F01%2CAdmin%2CInactive%0AGanesha%20Dubhghall%2C2012%2F03%2F01%2CMember%2CPending%0AHiroto%20%C5%A0imun%2C2012%2F01%2F21%2CStaff%2CActive%0AVishnu%20Serghei%2C2012%2F01%2F01%2CMember%2CActive%0AZbyn%C4%9Bk%20Phoibos%2C2012%2F02%2F01%2CStaff%2CBanned%0AEinar%20Randall%2C2012%2F02%2F01%2CAdmin%2CInactive%2Ctable-danger%0AF%C3%A9lix%20Troels%2C2012%2F03%2F21%2CStaff%2CActive%0AAulus%20Agmundr%2C2012%2F01%2F01%2CMember%2CPending"
            targrt="_blank"><CIcon color="white" name="cil-print" /> </a>
        </CButton>
      </div>
      </div>
      <CDataTable :items="items" :fields="fields" column-filter table-filter items-per-page-select :items-per-page="5"
        striped border small fixed hover sorter pagination>
        <template #status="{ item }">
          <td>
            <CSwitch class="mx-1" color="success" data-checked="On" data-unchecked="Off"
              :checked="item.status == 1 ? true : false" variant="3d" />
          </td>
        </template>
        <template #show_details="{ item, index }">
          <td class="py-2">
            <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
              {{ Boolean(item._toggled) ? "Hide" : "Details" }}
            </CButton>
          </td>
        </template>
        <template #details="{ item }">
          <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
            <CCardBody>
              <CMedia :aside-image-props="{ height: 102 }">
                <h4>
                  {{ item.username }}
                </h4>
                <p class="text-muted">User since: {{ item.registered }}</p>
                <CButton size="sm" color="info" class=""> User Settings </CButton>
                <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
              </CMedia>
            </CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
    </CCardBody>
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardBody>
            <CDataTable class="mb-0 table-outline" hover :items="tableItems" :fields="tableFields" head-color="light"
              no-sorting>
              <td slot="avatar" class="text-center" slot-scope="{ item }">
                <div class="c-avatar">
                  <img :src="item.avatar.url" class="c-avatar-img" alt="" />
                  <span class="c-avatar-status" :class="`bg-${item.avatar.status || 'secondary'}`"></span>
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
                <CProgress class="progress-xs" v-model="item.usage.value" :color="color(item.usage.value)" />
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
    </CRow>
  </div>
</template>

<script>
  // import usersData from "../users/UsersData";
  import 'vue-datepicker-ui/lib/vuedatepickerui.css';
  import VueDatepickerUi from 'vue-datepicker-ui';

  export default {
    name: "Dropdowns",
    components: {
      Datepicker: VueDatepickerUi
    },
    data() {
      return {
        i: 0,
        items: [{
            Driver: 'Samppa Nori',
            Duration: '1 Hour',
            Passenger: 'Mark Roe',
            Trip_Status: 'Active'
          },
          {
            Driver: 'Estavan Lykos',
            Duration: '30 Min',
            Passenger: 'Mole bloom',
            Trip_Status: 'Active'
          },
          {
            Driver: 'Chetan Mohamed',
            Duration: '15 Min',
            Passenger: 'Sandy rocher',
            Trip_Status: 'Active'
          },
          {
            Driver: 'Derick Maximinus',
            Duration: '50 Min',
            Passenger: 'lina Ali',
            Trip_Status: 'Active'
          },
          {
            Driver: 'Friderik Dávid',
            Duration: '2 Hour',
            Passenger: 'jack mayo',
            Trip_Status: 'Active'
          },
          {
            Driver: 'Yiorgos Avraamu',
            Duration: '3 Hour',
            Passenger: 'Member',
            Trip_Status: 'Active'
          }
        ],
        fields: [{
            key: "Driver",
            label: "Driver",
            _classes: "font-weight-bold"
          },
          {
            key: "Duration"
          },
          {
            key: "Passenger"
          },
          {
            key: "Trip_Status"
          },
        ],
        tableItems: [{
            avatar: {
              url: "img/avatars/1.jpg",
              status: "success"
            },
            user: {
              name: "Yiorgos Avraamu",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "USA",
              flag: "cif-us"
            },
            usage: {
              value: 50,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Mastercard",
              icon: "cib-cc-mastercard"
            },
            activity: "10 sec ago",
          },
          {
            avatar: {
              url: "img/avatars/2.jpg",
              status: "danger"
            },
            user: {
              name: "Avram Tarasios",
              new: false,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "Brazil",
              flag: "cif-br"
            },
            usage: {
              value: 22,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Visa",
              icon: "cib-cc-visa"
            },
            activity: "5 minutes ago",
          },
          {
            avatar: {
              url: "img/avatars/3.jpg",
              status: "warning"
            },
            user: {
              name: "Quintin Ed",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "India",
              flag: "cif-in"
            },
            usage: {
              value: 74,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Stripe",
              icon: "cib-stripe"
            },
            activity: "1 hour ago",
          },
          {
            avatar: {
              url: "img/avatars/4.jpg",
              status: ""
            },
            user: {
              name: "Enéas Kwadwo",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "France",
              flag: "cif-fr"
            },
            usage: {
              value: 98,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "PayPal",
              icon: "cib-paypal"
            },
            activity: "Last month",
          },
          {
            avatar: {
              url: "img/avatars/5.jpg",
              status: "success"
            },
            user: {
              name: "Agapetus Tadeáš",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "Spain",
              flag: "cif-es"
            },
            usage: {
              value: 22,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Google Wallet",
              icon: "cib-google-pay"
            },
            activity: "Last week",
          },
          {
            avatar: {
              url: "img/avatars/6.jpg",
              status: "danger"
            },
            user: {
              name: "Friderik Dávid",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "Poland",
              flag: "cif-pl"
            },
            usage: {
              value: 43,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Amex",
              icon: "cib-cc-amex"
            },
            activity: "Last week",
          },
        ],
        tableFields: [{
            key: "avatar",
            label: "",
            _classes: "text-center"
          },
          {
            key: "user"
          },
          {
            key: "country",
            _classes: "text-center"
          },
          {
            key: "usage"
          },
          {
            key: "payment",
            label: "Payment method",
            _classes: "text-center"
          },
          {
            key: "activity"
          },
        ],
      };
    },
    methods: {
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

  .col-sm-6 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }

  .tab {
    background-color: white;
  }

  .c{
 display: ruby;

}
.c-icon{
  color: white;
}
.cd{
  display: flex;
justify-content: flex-end
}
</style>