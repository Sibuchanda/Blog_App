const userLogo = document.querySelector('.userLogo');
const navMenu = document.querySelector('.userDetails');

userLogo.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});


//Logout button logic ------

document.getElementById("logoutBtn").addEventListener("click", () => {
    const val = confirm("Do you want to logout?");
    if (val) {
      window.location.href = "/user/logout";
    }
  });
