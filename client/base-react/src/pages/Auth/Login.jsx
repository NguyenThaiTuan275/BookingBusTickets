import { useState } from 'react';
import apiService from '../../services/api.service.js';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Vui lòng nhập email và mật khẩu.');

        }
        else {
            setLoading(true);
            const result = await apiService.login({ email, password });
            setLoading(false);

            if (!result.success) {
                setError(result.error || 'Đăng nhập thất bại');

            }

            else {
                const { token, user } = result.data || {};
                if (token) {
                    apiService.setAuthToken(token);
                }
                if (user) {
                    apiService.setUserData(user);
                }

                setSuccess('Đăng nhập thành công! Chào mừng bạn trở lại.');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        }


    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f6f9ff 0%, #eef2ff 100%)', padding: 16 }}>
            <div style={{ width: '100%', maxWidth: 440, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderRadius: 12, overflow: 'hidden', border: '1px solid #f0f3f8' }}>
                <div style={{ padding: 24, borderBottom: '1px solid #f2f5f9', background: 'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)' }}>
                    <h2 style={{ margin: 0, fontSize: 24 }}>Chào mừng trở lại</h2>
                    <p style={{ margin: '6px 0 0 0', color: '#667085' }}>Đăng nhập để quản lý đặt vé và chuyến đi của bạn</p>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: 24 }}>
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
                    <div style={{ marginBottom: 8 }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Mật khẩu</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 8, border: '1px solid #d0d5dd', outline: 'none' }}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 8, top: 6, padding: '6px 10px', borderRadius: 6, border: '1px solid #e6e8ec', background: '#f8fafc', cursor: 'pointer' }}>
                                {showPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ color: '#667085', fontSize: 13 }}>Sử dụng email và mật khẩu tài khoản của bạn</div>
                        <a href="/reset-password" style={{ fontSize: 13 }}>Quên mật khẩu?</a>
                    </div>

                    {error && (
                        <div style={{ color: '#b00020', marginBottom: 12, background: '#fff1f2', border: '1px solid #fecdd3', padding: 10, borderRadius: 8 }}>{error}</div>
                    )}
                    {success && (
                        <div style={{ color: '#05603a', marginBottom: 12, background: '#ecfdf3', border: '1px solid #abefc6', padding: 10, borderRadius: 8 }}>{success}</div>
                    )}

                    <button
                        onClick={(e) => handleSubmit(e)}
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
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>

                    <p style={{ marginTop: 14, textAlign: 'center', color: '#667085' }}>
                        Chưa có tài khoản? <a href="/register">Tạo tài khoản</a>
                    </p>
                </form>
            </div>
        </div>
    );
}


