"use client";

import { useState } from "react";

export default function PersonalPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        city: "",
        address: ""
    });

    const [submitted, setSubmitted] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(form);
        alert("Employee Profile Saved!");
        setForm({
            fullName: "",
            email: "",
            phone: "",
            dob: "",
            gender: "",
            city: "",
            address: ""
        });
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">
                <div className="col-lg-9">

                    {/* CARD */}
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                        {/* HEADER */}
                        <div
                            className="text-white p-4"
                            style={{
                                background: "linear-gradient(135deg,#0f172a,#1e3a8a)"
                            }}
                        >
                            <h3 className="mb-1">Personal Profile</h3>
                            <small>HR Management System • Basic Information</small>
                        </div>

                        {/* FORM */}
                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input className="form-control form-control-lg" name="fullName"
                                            value={form.fullName} onChange={handleChange}
                                            placeholder="Enter employee name" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input className="form-control form-control-lg" name="email"
                                            value={form.email} onChange={handleChange}
                                            placeholder="employee@company.com" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input className="form-control form-control-lg" name="phone"
                                            value={form.phone} onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control form-control-lg"
                                            name="dob" value={form.dob} onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Gender</label>
                                        <select className="form-control form-control-lg"
                                            name="gender" value={form.gender} onChange={handleChange}>
                                            <option value="">Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">City</label>
                                        <input className="form-control form-control-lg"
                                            name="city" value={form.city}
                                            onChange={handleChange} placeholder="City" />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Address</label>
                                        <textarea className="form-control form-control-lg"
                                            name="address" rows="3"
                                            value={form.address} onChange={handleChange}
                                            placeholder="Full address"></textarea>
                                    </div>

                                </div>

                                <button className="btn btn-dark w-100 mt-4 btn-lg">
                                    Save  Profile
                                </button>

                            </form>

                        </div>
                    </div>

                    {/* OUTPUT */}
                    {submitted && (
                        <div className="card mt-4 shadow-sm border-0 rounded-4">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Saved Employee Data</h5>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    {Object.entries(submitted).map(([k, v]) => (
                                        <div className="col-md-6 mb-2" key={k}>
                                            <b>{k}:</b> {v}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}