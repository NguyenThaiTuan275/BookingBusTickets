import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginUser } from '../../store/authSlice'
import { authAPI } from '../../lib/Api'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (error) setError('')
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError('')

        try {
            const response = await authAPI.login(formData)

            if (response.success) {

                // Store token in localStorage
                localStorage.setItem('authToken', response.token)

                // Dispatch user data to Redux store
                dispatch(loginUser({
                    user: response.user,
                    token: response.token
                }))

                // Redirect to dashboard
                navigate('/dashboard')
            } else {
                setError(response.message || 'Login failed')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <div>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>

                                        {error && (
                                            <CAlert color="danger" dismissible onClose={() => setError('')}>
                                                {error}
                                            </CAlert>
                                        )}

                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                autoComplete="email"
                                            />
                                        </CInputGroup>

                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Password"
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                autoComplete="current-password"
                                            />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    type="button"
                                                    disabled={loading}
                                                    onClick={handleSubmit}
                                                >
                                                    {loading ? 'Signing in...' : 'Login'}
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </div>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5">
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Bus Management System</h2>
                                        <p>
                                            Welcome to the admin panel for managing bus companies, routes, and operations.
                                        </p>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login


