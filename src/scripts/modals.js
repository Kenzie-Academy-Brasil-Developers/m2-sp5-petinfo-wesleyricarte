import { createPost, updatePost, deletePost } from "./requests.js";

function createModalCreatePost() {
  const body = document.querySelector("body");

  body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-wrapper">
      <div class="modal">
        <div class="div-header-modal">
          <h3 class="font3-medium">Criando novo post</h3>
          <button class="button-close-modal">X</button>
        </div>
        <form id="form-create-post">
          <div class="div-title-post">
            <label for="title">Título do post</label>
            <input class="inputs-default input-title-create-post font4-regular" name="title"
              id="title" type="text" placeholder="Digite o título aqui"
            />
          </div>
          <div class="div-post-content">
            <label for="content">Conteúdo do post</label>
            <textarea class="font4-regular input-content-post" name="content" id="content" rows="5" 
            placeholder="Desenvolva o conteúdo do post aqui..."></textarea>
          </div>
          <div class="div-buttons-cancel-publish">
            <button class="buttons-default button-cancel-modal font4-medium">Cancelar</button>
            <button class="buttons-default button-submit-create-post font4-medium"
              type="submit">Publicar</button>
          </div>
        </form>
      </div>
    </div>
 `
  );

  const buttonCloseModal = document.querySelector(".button-close-modal");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const inputTitlePost = document.querySelector(".input-title-create-post");
  const inputContentPost = document.querySelector(".input-content-post");
  const buttonCancel = document.querySelector(".button-cancel-modal");
  const buttonSubmitCreatePost = document.querySelector(
    ".button-submit-create-post"
  );

  buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });

  buttonSubmitCreatePost.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {};
    data[inputTitlePost.id] = inputTitlePost.value;
    data[inputContentPost.id] = inputContentPost.value;
    modalWrapper.remove();
    return createPost(data);
  });
}

function createModalUpdateMyProfile(userMyProfile) {
  const div = document.querySelector(".div-button-create-post-userinfo");
  const divModal = document.createElement("div");
  const divUserIG = document.createElement("div");
  const h4UserIG = document.createElement("h4");
  const divLogOff = document.createElement("div");
  const imgLogOff = document.createElement("i");
  const h4LogOff = document.createElement("h4");

  divLogOff.append(imgLogOff, h4LogOff);
  divUserIG.append(h4UserIG);
  divModal.append(divUserIG, divLogOff);
  div.append(divModal);

  divModal.classList.add("div-modal-update-my-profile", "hidden");

  divUserIG.classList.add("div-user-ig");
  h4UserIG.classList.add("font4-medium", "user-ig");

  divLogOff.classList.add("div-log-off");
  imgLogOff.classList.add(
    "img-log-off",
    "text-gray4",
    "fa-solid",
    "fa-right-from-bracket"
  );
  h4LogOff.classList.add("font5-medium", "text-gray4");

  h4UserIG.innerText = "@" + userMyProfile.userIG;
  h4LogOff.innerText = "Sair da conta";

  divModal.addEventListener("mouseover", (e) => {
    e.preventDefault();
    createModalUpdateMyProfile(userMyProfile);
    divModal.classList.remove("hidden");
  });
  divModal.addEventListener("mouseout", (e) => {
    e.preventDefault();
    divModal.classList.add("hidden");
  });

  divUserIG.addEventListener("click", (e) => {
    e.preventDefault();
    // Lógica para chamada de função de atualizar e deletar usuário
    // Não foi pedido no Canvas, fazer no final se der tempo
  });
  divLogOff.addEventListener("click", (e) => {
    window.location.replace("../../index.html");
    localStorage.removeItem("user");
    localStorage.removeItem("myProfile");
  });
}

function createModalReadPost(idPost, postsData) {
  const body = document.querySelector("body");

  let thisPost = {};

  postsData.forEach((element) => {
    if (element.id == idPost) {
      thisPost = element;
      return thisPost;
    }
  });

  console.log(thisPost);

  const postedAt = thisPost.createdAt;
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

  body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-wrapper">
      <div class="modal">
        <div class="div-header-modal">
          <div class="div-card-header-user-createdAt">
            <div class="div-img-username">
              <img
                class="img-user"
                src="${thisPost.user.avatar}"
                alt="${thisPost.user.username}"
              />
              <h4 class="font5-medium">${thisPost.user.username}</h4>
            </div>
            <h4 class="font5-medium text-gray4">|</h4>
            <h4 class="font5-medium text-gray4">${postedToRead}</h4>
          </div>
          <button class="button-close-modal">X</button>
        </div>
        <div class="div-card-title">
          <h2 class="font2-bold">${thisPost.title}</h2>
        </div>
        <div class="div-card-content">
          <h6 class="font4-regular text-gray3">${thisPost.content}</h6>
        </div>
      </div>
    </div>`
  );

  const buttonCloseModal = document.querySelector(".button-close-modal");
  const modalWrapper = document.querySelector(".modal-wrapper");

  buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });
}

