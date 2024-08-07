"use strict";
const table = document.querySelector("table");
const th = table.querySelectorAll("th");
const tBody = table.querySelector("tbody");
const sortDirections = new Array(th.length).fill(true);
// sort table
th.forEach((header, index)=>{
    header.addEventListener("click", function() {
        const rows = [
            ...tBody.rows
        ];
        const sortedRows = rows.sort((a, b)=>{
            const aText = a.cells[index].textContent.trim();
            const bText = b.cells[index].textContent.trim();
            if (aText.includes("$")) {
                const aValue = parseFloat(aText.replace(/[$,]/g, ""));
                const bValue = parseFloat(bText.replace(/[$,]/g, ""));
                return sortDirections[index] ? aValue - bValue : bValue - aValue;
            } else return sortDirections[index] ? aText.localeCompare(bText) : bText.localeCompare(aText);
        });
        tBody.append(...sortedRows);
        sortDirections[index] = !sortDirections[index];
    });
});
// active click
table.addEventListener("click", (e)=>{
    const row = e.target.closest("tbody > tr");
    if (row) {
        table.querySelectorAll("tr").forEach((item)=>item.classList.remove("active"));
        row.classList.add("active");
    }
});
// create form
const newForm = document.createElement("form");
newForm.className = "new-employee-form";
newForm.innerHTML = `
  <label>Name: <input name="name" type="text" data-qa="name" required></label>
  <label>Position: <input name="position" type="text" data-qa="position" required></label>
  <label>Office:
    <select name="office" data-qa="office" required>
      <option>Tokyo</option>
      <option>Singapore</option>
      <option>London</option>
      <option>New York</option>
      <option>Edinburgh</option>
      <option>San Francisco</option>
    </select>
  </label>
  <label>Age: <input name="age" type="number" data-qa="age" required></label>
  <label>Salary: <input name="salary" type="number" data-qa="salary" required></label>
  <button data-qa="save-button">Save to table</button>
`;
document.body.append(newForm);
// function get data
const form = document.forms[0];
const button = form.querySelector('button[data-qa="save-button"]');
const getFormData = ()=>({
        name: form.elements.name.value.trim(),
        position: form.elements.position.value.trim(),
        office: form.elements.office.value.trim(),
        age: parseInt(form.elements.age.value, 10),
        salary: parseFloat(form.elements.salary.value.replace(/[^0-9.]/g, ""))
    });
// function validate form
const validateForm = ()=>{
    let isValid = true;
    form.querySelectorAll("input").forEach((input)=>{
        if (input.value.trim().length === 0) {
            pushNotification("\u041F\u043E\u043C\u0438\u043B\u043A\u0430!", "\u0412\u0441\u0456 \u043F\u043E\u043B\u044F \u043C\u0430\u044E\u0442\u044C \u0431\u0443\u0442\u0438 \u0437\u0430\u043F\u043E\u0432\u043D\u0435\u043D\u0438\u043C\u0438", "error");
            isValid = false;
        }
    });
    const personName = form.elements.name.value.trim();
    if (personName.length < 4 && personName.length > 0) {
        pushNotification("\u041F\u043E\u043C\u0438\u043B\u043A\u0430!", "\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0430 \u0434\u043E\u0432\u0436\u0438\u043D\u0430 \u0456\u043C\u0435\u043D\u0456 4 \u043B\u0456\u0442\u0435\u0440\u0438", "error");
        isValid = false;
    }
    const age = parseInt(form.elements.age.value, 10);
    if (age < 18 && age > 0 || age > 90) {
        pushNotification("\u0423\u0432\u0430\u0433\u0430!", "\u041F\u0435\u0440\u0435\u0432\u0456\u0440 \u0432\u0456\u043A", "error");
        isValid = false;
    }
    return isValid;
};
// notification
const pushNotification = (title, description, type)=>{
    const newDiv = document.createElement("div");
    newDiv.className = `notification ${type}`;
    newDiv.setAttribute("data-qa", "notification");
    const newH = document.createElement("h2");
    newH.className = "title";
    newH.textContent = title;
    newDiv.appendChild(newH);
    const newP = document.createElement("p");
    newP.textContent = description;
    newDiv.appendChild(newP);
    document.body.appendChild(newDiv);
    setTimeout(()=>{
        newDiv.style.visibility = "hidden";
    }, 4000);
};
// create new employee
button.addEventListener("click", (e)=>{
    e.preventDefault();
    if (!validateForm()) return;
    const newPerson = getFormData();
    form.reset();
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${newPerson.name}</td>
    <td>${newPerson.position}</td>
    <td>${newPerson.office}</td>
    <td>${newPerson.age}</td>
    <td>$${newPerson.salary.toLocaleString("en")}</td>
  `;
    tBody.prepend(newRow);
    pushNotification("\u0412\u0456\u0442\u0430\u0454\u043C\u043E!", " \u0423 \u043D\u0430\u0441 \u043D\u043E\u0432\u0438\u0439 \u043F\u0440\u0430\u0446\u0456\u0432\u043D\u0438\u043A!", "success");
});

//# sourceMappingURL=index.f75de5e1.js.map
