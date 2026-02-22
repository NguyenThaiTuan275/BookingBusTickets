import React, { useState, useEffect } from 'react';
import api from '../../../services/api.service.js';

const HomeBanner = () => {

    const [departure, setDeparture] = useState(''); // station id
    const [destination, setDestination] = useState(''); // station id
    const [departureDate, setDepartureDate] = useState('');
    const [stations, setStations] = useState([]);
    const [loadingStations, setLoadingStations] = useState(false);
    const [stationError, setStationError] = useState('');

    useEffect(() => {
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
        fetchStations();
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = `/bus-list?departure=${departure}&destination=${destination}&departureDate=${departureDate}`;
        // departure and destination are station IDs
    };

    return (
        <div className="relative w-full h-[480px] flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/image/vivutoday-home-banner.jpg')"
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0  " />

            {/* Content Container */}
            <div className="relative z-10 bg-white bg-opacity-40 backdrop-blur-sm rounded-lg p-8 max-w-6xl w-full mx-4">
                <div className="bg-white bg-opacity-70 rounded-lg p-8 relative">
                    {/* Border overlay */}
                    <div className="absolute inset-0 border border-gray-200 rounded-lg pointer-events-none" />

                    {/* Search Form */}
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">


                        {/* Departure Point */}
                        <div className="bg-white bg-opacity-60 rounded-md p-6 w-full lg:w-72 text-center border border-gray-400">
                            <h3 className="font-bold text-gray-700 text-sm mb-1">Điểm Khởi Hành</h3>
                            <select
                                value={departure}
                                onChange={e => setDeparture(e.target.value)}
                                className="w-full text-center text-gray-600 text-sm bg-transparent border-none outline-none placeholder-gray-500"
                                disabled={loadingStations}
                            >
                                <option value="">Chọn Điểm Khởi Hành</option>
                                {stations.map(station => (
                                    <option key={station.id} value={station.id}>{station.location}</option>
                                ))}
                            </select>
                        </div>


                        {/* Destination Point */}
                        <div className="bg-white bg-opacity-60 rounded-md p-6 w-full lg:w-72 text-center border border-black">
                            <h3 className="font-bold text-gray-700 text-sm mb-1">Điểm Đến</h3>
                            <select
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                className="w-full text-center text-gray-600 text-sm bg-transparent border-none outline-none placeholder-gray-500"
                                disabled={loadingStations}
                            >
                                <option value="">Chọn Điểm Đến</option>
                                {stations.map(station => (
                                    <option key={station.id} value={station.id}>{station.location}</option>
                                ))}
                            </select>
                        </div>

                        {/* Departure Date */}
                        <div className="bg-white bg-opacity-60 rounded-md p-6 w-full lg:w-72 text-center border border-gray-400">
                            <h3 className="font-bold text-gray-700 text-sm mb-1">Ngày Khởi Hành</h3>
                            <div className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-4 h-4 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <input
                                    type="date"
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    className="text-center text-gray-600 text-sm bg-transparent border-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200 rounded-md px-8 py-6 h-[90px] flex items-center justify-center gap-3 text-white font-bold text-sm tracking-wide min-w-[266px]"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <span>TÌM CHUYẾN XE</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
