const permissions= [{
    id: "u1",
    name: "View Users",
    grouping: "Users"
  },
  {
    id: "u2",
    name: "Create Users",
    grouping: "Users"
  },
  {
    id: "u3",
    name: "Remove Users",
    grouping: "Users"
  },
  {
    id: "u4",
    name: "Modify Users",
    grouping: "Users"
  },
  {
    id: "u5",
    name: "Assign Users To Roles",
    grouping: "Users"
  },
  {
    id: "r1",
    name: "Create Roles",
    grouping: "Roles"
  },
  {
    id: "r2",
    name: "Modify Roles",
    grouping: "Roles"
  },
  {
    id: "a1",
    name: "View Assets",
    grouping: "Assets"
  },
  {
    id: "a2",
    name: "Create Asset",
    grouping: "Assets"
  },
  {
    id: "a3",
    name: "Update Asset Info",
    grouping: "Assets"
  },
  {
    id: "a4",
    name: "Locate Assets",
    grouping: "Assets"
  },
  {
    id: "a5",
    name: "Change Asset Availability",
    grouping: "Assets"
  },
  {
    id: "m1",
    name: "View Asset Maintenance Records",
    grouping: "Maintenance"
  },
  {
    id: "m2",
    name: "Change Asset Maintenance Records",
    grouping: "Maintenance"
  },
  {
    id: "c1",
    name: "View Customer",
    grouping: "Customers"
  },
  {
    id: "c2",
    name: "Create Customer",
    grouping: "Customers"
  },
  {
    id: "c3",
    name: "Modify Customer Info",
    grouping: "Customers"
  },
  {
    id: "b1",
    name: "Create Booking",
    grouping: "Booking"
  },
  {
    id: "b2",
    name: "Update Booking",
    grouping: "Booking"
  },
  {
    id: "b3",
    name: "Remove Booking",
    grouping: "Booking"
  },
  {
    id: "f1",
    name: "View Invoices",
    grouping: "Accounting"
  },
  {
    id: "f2",
    name: "Create Invoice",
    grouping: "Accounting"
  },
  {
    id: "f3",
    name: "Update Invoice",
    grouping: "Accounting"
  },
  {
    id: "f4",
    name: "Pay Invoice",
    grouping: "Acounting"
  },
  {
    id: "f5",
    name: "Update Customer Status",
    grouping: "Accounting"
  }
]
const roles= [{
    name: "Admin",
    rolePermissions: ["u1", "u2", "u3", "u4", "u5", "r1", "r2", "a1", "a2", "a3", "a4", "a5", "m1", "m2", "c1", "c2", "c3", "b1", "b2", "b3", "f1", "f2", "f3", "f4", "f5"]
  },
  {
    name: "Sales",
    rolePermissions: ["a1", "a2", "a3", "a4", "a5", "c1", "c2", "c3", "b1", "b2", "b3", "m1"]
  },
  {
    name: "Maintenance",
    rolePermissions: ["a1", "a5", "m1", "m2"]
  },
  {
    name: "Accounting",
    rolePermissions: ["c1", "f1", "f2", "f3", "f4", "f5"]
  }
]
export default {roles,permissions}
