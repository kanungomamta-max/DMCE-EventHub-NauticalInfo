/* DMCE EventHub - shared JavaScript
   Security teaching note:
   - Client-side validation improves UX; it is NOT a security boundary.
   - Never trust browser input on a real backend.
   - Use textContent rather than innerHTML for untrusted strings.
*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) setupContactForm(contactForm);

  const registrationForm = document.querySelector("#registrationForm");
  if (registrationForm) setupRegistrationForm(registrationForm);
});

const patterns = {
  name: /^[A-Za-z][A-Za-z .'-]{1,59}$/,
  mobile: /^(?:\+91[- ]?)?[6-9]\d{9}$/,
  subject: /^[A-Za-z0-9][A-Za-z0-9 .,!?()'&/:-]{2,99}$/
};

function getValue(form, id) {
  return form.querySelector(`#${id}`)?.value.trim() || "";
}

function setError(form, id, message) {
  const field = form.querySelector(`#${id}`);
  const error = form.querySelector(`#${id}Error`);
  if (field) field.setAttribute("aria-invalid", "true");
  if (error) error.textContent = message;
}

function clearError(form, id) {
  const field = form.querySelector(`#${id}`);
  const error = form.querySelector(`#${id}Error`);
  if (field) field.removeAttribute("aria-invalid");
  if (error) error.textContent = "";
}

function validateContact(form) {
  let valid = true;

  ["fullName", "email", "purpose", "subject", "message", "mobile"].forEach(id => clearError(form, id));

  const name = getValue(form, "fullName");
  const email = getValue(form, "email");
  const mobile = getValue(form, "mobile");
  const purpose = getValue(form, "purpose");
  const subject = getValue(form, "subject");
  const message = getValue(form, "message");

  if (!patterns.name.test(name)) {
    setError(form, "fullName", "Enter a valid name using letters and basic punctuation.");
    valid = false;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!emailOk) {
    setError(form, "email", "Enter a valid email address.");
    valid = false;
  }

  if (mobile && !patterns.mobile.test(mobile)) {
    setError(form, "mobile", "Enter a valid Indian mobile number, or leave it blank.");
    valid = false;
  }

  if (!purpose) {
    setError(form, "purpose", "Please select a purpose.");
    valid = false;
  }

  if (!patterns.subject.test(subject)) {
    setError(form, "subject", "Use 3–100 letters, numbers and common punctuation.");
    valid = false;
  }

  if (message.length < 10 || message.length > 1000) {
    setError(form, "message", "Message must be between 10 and 1000 characters.");
    valid = false;
  }

  return valid;
}

function showStatus(form, type, text) {
  const status = form.querySelector(".status");
  if (!status) return;
  status.className = `status ${type}`;
  // XSS-safe: never put submitted user input into HTML.
  status.textContent = text;
  status.style.display = "block";
}

function setupContactForm(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateContact(form)) {
      showStatus(form, "error", "Please correct the highlighted fields and try again.");
      return;
    }

    // Demo only: no data is sent to a server.
    // In production, POST to a secure backend and validate again server-side.
    showStatus(form, "success", "Thank you! Your enquiry has been recorded for this classroom demo.");
    form.reset();

    ["fullName", "email", "purpose", "subject", "message", "mobile"].forEach(id => clearError(form, id));
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      ["fullName", "email", "purpose", "subject", "message", "mobile"].forEach(id => clearError(form, id));
      const status = form.querySelector(".status");
      if (status) status.style.display = "none";
    }, 0);
  });
}

function setupRegistrationForm(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = getValue(form, "regName");
    const email = getValue(form, "regEmail");
    const eventChoice = getValue(form, "eventChoice");
    const status = form.querySelector(".status");

    if (name.length < 2 || !/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(name)) {
      status.textContent = "Please enter a valid name.";
      status.className = "status error";
      status.style.display = "block";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !eventChoice) {
      status.textContent = "Please provide a valid email and select an event.";
      status.className = "status error";
      status.style.display = "block";
      return;
    }

    status.textContent = "Registration submitted successfully for this classroom demo.";
    status.className = "status success";
    status.style.display = "block";
    form.reset();
  });
}
