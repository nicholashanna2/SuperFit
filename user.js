document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.getElementById("updateBtn");
  const form = document.getElementById("userForm");

  // Load saved data into form
  const savedData = JSON.parse(localStorage.getItem("superFitUser")) || {};
  Object.entries(savedData).forEach(([key, value]) => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.value = value;
  });

  //update customer info
  document.getElementById("updateBtn").addEventListener("click", () => {
    const form = document.getElementById("userForm");
    const inputs = form.querySelectorAll("input, textarea");
    const updatedData = {};

    inputs.forEach(input => {
      if (input.value.trim() !== "") {
        updatedData[input.name] = input.value.trim();
      }
    });

    localStorage.setItem("superFitUser", JSON.stringify(updatedData));
    alert("User info updated!");
  });

  const paymentForm = document.getElementById("paymentForm");
  const updatePaymentBtn = document.getElementById("updatePaymentBtn");
  const paymentDisplay = document.getElementById("paymentInfo");

  const savedPayment = JSON.parse(localStorage.getItem("paymentInfo")) || {};
  Object.entries(savedPayment).forEach(([key, value]) => {
    const input = paymentForm.querySelector(`[name="${key}"]`);
    if (input) input.value = value;
  });

  updatePaymentBtn.addEventListener("click", () => {
    const inputs = paymentForm.querySelectorAll("input");
    const updatedPayment = { ...savedPayment };

    inputs.forEach(input => {
      if (input.value.trim() !== "") {
        updatedPayment[input.name] = input.value.trim();
      }
    });
    localStorage.setItem("paymentInfo", JSON.stringify(updatedPayment));
    alert("Your payment info has been updated!");
    renderPaymentDisplay(updatedPayment);
  });

  function renderPaymentDisplay(data) {
    if (Object.keys(data).length > 0) {
      paymentDisplay.innerHTML = `
        <p><strong>Plan:</strong> ${data.plan}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Renewal Date:</strong> ${data.renewalDate}</p>
        <p><strong>Payment Method:</strong> ${maskCard(data.method)}</p>
        <p><em>You're all set to keep crushing your goals the SuperFit way!</em></p>
      `;
    } else {
      paymentDisplay.innerHTML = `
        <p>No payment info found.</p>
        <p><a href="Subscription.html" style="color:#0077cc;">Update your plan to unlock full features!</a></p>
      `;
    }
  }
    function maskCard(cardString) {
    const last4 = cardString.slice(-4);
    return `**** **** **** ${last4}`;
  }
  renderPaymentDisplay(savedPayment);
});
