// Auth check (register va login sahifasidan tashqari barcha sahifalarda)
const publicPages = ["login.html", "register.html", ""]; // bosh sahifa uchun "" ham
const currentPage = location.pathname.split("/").pop();
if (!publicPages.includes(currentPage)) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn) location.href = "login.html";
}

// Redirect to register if no user exists (except on register.html)
if (!localStorage.getItem("user") && currentPage !== "register.html") {
  location.href = "register.html";
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
}

// Register
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    if (!username || !password) return;
    localStorage.setItem("user", JSON.stringify({ username, password }));
    localStorage.setItem("message", "Ro‘yxatdan o‘tish muvaffaqiyatli! Endi login qiling.");
    location.href = "login.html";
  });
}

// Login
if (document.getElementById("loginForm")) {
  const msg = localStorage.getItem("message");
  if (msg) {
    document.getElementById("message").innerHTML = `<div class='alert alert-success'>${msg}</div>`;
    localStorage.removeItem("message");
  }
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username === username && user.password === password) {
      localStorage.setItem("loggedIn", "true");
      location.href = "index.html";
    } else {
      document.getElementById("message").innerHTML = `<div class='alert alert-danger'>Login yoki parol xato!</div>`;
    }
  });
}

// Contact data
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Add contact
if (document.getElementById("addForm")) {
  document.getElementById("addForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("addName").value.trim();
    const phone = document.getElementById("addPhone").value.trim();
    if (!name || !phone) return;
    contacts.push({ name, phone });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    localStorage.setItem("message", "Contact qo‘shildi!");
    location.href = "index.html";
  });
}

// Show contacts
if (document.getElementById("contactTable")) {
  const tbody = document.querySelector("#contactTable tbody");
  const message = localStorage.getItem("message");
  if (message) {
    document.getElementById("message").innerHTML = `<div class='alert alert-success'>${message}</div>`;
    localStorage.removeItem("message");
  }
  if (contacts.length === 0) {
    tbody.innerHTML = `<tr><td colspan='3' class='text-center text-muted'>Contactlar yo‘q</td></tr>`;
  } else {
    contacts.forEach((c, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.phone}</td>
          <td>
            <a href="edit.html?id=${i}" class="btn btn-warning btn-sm" title="Tahrirlash">
              <i class="bi bi-pencil"></i>
            </a>
            <button onclick="deleteContact(${i})" class="btn btn-danger btn-sm ms-1" title="O‘chirish">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
  }
}

// Delete contact
function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  localStorage.setItem("message", "Contact o‘chirildi!");
  location.reload();
}

// Edit contact
if (document.getElementById("editForm")) {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!contacts[id]) location.href = "index.html";
  document.getElementById("editName").value = contacts[id].name;
  document.getElementById("editPhone").value = contacts[id].phone;
  document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();
    contacts[id].name = document.getElementById("editName").value.trim();
    contacts[id].phone = document.getElementById("editPhone").value.trim();
    localStorage.setItem("contacts", JSON.stringify(contacts));
    localStorage.setItem("message", "Contact yangilandi!");
    location.href = "index.html";
  });
}
