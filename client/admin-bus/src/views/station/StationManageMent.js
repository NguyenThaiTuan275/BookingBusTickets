import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableBody,
    CTableDataCell,
    CButton,
    CFormInput,
    CFormSelect,
    CSpinner,
    CAlert,
    CImage,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CPagination,
    CPaginationItem,
    CInputGroup,
    CInputGroupText,
    CBadge,
    CProgress
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash, cilSearch, cilFilter } from '@coreui/icons';
import { stationAPI, statisticsAPI } from '../../lib/Api';
import StationModal from './StationModal';
import StationImage from './StationImage';

const StationManagement = () => {
    // State management
    const [stations, setStations] = useState([]);
    const [statistics, setStatistics] = useState({
        totalStations: 0,
        recentStations: 0,
        stationsWithImages: 0,
        stationsWithWallpapers: 0
    });
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [editData, setEditData] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

    // Pagination and filtering
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    // Load statistics on component mount (only once)
    useEffect(() => {
        loadStatistics();
    }, []);

    // Load data when filters change
    useEffect(() => {
        loadData();
    }, [currentPage, pageSize, searchTerm, sortBy, sortOrder]);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await stationAPI.getStations({
                page: currentPage,
                limit: pageSize,
                search: searchTerm,
                sortBy,
                order: sortOrder
            });
            console.log("🔥 Station response:", response);
            if (response.success) {
                setStations(response.responseObject || []);
                // Calculate total pages based on response
                const total = response.total || response.data?.length || 0;
                setTotalPages(Math.ceil(total / pageSize));
            } else {
                setAlert({
                    show: true,
                    message: response.message || 'Failed to load stations',
                    type: 'danger'
                });
            }
        } catch (error) {
            setAlert({
                show: true,
                message: error.message || 'An error occurred while loading data',
                type: 'danger'
            });
        } finally {
            setLoading(false);
        }
    };

    const loadStatistics = async () => {
        try {
            const stats = await statisticsAPI.getStationStats();
            setStatistics(stats);
        } catch (error) {
            console.error('Failed to load statistics:', error);
            // Set default values on error
            setStatistics({
                totalStations: 0,
                recentStations: 0,
                stationsWithImages: 0,
                stationsWithWallpapers: 0
            });
        }
    };

    const handleCreate = () => {
        setModalMode('create');
        setEditData(null);
        setModalVisible(true);
    };

    const handleEdit = (station) => {
        setModalMode('edit');
        setEditData(station);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await stationAPI.deleteStation(deleteId);
            setAlert({
                show: true,
                message: 'Station deleted successfully!',
                type: 'success'
            });
            setDeleteModalVisible(false);
            setDeleteId(null);
            loadData();
            loadStatistics();
        } catch (error) {
            setAlert({
                show: true,
                message: error.message || 'Failed to delete station',
                type: 'danger'
            });
        }
    };

    const handleModalSuccess = () => {
        loadData();
        loadStatistics();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Quản lý bến xe</h2>
                    <p className="text-muted mb-0">Quản lý thông tin và hoạt động của các bến xe</p>
                </div>
                <CButton
                    color="primary"
                    onClick={handleCreate}
                    className="d-flex align-items-center"
                >
                    <CIcon icon={cilPlus} className="me-2" />
                    Thêm bến xe mới
                </CButton>
            </div>

            {/* Alert */}
            {alert.show && (
                <CAlert
                    color={alert.type}
                    dismissible
                    onClose={() => setAlert({ show: false, message: '', type: 'success' })}
                    className="mb-4"
                >
                    {alert.message}
                </CAlert>
            )}

            {/* Statistics Cards */}
            <CRow className="mb-4">
                <CCol sm={6} lg={3}>
                    <CCard className="text-white bg-primary">
                        <CCardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{statistics.totalStations}</h4>
                                    <p className="mb-0">Tổng số bến xe</p>
                                </div>
                                <div className="align-self-center">
                                    <CIcon icon={cilFilter} size="2xl" />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={6} lg={3}>
                    <CCard className="text-white bg-success">
                        <CCardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{statistics.recentStations}</h4>
                                    <p className="mb-0">Bến xe mới (1 tháng)</p>
                                </div>
                                <div className="align-self-center">
                                    <CIcon icon={cilFilter} size="2xl" />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={6} lg={3}>
                    <CCard className="text-white bg-info">
                        <CCardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{statistics.stationsWithImages}</h4>
                                    <p className="mb-0">Có ảnh đại diện</p>
                                </div>
                                <div className="align-self-center">
                                    <CIcon icon={cilFilter} size="2xl" />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={6} lg={3}>
                    <CCard className="text-white bg-warning">
                        <CCardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{statistics.stationsWithWallpapers}</h4>
                                    <p className="mb-0">Có ảnh nền</p>
                                </div>
                                <div className="align-self-center">
                                    <CIcon icon={cilFilter} size="2xl" />
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Main Content */}
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Danh sách bến xe</h5>
                        <div className="d-flex gap-2">
                            <CInputGroup style={{ width: '300px' }}>
                                <CInputGroupText>
                                    <CIcon icon={cilSearch} />
                                </CInputGroupText>
                                <CFormInput
                                    placeholder="Tìm kiếm theo tên bến xe..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </CInputGroup>
                            <CFormSelect
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                style={{ width: '100px' }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </CFormSelect>
                        </div>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {loading ? (
                        <div className="text-center py-4">
                            <CSpinner color="primary" />
                            <p className="mt-2">Đang tải dữ liệu...</p>
                        </div>
                    ) : stations.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="text-muted">Không có dữ liệu bến xe nào</p>
                        </div>
                    ) : (
                        <>
                            <CTable hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Ảnh</CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSort('name')}
                                        >
                                            Tên bến xe
                                            {sortBy === 'name' && (
                                                <CIcon icon={sortOrder === 'asc' ? '↑' : '↓'} className="ms-1" />
                                            )}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Mô tả</CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSort('location')}
                                        >
                                            Vị trí
                                            {sortBy === 'location' && (
                                                <CIcon icon={sortOrder === 'asc' ? '↑' : '↓'} className="ms-1" />
                                            )}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSort('created_at')}
                                        >
                                            Ngày tạo
                                            {sortBy === 'created_at' && (
                                                <CIcon icon={sortOrder === 'asc' ? '↑' : '↓'} className="ms-1" />
                                            )}
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Thao tác</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {stations.map((station) => (
                                        <CTableRow key={station.id}>
                                            <CTableDataCell>
                                                <StationImage
                                                    image={`${window.location.origin}${station.image}`}
                                                    stationName={station.name}
                                                    size={50}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <strong>{station.name}</strong>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {station.descriptions ? (
                                                    <span title={station.descriptions}>
                                                        {station.descriptions.length > 50
                                                            ? `${station.descriptions.substring(0, 50)}...`
                                                            : station.descriptions
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">-</span>
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <span title={station.location}>
                                                    {station.location.length > 30
                                                        ? `${station.location.substring(0, 30)}...`
                                                        : station.location
                                                    }
                                                </span>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {formatDate(station.created_at)}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex gap-1">
                                                    <CButton
                                                        color="info"
                                                        size="sm"
                                                        onClick={() => handleEdit(station)}
                                                        title="Chỉnh sửa"
                                                    >
                                                        <CIcon icon={cilPencil} />
                                                    </CButton>
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(station.id)}
                                                        title="Xóa"
                                                    >
                                                        <CIcon icon={cilTrash} />
                                                    </CButton>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center mt-4">
                                    <CPagination>
                                        <CPaginationItem
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Trước
                                        </CPaginationItem>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <CPaginationItem
                                                key={page}
                                                active={page === currentPage}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </CPaginationItem>
                                        ))}

                                        <CPaginationItem
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Sau
                                        </CPaginationItem>
                                    </CPagination>
                                </div>
                            )}
                        </>
                    )}
                </CCardBody>
            </CCard>

            {/* Create/Edit Modal */}
            <StationModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSuccess={handleModalSuccess}
                editData={editData}
                mode={modalMode}
            />

            {/* Delete Confirmation Modal */}
            <CModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Xác nhận xóa</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bạn có chắc chắn muốn xóa bến xe này không? Hành động này không thể hoàn tác.
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>
                        Hủy
                    </CButton>
                    <CButton color="danger" onClick={confirmDelete}>
                        Xóa
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default StationManagement;
