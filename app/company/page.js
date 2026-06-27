"use client";

import { useState } from "react";

export default function CompanyPage() {
    const [form, setForm] = useState({
        companyName: "Indixpert",
        employeeName: "",
        email: "",
        role: "",
        department: "",
        experience: "",
        country: "",
        address: ""
    });

    const [submitted, setSubmitted] = useState(null);

    const roles = [
        "Intern",
        "Junior Developer",
        "Senior Developer",
        "Team Lead",
        "Manager",
        "HR",
        "Tester",
        "DevOps Engineer",
        "UI/UX Designer"
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(form);
        alert("Employee Assigned Successfully!");
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-10">

                    {/* MAIN CARD */}
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                        {/* HEADER */}
                        <div
                            className="text-white p-4"
                            style={{
                                background: "linear-gradient(135deg,#0f172a,#0ea5e9)"
                            }}
                        >
                            <h3 className="mb-1">Company Employee </h3>

                        </div>

                        {/* FORM */}
                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    {/* COMPANY NAME */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Company</label>
                                        <input
                                            className="form-control form-control-lg"
                                            value={form.companyName}
                                            readOnly
                                        />
                                    </div>

                                    {/* EMPLOYEE NAME */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Employee Name</label>
                                        <input
                                            name="employeeName"
                                            className="form-control form-control-lg"
                                            placeholder="Enter employee name"
                                            value={form.employeeName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Email</label>
                                        <input
                                            name="email"
                                            className="form-control form-control-lg"
                                            placeholder="employee@company.com"
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* ROLE DROPDOWN */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Role</label>
                                        <select
                                            name="role"
                                            className="form-select form-select-lg"
                                            value={form.role}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map((r, i) => (
                                                <option key={i} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* DEPARTMENT */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Department</label>
                                        <input
                                            name="department"
                                            className="form-control form-control-lg"
                                            placeholder="IT / HR / Finance"
                                            value={form.department}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* EXPERIENCE */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Experience (Years)</label>
                                        <input
                                            name="experience"
                                            className="form-control form-control-lg"
                                            placeholder="e.g. 2"
                                            value={form.experience}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Country */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Country</label>
                                        <input
                                            name="country"
                                            className="form-control form-control-lg"
                                            placeholder="India / USA"
                                            value={form.country}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* ADDRESS */}
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">Address</label>
                                        <textarea
                                            name="address"
                                            rows="3"
                                            className="form-control form-control-lg"
                                            placeholder="Full address"
                                            value={form.address}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                </div>

                                <button className="btn btn-primary w-100 btn-lg mt-4">
                                    Employee
                                </button>

                            </form>

                        </div>
                    </div>

                    {/* Sumbission */}
                    {submitted && (
                        <div className="card mt-4 shadow border-0 rounded-4">

                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0"> Employee </h5>
                            </div>

                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-6 mb-2"><b>Name:</b> {submitted.employeeName}</div>
                                    <div className="col-md-6 mb-2"><b>Email:</b> {submitted.email}</div>
                                    <div className="col-md-6 mb-2"><b>Role:</b> {submitted.role}</div>
                                    <div className="col-md-6 mb-2"><b>Department:</b> {submitted.department}</div>
                                    <div className="col-md-6 mb-2"><b>Experience:</b> {submitted.experience} yrs</div>
                                    <div className="col-md-6 mb-2"><b>Country:</b> {submitted.country}</div>
                                    <div className="col-12 mb-2"><b>Address:</b> {submitted.address}</div>

                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}
