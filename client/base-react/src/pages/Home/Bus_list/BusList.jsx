import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../utils';
import api from '../../../services/api.service.js';
import SeatListModal from './components/SeatListModal.jsx';
import Navigation from '../Navigation.jsx';
import Footer from '../components/Footer.jsx';

const initialFilters = {
    departure: '', // station id
    destination: '', // station id
    departureDate: '',
    bus_id: '', // car/bus id
    page: 1,
    limit: 10,
    sortBy: 'departure_time:asc'
};

export default function BusList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedBus, setSelectedBus] = useState(null);
    const [showSeats, setShowSeats] = useState(false);
    const [stations, setStations] = useState([]);
    const [loadingStations, setLoadingStations] = useState(false);
    const [stationError, setStationError] = useState('');
    const [cars, setCars] = useState([]);
    const [loadingCars, setLoadingCars] = useState(false);
    const [carError, setCarError] = useState('');

    useEffect(() => {
        fetchStations();
        fetchCars();
        // fetchSchedules();
        // window.location.reload();
    }, []);

    // Initialize filters from URL parameters
    useEffect(() => {
        const departure = searchParams.get('departure') || '';
        const destination = searchParams.get('destination') || '';
        const departureDate = searchParams.get('departureDate') || '';
        const bus_id = searchParams.get('bus_id') || '';

        if (departure || destination || departureDate || bus_id) {
            setFilters(prev => ({
                ...prev,
                departure,
                destination,
                departureDate,
                bus_id
            }));
        }
    }, [searchParams]);

    const queryParams = useMemo(() => ({
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        departure: filters.departure || undefined,
        destination: filters.destination || undefined,
        departureDate: filters.departureDate || undefined,
        bus_id: filters.bus_id || undefined,
    }), [filters]);



    const fetchStations = async () => {
        setLoadingStations(true);
        setStationError('');
        try {
            const res = await api.getStations({ includeAuth: false, suppressUnauthorizedRedirect: true });
            if (res.success) {
                const payload = res.data;
                const list = payload?.responseObject || payload?.data || payload || [];
                setStations(Array.isArray(list) ? list : []);
            } else {
                setStationError(res.error || 'Không thể tải danh sách bến xe');
            }
        } catch (e) {
            setStationError(e.message || 'Không thể tải danh sách bến xe');
        } finally {
            setLoadingStations(false);
        }
    };

    const fetchCars = async () => {
        setLoadingCars(true);
        setCarError('');
        try {
            const res = await api.getCars({ includeAuth: false, suppressUnauthorizedRedirect: true });
            if (res.success) {
                const payload = res.data;
                const list = payload?.responseObject?.results || payload?.data || payload || [];
                setCars(Array.isArray(list) ? list : []);
            } else {
                setCarError(res.error || 'Không thể tải danh sách xe');
            }
        } catch (e) {
            setCarError(e.message || 'Không thể tải danh sách xe');
        } finally {
            setLoadingCars(false);
        }
    };

    const fetchSchedules = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.getVehicleSchedules({ ...queryParams, includeAuth: false, suppressUnauthorizedRedirect: true });
            if (res.success) {
                console.log(res)
                const list = res.data?.responseObject?.results || res.data?.results || [];
                setSchedules(list);
            } else {
                setError(res.error || 'Failed to load schedules');
            }
        } catch (e) {
            setError(e.message || 'Failed to load schedules');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.page, queryParams.limit, queryParams.sortBy, queryParams.departure, queryParams.destination, queryParams.departureDate, queryParams.bus_id]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value, page: 1 };
        setFilters(newFilters);

        // Update URL parameters
        const newSearchParams = new URLSearchParams(searchParams);
        if (value) {
            newSearchParams.set(name, value);
        } else {
            newSearchParams.delete(name);
        }
        setSearchParams(newSearchParams);
    };

    const handleOpenSeats = (schedule) => {
        setSelectedBus(schedule);
        setShowSeats(true);
    };

    const handleCloseSeats = () => {
        setShowSeats(false);
        setSelectedBus(null);
    };

    return (
        <>
            <Navigation />

            {/* Hero Section */}
            <section className="w-full bg-gradient-to-r from-sky-50 to-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-sky-700">Tìm chuyến xe và đặt ghế</h1>
                    <p className="text-slate-600 mt-1">Lọc theo điểm đi, điểm đến và ngày khởi hành</p>
                    {/* Filters */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
                        <select
                            name="departure"
                            value={filters.departure}
                            onChange={handleFilterChange}
                            className="h-11 px-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            disabled={loadingStations}
                        >
                            <option value="">Chọn điểm khởi hành</option>
                            {stations.map(station => (
                                <option key={station.id} value={station.id}>{station.name} - {station.city || station.province || 'Việt Nam'}</option>
                            ))}
                        </select>
                        <select
                            name="destination"
                            value={filters.destination}
                            onChange={handleFilterChange}
                            className="h-11 px-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            disabled={loadingStations}
                        >
                            <option value="">Chọn điểm đến</option>
                            {stations.map(station => (
                                <option key={station.id} value={station.id}>
                                    {station.name} - {station.city || station.province || 'Việt Nam'}
                                </option>
                            ))}
                        </select>
                        <select
                            name="bus_id"
                            value={filters.bus_id}
                            onChange={handleFilterChange}
                            className="h-11 px-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            disabled={loadingCars}
                        >
                            <option value="">Chọn xe</option>
                            {cars.map(car => (
                                <option key={car.id} value={car.id}>{car.name}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            name="departureDate"
                            value={filters.departureDate}
                            onChange={handleFilterChange}
                            className="h-11 px-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button onClick={fetchSchedules} className="h-11 px-4 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition">Tìm chuyến</button>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="w-full">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                    {loading && (
                        <div className="text-slate-500">Đang tải lịch trình...</div>
                    )}
                    {error && !loading && (
                        <div className="text-red-600">{error}</div>
                    )}
                    {carError && (
                        <div className="text-red-600 mb-4">Lỗi tải danh sách xe: {carError}</div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schedules.map((s) => (
                            <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
                                <div className="flex gap-4 p-4">
                                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-slate-100">
                                        <img
                                            src={s.bus_featured_image ? getImageUrl(s.bus_featured_image) : '/image/bus-placeholder.png'}
                                            alt={s.bus_name || 'Bus'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-slate-800 leading-tight">{s.bus_name || 'Xe khách'}</h3>
                                            <span className="px-2 py-0.5 text-xs rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">#{s.id}</span>
                                        </div>
                                        <div className="mt-1 text-sm text-slate-600">Tuyến: {s.route_id} • Xe: {s.bus_id}</div>
                                        {s.departure_time && (
                                            <div className="mt-2 text-sm">
                                                <span className="inline-flex items-center gap-1 text-sky-700">
                                                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                                                    Khởi hành: {new Date(s.departure_time).toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/car-detail/${s.bus_id}`)}
                                            className="flex-1 h-10 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition"
                                        >
                                            Chi tiết xe
                                        </button>
                                        <button
                                            onClick={() => handleOpenSeats(s)}
                                            className="flex-1 h-10 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition"
                                        >
                                            Xem ghế trống
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            {showSeats && selectedBus && (
                <SeatListModal
                    open={showSeats}
                    onClose={handleCloseSeats}
                    schedule={selectedBus}
                />
            )}
        </>
    );
}


