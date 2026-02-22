import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* News */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Tin tức</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Xe Limousine – Đẳng cấp hạng thương gia thời đại mới</p>
              <p className="text-gray-500 text-sm">Tổng quan các bến xe Vũng Tàu – Giới thiệu thông tin lịch trình nhà xe</p>
              <p className="text-gray-500 text-sm">Top 31 nhà xe limousine, xe giường nằm đi Đà Lạt</p>
            </div>
          </div>

          {/* Routes */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Tuyến đường</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Xe đi Buôn Mê Thuột từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe đi Vũng Tàu từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe đi Nha Trang từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe đi Đà Lạt từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe đi Sapa từ Hà Nội</p>
              <p className="text-gray-500 text-sm">Xe đi Hải Phòng từ Hà Nội</p>
              <p className="text-gray-500 text-sm">Xe đi Vinh từ Hà Nội</p>
            </div>
          </div>

          {/* Limousine */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Xe Limousine</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Xe Limousine đi Đà Lạt từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe Limousine đi Vũng Tàu từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe Limousine đi Nha Trang từ Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe Limousine đi Hải Phòng từ Hà Nội</p>
              <p className="text-gray-500 text-sm">Xe Limousine đi Hạ Long từ Hà Nội</p>
              <p className="text-gray-500 text-sm">Xe Limousine đi Sapa Từ Hà Nội</p>
              <p className="text-gray-500 text-sm">Xe Limousine đi Quảng Ninh từ Hà Nội</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Bus Stations */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Bến xe</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Bến xe Miền Đông</p>
              <p className="text-gray-500 text-sm">Bến xe Trung tâm Đà Nẵng</p>
              <p className="text-gray-500 text-sm">Bến xe Gia Lâm</p>
              <p className="text-gray-500 text-sm">Bến xe Mỹ Đình</p>
              <p className="text-gray-500 text-sm">Bến xe An Sương</p>
              <p className="text-gray-500 text-sm">Bến xe Nước Ngầm</p>
              <p className="text-gray-500 text-sm">Bến xe Miền Tây</p>
            </div>
          </div>

          {/* Bus Companies */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Nhà xe</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Xe Sao Việt</p>
              <p className="text-gray-500 text-sm">Xe Hoa Mai</p>
              <p className="text-gray-500 text-sm">Xe Hạ Long Travel</p>
              <p className="text-gray-500 text-sm">Xe Quốc Đạt</p>
              <p className="text-gray-500 text-sm">Xe Thanh Bình Xanh</p>
              <p className="text-gray-500 text-sm">Xe Thiện Thành limousine</p>
              <p className="text-gray-500 text-sm">Xe Hồng Sơn Phú Yên</p>
              <p className="text-gray-500 text-sm">Xe Tiến Oanh</p>
            </div>
          </div>

          {/* More Companies */}
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Xe Hải Âu</p>
              <p className="text-gray-500 text-sm">Xe Chín Nghĩa</p>
              <p className="text-gray-500 text-sm">Xe Hưng Long</p>
              <p className="text-gray-500 text-sm">Xe Kim Mạnh Hùng</p>
              <p className="text-gray-500 text-sm">Xe Tuấn Hưng</p>
              <p className="text-gray-500 text-sm">Xe Khanh Phong</p>
              <p className="text-gray-500 text-sm">Xe An Anh (Quê Hương)</p>
              <p className="text-gray-500 text-sm">Xe Minh Quốc</p>
            </div>
          </div>

          {/* Additional Companies */}
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Xe Văn Minh</p>
              <p className="text-gray-500 text-sm">Xe Anh Tuyên</p>
              <p className="text-gray-500 text-sm">Xe Điền Linh</p>
              <p className="text-gray-500 text-sm">Xe Hạnh Cafe</p>
              <p className="text-gray-500 text-sm">Xe Tuấn Nga</p>
              <p className="text-gray-500 text-sm">Xe Ngọc Ánh Sài Gòn</p>
              <p className="text-gray-500 text-sm">Xe Hùng Cường</p>
              <p className="text-gray-500 text-sm">Xe Thuận Tiến</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Về Chúng Tôi</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Giới Thiệu Vivutoday</p>
              <p className="text-gray-500 text-sm">Liên Hệ</p>
              <p className="text-gray-500 text-sm">Giá trị cốt lõi</p>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Hỗ Trợ</h3>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Chính sách bảo mật</p>
              <p className="text-gray-500 text-sm">Chính sách điều khoản và giao dịch chung</p>
              <p className="text-gray-500 text-sm">Chính sách đổi trả và hoàn tiền</p>
              <p className="text-gray-500 text-sm">Chính sách thanh toán</p>
              <p className="text-gray-500 text-sm">Quy chế hoạt động</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Liên hệ</h3>
            <div className="space-y-3">
              <div>
                <p className="text-black text-sm">
                  <span>Hotline: </span>
                  <span className="font-bold">1900 0152</span>
                </p>
                <p className="text-gray-600 text-xs">(Cước phí: 3.000 đồng/phút)</p>
              </div>
              <div>
                <p className="text-black text-sm">
                  <span>Hotline: </span>
                  <span className="font-bold">1900.996.678</span>
                </p>
                <p className="text-gray-600 text-xs">(Cước phí: 1.000 đồng/phút)</p>
              </div>
              <div>
                <p className="text-black text-sm">
                  <span>Hotline: </span>
                  <span className="font-bold">1900.0179</span>
                </p>
                <p className="text-gray-600 text-xs">Cước phí: 8000đ/phút (dịch Vụ đặt vé nhanh 24/7)</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h3 className="text-black font-bold text-sm">Chứng nhận</h3>
            <div className="space-y-2">
              <div className="w-24 h-14 bg-gray-200 rounded"></div>
              <div className="w-24 h-11 bg-gray-200 rounded"></div>
              <div className="w-24 h-9 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
