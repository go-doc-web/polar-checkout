document.addEventListener("DOMContentLoaded", function () {
  // -----------------------
  // Refs to DOM elements
  // -----------------------
  const refs = {
    productCount: document.getElementById("product-count"),
    checkoutLink: document.querySelector(".btn-checkout"),
    checkoutBtn: document.getElementById("checkout-link"),
    stepsDisplay: document.getElementById("steps"),
    scrollToBuilderBtn: document.querySelector(".hero-btn"),
    buildButtons: document.querySelectorAll(".selected-build-btn"),
    buildSection: document.getElementById("build"),
  };

  // -----------------------
  // Global state
  // -----------------------
  const buildSteps = window.quantityBuildSteps;
  let selectedCount = 0;

  // -----------------------
  // UI updates
  // -----------------------
  function updateCheckoutButton(count) {
    if (refs.productCount && refs.checkoutLink) {
      refs.productCount.textContent = count;
      refs.checkoutLink.classList.remove("primery", "disabled");

      if (count >= buildSteps) {
        refs.checkoutLink.classList.add("primery");
      } else {
        refs.checkoutLink.classList.add("disabled");
      }
    } else {
      console.error("Checkout elements not found");
    }
  }

  function scrollToBuilderSection() {
    if (refs.scrollToBuilderBtn && refs.buildSection) {
      refs.scrollToBuilderBtn.addEventListener("click", function () {
        refs.buildSection.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      console.error("Builder scroll elements not found");
    }
  }

  // -----------------------
  // Product selection logic
  // -----------------------
  function handleProductSelect(btn) {
    const currentStep = btn.closest(".build-section");
    const siblingButtons = currentStep.querySelectorAll(".selected-build-btn");
    const productCard = btn.closest(".product-card");
    const hint = btn.nextElementSibling;

    if (btn.classList.contains("selected")) {
      // Deselect product
      btn.classList.remove("selected");
      btn.disabled = false;
      productCard.classList.remove("selected");

      if (hint && hint.classList.contains("select-hint")) {
        hint.style.display = "none";
      }

      siblingButtons.forEach((otherBtn) => {
        otherBtn.disabled = false;
        otherBtn.classList.remove("disabled");

        const otherHint = otherBtn.nextElementSibling;
        if (otherHint && otherHint.classList.contains("select-hint")) {
          otherHint.style.display = "none";
        }
      });

      selectedCount--;
      updateCheckoutButton(selectedCount);
      return;
    }

    // Select product
    btn.classList.add("selected");

    if (hint && hint.classList.contains("select-hint")) {
      hint.style.display = "block";
    }

    siblingButtons.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.disabled = true;
        otherBtn.classList.add("disabled");
        productCard.classList.add("selected");

        const otherHint = otherBtn.nextElementSibling;
        if (otherHint && otherHint.classList.contains("select-hint")) {
          otherHint.style.display = "none";
        }
      }
    });

    selectedCount++;
    updateCheckoutButton(selectedCount);

    // Scroll to next step
    const nextStep = currentStep.nextElementSibling;
    if (nextStep && nextStep.classList.contains("build-section")) {
      nextStep.scrollIntoView({ behavior: "smooth" });
    }
  }

  function initProductSelection() {
    refs.buildButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        handleProductSelect(btn);
      });
    });
  }

  // -----------------------
  // Checkout logic
  // -----------------------
  function handleCheckoutClick(e) {
    e.preventDefault();

    const selectedButtons = document.querySelectorAll(".btn.selected");
    const items = [];

    selectedButtons.forEach((btn) => {
      const productId = btn.getAttribute("data-product-id");
      const variantId = btn.getAttribute("data-variant-id");

      if (productId && variantId) {
        items.push({
          id: parseInt(variantId, 10),
          quantity: 1,
        });
      }
    });

    if (items.length === 0) {
      alert("Please select a product before placing an order.");
      return;
    }

    // Step 1: Clear the cart first
    fetch(`${window.Shopify.routes.root}cart/clear.js`, {
      method: "POST",
    })
      .then(() => {
        // Step 2: Add selected items
        return fetch(`${window.Shopify.routes.root}cart/add.js`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        });
      })
      .then((response) => response.json())
      .then(() => {
        // Step 3: Redirect to checkout
        window.location.href = `${window.Shopify.routes.root}checkout`;
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        alert("Failed to process the order. Please try again.");
      });
  }

  // -----------------------
  // Init app
  // -----------------------
  function init() {
    refs.stepsDisplay.textContent = buildSteps;
    updateCheckoutButton(selectedCount);
    scrollToBuilderSection();
    initProductSelection();
    refs.checkoutBtn.addEventListener("click", handleCheckoutClick);
  }

  init();
});
