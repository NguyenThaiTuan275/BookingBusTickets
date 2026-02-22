import React, { useEffect, useMemo, useState } from 'react';
import api from '../../../../services/api.service.js';
import { API_ENDPOINTS } from '../../../../services/base.api.url.js';
import PaymentModal from './PaymentModal.jsx';

export default function SeatListModal({ open, onClose, schedule }) {
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedSeatId, setSelectedSeatId] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [createdTicket, setCreatedTicket] = useState(null);

    const busId = useMemo(() => schedule?.bus_id, [schedule]);
    console.log("car schedule", schedule)

    useEffect(() => {
        if (!open || !busId) return;
        const fetchSeats = async () => {
            setLoading(true);
            setError('');
            try {
                // Use stable seats endpoint aligning with admin panel behavior
                const res = await api.get(
                    API_ENDPOINTS.SEAT_DETAILS.replace(':id', busId),
                    { includeAuth: false, suppressUnauthorizedRedirect: true }
                );
                if (res.success) {
                    const payload = res.data;
                    const list = payload?.responseObject || payload?.data || payload || [];
                    setSeats(Array.isArray(list) ? list : []);
                } else {
                    setError(res.error || 'Failed to load seats');
                }
            } catch (e) {
                setError(e.message || 'Failed to load seats');
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [open, busId]);

    const toggleSeat = (seat) => {
        if (seat.status && String(seat.status).toUpperCase() !== 'AVAILABLE') return;
        setSelectedSeatId(prev => prev === seat.id ? null : seat.id);
    };

    const handleBook = async () => {
        if (!selectedSeatId) {
            setError('Vui lòng chọn một ghế');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const seatId = selectedSeatId;
            const selectedSeat = seats.find(s => s.id === seatId);

            const bookingData = {
                schedule_id: schedule.id,
                seat_id: seatId,
                payment_method: 'ONLINE'
            };

            const response = await api.post(
                API_ENDPOINTS.BOOK_TICKET,
                bookingData,
                { includeAuth: true }
            );

            if (response.success && response.data) {

                setCreatedTicket(response.data.responseObject);
                setShowPaymentModal(true);
            } else {
                setError(response.message || 'Đặt vé thất bại');
            }
        } catch (error) {
            console.error('Booking error:', error);
            setError(error.message || 'Đặt vé thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
        setCreatedTicket(null);
        onClose?.();
    };

    const selectedSeat = selectedSeatId ? seats.find(seat => seat.id === selectedSeatId) : null;

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[1000] flex items-center justify-center p-4">
            <div className="w-full max-w-3xl max-h-[85vh] overflow-auto bg-white rounded-2xl shadow-2xl border border-slate-200">
                {/* Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <div className="text-slate-900 font-semibold">Chọn ghế • Xe #{busId}</div>
                        <div className="text-slate-500 text-sm">Lịch trình #{schedule?.id}</div>
                    </div>
                    <button onClick={onClose} className="h-9 px-3 rounded-md border border-slate-300 hover:bg-slate-50 transition">Đóng</button>
                </div>

                {/* Body */}
                <div className="p-5">
                    {loading && <div className="text-slate-500">Đang tải danh sách ghế...</div>}
                    {error && !loading && <div className="text-red-600">{error}</div>}
                    {!loading && seats.length === 0 && <div className="text-slate-600">Không có ghế phù hợp.</div>}

                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                        {seats.map((seat) => {
                            const available = !seat.status || String(seat.status).toUpperCase() === 'AVAILABLE';
                            const selected = selectedSeatId === seat.id;
                            return (
                                <button
                                    key={seat.id}
                                    onClick={() => toggleSeat(seat)}
                                    disabled={!available}
                                    className={`h-20 flex flex-col justify-center items-center rounded-lg border text-sm font-medium transition
                                        ${selected ? 'bg-sky-600 text-white border-sky-700 shadow' : ''}
                                        ${!selected && available ? 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-300' : ''}
                                        ${!available ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : ''}
                                    `}
                                    title={available ? 'Còn trống' : 'Đã được đặt'}
                                >
                                    <div className={`font-bold ${selected ? 'text-white' : 'text-slate-800'}`}>{seat.seat_number || seat.code || seat.id}</div>
                                    <div className="text-xs mt-0.5">{seat.seat_type || '-'}</div>
                                    <div className={`text-xs mt-0.5 text-emerald-600 font-semibold ${selected ? 'text-white' : 'text-slate-800'}`}>{seat.price_for_type_seat ? Number(seat.price_for_type_seat).toLocaleString('vi-VN') + '₫' : '-'}</div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer actions */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                            {selectedSeatId ? (
                                <>Đã chọn ghế: <span className="font-semibold text-slate-900">{selectedSeat?.seat_number || selectedSeat?.code || selectedSeat?.id}</span></>
                            ) : (
                                'Chưa chọn ghế'
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={onClose} className="h-10 px-4 rounded-md border border-slate-300 hover:bg-slate-50 transition">Hủy</button>
                            <button onClick={handleBook} disabled={!selectedSeatId || loading} className="h-10 px-5 rounded-md bg-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-700 transition">
                                {loading ? 'Đang đặt...' : 'Đặt ghế'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                open={showPaymentModal}
                onClose={handleClosePaymentModal}
                ticket={createdTicket}
                schedule={schedule}
                selectedSeats={selectedSeat ? [selectedSeat] : []}
            />
        </div>
    );
}


