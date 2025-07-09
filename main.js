// DOM Elements
const formElement = document.querySelector("form");
const boxesContainer = document.querySelector(".boxes-container");
const userHint = document.querySelector(".user-hint");

// Variable to track the currently dragged item
let draggedItem = null;

// Function to reset the form and update the user hint
const resetSettings = () => {
  formElement.reset();
  formElement.elements[0].focus();
  // Check if any item exists to update the hint text
  if (!document.querySelector(".item")) {
    userHint.style.color = "#b4a308";
    userHint.textContent = "*Add your first item to enable Drag & Drop";
  } else {
    userHint.style.color = "#1b9f3a";
    userHint.textContent = "You can drag any item and drop it in any box";
  }
};

// Event handler for adding a new item
const addItemHandler = (e) => {
  e.preventDefault();
  const inputValue = formElement.elements[0].value.trim();
  if (!inputValue) {
    alert("Attention!\nYou can't enter an empty value.");
    formElement.elements[0].focus(); // Re-focus the input field
    return;
  }
  const itemElement = document.createElement("p");
  itemElement.classList.add("item");
  itemElement.draggable = true;
  itemElement.textContent = inputValue;

  document.querySelector(".box1").appendChild(itemElement);

  resetSettings();
};

// --- Event Delegation for Drag & Drop Handling ---

// When a drag operation starts on an item
boxesContainer.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) {
    draggedItem = e.target;
    // Use setTimeout to avoid a flicker effect when adding the class
    e.target.classList.add("dragging");
  }
});

// When a drag operation ends
boxesContainer.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.remove("dragging");
    draggedItem = null;
  }
});

// When a dragged item is over the container area
boxesContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const targetBox = e.target.closest(".box");
  if (targetBox) {
    targetBox.classList.add("drag-over");
  }
});

// When a dragged item leaves a box area
boxesContainer.addEventListener("dragleave", (e) => {
  const targetBox = e.target.closest(".box");
  if (targetBox) {
    targetBox.classList.remove("drag-over");
  }
});

// When an item is dropped on a box
boxesContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const targetBox = e.target.closest(".box");
  if (targetBox && draggedItem) {
    targetBox.append(draggedItem);
    targetBox.classList.remove("drag-over");
  }
});

// Main Event Listeners
document.addEventListener("DOMContentLoaded", resetSettings);
formElement.addEventListener("submit", addItemHandler);
