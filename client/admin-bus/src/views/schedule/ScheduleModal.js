import React, { useEffect, useMemo, useState } from 'react'
import { vehicleSchedulesAPI } from '../../lib/Api'

// Align with DB: route_id, bus_id, is_active (boolean)
const defaultForm = { route_id: '', bus_id: '', is_active: true, departure_time: '' }

const ScheduleModal = ({ open, onClose, onSaved, initialData, routes = [], cars = [] }) => {
    const [form, setForm] = useState(defaultForm)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (initialData) {
            setForm({
                route_id: initialData.route_id || '',
                bus_id: initialData.bus_id || '',
                is_active: initialData.is_active ?? true,
                departure_time: initialData.departure_time ? new Date(initialData.departure_time).toISOString().slice(0, 16) : '',
            })
        } else {
            setForm(defaultForm)
        }
    }, [initialData])

    const submit = async (e) => {
        e?.preventDefault?.()
        setSubmitting(true)
        setError('')
        try {
            const payload = {
                route_id: Number(form.route_id),
                bus_id: Number(form.bus_id),
                is_active: Boolean(form.is_active),
                departure_time: form.departure_time ? new Date(form.departure_time).toISOString() : null,
            }
            const data = initialData?.id
                ? await vehicleSchedulesAPI.updateSchedule(initialData.id, payload)
                : await vehicleSchedulesAPI.createSchedule(payload)
            if (data?.success === false) throw new Error(data?.message || 'Lỗi lưu lịch trình')
            onSaved?.()
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (!open) return null

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initialData ? 'Cập nhật lịch trình' : 'Thêm lịch trình'}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
                    </div>
                    <form onSubmit={submit}>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-3">
                                <label className="form-label">Tuyến</label>
                                <select className="form-select" value={form.route_id} onChange={e => setForm(f => ({ ...f, route_id: e.target.value }))} required>
                                    <option value="">Chọn tuyến</option>
                                    {routes.map(r => (
                                        <option key={r.id} value={r.id}>
                                            {(r.departure_name || 'N/A') + ' → ' + (r.arrival_name || 'N/A')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Xe</label>
                                <select className="form-select" value={form.bus_id} onChange={e => setForm(f => ({ ...f, bus_id: e.target.value }))} required>
                                    <option value="">Chọn xe</option>
                                    {cars.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Thời gian khởi hành</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={form.departure_time}
                                    onChange={e => setForm(f => ({ ...f, departure_time: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" id="isActiveCheck" checked={!!form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} />
                                <label className="form-check-label" htmlFor="isActiveCheck">
                                    Kích hoạt
                                </label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>Đóng</button>
                            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Đang lưu...' : 'Lưu'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ScheduleModal
