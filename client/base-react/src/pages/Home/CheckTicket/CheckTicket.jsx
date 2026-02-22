import React, { useState, useEffect } from 'react';
import { Search, Ticket, MapPin, Clock, User, Calendar, AlertCircle, CheckCircle, Bus, Building, List } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../components/Footer';
import apiService from '../../../services/api.service';

const CheckTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    // Check authentication status and load user tickets on component mount
    useEffect(() => {
        checkAuthAndLoadTickets();
    }, []);

    const checkAuthAndLoadTickets = async () => {
        const token = apiService.getAuthToken();
        if (!token) {
            setIsAuthenticated(false);
            setError('Vui lòng đăng nhập để xem vé của bạn');
            return;
        }

        setIsAuthenticated(true);
        await loadUserTickets();
    };

    const loadUserTickets = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await apiService.getCurrentUserTickets({ includeAuth: true });

            if (response.success) {

                setTickets(response.data.responseObject);
                if (response.data.responseObject.length > 0) {
                    setSuccess(`Tìm thấy ${response.data.responseObject.length} vé đã được xác nhận!`);
                } else {
                    setSuccess('Bạn chưa có vé nào đã được xác nhận');
                }
            } else {
                if (response.status === 401) {
                    setIsAuthenticated(false);
                    setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                } else {
                    setError(response.error || 'Không thể tải vé của bạn');
                }
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi tải vé. Vui lòng thử lại.');
            console.error('Load tickets error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        loadUserTickets();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'BOOKED':
                return 'text-green-600 bg-green-100';
            case 'CANCELED':
                return 'text-red-600 bg-red-100';
            case 'PENDING':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'BOOKED':
                return 'Đã đặt';
            case 'CANCELED':
                return 'Đã hủy';
            case 'PENDING':
                return 'Chờ thanh toán';
            default:
                return status;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Vé Xe Của Tôi
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {isAuthenticated
                            ? 'Danh sách tất cả vé xe đã được xác nhận của bạn'
                            : 'Vui lòng đăng nhập để xem vé của bạn'
                        }
                    </p>
                </div>

                {/* Authentication Status and Controls */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {!isAuthenticated ? (
                            <div className="text-center space-y-4">
                                <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>Bạn cần đăng nhập để xem vé</span>
                                </div>
                                <a
                                    href="/login"
                                    className="inline-flex items-center space-x-2 bg-sky-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                >
                                    <User className="w-5 h-5" />
                                    <span>Đăng nhập</span>
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Error Message */}
                                {error && (
                                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                                        <AlertCircle className="w-5 h-5" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Success Message */}
                                {success && (
                                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>{success}</span>
                                    </div>
                                )}

                                {/* Refresh Button */}
                                <button
                                    onClick={handleRefresh}
                                    disabled={loading}
                                    className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Đang tải...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5" />
                                            <span>Làm mới danh sách vé</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tickets Information */}
                {tickets.length > 0 && (
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-sky-600 text-white p-6">
                                <h2 className="text-2xl font-bold flex items-center space-x-2">
                                    <List className="w-6 h-6" />
                                    <span>Danh Sách Vé Xe ({tickets.length} vé)</span>
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-6">
                                    {tickets.map((ticket, index) => (
                                        <div key={ticket.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            {/* Ticket Header */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                                        <Ticket className="w-5 h-5 text-sky-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">Vé #{ticket.id}</h3>
                                                        <p className="text-sm text-gray-500">Tạo lúc: {formatDate(ticket.created_at)}</p>
                                                    </div>
                                                </div>
                                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                                                    {getStatusText(ticket.status)}
                                                </span>
                                            </div>

                                            {/* Route Information */}
                                            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <h4 className="text-md font-semibold text-blue-900 mb-3 flex items-center">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    Tuyến đường
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-blue-700 font-medium">Điểm đi</p>
                                                        <p className="text-blue-900 font-semibold">{ticket.departure_station_name}</p>
                                                        <p className="text-sm text-blue-600">{ticket.departure_station_address}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-blue-700 font-medium">Điểm đến</p>
                                                        <p className="text-blue-900 font-semibold">{ticket.arrival_station_name}</p>
                                                        <p className="text-sm text-blue-600">{ticket.arrival_station_address}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ticket Details Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4 text-blue-600" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Khởi hành</p>
                                                        <p className="text-sm font-semibold">{formatDate(ticket.departure_time)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4 text-purple-600" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Đến nơi</p>
                                                        <p className="text-sm font-semibold">{formatDate(ticket.arrival_time)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <User className="w-4 h-4 text-orange-600" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Ghế</p>
                                                        <p className="text-sm font-semibold">{ticket.seat_number} ({ticket.seat_type})</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-green-600 font-bold text-sm">₫</span>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Giá vé</p>
                                                        <p className="text-sm font-semibold text-green-600">
                                                            {ticket.total_price ? ticket.total_price.toLocaleString('vi-VN') : 'N/A'} VNĐ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bus Information */}
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                                    <Bus className="w-4 h-4 mr-2" />
                                                    Thông tin xe
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Xe:</span>
                                                        <span className="font-semibold ml-1">{ticket.bus_name}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Biển số:</span>
                                                        <span className="font-semibold ml-1">{ticket.license_plate}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Nhà xe:</span>
                                                        <span className="font-semibold ml-1 flex items-center">
                                                            <Building className="w-3 h-3 mr-1" />
                                                            {ticket.company_name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Success Message */}
                                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center space-x-2 text-green-800">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Vé đã được xác nhận và sẵn sàng sử dụng!</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Section */}
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">Cần hỗ trợ?</h3>
                        <div className="space-y-2 text-blue-800">
                            <p>• Vé sẽ tự động tải khi bạn đăng nhập</p>
                            <p>• Chỉ hiển thị vé có trạng thái "Đã đặt" (BOOKED)</p>
                            <p>• Nếu không có vé, có thể bạn chưa có vé nào được xác nhận</p>
                            <p>• Sử dụng nút "Làm mới" để cập nhật danh sách vé</p>
                            <p>• Nếu gặp khó khăn, vui lòng liên hệ hotline: <strong>1900 0152</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckTicket;
