"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [personal, setPersonal] = useState([]);

  const [activeTab, setActiveTab] = useState("employees");

  // EMPLOYEE FORM
  const [empForm, setEmpForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    experience: ""
  });

  // PERSONAL FORM
  const [perForm, setPerForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: ""
  });

  const [editEmpId, setEditEmpId] = useState(null);
  const [editPerId, setEditPerId] = useState(null);

  // GET EMPLOYEES
  const getEmployees = async () => {
    const res = await axios.get("http://localhost:5000/employees");
    setEmployees(res.data);
  };

  // GET PERSONAL
  const getPersonal = async () => {
    const res = await axios.get("http://localhost:5000/personal");
    setPersonal(res.data);
  };

  useEffect(() => {
    getEmployees();
    getPersonal();
  }, []);

  // ---------------- EMPLOYEE ----------------

  const handleEmpChange = (e) => {
    setEmpForm({ ...empForm, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/employees", {
      id: Date.now(),
      ...empForm
    });

    setEmpForm({ name: "", email: "", role: "", department: "", experience: "" });
    getEmployees();
  };

  const editEmployee = (emp) => {
    setEmpForm(emp);
    setEditEmpId(emp.id);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/employees/${editEmpId}`, empForm);

    setEmpForm({ name: "", email: "", role: "", department: "", experience: "" });
    setEditEmpId(null);
    getEmployees();
  };

  // ---------------- PERSONAL ----------------

  const handlePerChange = (e) => {
    setPerForm({ ...perForm, [e.target.name]: e.target.value });
  };

  const addPersonal = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/personal", {
      id: Date.now(),
      ...perForm
    });

    setPerForm({ fullName: "", email: "", phone: "", city: "", address: "" });
    getPersonal();
  };

  const editPersonal = (per) => {
    setPerForm(per);
    setEditPerId(per.id);
  };

  const updatePersonal = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/personal/${editPerId}`, perForm);

    setPerForm({ fullName: "", email: "", phone: "", city: "", address: "" });
    setEditPerId(null);
    getPersonal();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Dashboard</h1>

      {/* TABS */}
      <button onClick={() => setActiveTab("employees")}>Employees</button>
      <button onClick={() => setActiveTab("personal")}>Personal</button>

      <hr />

      {/* ---------------- EMPLOYEES ---------------- */}
      {activeTab === "employees" && (
        <>
          <h2>Employees</h2>

          <form onSubmit={editEmpId ? updateEmployee : addEmployee}>
            <input name="name" placeholder="Name" value={empForm.name} onChange={handleEmpChange} />
            <input name="email" placeholder="Email" value={empForm.email} onChange={handleEmpChange} />
            <input name="role" placeholder="Role" value={empForm.role} onChange={handleEmpChange} />
            <input name="department" placeholder="Department" value={empForm.department} onChange={handleEmpChange} />
            <input name="experience" placeholder="Experience" value={empForm.experience} onChange={handleEmpChange} />

            <button>{editEmpId ? "Update" : "Add"}</button>
          </form>

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button onClick={() => editEmployee(emp)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ---------------- PERSONAL ---------------- */}
      {activeTab === "personal" && (
        <>
          <h2>Personal Data</h2>

          <form onSubmit={editPerId ? updatePersonal : addPersonal}>
            <input name="fullName" placeholder="Full Name" value={perForm.fullName} onChange={handlePerChange} />
            <input name="email" placeholder="Email" value={perForm.email} onChange={handlePerChange} />
            <input name="phone" placeholder="Phone" value={perForm.phone} onChange={handlePerChange} />
            <input name="city" placeholder="City" value={perForm.city} onChange={handlePerChange} />
            <input name="address" placeholder="Address" value={perForm.address} onChange={handlePerChange} />

            <button>{editPerId ? "Update" : "Add"}</button>
          </form>

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {personal.map((per) => (
                <tr key={per.id}>
                  <td>{per.fullName}</td>
                  <td>{per.email}</td>
                  <td>{per.phone}</td>
                  <td>{per.city}</td>
                  <td>
                    <button onClick={() => editPersonal(per)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}