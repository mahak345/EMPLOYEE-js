import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

// ensure file exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ employees: [] }));
}

const readDB = () => {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data || '{"employees":[]}');
};

const writeDB = (db) => {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

// GET
export async function GET() {
    const db = readDB();
    return NextResponse.json(db.employees);
}

// POST
export async function POST(request) {
    const newEmployee = await request.json();
    const db = readDB();

    db.employees.push(newEmployee);
    writeDB(db);

    return NextResponse.json(
        { message: "Employee added", employee: newEmployee },
        { status: 201 }
    );
}

// PUT
export async function PUT(request) {
    const updated = await request.json();
    const db = readDB();

    const index = db.employees.findIndex(
        (e) => e.employeeId === updated.employeeId
    );

    if (index === -1) {
        return NextResponse.json(
            { error: "Employee not found" },
            { status: 404 }
        );
    }

    db.employees[index] = updated;
    writeDB(db);

    return NextResponse.json({ message: "Employee updated" });
}

// DELETE
export async function DELETE(request) {
    const { employeeId } = await request.json();
    const db = readDB();

    const newData = db.employees.filter(
        (e) => e.employeeId !== employeeId
    );

    if (newData.length === db.employees.length) {
        return NextResponse.json(
            { error: "Employee not found" },
            { status: 404 }
        );
    }

    db.employees = newData;
    writeDB(db);

    return NextResponse.json({ message: "Employee deleted" });
}