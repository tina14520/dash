<template>
  <div>
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
              <td slot="admin" slot-scope="{item}"  class="td">
                <div>{{item.admin.name}}</div>
                <div class="small text-muted">
                  <span>
                    <template v-if="item.admin.new">New</template>
                    <template v-else>Recurring</template>
                  </span> | Registered: {{item.admin.registered}}
                </div>
              </td>
              <td class="td"
                slot="admin type"
                slot-scope="{item}"
              >
               <div>{{item.adminType.name}}</div>
 
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
  name: 'Admins',
  data () {
    return {
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          admin: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          adminType:{name:"Sub Admin"},
          checked:"true"
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          admin: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          adminType:{name:"Super Admin"},
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
          admin: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          adminType:{name:"Super Admin"},

        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          admin: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2015' },                                                                                                                           
          adminType:{name:"Super Admin"},
          
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: 'success' },
          admin: { name: 'Agapetus Tadeáš', new: true, registered: 'Jan 1, 2015' },
          adminType:{name:"Sub Admin"},
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
          admin: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2015' },
          adminType:{name:"Accountent"},
        }
      ],
      tableFields: [
        { key: 'avatar', label: ''},
        { key: 'admin' },
        { key:'admin type'},
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
.td {
    vertical-align: middle;
    font-size: initial;
    font-family: inherit;
    font-weight: 700;
}
</style>
