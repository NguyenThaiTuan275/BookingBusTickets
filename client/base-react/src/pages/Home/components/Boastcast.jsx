import React from 'react';

const Boastcast = () => {
    // Platform benefits data
    const platformBenefits = [
        {
            icon: "🎯",
            title: "ĐÁP ỨNG MỌI NHU CẦU TÌM KIẾM",
            description: "Với hơn 5000+ tuyến đường và 1500+ nhà xe trên khắp cả nước"
        },
        {
            icon: "🎫",
            title: "ĐẢM BẢO CÓ VÉ",
            description: "Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn"
        },
        {
            icon: "🤝",
            title: "CAM KẾT GIỮ VÉ",
            description: "Vivutoday cam kết hoàn 150% nếu nhà xe không giữ vé"
        },
        {
            icon: "📞",
            title: "TỔNG ĐÀI HỖ TRỢ KHÁCH HÀNG 24/7",
            description: "Giải quyết kịp thời vấn đề của khách hàng một cách nhanh chóng"
        }
    ];

    // Media partners data
    const mediaPartners = [
        { name: "24h", logo: "/image/24h-logo.png.png" },
        { name: "VTC News", logo: "/image/vtc-news.png" },
        { name: "Eva", logo: "/image/Eva-Logo.png" },
        { name: "Afamily", logo: "/image/Afamily.png.png" },
        { name: "Báo Bà Rịa Vũng Tàu", logo: "/image/logo-bao-ba-ria-vung-tau.png" },
        { name: "Báo Đà Nẵng Online", logo: "/image/logo-bao-da-nang-online.png" }
    ];

    return (
        <>
            {/* Platform Benefits Section */}
            <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="text-left mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4">
                            Nền Tảng Kết Nối Người Dùng Và Nhà Xe
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {platformBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center bg-white rounded-2xl p-7 shadow-md border border-gray-100 hover:shadow-xl hover:border-orange-400 transition-all duration-300 group cursor-pointer select-none h-full"
                            >
                                <div className="mb-4 w-20 h-20 flex items-center justify-center text-4xl rounded-full bg-orange-50 group-hover:shadow-sm group-hover:bg-orange-100 transition-all duration-300 border border-orange-100">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-base uppercase font-bold text-gray-900 mb-3 tracking-wide leading-6">
                                    {benefit.title}
                                </h3>
                                <p className="text-[15px] text-gray-700 leading-6 opacity-90 min-h-[60px] flex items-center justify-center">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Partners Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-left mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4">
                            Đối Tác Truyền Thông
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center items-center">
                        {mediaPartners.map((partner, index) => (
                            <div key={index} className="w-full flex items-center justify-center">
                                <div className="w-36 h-20 bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 flex items-center justify-center p-4 transition-all duration-300 relative overflow-hidden">
                                    <img
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        className="max-w-full max-h-full object-contain block"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = e.target.parentNode.querySelector('.fallback-logo');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div
                                        className="fallback-logo hidden absolute inset-0 w-full h-full bg-gray-200 rounded-xl flex-col items-center justify-center text-gray-600 text-xs font-semibold uppercase tracking-wide"
                                        style={{ display: 'none' }}
                                    >
                                        <span className="w-full h-full flex items-center justify-center">{partner.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Boastcast;