function createModalUpdatePost(idPost, postsData) {
  const body = document.querySelector("body");

  let thisPost = {};

  postsData.forEach((element) => {
    if (element.id == idPost) {
      thisPost = element;
      return thisPost;
    }
  });

  console.log(thisPost);

  body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-wrapper">
      <div class="modal">
        <div class="div-header-modal">
          <h3 class="font3-medium">Edição</h3>
          <button class="button-close-modal">X</button>
        </div>
        <form id="form-create-post">
          <div class="div-title-post">
            <label for="title">Título do post</label>
            <input size=1000 value="${thisPost.title}" class="inputs-default input-title-create-post font4-regular" name="title"
              id="title" type="text" placeholder="Digite o título aqui"/>
          </div>
          <div class="div-post-content">
            <label for="content">Conteúdo do post</label>
            <textarea class="font4-regular" name="content" id="content" rows="14" 
            placeholder="Desenvolva o conteúdo do post aqui..."></textarea>
          </div>
          <div class="div-buttons-cancel-publish">
            <button class="buttons-default button-cancel-modal font4-medium">Cancelar</button>
            <button class="buttons-default button-submit-create-post font4-medium"
              type="submit">Salva Alterações</button>
          </div>
        </form>
      </div>
    </div>`
  );

  const textarea = document.querySelector("#content");
  textarea.value = thisPost.content;

  const buttonCloseModal = document.querySelector(".button-close-modal");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const inputTitlePost = document.querySelector(".input-title-create-post");
  const buttonCancel = document.querySelector(".button-cancel-modal");
  const buttonSubmitCreatePost = document.querySelector(
    ".button-submit-create-post"
  );

  buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });

  buttonSubmitCreatePost.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {};
    data[inputTitlePost.id] = inputTitlePost.value;
    data[textarea.id] = textarea.value;
    modalWrapper.classList.add("hidden");
    updatePost(idPost, data);
  });
}

function createModalDeletePost(idPost, postsData) {
  const body = document.querySelector("body");

  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal-wrapper">
      <div class="modal">
        <div class="div-header-modal">
          <h3 class="font3-medium">Confirmação de exclusão</h3>
          <button class="button-close-modal">X</button>
        </div>
        <div class="div-body-alert-delete">
          <h2 class="font2-medium">Tem certeza que deseja excluir este post?</h2>
          <h5 class="font4-regular text-gray3">Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir</h5>
        </div>
        <div class="div-buttons-cancel-delete">
          <button class="buttons-default button-cancel-modal font4-medium">
            Cancelar
          </button>
          <button id="${idPost}" class="buttons-default button-delete-post-modal font4-medium">
            Sim, excluir este post
          </button>
        </div>
      </div>
    </div>`
  );

  const modalWrapper = document.querySelector(".modal-wrapper");
  const buttonCloseModal = document.querySelector(".button-close-modal");
  const buttonCancel = document.querySelector(".button-cancel-modal");
  const buttonDeletePostModal = document.querySelector(
    ".button-delete-post-modal"
  );

  buttonCloseModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });
  buttonCancel.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.remove();
  });
  buttonDeletePostModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.classList.add("hidden");
    deletePost(idPost);
  });
}

export {
  createModalCreatePost,
  createModalUpdateMyProfile,
  createModalReadPost,
  createModalUpdatePost,
  createModalDeletePost,
};
