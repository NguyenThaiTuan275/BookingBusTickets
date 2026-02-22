import { useState } from 'react';
import apiService from '../../services/api.service.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validate = () => {
        if (!email || !phone || !password || !age) {
            return 'Vui lòng điền đầy đủ thông tin.';
        }
        const phoneRegex = /^\+?[0-9]{9,15}$/;
        if (!phoneRegex.test(phone)) {
            return 'Số điện thoại không hợp lệ.';
        }
        const parsedAge = Number(age);
        if (!Number.isFinite(parsedAge) || parsedAge < 13 || parsedAge > 120) {
            return 'Tuổi phải là số hợp lệ từ 13 đến 120.';
        }
        if (password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password) ||
            !/[^A-Za-z0-9]/.test(password)
        ) {
            return 'Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validationMessage = validate();
        if (validationMessage) {
            setError(validationMessage);
            return;
        }

        setLoading(true);
        // age is only for UI; backend accepts { email, phone, password }
        const result = await apiService.register({ email, phone, password, age });
        setLoading(false);

        if (!result.success) {
            setError(result.error || 'Đăng ký thất bại');
            return;
        }

        setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f6f9ff 0%, #eef2ff 100%)', padding: 16 }}>
            <div style={{ width: '100%', maxWidth: 520, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderRadius: 12, overflow: 'hidden', border: '1px solid #f0f3f8' }}>
                <div style={{ padding: 24, borderBottom: '1px solid #f2f5f9', background: 'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)' }}>
                    <h2 style={{ margin: 0, fontSize: 24 }}>Tạo tài khoản</h2>
                    <p style={{ margin: '6px 0 0 0', color: '#667085' }}>Tham gia để đặt vé nhanh hơn và quản lý chuyến đi</p>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ban@example.com"
                                style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Số điện thoại</label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+84901234567"
                                style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="age" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Tuổi</label>
                            <input
                                id="age"
                                type="number"
                                min="13"
                                max="120"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="18"
                                style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Mật khẩu</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu mạnh"
                                    style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 8, top: 6, padding: '6px 10px', borderRadius: 6, border: '1px solid #e6e8ec', background: '#f8fafc', cursor: 'pointer' }}>
                                    {showPassword ? 'Ẩn' : 'Hiện'}
                                </button>
                            </div>
                            <small style={{ color: '#555' }}>8+ ký tự, chữ hoa, chữ thường, số, ký tự đặc biệt.</small>
                        </div>
                    </div>

                    {error && (
                        <div style={{ color: '#b00020', marginTop: 12, background: '#fff1f2', border: '1px solid #fecdd3', padding: 10, borderRadius: 8 }}>{error}</div>
                    )}
                    {success && (
                        <div style={{ color: '#05603a', marginTop: 12, background: '#ecfdf3', border: '1px solid #abefc6', padding: 10, borderRadius: 8 }}>{success}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: 14,
                            padding: 12,
                            borderRadius: 10,
                            border: '1px solid #155ee7',
                            background: loading ? '#94a3b8' : 'linear-gradient(180deg, #1a73e8 0%, #155ee7 100%)',
                            color: '#fff',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 600,
                        }}
                    >
                        {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                    </button>

                    <p style={{ marginTop: 14, textAlign: 'center', color: '#667085' }}>
                        Đã có tài khoản? <a href="/login">Đăng nhập</a>
                    </p>
                </form>
            </div>
        </div>
    );
}


