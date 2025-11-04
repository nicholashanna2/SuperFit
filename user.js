document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.getElementById("updateBtn");
  const form = document.getElementById("userForm");

  // Load saved data into form
  const savedData = JSON.parse(localStorage.getItem("superFitUser")) || {};
  Object.entries(savedData).forEach(([key, value]) => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.value = value;
  });

  // Update only the customer-typed fields
  updateBtn.addEventListener("click", () => {
    const inputs = form.querySelectorAll("input, textarea");
    const updatedData = { ...savedData };

    inputs.forEach(input => {
      if (input.value.trim() !== "") {
        updatedData[input.name] = input.value.trim();
      }
    });

    localStorage.setItem("superFitUser", JSON.stringify(updatedData));
    alert("Your info has been updated!");
  });
});
