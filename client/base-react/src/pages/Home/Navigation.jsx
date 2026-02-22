import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiService from '../../services/api.service.js';

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuthStatus = () => {
            const user = apiService.getUserData();
            const token = apiService.getAuthToken();

            if (user && token) {
                setUserData(user);
            } else {
                setUserData(null);
            }
            setIsLoading(false);
        };

        checkAuthStatus();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await apiService.logout();
            await apiService.clearAuthData();
            setUserData(null);
            setIsMobileMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Clear local data even if API call fails
            apiService.clearAuthData();
            setUserData(null);
            setIsMobileMenuOpen(false);
            navigate('/');
        }
    };

    return (
        <div className="w-full bg-white/0 shadow-[1px_1px_10px_0px_rgba(0,0,0,0.15)] inline-flex flex-col justify-start items-start">
            {/* Top Bar - Hidden on mobile */}
            <div className="hidden md:flex self-stretch min-h-7 px-4 lg:px-44 pt-[0.41px] pb-[0.40px] bg-sky-500 inline-flex justify-between items-center">
                <div className="cursor-pointer flex justify-start items-center gap-1">
                    <img className="w-4 h-4" src="/image/Image (1).png" alt="icon" />
                    <div className="justify-center text-white text-xs font-normal font-['Segoe_UI'] leading-none">Hệ thống Đặt Vé Xe Toàn Quốc</div>
                </div>
                <div className="max-h-7 flex justify-start items-center">
                </div>
            </div>

            {/* Main Navigation */}
            <div className="w-full h-14 px-4 lg:px-44 inline-flex justify-between items-center gap-4 lg:gap-[5%]">
                {/* Logo */}
                <img
                    onClick={() => navigate('/')}
                    className="w-20 h-12 lg:w-24 lg:h-14 relative cursor-pointer" src="/asets/images/logoxin.png" alt="logo" />

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden lg:flex self-stretch flex justify-start items-center pl-[0%]">
                    <div className="flex justify-start items-center gap-2 w-[100%]">
                        {/* TRANG CHỦ */}
                        <div
                            onClick={() => navigate('/')}
                            className={`px-2.5 whitespace-nowrap rounded-md cursor-pointer text-sm font-bold font-['Segoe_UI'] uppercase leading-10 tracking-tight ${location.pathname === '/' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-100'}`}
                        >
                            Trang chủ
                        </div>

                        {/* GIỚI THIỆU */}
                        <div
                            onClick={() => navigate('/about')}
                            className={`px-2.5 whitespace-nowrap rounded-md cursor-pointer text-sm font-bold font-['Segoe_UI'] uppercase leading-10 tracking-tight ${location.pathname === '/about' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-100'}`}
                        >
                            Giới Thiệu
                        </div>

                        {/* THÔNG TIN NHÀ XE */}
                        <div
                            onClick={() => navigate('/bus-company')}
                            className={`px-2.5 whitespace-nowrap rounded-md cursor-pointer text-sm font-bold font-['Segoe_UI'] uppercase leading-10 tracking-tight ${location.pathname === '/bus-company' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-100'}`}
                        >
                            Thông tin nhà xe
                        </div>

                        {/* BẾN XE */}
                        <div
                            onClick={() => navigate('/station')}
                            className={`px-2.5 whitespace-nowrap rounded-md cursor-pointer text-sm font-bold font-['Segoe_UI'] uppercase leading-10 tracking-tight ${location.pathname === '/station' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-100'}`}
                        >
                            Bến xe
                        </div>

                        {/* TUYẾN ĐƯỜNG */}
                        <div
                            onClick={() => navigate('/route')}
                            className={`px-2.5 whitespace-nowrap rounded-md cursor-pointer text-sm font-bold font-['Segoe_UI'] uppercase leading-10 tracking-tight ${location.pathname === '/route' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-100'}`}
                        >
                            Tuyến Đường
                        </div>

                        {/* KIỂM TRA VÉ */}
                        <div
                            onClick={() => navigate('/check-ticket')}
                            className={`px-2.5 whitespace-nowrap rounded-md cursor-pointer text-sm font-bold font-['Segoe_UI'] uppercase leading-10 tracking-tight ${location.pathname === '/check-ticket' ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-100'}`}
                        >
                            Kiểm Tra Vé
                        </div>
                    </div>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                    {!isLoading && (
                        userData ? (
                            <div className="flex items-center gap-3 relative group">
                                <div className="flex items-center gap-2 cursor-pointer py-2">
                                    <span className="text-sky-600 text-sm font-medium">
                                        Xin chào, {userData.username || userData.email || 'User'}
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down text-sky-600" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </div>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full right-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                                    <div className="p-4 border-b border-gray-100 bg-sky-50">
                                        <p className="text-sm font-bold text-gray-800 truncate">{userData.username || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{userData.role}</p>
                                    </div>
                                    <div className="p-2">
                                        <div className="px-3 py-2 hover:bg-gray-50 rounded-md transition-colors">
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm font-medium text-gray-700">{userData.email || 'Chưa cập nhật'}</p>
                                        </div>
                                        {userData.age > 0 && (
                                            <div className="px-3 py-2 hover:bg-gray-50 rounded-md transition-colors">
                                                <p className="text-xs text-gray-500">Tuổi</p>
                                                <p className="text-sm font-medium text-gray-700">{userData.age}</p>
                                            </div>
                                        )}
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                            </svg>
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-[150px] px-4 py-2 text-sky-600 text-sm font-medium border border-sky-600 rounded-md hover:bg-sky-50 transition-colors"
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-[150px] px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-md hover:bg-sky-700 transition-colors"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        )
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8"
                    aria-label="Toggle mobile menu"
                >
                    <div className={`w-6 h-0.5 bg-sky-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-sky-600 my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-sky-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-4 py-4 space-y-3">
                    <div
                        onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2 bg-sky-600 rounded-md cursor-pointer"
                    >
                        <div className="text-white text-sm font-bold font-['Segoe_UI'] uppercase tracking-tight">Trang chủ</div>
                    </div>
                    <div
                        onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2 cursor-pointer"
                    >
                        <div className="text-sky-600 text-sm font-bold font-['Segoe_UI'] uppercase tracking-tight">Giới Thiệu</div>
                    </div>
                    <div
                        onClick={() => { navigate('/bus-company'); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2 cursor-pointer"
                    >
                        <div className="text-sky-600 text-sm font-bold font-['Segoe_UI'] uppercase tracking-tight">Thông tin nhà xe</div>
                    </div>
                    <div
                        onClick={() => { navigate('/station'); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2 cursor-pointer"
                    >
                        <div className="text-sky-600 text-sm font-bold font-['Segoe_UI'] uppercase tracking-tight">Bến xe</div>
                    </div>
                    <div
                        onClick={() => { navigate('/route'); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2 cursor-pointer"
                    >
                        <div className="text-sky-600 text-sm font-bold font-['Segoe_UI'] uppercase tracking-tight">Tuyến Đường</div>
                    </div>
                    <div
                        onClick={() => { navigate('/check-ticket'); setIsMobileMenuOpen(false); }}
                        className="px-3 py-2 cursor-pointer"
                    >
                        <div className="text-sky-600 text-sm font-bold font-['Segoe_UI'] uppercase tracking-tight">Kiểm Tra Vé</div>
                    </div>

                    {/* Mobile Auth Buttons */}
                    <div className="border-t border-gray-200 pt-3 mt-3">
                        {!isLoading && (
                            userData ? (
                                <div className="space-y-2 ">
                                    <div className="px-3 py-2 text-sky-600 text-sm font-medium">
                                        Xin chào, {userData.username || userData.email || 'User'}
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); }}
                                        className=" px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <button
                                        onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                                        className="w-full px-3 py-2 text-sky-600 text-sm font-medium border border-sky-600 rounded-md hover:bg-sky-50 transition-colors"
                                    >
                                        Đăng nhập
                                    </button>
                                    <button
                                        onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}
                                        className="w-full px-3 py-2 bg-sky-600 text-white text-sm font-medium rounded-md hover:bg-sky-700 transition-colors"
                                    >
                                        Đăng ký
                                    </button>
                                </div>
                            )
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}