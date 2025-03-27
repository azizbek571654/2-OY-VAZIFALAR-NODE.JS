const editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.id;
    window.location = `http://localhost:4000/todo/${id}`;
  });
});