# SmartBus Vivutoday 

## Introduction

Vivutoday national bus ticket booking system is developed with specific goals to meet the needs of both customers and bus operators, while promoting the development of the passenger transport industry in Vietnam.

## Member

- [Nguyen Duc Anh](https://git.rikkei.edu.vn/anhnguyen) (Leader)
- [Vu Ha Trang](https://git.rikkei.edu.vn/trangvux)
- [Tran Lan](https://git.rikkei.edu.vn/tranlan149)
- [Dao Anh Son](https://git.rikkei.edu.vn/daoanhson1998)
- [Nguyen Tuan](https://git.rikkei.edu.vn/tuannguyen2705)
- [Nguyen Huy](https://git.rikkei.edu.vn/HuyNguyen)

## Getting Started

### Step-by-Step Guide

#### Step 1: Initial Setup

- Clone the repository: `git clone https://git.rikkei.edu.vn/ojt-phenikaa/group03/api.git`
- Navigate: `cd api`
- Install `pnpm` globally: `npm install -g pnpm`
- Check installed version : `pnpm -version`
- Install dependencies: `pnpm install`

#### Step 2: Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: Running the Project

- Development Mode: `pnpm start:dev`
- Building: `pnpm build`
- Production Mode: Set `NODE_ENV="production"` in `.env` then `pnpm build && pnpm start:prod`

## Folder Structure

```code
├── biome.json
├── Dockerfile
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── README.md
├── src
│   ├── api
│   │   ├── healthCheck
│   │   │   ├── __tests__
│   │   │   │   └── healthCheckRouter.test.ts
│   │   │   └── healthCheckRouter.ts
│   │   └── user
│   │       ├── __tests__
│   │       │   ├── userRouter.test.ts
│   │       │   └── userService.test.ts
│   │       ├── userController.ts
│   │       ├── userModel.ts
│   │       ├── userRepository.ts
│   │       ├── userRouter.ts
│   │       └── userService.ts
│   ├── api-docs
│   │   ├── __tests__
│   │   │   └── openAPIRouter.test.ts
│   │   ├── openAPIDocumentGenerator.ts
│   │   ├── openAPIResponseBuilders.ts
│   │   └── openAPIRouter.ts
│   ├── common
│   │   ├── __tests__
│   │   │   ├── errorHandler.test.ts
│   │   │   └── requestLogger.test.ts
│   │   ├── middleware
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── requestLogger.ts
│   │   ├── models
│   │   │   └── serviceResponse.ts
│   │   └── utils
│   │       ├── commonValidation.ts
│   │       ├── envConfig.ts
│   │       └── httpHandlers.ts
│   ├── index.ts
│   └── server.ts
├── tsconfig.json
└── vite.config.mts
```

## Tổng quan kiến trúc Booking/api

- Ứng dụng chạy trên **Express** (TypeScript) với mô hình `Router → Controller → Service → Repository → Database`.  
- **Knex + MySQL** đảm nhiệm truy cập dữ liệu; **Passport (local + Google OAuth)** cung cấp xác thực; **Jwt + session** bảo vệ API.  
- **Swagger UI** được dựng từ `zod` schema giúp đồng bộ hóa validation với tài liệu API.  
- **Pino logger + rate limiter + helmet + multer** xử lý bảo mật, quan sát và upload file.  
- **Chatbot** tận dụng HuggingFace embedding, OpenRouter (ChatGPT-compatible) và dữ liệu vé xe thực tế để gợi ý lịch trình.

### Luồng khởi động
1. `src/index.ts` đọc `.env` qua `envConfig`, tạo HTTP server từ `app` và lắng nghe trên `env.PORT`.  
2. `src/server.ts` khởi tạo Express, nạp middleware (session, passport, CORS, helmet, logger, rate limiter).  
3. Router cho từng domain (`/users`, `/bus-companies`, `/routes`, `/tickets`, `/chatbot`, …) được mount.  
4. Static files tại `/uploads` và Swagger UI (`/swagger.json`, `/`) sẵn sàng.  
5. Bất kỳ request không khớp route rơi vào `errorHandler`. Logger/pino chỉ in lỗi 5xx trên production.

### Chuẩn hóa lớp làm việc
- **Model**: định nghĩa `zod` schema + type, đảm bảo client/server, docs và validation thống nhất.  
- **Repository**: sử dụng `knex` truy xuất DB, tránh logic SQL trong controller.  
- **Service**: xử lý nghiệp vụ, ghép nhiều repository, trả về `ServiceResponse`.  
- **Controller**: nhận `Express Request`, gọi service, trả JSON chuẩn.  
- **Router**: khai báo endpoint, validation và đăng ký schema với `OpenAPIRegistry`.

## Thư mục & file chi tiết

### 1. Root (`booking/api`)
| Tên | Vai trò |
| --- | --- |
| `package.json`, `pnpm-lock.yaml`, `package-lock.json` | Định nghĩa dependencies (pnpm là chuẩn, npm lock dùng cho CI). Scripts: `start:dev`, `build`, `lint`. |
| `tsconfig.json` | Cấu hình TypeScript (baseUrl `src`, path alias `@/*`). |
| `vite.config.mts` | Dùng cho bundle hoặc preview doc (giữ alias thống nhất khi chạy tool). |
| `biome.json` | Chuẩn lint/format (Biomes). |
| `Dockerfile` | Build Node 20 slim, cài pnpm, copy source, build, expose 5000. Giúp deploy container. |
| `knexfile.js` | Cho CLI Knex migrate/seed bên ngoài source TS. |
| `vercel.json` | Cấu hình deploy serverless (routes, build command). |
| `README.md` | Tài liệu hướng dẫn (file hiện tại). |

### 2. `src/`
| Thành phần | Mô tả |
| --- | --- |
| `index.ts` | Điểm vào: lắng nghe port, log trạng thái, handle tín hiệu `SIGINT/SIGTERM`. |
| `server.ts` | Tập hợp middleware, router, phục vụ static, Swagger, đăng ký passport & session. |
| `public/uploads` | Ảnh user upload (logo nhà xe, xe, bến, ...). Express phục vụ tại `/uploads`. |
| `api/` | Domain logic (auth, user, route, ticket, chatbot, ...). Mỗi domain có bộ file Controller/Service/Repository/Model/Router. |
| `api-docs/` | Tự động sinh Swagger từ zod schema. |
| `common/` | Tài nguyên dùng chung (config DB, middleware, utils, constants, models). |
| `db/` | Migration + seed + script setup DB. |

### 3. `src/api` – các module nghiệp vụ

#### 3.1 `auth`
| File | Chức năng |
| --- | --- |
| `authModel.ts` | Định nghĩa kiểu `User`, schema request/login/register, openAPI metadata. |
| `authRepository.ts` | Làm việc với bảng `users`: tìm theo email/id, tạo user, lưu token reset, danh sách token bị blacklist. |
| `authService.ts` | Nghiệp vụ đăng ký, reset mật khẩu, xác thực token, blacklist JWT khi logout. |
| `authController.ts` | Xử lý request Express (register, reset password, confirm reset, logout). |
| `authRouter.ts` | Định tuyến `/auth/...`, gắn middleware `localLoginMiddleware`, validation zod, đăng ký schema cho Swagger. |

#### 3.2 `user`
| File | Chức năng |
| --- | --- |
| `userModel.ts` | Định nghĩa schema người dùng (id, name, email, age, timestamps). |
| `userRepository.ts` | CRUD `users` dùng Knex, filter theo email, phân trang, loại bỏ password, cascade delete vé/liên quan. |
| `userService.ts` | Gọi repository, dùng `ServiceResponse` chuẩn hóa. |
| `userController.ts` | API layer cho danh sách, chi tiết, tạo, cập nhật, xoá người dùng. |
| `userRouter.ts` | Khai báo endpoint `/users`, validate input, đăng ký OpenAPI. |

#### 3.3 `busCompanies`
| File | Chức năng |
| --- | --- |
| `busCompanyModel.ts` | Schema nhà xe (tên, mô tả, logo, markdown content...). |
| `busCompanyRepository.ts` | Query MySQL (filter, search, join uploads). |
| `busCompanyService.ts` | Business logic: phân trang, xử lý upload image path, soft validation. |
| `busCompanyController.ts` | Endpoint để list/search, CRUD, upload ảnh nổi bật. |
| `busCompanyRouter.ts` | Định tuyến `/bus-companies`, mount middleware upload (`busCompanyUpload`). |

#### 3.4 `station`
| File | Chức năng |
| --- | --- |
| `stationModel.ts` | Schema bến xe (city, province, image, wallpaper, embedding vector). |
| `stationRepository.ts` | Query station + tạo/sửa, quản lý upload. |
| `stationService.ts` | Business logic, gọi embedding khi cần, trả `ServiceResponse`. |
| `stationController.ts` | CRUD + upload wallpaper/image. |
| `stationRouter.ts` | Endpoint `/stations`, validate zod, gắn middleware upload tương ứng. |

#### 3.5 `routes`
| File | Chức năng |
| --- | --- |
| `routesModel.ts` | Mô tả tuyến đường (departure/arrival station, distance, duration, giá). |
| `routesRepository.ts` | Query join stations, filter theo điểm đi/đến, cập nhật giá. |
| `routesService.ts` | Gom logic tính toán, gọi repository. |
| `routesController.ts` | CRUD + search routes. |
| `routesRouter.ts` | REST `/routes`, OpenAPI registry. |

#### 3.6 `car`
| File | Chức năng |
| --- | --- |
| `carModel.ts` | Schema xe/bus (tên, biển số, capacity, markdown review, featured image). |
| `carRepository.ts` | Query `buses` + liên kết busCompanies. |
| `carService.ts` | Business logic (upload ảnh, parse markdown). |
| `carController.ts` | CRUD xe, nhận file từ `carUploadMiddleware`. |
| `carRouter.ts` | Định tuyến `/cars`. |

#### 3.7 `seat`
| File | Chức năng |
| --- | --- |
| `seatModel.ts` | Schema ghế (số ghế, status). |
| `seatRepository.ts` | Query ghế theo xe/chuyến, lock seat khi đặt vé. |
| `seatService.ts` | Kiểm tra trạng thái ghế, wrap response. |
| `seatController.ts` | API cho thao tác ghế (list, cập nhật, gắn schedule). |
| `seatRouter.ts` | Endpoint `/seats`. |

#### 3.8 `ticket`
| File | Chức năng |
| --- | --- |
| `ticketModel.ts` | Schema vé (user, schedule, seat, status). |
| `ticketRepository.ts` | CRUD bảng `tickets`, join payments/seats. |
| `ticketService.ts` | Xử lý đặt vé, cập nhật trạng thái, trả kết quả + lỗi rõ ràng. |
| `ticketController.ts` | Endpoint CRUD + search vé. |
| `ticketRouter.ts` | Định tuyến `/tickets`, validate query/body. |

#### 3.9 `payment` (Ticket Order management)
| File | Chức năng |
| --- | --- |
| `paymentModel.ts` | Zod schema cho `payments` + filter query (enum trạng thái BOOKED/CANCELED/COMPLETED/REFUNDED). |
| `paymentRepository.ts` | `TicketOrderRepository`: join nhiều bảng (tickets, payments, users, bus_companies, seats...) để tổng hợp dữ liệu đơn đặt vé. |
| `paymentService.ts` | `TicketOrderService`: phân trang tất cả đơn, lọc theo nhà xe hoặc trạng thái, log lỗi qua `pino`. |
| `paymentController.ts` | `TicketOrderController`: nhận query từ client, gọi service, chuẩn hóa lỗi 500. |
| `paymentRoutes.ts` | `ticketOrderRouter`: mount `/ticket-orders`, gắn `authenticate` + `permission` (ROLE=ADMIN), validate query, đăng ký OpenAPI mô tả phân trang. |

#### 3.10 `chatbot`
| File | Chức năng |
| --- | --- |
| `chatbotModel.ts` | Định nghĩa schema lịch sử hội thoại, trạng thái thu thập thông tin (`BookingRequirements`, `UserConversationState`). |
| `chatbotRepository.ts` | Lưu lịch sử chat, trạng thái người dùng, embedding vào DB (bảng `chatbot_history`, `user_conversation_state`). |
| `chatbotService.ts` | Lõi chatbot: tính cosine similarity trên embedding HuggingFace, gọi OpenRouter (ChatGPT API compatible) để trích thông tin booking, match bến bằng embedding, gọi `vehicleScheduleService`, lưu/clear trạng thái hội thoại. |
| `chatbotController.ts` | Endpoint nhận message, truyền userId từ token, trả response chat. |
| `chatbotRouter.ts` | Định tuyến `/chatbot`, gắn auth, expose endpoint cho front-end. |

#### 3.11 `vehicleSchedule`
| File | Chức năng |
| --- | --- |
| `vehicleSchedule.model.ts` | Schema lịch chạy (route, bus, departure_time, price, embedding route). |
| `vehicleSchedule.repository.ts` | Query join routes/bus/station, filter theo departure/destination/date, tính số ghế trống. |
| `vehicleSchedule.service.ts` | Business logic: phân trang, map result, hỗ trợ chatbot tìm chuyến. |
| `vehicleSchedule.controller.ts` | REST controller cho CRUD, search, sync với frontend. |
| `vehicleSchedule.routes.ts` | Router `/vehicle-schedules`, đăng ký OpenAPI, gắn auth nếu cần. |

#### 3.12 Khác
- `payment/paymentRoutes.ts` đăng ký `OpenAPIRegistry` tên `ticketOrderRegistry` (phục vụ swagger).  
- Nếu cần bổ sung module mới, sao chép cấu trúc 5 file (Model/Repository/Service/Controller/Router) để tuân thủ chuẩn.

### 4. `src/api-docs`
| File | Mô tả |
| --- | --- |
| `openAPIDocumentGenerator.ts` | Gom `OpenAPIRegistry` từ mọi router, sinh tài liệu OpenAPI 3.0, add bearerAuth scheme. |
| `openAPIResponseBuilders.ts` | Helper tạo response schema dựa trên `ServiceResponse`. |
| `openAPIRouter.ts` | Mount Swagger UI, cung cấp `/swagger.json`. |
| `__tests__/openAPIRouter.test.ts` | Kiểm thử router docs. |
| `Post-docsAPI.txt` | Ghi chú thủ công về API cần tài liệu thêm. |

### 5. `src/common`

#### 5.1 `config`
| File | Mô tả |
| --- | --- |
| `database.ts` | Tạo instance Knex (mysql2) cho environment `development/production`, cấu hình đường dẫn migration/seed. |
| `passport.ts` | Đăng ký chiến lược Local + Google OAuth: verify mật khẩu, sign JWT, serialize/deserialize user. |

#### 5.2 `constants`
| File | Mô tả |
| --- | --- |
| `role.ts` | Khai báo enum `ROLES.ADMIN/USER` dùng cho phân quyền. |

#### 5.3 `middleware`
| File | Vai trò |
| --- | --- |
| `auth/authMiddleware.ts` | Kiểm tra JWT cho mọi route (trừ whitelist), hỗ trợ Bearer + cookie, expose `authorize(roles)`. |
| `auth/localLoginMiddleware.ts` | Bọc `passport.authenticate('local')`, set JWT vào HttpOnly cookie. |
| `auth/permission.ts` | Định nghĩa middleware yêu cầu `admin`. |
| `busCompanyUploadMiddleware.ts`, `carUploadMiddleware.ts`, `stationUploadMiddleware.ts`, `uploadMiddleware.ts` | Cấu hình multer, thư mục đích và validate loại file (JPEG/PNG). |
| `errorHandler.ts` | Middleware cuối cùng: trả 404 cho route không tồn tại + đính kèm lỗi vào log. |
| `rateLimiter.ts` | Khống chế số request theo IP, sử dụng `env.COMMON_RATE_LIMIT_*`. |
| `requestLogger.ts` | Dùng `pino-http`, thêm `x-request-id`, chỉ log lỗi 5xx trong production. |
| `sessionMiddleware.ts` | Cấu hình `express-session` (cookie 1 ngày) dùng cho Passport. |

#### 5.4 `models`
| File | Vai trò |
| --- | --- |
| `serviceResponse.ts` | Lớp chuẩn hóa câu trả lời từ service (success/failure, statusCode), kèm schema `ServiceResponseSchema` cho Swagger. |

#### 5.5 `utils`
| File | Vai trò |
| --- | --- |
| `envConfig.ts` | Đọc `.env` bằng `dotenv`, validate với `zod`, expose cờ `isDevelopment`, `isProduction`, `isTest`. |
| `commonValidation.ts` | Các schema `zod` dùng chung (vd. phân trang). |
| `emailUtil.ts` | Gửi mail reset password qua Gmail/nodemailer. |
| `embedding.ts` | Gửi request tới HuggingFace `multilingual-e5-large`, chuẩn hóa vector (mean pooling + L2). |
| `httpHandlers.ts` | Middleware validate request bằng `zod`, trả lỗi chuẩn `ServiceResponse`. |
| `knexfile.ts` | Cấu hình Knex (TypeScript version) cho script nội bộ. |
| `pick.ts` | Helper chọn subset thuộc tính từ object (dùng trong service). |
| `upload.ts` | Upload file lên Cloudinary (tùy chọn), test trực tiếp khi chạy file. |

### 6. `src/db`
| Thành phần | Mô tả |
| --- | --- |
| `migrations/001_initial_schema.ts` | Tạo bảng lõi (users, bus_companies, stations, routes, buses, seats, schedules, tickets, payments, ...). |
| `002_additional_models.ts` | Bổ sung bảng phụ (payments detail, reviews, attachments...). |
| `004_alter_cars_table.ts` | Điều chỉnh cấu trúc bảng `buses` (ví dụ bổ sung markdown, ảnh). |
| `005_rename_vehicle_schedules_to_schedules.ts` → `008_add_departure_time_to_schedules.ts` | Loạt migration tinh chỉnh bảng lịch chạy (đổi tên, sync cột, thêm `departure_time`). |
| `011_add_chatbot_table_only.ts` | Thêm bảng lưu lịch sử chatbot và trạng thái hội thoại. |
| `012_add_markdown_to_cars.js` | Migration JS thêm cột markdown cho xe. |
| `013_add_embedding_columns_to_specific_tables.js` | Thêm cột vector embedding cho station/busCompany/... để chatbot tìm kiếm. |
| `014_add_featured_and_markdown_to_bus_companies.(js|ts)` | Hai phiên bản (JS/TS) cập nhật bảng nhà xe với trường featured image + markdown. |
| `20250107000000_create_user_conversation_state.ts` | Tạo bảng lưu trạng thái hội thoại người dùng (dùng chatbot). |
| `seeds/01_init_seed.js` | Seed mẫu: users (hash bcrypt), busCompanies, stations, routes, cars, schedules, ... giúp chạy demo nhanh. |
| `setup.ts` | Script CLI: test kết nối, chạy migrate + seed, rồi đóng kết nối. |

### 7. Khác
| Thành phần | Vai trò |
| --- | --- |
| `src/public/uploads/**` | Cấu trúc thực tế mà multer ghi file, ứng dụng phục vụ qua `/uploads`. |
| `src/api/payment` ngoài ticket order | Giúp dashboard quản trị xem toàn bộ đơn đặt vé, theo nhà xe, theo trạng thái. |
| `src/api/chatbot` | Trợ lý AI hỗ trợ tìm chuyến; phụ thuộc `embedding.ts`, `vehicleScheduleService`, `stationService`. |
| `src/api-docs/__tests__` | Đảm bảo tài liệu OpenAPI không bị vỡ khi thay đổi router mới. |

## Gợi ý đọc hiểu nhanh
- Bắt đầu từ `src/server.ts` để thấy middleware và router được gắn như thế nào.  
- Chọn một module (ví dụ `busCompanies`) rồi lần lượt đọc Router → Controller → Service → Repository → Model để nắm pattern.  
- Kiểm tra `src/db/migrations` khi cần biết bảng/cột tương ứng.  
- Dùng Swagger `/` để thử nghiệm request thực tế và xem schema được đồng bộ từ `zod`.  
- Chatbot phụ thuộc nhiều service khác, nên đọc `chatbotService.ts` cùng `stationService` & `vehicleScheduleService` để hiểu pipeline AI.