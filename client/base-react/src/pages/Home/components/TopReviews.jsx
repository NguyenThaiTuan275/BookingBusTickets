import React from 'react';
import { getImageUrl } from '../../../utils';
import './TopReviews.css';

const TopReviews = () => {
    const cities = [
        {
            name: 'Sài Gòn',
            reviews: 287,
            image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80'
        },
        {
            name: 'Vũng Tàu',
            reviews: 98,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80'
        },
        {
            name: 'Đà Lạt',
            reviews: 87,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=600&q=80'
        },
        {
            name: 'Quy Nhơn',
            reviews: 81,
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=600&q=80'
        },
        {
            name: 'Hà Nội',
            reviews: 612,
            image: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?fit=crop&w=600&q=80'
        },
        {
            name: 'Nha Trang',
            reviews: 557,
            image: 'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?fit=crop&w=600&q=80'
        },
        {
            name: 'Đà Nẵng',
            reviews: 570,
            image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?fit=crop&w=600&q=80'
        },
        {
            name: 'Phan Thiết',
            reviews: 276,
            image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a2444?fit=crop&w=600&q=80'
        }
    ];

    const handleCityClick = (cityName) => {
        // Use navigation logic if needed
        console.log(`Clicked on ${cityName}`);
    };

    // Professional grid, responsive, cards
    return (
        <section className="py-5 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-4">Điểm đến nổi bật</h2>
                    <p className="text-gray-500">Khám phá những thành phố được đánh giá cao nhất</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {cities.map((city, idx) => (
                        <div
                            key={idx}
                            tabIndex={0}
                            role="button"
                            aria-label={`Xem ${city.reviews} bài viết về ${city.name}`}
                            onClick={() => handleCityClick(city.name)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCityClick(city.name);
                                }
                            }}
                            className="group cursor-pointer rounded-2xl shadow-gray-100 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400 selection:bg-orange-100 bg-gray-100"
                            style={{
                                background: `url('${city.image}') center/cover`,
                                position: 'relative',
                                minHeight: 200
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                            <div className="relative z-20 flex flex-col justify-end h-full p-6">
                                <h3 className="font-bold text-lg text-white drop-shadow-md mb-1">{city.name}</h3>
                                <span className="text-white text-sm drop-shadow-sm">{city.reviews} bài viết</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopReviews;
