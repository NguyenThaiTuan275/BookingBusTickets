import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import apiService from '../../services/api.service.js';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState(1); // 1: Verify, 2: Reset
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !phone) {
            setError('Vui lòng nhập đầy đủ email và số điện thoại.');
            return;
        }

        setLoading(true);
        const result = await apiService.verifyRecoveryInfo(email, phone);
        setLoading(false);

        if (result.success) {
            setUserId(result.data.responseObject.userId);
            setStep(2);
            setSuccess('Xác thực thành công. Vui lòng nhập mật khẩu mới.');
        } else {
            setError(result.error || 'Thông tin xác thực không chính xác.');
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!password || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ mật khẩu.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        setLoading(true);
        const result = await apiService.confirmResetPassword(userId, password);
        setLoading(false);

        if (result.success) {
            setSuccess('Đặt lại mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError(result.error || 'Đặt lại mật khẩu thất bại.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f6f9ff 0%, #eef2ff 100%)', padding: 16 }}>
            <div style={{ width: '100%', maxWidth: 440, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderRadius: 12, overflow: 'hidden', border: '1px solid #f0f3f8' }}>
                <div style={{ padding: 24, borderBottom: '1px solid #f2f5f9', background: 'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)' }}>
                    <h2 style={{ margin: 0, fontSize: 24 }}>{step === 1 ? 'Quên mật khẩu' : 'Đặt lại mật khẩu'}</h2>
                    <p style={{ margin: '6px 0 0 0', color: '#667085' }}>
                        {step === 1 ? 'Nhập email và số điện thoại để xác thực' : 'Nhập mật khẩu mới của bạn'}
                    </p>
                </div>
                <div style={{ padding: 24 }}>
                    {step === 1 ? (
                        <form onSubmit={handleVerify}>
                            <div style={{ marginBottom: 14 }}>
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
                            <div style={{ marginBottom: 14 }}>
                                <label htmlFor="phone" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Số điện thoại</label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="0912345678"
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                                />
                            </div>

                            {error && (
                                <div style={{ color: '#b00020', marginBottom: 12, background: '#fff1f2', border: '1px solid #fecdd3', padding: 10, borderRadius: 8 }}>{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: 12,
                                    borderRadius: 10,
                                    border: '1px solid #155ee7',
                                    background: loading ? '#94a3b8' : 'linear-gradient(180deg, #1a73e8 0%, #155ee7 100%)',
                                    color: '#fff',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                {loading ? 'Đang xác thực...' : 'Tiếp tục'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleReset}>
                            <div style={{ marginBottom: 14 }}>
                                <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Mật khẩu mới</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                                />
                            </div>
                            <div style={{ marginBottom: 14 }}>
                                <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Xác nhận mật khẩu</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                                />
                            </div>

                            {error && (
                                <div style={{ color: '#b00020', marginBottom: 12, background: '#fff1f2', border: '1px solid #fecdd3', padding: 10, borderRadius: 8 }}>{error}</div>
                            )}
                            {success && (
                                <div style={{ color: '#05603a', marginBottom: 12, background: '#ecfdf3', border: '1px solid #abefc6', padding: 10, borderRadius: 8 }}>{success}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: 12,
                                    borderRadius: 10,
                                    border: '1px solid #155ee7',
                                    background: loading ? '#94a3b8' : 'linear-gradient(180deg, #1a73e8 0%, #155ee7 100%)',
                                    color: '#fff',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                            </button>
                        </form>
                    )}

                    <div style={{ marginTop: 14, textAlign: 'center' }}>
                        <a href="/login" style={{ color: '#667085', fontSize: 14, textDecoration: 'none' }}>Quay lại đăng nhập</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
