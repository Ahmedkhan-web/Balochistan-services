import type {
  Invoice,
  NotificationItem,
  Order,
  ServiceRequest,
  SupportTicket,
} from "@/types";

export const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    reference: "BSS-2026-1042",
    status: "delivered",
    payment_status: "paid",
    payment_method: "stripe",
    total: 38940,
    items: [
      { name: "4MP Dome IP Camera", quantity: 2, price: 10999 },
      { name: "16-Channel 4K NVR", quantity: 1, price: 16942 },
    ],
    created_at: "2026-05-12T10:00:00Z",
  },
  {
    id: "o2",
    reference: "BSS-2026-1067",
    status: "processing",
    payment_status: "paid",
    payment_method: "jazzcash",
    total: 12999,
    items: [{ name: "DCP Fire Extinguisher — 6 KG", quantity: 2, price: 6499 }],
    created_at: "2026-05-28T14:30:00Z",
  },
  {
    id: "o3",
    reference: "BSS-2026-1090",
    status: "pending",
    payment_status: "unpaid",
    payment_method: "cod",
    total: 21500,
    items: [
      { name: "Biometric Attendance Machine", quantity: 1, price: 18999 },
      { name: "Fire Safety Blanket", quantity: 1, price: 1500 },
    ],
    created_at: "2026-06-01T09:15:00Z",
  },
];

export const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: "s1",
    reference: "SR-2026-308",
    service_name: "CCTV Installation",
    status: "scheduled",
    scheduled_at: "2026-06-10T11:00:00Z",
    address: "Main Branch, Jinnah Road, Quetta",
    notes: "8 cameras + NVR, ground + first floor",
    created_at: "2026-05-30T08:00:00Z",
  },
  {
    id: "s2",
    reference: "SR-2026-291",
    service_name: "Fire Extinguisher Refilling",
    status: "completed",
    scheduled_at: "2026-05-20T10:00:00Z",
    address: "Warehouse 3, Industrial Estate",
    created_at: "2026-05-15T12:00:00Z",
  },
  {
    id: "s3",
    reference: "SR-2026-315",
    service_name: "Fire Safety Inspection",
    status: "requested",
    scheduled_at: null,
    address: "Head Office, Quetta",
    created_at: "2026-06-02T16:45:00Z",
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "i1",
    number: "INV-2026-1042",
    amount: 33282,
    tax: 5658,
    total: 38940,
    status: "paid",
    created_at: "2026-05-12T10:05:00Z",
  },
  {
    id: "i2",
    number: "INV-2026-1067",
    amount: 11110,
    tax: 1889,
    total: 12999,
    status: "paid",
    created_at: "2026-05-28T14:35:00Z",
  },
  {
    id: "i3",
    number: "INV-2026-1090",
    amount: 18376,
    tax: 3124,
    total: 21500,
    status: "unpaid",
    created_at: "2026-06-01T09:20:00Z",
  },
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "t1",
    subject: "NVR not recording at night",
    status: "open",
    priority: "high",
    created_at: "2026-06-01T18:00:00Z",
  },
  {
    id: "t2",
    subject: "Invoice correction request",
    status: "resolved",
    priority: "low",
    created_at: "2026-05-22T11:00:00Z",
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Service scheduled",
    message: "Your CCTV installation is scheduled for June 10, 11:00 AM.",
    read: false,
    created_at: "2026-06-02T10:00:00Z",
  },
  {
    id: "n2",
    title: "Order delivered",
    message: "Order BSS-2026-1042 has been delivered.",
    read: false,
    created_at: "2026-05-13T15:00:00Z",
  },
  {
    id: "n3",
    title: "Maintenance reminder",
    message: "Annual fire extinguisher refilling is due next month.",
    read: true,
    created_at: "2026-05-10T09:00:00Z",
  },
];

// Admin analytics
export const REVENUE_BY_MONTH = [
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 510000 },
  { month: "Mar", revenue: 480000 },
  { month: "Apr", revenue: 625000 },
  { month: "May", revenue: 710000 },
  { month: "Jun", revenue: 540000 },
];

export const ADMIN_USERS = [
  { id: "u1", name: "Imran Baloch", email: "imran@nbp.com.pk", role: "customer", status: "active", joined: "2026-01-12" },
  { id: "u2", name: "Sara Ahmed", email: "sara@bss.com.pk", role: "staff", status: "active", joined: "2025-11-03" },
  { id: "u3", name: "Bilal Khan", email: "bilal@bss.com.pk", role: "manager", status: "active", joined: "2025-08-19" },
  { id: "u4", name: "Admin User", email: "admin@bss.com.pk", role: "super_admin", status: "active", joined: "2025-01-01" },
  { id: "u5", name: "Hina Raza", email: "hina@client.com", role: "customer", status: "inactive", joined: "2026-03-22" },
];

export const AUDIT_LOGS = [
  { id: "a1", actor: "admin@bss.com.pk", action: "Updated product price", target: "16-Channel 4K NVR", time: "2026-06-02T12:30:00Z" },
  { id: "a2", actor: "bilal@bss.com.pk", action: "Approved refund", target: "INV-2026-0991", time: "2026-06-01T16:10:00Z" },
  { id: "a3", actor: "sara@bss.com.pk", action: "Created service request", target: "SR-2026-315", time: "2026-06-01T09:05:00Z" },
  { id: "a4", actor: "admin@bss.com.pk", action: "Changed user role", target: "bilal@bss.com.pk → manager", time: "2026-05-28T10:00:00Z" },
];
