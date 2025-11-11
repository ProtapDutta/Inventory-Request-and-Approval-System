Inventory-Request-and-Approval-System/
│
├── backend/
│   ├── config/
│   │   └── db.js                    (MongoDB connection)
│   │
│   ├── models/
│   │   ├── User.js                  (User schema - admin, employee)
│   │   └── Request.js               (Request schema - item requests)
│   │
│   ├── routes/
│   │   ├── authRoutes.js            (Login, register routes)
│   │   ├── employeeRoutes.js        (Employee request routes)
│   │   └── adminRoutes.js           (Admin approval routes)
│   │
│   ├── controllers/
│   │   ├── authController.js        (Auth logic)
│   │   ├── employeeController.js    (Employee logic)
│   │   └── adminController.js       (Admin logic)
│   │
│   ├── middleware/
│   │   ├── auth.js                  (JWT verification)
│   │   └── role.js                  (Role-based access)
│   │
│   ├── scripts/
│   │   └── seedAdmin.js             (Create admin user)
│   │
│   ├── .env                         (Environment variables)
│   ├── .gitignore                   (Git ignore rules)
│   ├── server.js                    (Main server file)
│   ├── vercel.json                  (Vercel config)
│   ├── package.json                 (Dependencies)
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── vite.svg                 (Asset)
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx        (Login page)
│   │   │   ├── CreateEmployeeForm.jsx
│   │   │   ├── CreateRequestForm.jsx
│   │   │   ├── RequestTable.jsx
│   │   │   ├── EmployeesList.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ApprovalModal.jsx
│   │   │   ├── NavPanel.jsx
│   │   │   └── SuccessNotification.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── EmployeeDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js               (Axios config + API calls)
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx      (Global auth state)
│   │   │
│   │   ├── App.jsx                  (Main app component)
│   │   ├── main.jsx                 (React entry point)
│   │   └── index.css                (Global styles)
│   │
│   ├── .env.production              (Production env vars)
│   ├── .gitignore
│   ├── vite.config.js               (Vite config)
│   ├── package.json
│   ├── package-lock.json
│   └── index.html                   (HTML entry point)
│
├── .gitignore                       (Root .gitignore)
└── README.md                        (Project documentation)
