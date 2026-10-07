// Juba Growth Desk - Client Interactions & Inquiry Routing
// Configurable contacts: update the WhatsApp number with the active South Sudan business line (+211...)
const CONTACT = {
  // Digits only with country code (211 for South Sudan).
  whatsapp: "211918509971",
  whatsappDisplay: "+211 918 509 971",
  email: "junubone@gmail.com"
};

// 1. Mobile Navigation Toggle
const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });
}

// 2. Interactive Venue Segment Tabs
const tabButtons = document.querySelectorAll(".venue-tab-btn");
const panels = document.querySelectorAll(".venue-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");

    tabButtons.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    panels.forEach((p) => {
      p.classList.remove("is-active");
      p.hidden = true;
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");

    const targetPanel = document.querySelector(`#panel-${target}`);
    if (targetPanel) {
      targetPanel.classList.add("is-active");
      targetPanel.hidden = false;
    }
  });
});

// Helper: auto-select need from venue cards
document.querySelectorAll(".venue-select-cta").forEach((btn) => {
  btn.addEventListener("click", () => {
    const needValue = btn.getAttribute("data-need");
    const needSelect = document.querySelector("#need");
    if (needSelect && needValue) {
      needSelect.value = needValue;
    }
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 3. Form Building & Dispatching
const inquiryForm = document.querySelector("#inquiry-form");
const statusMessage = document.querySelector("#form-status");
const submitBtn = document.querySelector("#submit-btn");
const copyBtn = document.querySelector("#copy-btn");
const toastNotice = document.querySelector("#toast-notice");
const channelRadios = document.querySelectorAll('input[name="channel_pref"]');

// Update submit button text based on selected channel
function updateSubmitButtonLabel() {
  const selectedPref = document.querySelector('input[name="channel_pref"]:checked')?.value || "whatsapp";
  if (submitBtn) {
    if (selectedPref === "whatsapp") {
      submitBtn.innerHTML = 'Send via WhatsApp <span aria-hidden="true">💬</span>';
      submitBtn.className = "button button-whatsapp form-submit";
    } else {
      submitBtn.innerHTML = 'Send via Email <span aria-hidden="true">✉️</span>';
      submitBtn.className = "button button-primary form-submit";
    }
  }
}

channelRadios.forEach((radio) => {
  radio.addEventListener("change", updateSubmitButtonLabel);
});

// Format clean inquiry text
function generateInquiryText(formData) {
  const lines = [
    "Hello Juba Growth Desk,",
    "I'd like to discuss hospitality inquiry and marketing support for our venue in Juba:",
    "",
    `• Name: ${formData.get("name") || "Not provided"}`,
    `• Venue: ${formData.get("business") || "Not provided"}`,
    formData.get("location") ? `• Juba Location: ${formData.get("location")}` : null,
    `• Primary Focus: ${formData.get("need") || "General inquiry"}`,
    formData.get("phone") ? `• WhatsApp/Phone: ${formData.get("phone")}` : null,
    formData.get("context") ? `• Details: ${formData.get("context")}` : null,
    "",
    "Sent via Juba Growth Desk portal"
  ].filter((item) => item !== null);

  return lines.join("\n");
}

function showToast(message) {
  if (!toastNotice) return;
  toastNotice.textContent = message;
  toastNotice.hidden = false;
  setTimeout(() => {
    toastNotice.hidden = true;
  }, 4500);
}

// Copy to clipboard handler
if (copyBtn && inquiryForm) {
  copyBtn.addEventListener("click", async () => {
    const formData = new FormData(inquiryForm);
    const text = generateInquiryText(formData);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older or unsecure mobile webviews
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = 'Copied! ✓ <span aria-hidden="true">📋</span>';
      showToast("Inquiry copied to clipboard! Paste it into WhatsApp, SMS or Email.");
      setTimeout(() => {
        copyBtn.innerHTML = origText;
      }, 3000);
    } catch {
      showToast("Could not copy automatically. Please select and copy text manually.");
    }
  });
}

// Form submit handler
if (inquiryForm && statusMessage) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!inquiryForm.reportValidity()) return;

    const formData = new FormData(inquiryForm);
    const brief = generateInquiryText(formData);
    const channel = formData.get("channel_pref") || "whatsapp";

    if (channel === "whatsapp") {
      const cleanNumber = CONTACT.whatsapp ? CONTACT.whatsapp.replace(/\D/g, "") : "";
      const waUrl = cleanNumber
        ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(brief)}`
        : `https://wa.me/?text=${encodeURIComponent(brief)}`;

      window.open(waUrl, "_blank", "noopener,noreferrer");
      statusMessage.textContent = "Your inquiry draft is ready in WhatsApp. Review the message and tap Send.";
      statusMessage.className = "form-status is-ready";
      showToast("Opening WhatsApp draft... Review and tap Send.");
      return;
    }

    if (channel === "email" && CONTACT.email) {
      const venueName = formData.get("business") || "Hospitality Inquiry";
      const subject = encodeURIComponent(`Juba Growth Desk Inquiry — ${venueName}`);
      window.location.href = `mailto:${encodeURIComponent(CONTACT.email)}?subject=${subject}&body=${encodeURIComponent(brief)}`;
      statusMessage.textContent = "Your email draft is ready. Review it in your email application and tap Send.";
      statusMessage.className = "form-status is-ready";
      showToast("Opening email draft... Review and tap Send.");
      return;
    }

    statusMessage.textContent = "Please select either WhatsApp or Email above to send your inquiry.";
    statusMessage.className = "form-status is-error";
  });
}

// Initial label sync
updateSubmitButtonLabel();
