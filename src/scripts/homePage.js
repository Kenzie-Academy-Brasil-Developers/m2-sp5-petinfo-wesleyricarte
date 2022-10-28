import { getLocalStorage } from "./localStorage.js";
import { toast } from "./toast.js";
import {
  getMyProfile,
  updateMyProfile,
  deleteUser,
  createPost,
  updatePost,
  getPosts,
  deletePost,
} from "./requests.js";
import {
  createModalCreatePost,
  createModalUpdateMyProfile,
  createModalReadPost,
  createModalUpdatePost,
  createModalDeletePost,
} from "./modals.js";

// FUNCTION TO VERIFY PERMISSION IN THE PAGE
async function verifyPermission() {
  const user = getLocalStorage();
  console.log(user);
  if (user == "") {
    window.location.replace("../../index.html");
  } else {
    await getMyProfile();
    header();
    showMainContent();
  }
}
verifyPermission();

function header() {
  // EVENT LISTENNER TO CREATE MODAL - CREATE POST
  const buttonCreatePost = document.querySelector(".button-crate-post");
  buttonCreatePost.addEventListener("click", (e) => {
    e.preventDefault();
    createModalCreatePost();
  });

  // EVENT LISTENNER TO CREATE MODAL - UPDATE MY PROFILE
  const imgUserNav = document.querySelector("#img-user-nav");
  const userMyProfile = JSON.parse(localStorage.getItem("myProfile"));
  userMyProfile["userIG"] = userMyProfile.username.replace(/\s/g, "");
  console.log(userMyProfile);
  imgUserNav.src = userMyProfile.avatar;
  imgUserNav.alt = userMyProfile.username;

  imgUserNav.addEventListener("mouseover", (e) => {
    e.preventDefault();
    createModalUpdateMyProfile(userMyProfile);
    const divModal = document.querySelector(".div-modal-update-my-profile");
    divModal.classList.remove("hidden");
  });
  imgUserNav.addEventListener("mouseout", (e) => {
    e.preventDefault();
    const divModal = document.querySelector(".div-modal-update-my-profile");
    divModal.classList.add("hidden");
  });
}

async function showMainContent() {
  const mainContent = document.querySelector(".main-content");
  const postsList = document.createElement("ul");
  postsList.classList.add("posts-list");
  mainContent.appendChild(postsList);

  const userMyProfile = JSON.parse(localStorage.getItem("myProfile"));

  const postsData = await getPosts();

  console.log(postsData);

  postsData.forEach((element) => {
    // console.log(element);

    const postedAt = element.createdAt;
    const months = [
      "Janeiro de ",
      "Fevereiro de ",
      "Março de ",
      "Abril de ",
      "Maio de ",
      "Junho de ",
      "Julho de ",
      "Agosto de ",
      "Setembro de ",
      "Outubro de ",
      "Novembro de ",
      "Dezembro de ",
    ];
    const year = postedAt.slice(0, 4);
    const mo = postedAt.slice(5, 7);
    const month = months[mo - 1];
    const postedToRead = month + year;

    const description = element.content.slice(0, 144) + "...";

    if (element.user.id == userMyProfile.id) {
      postsList.insertAdjacentHTML(
        "beforeend",
        `<li class="post-card">
          <div class="div-card-header">
            <div class="div-card-header-user-createdAt">
              <div class="div-img-username">
                <img class="img-user" src="${element.user.avatar}" alt="${element.user.username}" />
                <h4 class="font5-medium">${element.user.username}</h4>
              </div>
              <h4 class="font5-medium text-gray4">|</h4>
              <h4 class="font5-medium text-gray4">${postedToRead}</h4>
            </div>
            <div class="div-card-header-update-delete">
              <button id="${element.id}" class="font5-medium buttons-default button-update-post">Editar</button>
              <button id="${element.id}" class="font5-medium buttons-default button-delete-post">Excluir</button>
            </div>
          </div>
          <div class="div-card-title">
            <h2 class="font2-bold">${element.title}</h2>
          </div>
          <div class="div-card-content">
            <h6 class="font4-regular text-gray3">${description}</h6>
          </div>
          <div class="div-card-access-post">
            <p id="${element.id}" class="font4-medium text-blue p-access-post">Acessar publicação</p>
          </div>
        </li>`
      );
    } else {
      postsList.insertAdjacentHTML(
        "beforeend",
        `<li class="post-card">
          <div class="div-card-header">
            <div class="div-card-header-user-createdAt">
              <div class="div-img-username">
                <img class="img-user" src="${element.user.avatar}" alt="${element.user.username}" />
                <h4 class="font5-medium">${element.user.username}</h4>
              </div>
              <h4 class="font5-medium text-gray4">|</h4>
              <h4 class="font5-medium text-gray4">${postedToRead}</h4>
            </div>
          </div>
          <div class="div-card-title">
            <h2 class="font2-bold">${element.title}</h2>
          </div>
          <div class="div-card-content">
            <h6 class="font4-regular text-gray3">${description}</h6>
          </div>
          <div class="div-card-access-post">
            <p id="${element.id}" class="font4-medium text-blue p-access-post">Acessar publicação</p>
          </div>
        </li>`
      );
    }
  });

  const buttonsUpdatePost = document.querySelectorAll(".button-update-post");
  const buttonsDeletePost = document.querySelectorAll(".button-delete-post");
  const pAccessPosts = document.querySelectorAll(".p-access-post");

  buttonsUpdatePost.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(button.id);
      createModalUpdatePost(button.id, postsData);
    });
  });

  buttonsDeletePost.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(button.id);
      createModalDeletePost(button.id, postsData);
    });
  });

  pAccessPosts.forEach((p) => {
    p.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(p.id);
      createModalReadPost(p.id, postsData);
    });
  });
}
