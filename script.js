
let students = JSON.parse(localStorage.getItem("students")) || [];

function displayStudents(data = students) {
    let list = document.getElementById("studentList");

    list.innerHTML = "";

    data.forEach((s, index) => {
        list.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>${s.roll}</td>
                <td>${s.branch}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addStudent() {
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let branch = document.getElementById("branch").value.trim();

    if (name === "" || roll === "" || branch === "") {
        alert("Please fill all fields");
        return;
    }

    students.push({name, roll, branch});

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("branch").value = "";
}

function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

function editStudent(index) {
    let s = students[index];

    let name = prompt("Enter Name", s.name);
    let roll = prompt("Enter Roll Number", s.roll);
    let branch = prompt("Enter Branch", s.branch);

    if (name === null || roll === null || branch === null) {
        return;
    }

    if (!name.trim() || !roll.trim() || !branch.trim()) {
        alert("Fields cannot be empty");
        return;
    }

    students[index] = {
        name: name.trim(),
        roll: roll.trim(),
        branch: branch.trim()
    };

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

function searchStudent() {
    let value = document.getElementById("search").value.toLowerCase();

    let result = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.roll.toLowerCase().includes(value) ||
        s.branch.toLowerCase().includes(value)
    );

    displayStudents(result);
}

displayStudents();
