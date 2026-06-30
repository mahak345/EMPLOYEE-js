"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const STORAGE_KEY = "employees_data";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    companyName: "",
    employeeId: "",
    department: "",
    designation: "",
    joiningDate: "",
    workEmail: "",
    manager: "",
    officeLocation: "",
};

export default function EmployeeDashboard() {
    const [formData, setFormData] = useState(initialForm);
    const [employees, setEmployees] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setEmployees(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse stored employees", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }, [employees]);

    // Validation
    const validate = (data) => {
        const err = {};
        if (!data.firstName.trim()) err.firstName = "First name required";
        if (!data.lastName.trim()) err.lastName = "Last name required";
        if (!data.email.trim()) err.email = "Email required";
        else if (!/\S+@\S+\.\S+/.test(data.email)) err.email = "Invalid email";
        if (!data.companyName.trim()) err.companyName = "Company name required";
        if (!data.department) err.department = "Select department";
        if (!data.workEmail.trim()) err.workEmail = "Work email required";
        else if (!/\S+@\S+\.\S+/.test(data.workEmail)) err.workEmail = "Invalid work email";
        return err;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (editId !== null) {
            setEmployees((prev) =>
                prev.map((emp) => (emp.id === editId ? { ...formData, id: editId } : emp))
            );
        } else {
            setEmployees((prev) => [...prev, { ...formData, id: Date.now() }]);
        }
        resetForm();
    };

    const handleEdit = (employee) => {
        setFormData(employee);
        setEditId(employee.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this employee?")) {
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        }
    };

    const resetForm = () => {
        setFormData(initialForm);
        setEditId(null);
        setErrors({});
    };

    const clearAll = () => {
        if (window.confirm("Delete all employees?")) setEmployees([]);
    };

    return (
        <div className="min-vh-100 py-5 animated-bg">
            <div className="container">
                {/* ===== HEADER – Glass ===== */}
                <div className="text-center mb-4 p-4 rounded-5 shadow-lg text-white glass-header">
                    <h1 className="display-2 fw-bold text-shadow" style={{ letterSpacing: "-1px" }}>
                        <i className="bi bi-person-workspace me-3"></i>
                        Employee Management
                    </h1>
                </div>

                {/* ===== Stats Bar ===== */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                    <span className="badge bg-primary bg-gradient rounded-pill px-4 py-2 fs-6 shadow">
                        <i className="bi bi-people me-2"></i> Total: {employees.length}
                    </span>
                    {employees.length > 0 && (
                        <button
                            className="btn btn-outline-light btn-sm rounded-pill px-4 glass-btn"
                            onClick={clearAll}
                        >
                            <i className="bi bi-trash3 me-1"></i> Clear All
                        </button>
                    )}
                </div>

                {/* ===== FORMS SECTION ===== */}
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        {/* Personal Info Card */}
                        <div className="col-lg-6">
                            <div className="card border-0 rounded-5 h-100 shadow-lg glass-card">
                                <div className="card-header border-0 rounded-top-5 py-3 personal-header">
                                    <h3 className="fw-bold mb-0 text-white">
                                        <i className="bi bi-person-fill me-2"></i>
                                        Personal Information
                                    </h3>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control glass-input ${errors.firstName ? "is-invalid" : ""}`}
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    placeholder="John"
                                                />
                                                <label htmlFor="firstName">First Name</label>
                                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control glass-input ${errors.lastName ? "is-invalid" : ""}`}
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Doe"
                                                />
                                                <label htmlFor="lastName">Last Name</label>
                                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className={`form-control glass-input ${errors.email ? "is-invalid" : ""}`}
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                />
                                                <label htmlFor="email">Email</label>
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="tel"
                                                    className="form-control glass-input"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+1 234 567 890"
                                                />
                                                <label htmlFor="phone">Phone</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="date"
                                                    className="form-control glass-input"
                                                    id="dob"
                                                    name="dob"
                                                    value={formData.dob}
                                                    onChange={handleChange}
                                                    placeholder="Date of Birth"
                                                />
                                                <label htmlFor="dob">Date of Birth</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select glass-input"
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <label htmlFor="gender">Gender</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control glass-input"
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="Street, City, State"
                                                    style={{ height: "80px" }}
                                                />
                                                <label htmlFor="address">Address</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Info Card */}
                        <div className="col-lg-6">
                            <div className="card border-0 rounded-5 h-100 shadow-lg glass-card">
                                <div className="card-header border-0 rounded-top-5 py-3 company-header">
                                    <h3 className="fw-bold mb-0 text-white">
                                        <i className="bi bi-building-fill me-2"></i>
                                        Company Information
                                    </h3>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className={`form-control glass-input ${errors.companyName ? "is-invalid" : ""}`}
                                                    id="companyName"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleChange}
                                                    placeholder="Indixpert"
                                                />
                                                <label htmlFor="companyName">Company Name</label>
                                                {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control glass-input"
                                                    id="employeeId"
                                                    name="employeeId"
                                                    value={formData.employeeId}
                                                    onChange={handleChange}
                                                    placeholder="EMP-001"
                                                />
                                                <label htmlFor="employeeId">Employee ID</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select
                                                    className={`form-select glass-input ${errors.department ? "is-invalid" : ""}`}
                                                    id="department"
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="IT">IT</option>
                                                    <option value="HR">HR</option>
                                                    <option value="Finance">Finance</option>
                                                    <option value="Marketing">Marketing</option>
                                                    <option value="Operations">Operations</option>
                                                </select>
                                                <label htmlFor="department">Department</label>
                                                {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control glass-input"
                                                    id="designation"
                                                    name="designation"
                                                    value={formData.designation}
                                                    onChange={handleChange}
                                                    placeholder="Senior Developer"
                                                />
                                                <label htmlFor="designation">Designation</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="date"
                                                    className="form-control glass-input"
                                                    id="joiningDate"
                                                    name="joiningDate"
                                                    value={formData.joiningDate}
                                                    onChange={handleChange}
                                                    placeholder="Joining Date"
                                                />
                                                <label htmlFor="joiningDate">Joining Date</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className={`form-control glass-input ${errors.workEmail ? "is-invalid" : ""}`}
                                                    id="workEmail"
                                                    name="workEmail"
                                                    value={formData.workEmail}
                                                    onChange={handleChange}
                                                    placeholder="work@company.com"
                                                />
                                                <label htmlFor="workEmail">Work Email</label>
                                                {errors.workEmail && <div className="invalid-feedback">{errors.workEmail}</div>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control glass-input"
                                                    id="manager"
                                                    name="manager"
                                                    value={formData.manager}
                                                    onChange={handleChange}
                                                    placeholder="Jane Smith"
                                                />
                                                <label htmlFor="manager">Manager</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control glass-input"
                                                    id="officeLocation"
                                                    name="officeLocation"
                                                    value={formData.officeLocation}
                                                    onChange={handleChange}
                                                    placeholder="New York, USA"
                                                />
                                                <label htmlFor="officeLocation">Office Location</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="row mt-4 g-3">
                        <div className="col-lg-6">
                            <button
                                type="submit"
                                className="btn btn-lg w-100 rounded-pill py-3 fw-bold text-white shadow-lg btn-gradient"
                            >
                                <i className="bi bi-save me-2"></i>
                                {editId !== null ? "Update Employee" : "Save Employee"}
                            </button>
                        </div>
                        <div className="col-lg-6">
                            {editId !== null && (
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-lg w-100 rounded-pill py-3 fw-bold glass-btn"
                                    onClick={resetForm}
                                >
                                    <i className="bi bi-x-circle me-2"></i> Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </form>

                {/* DASHBOARD TABLE */}
                <div className="mt-5">
                    <h3 className="fw-bold text-white mb-3 text-shadow">
                        <i className="bi bi-table me-2"></i> Employee Dashboard
                    </h3>
                    {employees.length === 0 ? (
                        <div className="text-center py-5 rounded-4 shadow-lg empty-state">
                            <i className="bi bi-info-circle fs-1 text-white-50"></i>
                            <p className="mt-3 fs-5 text-white">No employees added yet.</p>
                            <p className="text-white-50">Fill the form above and click <strong>Save Employee</strong>.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle rounded-4 overflow-hidden table-glass">
                                <thead className="table-head-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Company</th>
                                        <th>Dept.</th>
                                        <th>Designation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp, index) => (
                                        <tr key={emp.id} className="text-white border-bottom border-white-10">
                                            <td>{index + 1}</td>
                                            <td>{emp.firstName} {emp.lastName}</td>
                                            <td>{emp.email}</td>
                                            <td>{emp.companyName}</td>
                                            <td>{emp.department}</td>
                                            <td>{emp.designation}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-light me-1 rounded-pill"
                                                    onClick={() => handleEdit(emp)}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-pill"
                                                    onClick={() => handleDelete(emp.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* animation */}
            <style jsx>{`
        /* Animated gradient background */
        .animated-bg {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Glass header */
        .glass-header {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          animation: fadeInDown 0.8s ease-out;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Glass cards */
        .glass-card {
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
        }

        /* Card headers */
        .personal-header {
          background: linear-gradient(135deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8));
          backdrop-filter: blur(8px);
        }
        .company-header {
          background: linear-gradient(135deg, rgba(17,153,142,0.8), rgba(56,239,125,0.8));
          backdrop-filter: blur(8px);
        }

        /* Glass inputs */
        .glass-input {
          background: rgba(255,255,255,0.5) !important;
          border: 1px solid rgba(255,255,255,0.3) !important;
          border-radius: 12px !important;
        }
        .glass-input:focus {
          background: rgba(255,255,255,0.8) !important;
          border-color: #667eea !important;
          box-shadow: 0 0 0 0.25rem rgba(102,126,234,0.25) !important;
        }
        .form-floating > label {
          color: #555;
          font-weight: 500;
        }

        /* Gradient button */
        .btn-gradient {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(102,126,234,0.5);
        }
        .btn-gradient:hover {
          transform: scale(1.02);
          box-shadow: 0 0 40px rgba(102,126,234,0.8);
        }

        /* Glass buttons (Cancel) */
        .glass-btn {
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }
        .glass-btn:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.02);
        }

        /* Table glass */
        .table-glass {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .table-head-dark {
          background: linear-gradient(135deg, rgba(26,26,46,0.9), rgba(22,33,62,0.9));
          color: white;
        }

        /* Empty state */
        .empty-state {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.3);
        }

        /* Utility classes */
        .text-shadow {
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .text-white-80 {
          color: rgba(255,255,255,0.8);
        }
        .border-white-10 {
          border-color: rgba(255,255,255,0.1) !important;
        }
      `}</style>
        </div>
    );
}