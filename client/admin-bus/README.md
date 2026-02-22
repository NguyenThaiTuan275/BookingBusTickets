# 📚 Tài Liệu Hướng Dẫn - Hệ Thống Quản Lý Đặt Vé Xe (Admin Bus)

## 📋 Mục Lục

1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
3. [Chi Tiết Các Thư Mục và File](#chi-tiết-các-thư-mục-và-file)
4. [Cách Thức Hoạt Động](#cách-thức-hoạt-động)
5. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
6. [Hướng Dẫn Cài Đặt và Chạy](#hướng-dẫn-cài-đặt-và-chạy)

---

## 🎯 Tổng Quan Dự Án

Đây là **ứng dụng quản trị (Admin Panel)** được xây dựng bằng **React.js** và **CoreUI** để quản lý hệ thống đặt vé xe. Ứng dụng cung cấp giao diện quản trị cho các chức năng:

- Quản lý công ty xe khách
- Quản lý xe và chỗ ngồi
- Quản lý tuyến đường và bến xe
- Quản lý lịch trình và vé xe
- Quản lý người dùng và tài khoản
- Báo cáo doanh thu và thống kê

---

## 📁 Cấu Trúc Thư Mục

```
admin-bus/
├── public/                    # Thư mục chứa các file tĩnh (static files)
│   ├── asets/                # Assets (hình ảnh, icon, etc.)
│   ├── bus_company/          # Hình ảnh công ty xe khách
│   ├── image/                # Hình ảnh chung
│   ├── img/                  # Hình ảnh khác
│   ├── favicon.ico           # Icon của website
│   └── manifest.json         # Cấu hình PWA
│
├── src/                       # Thư mục chứa source code chính
│   ├── assets/               # Tài nguyên (logo, hình ảnh, icons)
│   ├── components/           # Các component tái sử dụng
│   ├── layout/               # Layout components (header, sidebar, footer)
│   ├── lib/                  # Thư viện và utilities
│   ├── routes.js             # Cấu hình routing
│   ├── scss/                 # Styles (SCSS)
│   ├── store/                # Redux store và slices
│   ├── views/                # Các trang/views chính
│   ├── _nav.js               # Cấu hình navigation menu
│   ├── App.js                # Component gốc của ứng dụng
│   ├── index.js              # Entry point của ứng dụng
│   └── store.js              # Redux store configuration
│
├── index.html                # File HTML template
├── package.json              # Dependencies và scripts
├── vite.config.mjs          # Cấu hình Vite (build tool)
└── eslint.config.mjs        # Cấu hình ESLint (code linting)
```

---

## 📂 Chi Tiết Các Thư Mục và File

### 🗂️ **Thư Mục Root**

#### `index.html`
- **Chức năng**: File HTML template chính, là điểm bắt đầu của ứng dụng
- **Mô tả**: Chứa cấu trúc HTML cơ bản, khai báo meta tags, và mount point `<div id="root">` nơi React sẽ render ứng dụng
- **Vai trò**: Entry point cho trình duyệt, tải các script và styles cần thiết

#### `package.json`
- **Chức năng**: File quản lý dependencies và scripts của dự án
- **Mô tả**: 
  - Liệt kê tất cả các thư viện cần thiết (React, CoreUI, Redux, Axios, etc.)
  - Định nghĩa các scripts: `start` (chạy dev server), `build` (build production), `lint` (kiểm tra code)
- **Vai trò**: Quản lý phiên bản packages và cấu hình dự án

#### `vite.config.mjs`
- **Chức năng**: Cấu hình cho Vite (build tool và dev server)
- **Mô tả**: 
  - Cấu hình dev server chạy ở port 3000
  - Thiết lập proxy để forward requests đến backend API (localhost:5000)
  - Cấu hình alias cho đường dẫn (`src/`)
  - Cấu hình PostCSS và autoprefixer cho CSS
- **Vai trò**: Quản lý quá trình build và development server

#### `eslint.config.mjs`
- **Chức năng**: Cấu hình ESLint để kiểm tra và đảm bảo chất lượng code
- **Mô tả**: Định nghĩa các rules cho code style, linting React code, và tích hợp với Prettier
- **Vai trò**: Đảm bảo code nhất quán và tuân thủ best practices

---

### 🗂️ **Thư Mục `public/`**

#### `public/`
- **Chức năng**: Chứa các file tĩnh được phục vụ trực tiếp bởi server
- **Mô tả**: 
  - Các file trong thư mục này không được xử lý bởi build process
  - Có thể truy cập trực tiếp qua URL (ví dụ: `/favicon.ico`)
- **Các thư mục con**:
  - `asets/images/`: Hình ảnh assets
  - `bus_company/`: Hình ảnh logo công ty xe khách
  - `image/`: Hình ảnh chung của ứng dụng
  - `img/`: Hình ảnh khác
- **File quan trọng**:
  - `favicon.ico`: Icon hiển thị trên tab trình duyệt
  - `manifest.json`: Cấu hình Progressive Web App (PWA)

---

### 🗂️ **Thư Mục `src/` - Source Code Chính**

#### `src/index.js`
- **Chức năng**: Entry point của ứng dụng React
- **Mô tả**: 
  - Import React và ReactDOM
  - Tạo Redux Provider để wrap toàn bộ ứng dụng
  - Mount React app vào DOM element `#root`
  - Import `core-js` để polyfill cho các tính năng JavaScript mới
- **Vai trò**: Điểm bắt đầu thực thi ứng dụng, khởi tạo React app với Redux store

#### `src/App.js`
- **Chức năng**: Component gốc của ứng dụng
- **Mô tả**: 
  - Sử dụng `HashRouter` từ React Router để quản lý routing
  - Quản lý theme (light/dark mode) sử dụng CoreUI's `useColorModes`
  - Render `DefaultLayout` component với Suspense để lazy load components
  - Tích hợp với Redux để lấy theme state
- **Vai trò**: Thiết lập routing, theme management, và wrap ứng dụng với layout chính

#### `src/routes.js`
- **Chức năng**: Định nghĩa tất cả các routes của ứng dụng
- **Mô tả**: 
  - Sử dụng React.lazy() để lazy load các components (code splitting)
  - Định nghĩa các routes như `/dashboard`, `/bus-company`, `/routes`, etc.
  - Tất cả routes được wrap trong `AppLayout` component
- **Vai trò**: Cấu hình routing, định nghĩa các đường dẫn và component tương ứng

#### `src/_nav.js`
- **Chức năng**: Cấu hình menu navigation (sidebar menu)
- **Mô tả**: 
  - Định nghĩa cấu trúc menu với các nhóm: "Quản lý hệ thống", "Quản lý hoạt động", "Quản lý người dùng", "Báo cáo & Thống kê"
  - Mỗi menu item có icon, tên, và đường dẫn (to)
  - Sử dụng CoreUI icons và components (`CNavItem`, `CNavGroup`)
- **Vai trò**: Cấu hình sidebar navigation, quản lý menu items và cấu trúc menu

---

### 🗂️ **Thư Mục `src/store/` - Redux State Management**

#### `src/store.js`
- **Chức năng**: Cấu hình Redux store chính
- **Mô tả**: 
  - Tạo Redux store sử dụng `@reduxjs/toolkit`
  - Combine các reducers: `app` (quản lý sidebar, theme) và `auth` (quản lý authentication)
  - Cấu hình middleware để xử lý serialization
- **Vai trò**: Quản lý global state của ứng dụng, tích hợp Redux với React

#### `src/store/authSlice.js`
- **Chức năng**: Redux slice quản lý authentication state
- **Mô tả**: 
  - Quản lý state: `user`, `token`, `isAuthenticated`, `loading`, `error`
  - Các actions: `loginUser`, `logoutUser`, `setLoading`, `setError`, `updateUser`
  - Lưu token vào localStorage để persist authentication
- **Vai trò**: Quản lý trạng thái đăng nhập/đăng xuất, thông tin user, và authentication token

---

### 🗂️ **Thư Mục `src/lib/` - Thư Viện và Utilities**

#### `src/lib/Api.js`
- **Chức năng**: File chứa tất cả các API calls đến backend
- **Mô tả**: 
  - Tạo axios instance với baseURL và timeout
  - Request interceptor: Tự động thêm Authorization token vào headers
  - Response interceptor: Xử lý lỗi 401 (unauthorized) và redirect đến login
  - Export các API services:
    - `authAPI`: Login, logout, register, reset password, get profile
    - `busCompanyAPI`: CRUD operations cho công ty xe khách
    - `stationAPI`: CRUD operations cho bến xe
    - `routesAPI`: CRUD operations cho tuyến đường
    - `carsAPI`: CRUD operations cho xe
    - `seatsAPI`: Quản lý chỗ ngồi
    - `vehicleSchedulesAPI`: Quản lý lịch trình xe
    - `ticketAPI`: Quản lý vé xe
    - `userAPI`: Quản lý người dùng
    - `statisticsAPI`: Lấy thống kê cho dashboard
- **Vai trò**: Centralized API management, xử lý authentication headers, và error handling

---

### 🗂️ **Thư Mục `src/components/` - Reusable Components**

#### `src/components/AppContent.js`
- **Chức năng**: Component chứa nội dung chính của ứng dụng
- **Mô tả**: 
  - Định nghĩa tất cả các routes với React Router
  - Sử dụng `ProtectedRoute` để bảo vệ các routes cần authentication
  - Route `/login` là public, các route khác đều protected
  - Lazy load tất cả các view components
- **Vai trò**: Quản lý routing và bảo vệ routes, render các pages tương ứng

#### `src/components/ProtectedRoute.js`
- **Chức năng**: Component bảo vệ các routes cần authentication
- **Mô tả**: 
  - Kiểm tra `isAuthenticated` từ Redux store
  - Nếu chưa đăng nhập, redirect đến `/login`
  - Nếu đã đăng nhập, render children (component được bảo vệ)
- **Vai trò**: Authentication guard cho các routes

#### `src/components/AppHeader.js`
- **Chức năng**: Component header của ứng dụng
- **Mô tả**: 
  - Hiển thị logo, search bar, notifications
  - Chứa dropdown menu cho user profile
  - Có thể toggle sidebar
- **Vai trò**: Navigation bar trên cùng, hiển thị thông tin user và notifications

#### `src/components/AppSidebar.js`
- **Chức năng**: Component sidebar (menu bên trái)
- **Mô tả**: 
  - Hiển thị menu navigation từ `_nav.js`
  - Có thể collapse/expand
  - Responsive cho mobile
- **Vai trò**: Sidebar navigation, điều hướng giữa các trang

#### `src/components/AppFooter.js`
- **Chức năng**: Component footer của ứng dụng
- **Mô tả**: 
  - Hiển thị thông tin copyright, links
  - Footer ở dưới cùng của trang
- **Vai trò**: Footer của ứng dụng

#### `src/components/AppSidebarNav.js`
- **Chức năng**: Component render navigation items trong sidebar
- **Mô tả**: 
  - Nhận menu items từ props
  - Render các menu items với icons và links
  - Xử lý nested menu groups
- **Vai trò**: Render cấu trúc menu navigation

#### `src/components/header/AppHeaderDropdown.js`
- **Chức năng**: Dropdown menu trong header (user menu)
- **Mô tả**: 
  - Hiển thị user avatar và menu
  - Các options: Profile, Settings, Logout
- **Vai trò**: User menu dropdown

---

### 🗂️ **Thư Mục `src/layout/` - Layout Components**

#### `src/layout/DefaultLayout.js`
- **Chức năng**: Layout component chính cho ứng dụng
- **Mô tả**: 
  - Kiểm tra authentication state
  - Nếu chưa đăng nhập, chỉ render `AppContent` (cho login page)
  - Nếu đã đăng nhập, render full layout với `AppSidebar`, `AppHeader`, `AppContent`, `AppFooter`
- **Vai trò**: Định nghĩa cấu trúc layout chính của ứng dụng

#### `src/layout/AppLayout.js`
- **Chức năng**: Alternative layout component với sidebar và header
- **Mô tả**: 
  - Layout với sidebar có thể toggle, header với breadcrumb
  - Sử dụng `Outlet` từ React Router để render child routes
  - Có state để quản lý sidebar visibility
- **Vai trò**: Layout component với sidebar và header đầy đủ

#### `src/layout/AppBreadcrumb.js`
- **Chức năng**: Component hiển thị breadcrumb navigation
- **Mô tả**: 
  - Hiển thị đường dẫn hiện tại (ví dụ: Home > Dashboard > Users)
  - Giúp user biết vị trí hiện tại trong ứng dụng
- **Vai trò**: Breadcrumb navigation

#### `src/layout/sidebar/AppSidebarNav.js`
- **Chức năng**: Component render sidebar navigation
- **Mô tả**: 
  - Tương tự `components/AppSidebarNav.js` nhưng được đặt trong layout folder
  - Render menu items từ `_nav.js`
- **Vai trò**: Sidebar navigation rendering

#### `src/layout/header/AppHeaderDropdown.js`
- **Chức năng**: Dropdown menu trong header layout
- **Mô tả**: 
  - Tương tự `components/header/AppHeaderDropdown.js`
  - User profile dropdown
- **Vai trò**: User menu trong header

---

### 🗂️ **Thư Mục `src/views/` - Các Trang/Views Chính**

Thư mục này chứa tất cả các trang chính của ứng dụng. Mỗi thư mục con đại diện cho một module/quản lý:

#### `src/views/auth/Login.js`
- **Chức năng**: Trang đăng nhập
- **Mô tả**: 
  - Form đăng nhập với email và password
  - Gọi `authAPI.login()` để authenticate
  - Lưu token vào localStorage và Redux store
  - Redirect đến dashboard sau khi đăng nhập thành công
- **Vai trò**: Authentication page

#### `src/views/dashboard/Dashboard.js`
- **Chức năng**: Trang dashboard (trang chủ)
- **Mô tả**: 
  - Hiển thị thống kê tổng quan: tổng số công ty, bến xe, doanh thu, etc.
  - Sử dụng `statisticsAPI` để lấy dữ liệu
  - Hiển thị charts và cards với thông tin quan trọng
- **File liên quan**: `MainChart.js` - Component hiển thị biểu đồ
- **Vai trò**: Trang tổng quan hệ thống

#### `src/views/bus-company/BusCompany.js`
- **Chức năng**: Trang quản lý công ty xe khách
- **Mô tả**: 
  - Hiển thị danh sách công ty với pagination, search, sort
  - CRUD operations: Create, Read, Update, Delete
  - Upload logo công ty
- **File liên quan**: 
  - `BusCompanyModal.js` - Modal form để thêm/sửa công ty
  - `CompanyLogo.js` - Component hiển thị logo
- **Vai trò**: Quản lý công ty xe khách

#### `src/views/bus-management/BusManagement.js`
- **Chức năng**: Trang quản lý xe
- **Mô tả**: 
  - Quản lý thông tin xe: số xe, loại xe, số chỗ ngồi, công ty sở hữu
  - CRUD operations cho xe
  - Upload hình ảnh xe
- **File liên quan**: `BusManagementModal.js` - Modal form cho xe
- **Vai trò**: Quản lý phương tiện (xe)

#### `src/views/routes/Routes.js`
- **Chức năng**: Trang quản lý tuyến đường
- **Mô tả**: 
  - Quản lý các tuyến đường: điểm đi, điểm đến, khoảng cách, thời gian
  - Liên kết với bến xe đi và bến xe đến
  - CRUD operations
- **File liên quan**: `RoutesModal.js` - Modal form cho tuyến đường
- **Vai trò**: Quản lý tuyến đường

#### `src/views/station/StationManageMent.js`
- **Chức năng**: Trang quản lý bến xe
- **Mô tả**: 
  - Quản lý thông tin bến xe: tên, địa chỉ, tỉnh/thành phố
  - Upload hình ảnh và wallpaper cho bến xe
  - CRUD operations
- **File liên quan**: 
  - `StationModal.js` - Modal form cho bến xe
  - `StationImage.js` - Component quản lý hình ảnh bến xe
- **Vai trò**: Quản lý bến xe

#### `src/views/seats/Seats.js`
- **Chức năng**: Trang quản lý chỗ ngồi
- **Mô tả**: 
  - Quản lý chỗ ngồi của từng xe
  - Tạo tự động chỗ ngồi theo layout (số hàng, số cột)
  - Hiển thị sơ đồ chỗ ngồi
- **File liên quan**: `SeatsModal.js` - Modal để tạo/sửa chỗ ngồi
- **Vai trò**: Quản lý chỗ ngồi xe

#### `src/views/schedule/ScheduleManagement.js`
- **Chức năng**: Trang quản lý lịch trình
- **Mô tả**: 
  - Quản lý lịch trình xe chạy: ngày giờ khởi hành, tuyến đường, xe, giá vé
  - Lên lịch cho các chuyến xe
  - CRUD operations
- **File liên quan**: `ScheduleModal.js` - Modal form cho lịch trình
- **Vai trò**: Quản lý lịch trình chuyến xe

#### `src/views/ticket/TicketManagement.js`
- **Chức năng**: Trang quản lý vé xe
- **Mô tả**: 
  - Xem danh sách vé đã đặt
  - Quản lý trạng thái vé: đã đặt, đã thanh toán, đã hủy
  - Tìm kiếm vé theo mã vé hoặc số điện thoại
  - Hủy vé (admin)
- **Vai trò**: Quản lý vé xe đã đặt

#### `src/views/user/UserManagement.js`
- **Chức năng**: Trang quản lý người dùng
- **Mô tả**: 
  - Xem danh sách người dùng đã đăng ký
  - Quản lý thông tin user: email, tên, số điện thoại, role
  - CRUD operations
- **Vai trò**: Quản lý người dùng hệ thống

#### `src/views/account/AccountManagement.js`
- **Chức năng**: Trang quản lý tài khoản
- **Mô tả**: 
  - Quản lý tài khoản admin
  - Có thể khác với UserManagement (quản lý tài khoản admin riêng)
- **Vai trò**: Quản lý tài khoản admin

#### `src/views/reports/RevenueReport.js`
- **Chức năng**: Trang báo cáo doanh thu
- **Mô tả**: 
  - Hiển thị báo cáo doanh thu theo thời gian
  - Biểu đồ doanh thu
  - Export báo cáo
- **Vai trò**: Báo cáo doanh thu

#### `src/views/reports/TripStatistics.js`
- **Chức năng**: Trang thống kê chuyến xe
- **Mô tả**: 
  - Thống kê số lượng chuyến xe
  - Thống kê theo tuyến đường, theo công ty
  - Biểu đồ và bảng thống kê
- **Vai trò**: Thống kê chuyến xe

#### `src/views/reports/ReviewReport.js`
- **Chức năng**: Trang báo cáo đánh giá
- **Mô tả**: 
  - Xem đánh giá của khách hàng
  - Thống kê rating
- **Vai trò**: Báo cáo đánh giá

#### `src/views/settings/SystemSettings.js`
- **Chức năng**: Trang cài đặt hệ thống
- **Mô tả**: 
  - Cấu hình hệ thống
  - Settings chung
- **Vai trò**: Cài đặt hệ thống

#### `src/views/banner/BannerManagement.js`
- **Chức năng**: Trang quản lý banner
- **Mô tả**: 
  - Quản lý banner quảng cáo
  - Upload và quản lý hình ảnh banner
- **Vai trò**: Quản lý banner

#### `src/views/discount/DiscountManagement.js`
- **Chức năng**: Trang quản lý khuyến mãi
- **Mô tả**: 
  - Tạo và quản lý mã giảm giá
  - Cấu hình khuyến mãi
- **Vai trò**: Quản lý khuyến mãi

---

### 🗂️ **Thư Mục `src/assets/` - Tài Nguyên**

#### `src/assets/brand/`
- **Chức năng**: Chứa logo và brand assets
- **File**:
  - `logo.js`: Component logo chính
  - `sygnet.js`: Component logo nhỏ (icon)

#### `src/assets/images/`
- **Chức năng**: Chứa hình ảnh mẫu
- **Mô tả**: 
  - `avatars/`: Hình ảnh avatar mẫu
  - Các file hình ảnh khác: `angular.jpg`, `react.jpg`, `vue.jpg`, etc.

---

### 🗂️ **Thư Mục `src/scss/` - Styles**

#### `src/scss/style.scss`
- **Chức năng**: File SCSS chính chứa tất cả styles
- **Mô tả**: 
  - Import CoreUI styles
  - Custom styles cho ứng dụng
  - Global styles

#### `src/scss/examples.scss`
- **Chức năng**: Styles cho các ví dụ/components mẫu
- **Mô tả**: 
  - Styles cho documentation examples
  - Có thể xóa trong production

#### `src/scss/vendors/simplebar.scss`
- **Chức năng**: Styles cho SimpleBar (custom scrollbar library)
- **Mô tả**: 
  - Styles cho scrollbar tùy chỉnh
  - Sử dụng bởi SimpleBar React component

---

## ⚙️ Cách Thức Hoạt Động

### 🔄 Luồng Hoạt Động Tổng Quan

1. **Khởi động ứng dụng**:
   - `index.html` được load bởi trình duyệt
   - `index.js` được thực thi, tạo React app và mount vào DOM
   - Redux Provider wrap toàn bộ ứng dụng

2. **Routing**:
   - `App.js` sử dụng `HashRouter` để quản lý routing
   - `routes.js` định nghĩa các routes và component tương ứng
   - `AppContent.js` xử lý routing logic và protected routes

3. **Authentication**:
   - User truy cập `/login` (public route)
   - Sau khi đăng nhập thành công:
     - Token được lưu vào localStorage
     - Redux store được cập nhật với `isAuthenticated = true`
     - Redirect đến `/dashboard`

4. **Protected Routes**:
   - `ProtectedRoute` component kiểm tra `isAuthenticated`
   - Nếu chưa đăng nhập → redirect đến `/login`
   - Nếu đã đăng nhập → render component được yêu cầu

5. **Layout Rendering**:
   - `DefaultLayout` kiểm tra authentication state
   - Nếu đã đăng nhập → render full layout với sidebar, header, footer
   - Nếu chưa đăng nhập → chỉ render content (cho login page)

6. **API Calls**:
   - Các components gọi API thông qua `lib/Api.js`
   - Request interceptor tự động thêm Authorization token
   - Response interceptor xử lý lỗi 401 và redirect đến login

7. **State Management**:
   - Redux store quản lý global state:
     - `app`: sidebar visibility, theme
     - `auth`: user info, token, isAuthenticated
   - Components sử dụng `useSelector` để lấy state
   - Actions được dispatch để update state

### 🔐 Authentication Flow

```
User truy cập → Check localStorage token
  ├─ Có token → Set isAuthenticated = true → Render app
  └─ Không có token → Redirect đến /login
        ↓
User đăng nhập → authAPI.login()
        ↓
Thành công → Lưu token vào localStorage và Redux → Redirect đến /dashboard
        ↓
Các request tiếp theo → Request interceptor thêm token vào headers
```

### 📊 Data Flow

```
Component → Gọi API từ lib/Api.js
    ↓
Axios instance → Thêm Authorization header
    ↓
Backend API (localhost:5000)
    ↓
Response → Response interceptor xử lý
    ↓
Component nhận data → Update state → Re-render UI
```

---

## 🛠️ Công Nghệ Sử Dụng

### Core Technologies
- **React 19.0.0**: UI library
- **React Router DOM 7.1.5**: Routing
- **Redux Toolkit 2.9.0**: State management
- **Axios 1.11.0**: HTTP client

### UI Framework
- **CoreUI React 5.5.0**: Admin template components
- **CoreUI Icons**: Icon library
- **Chart.js 4.4.7**: Charts và graphs
- **SimpleBar React**: Custom scrollbar

### Build Tools
- **Vite 6.1.0**: Build tool và dev server
- **Sass 1.85.0**: CSS preprocessor
- **PostCSS & Autoprefixer**: CSS processing

### Utilities
- **SweetAlert2**: Beautiful alerts
- **Classnames**: Dynamic className utility
- **React Markdown Editor**: Markdown editor

---

## 🚀 Hướng Dẫn Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js (v16 trở lên)
- npm hoặc yarn

### Cài Đặt

```bash
# Di chuyển vào thư mục dự án
cd client/admin-bus

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### Chạy Development Server

```bash
# Chạy dev server tại http://localhost:3000
npm start
# hoặc
yarn start
```

### Build Production

```bash
# Build cho production
npm run build
# hoặc
yarn build

# Files được build trong thư mục build/
```

### Lint Code

```bash
# Kiểm tra code quality
npm run lint
# hoặc
yarn lint
```

### Cấu Hình Backend API

Đảm bảo backend API đang chạy tại `http://localhost:5000`. Nếu backend chạy ở port khác, cập nhật trong:
- `src/lib/Api.js`: Thay đổi `API_BASE_URL`
- `vite.config.mjs`: Cập nhật proxy target

---

## 📝 Ghi Chú Quan Trọng

1. **Authentication**: Tất cả API calls (trừ login) đều cần token. Token được lưu trong localStorage và tự động thêm vào headers.

2. **Protected Routes**: Các routes ngoài `/login` đều được bảo vệ bởi `ProtectedRoute` component.

3. **Code Splitting**: Các view components được lazy load để tối ưu performance.

4. **State Management**: Sử dụng Redux Toolkit cho global state, đặc biệt là authentication state.

5. **API Integration**: Tất cả API calls được centralize trong `lib/Api.js` để dễ quản lý và maintain.

6. **Error Handling**: Response interceptor tự động xử lý lỗi 401 và redirect đến login.

---

## 📞 Hỗ Trợ

Nếu có thắc mắc hoặc vấn đề, vui lòng:
- Kiểm tra console log trong trình duyệt
- Kiểm tra Network tab để xem API calls
- Đảm bảo backend API đang chạy và accessible

---

**Tài liệu được cập nhật lần cuối**: 2025
