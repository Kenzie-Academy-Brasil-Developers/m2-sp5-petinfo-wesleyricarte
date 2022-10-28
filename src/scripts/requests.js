import { toast } from "./toast.js";
import { getLocalStorage } from "./localStorage.js";

const baseUrl = "http://localhost:3333/";

// USERS FUNCTIONS

/*ok*/ async function register(userInfo) {
  const button = document.querySelector("#button-register");

  try {
    button.innerHTML = `
    <i class="fa-solid fa-spinner"></i>
    `;

    const data = {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      avatar: userInfo.avatar,
    };
    // console.log(data);
    const request = await fetch(baseUrl + "users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(request);

    if (request.ok) {
      const response = await request.json();

      // console.log(response);

      toast(
        "Sua conta foi criada com sucesso!",
        `
       Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:
       <a href="../../index.html">Acessar página de login</a>`
      );

      setTimeout(() => {
        window.location.replace("../../index.html");
      }, 5000);
    } else {
      // console.log(response);
      toast(
        "Sua conta não foi criada!",
        "Tente criar sua conta novamente preenchendo todos os campos com valores válidos"
      );
    }
  } catch (err) {
    console.log(err);
    toast(
      "Sua conta não foi criada!",
      "Tente criar sua conta novamente preenchendo todos os campos com valores válidos"
    );
  } finally {
    setTimeout(() => {
      button.innerHTML = "Cadastrar";
    }, 4000);
  }
}

/*ok*/ async function login(userMailPass) {
  const spanWrongPassword = document.querySelector(".span-wrong-password");
  const inputPassword = document.querySelector("#password");

  const button = document.querySelector("#button-password");

  try {
    button.innerHTML = `
    <i class="fa-solid fa-spinner"></i>
    `;

    const request = await fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userMailPass),
    });

    // console.log(request);

    if (request.ok) {
      const response = await request.json();
      toast(
        "Você fez login com sucesso!",
        `
      Agora você pode acessar os conteúdos na rede acessando a página inicial:
      <a href="./src/pages/homePage.html">Acessar página de posts</a>`
      );

      localStorage.setItem("user", JSON.stringify(response));

      setTimeout(() => {
        window.location.replace("./src/pages/homePage.html");
      }, 4000);
    } else if (request.status != 200) {
      spanWrongPassword.classList.remove("hidden");
      inputPassword.classList.add("input-wrong-password");

      toast(
        "Seu login deu errado",
        "Tente novamente inserindo seu e-mail e senha corretos"
      );
    }
  } catch (err) {
    console.log(err);
    toast(
      "Seu login deu errado",
      "Tente novamente inserindo seu e-mail e senha corretos"
    );
  } finally {
    setTimeout(() => {
      button.innerHTML = "Acessar";
    }, 4000);
  }
}

/*ok*/ async function getMyProfile() {
  const user = getLocalStorage();

  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const response = await request.json();

    // console.log(request);
    // console.log(response);

    if (request.ok) {
      localStorage.setItem("myProfile", JSON.stringify(response));
      // console.log("Usuário atual salvo no Local Storage com a key myProfile");
    }
  } catch (err) {
    console.log(err);
  }
}

/*ok*/ async function updateMyProfile(updateInfo) {
  const user = getLocalStorage();
  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: `${updateInfo}`,
    });
    const response = await request.json();

    if (request.ok) {
      localStorage.setItem("user", JSON.stringify(response));
    } else {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

/*ok*/ async function deleteUser(tokenUser) {
  const user = getLocalStorage();

  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const response = await request.json();

    if (request.ok) {
      localStorage.removeItem("user");
      localStorage.removeItem("myProfile");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
}

// POSTS FUNCTIONS

/*ok*/ async function createPost(postContent) {
  const user = getLocalStorage();
  try {
    const request = await fetch(baseUrl + "posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(postContent),
    });

    const response = await request.json();

    console.log(response);

    if (request.ok) {
      toast(
        "Post criado com sucesso!",
        "O seu post foi criado para exibição no site, a partir de agora aparecerá no seu feed"
      );
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast(
        "Post não foi criado!",
        "O post não foi criado por falta de título ou texto, tente novamente."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

/*ok*/ async function updatePost(idPost, postContentUpdated) {
  const user = getLocalStorage();
  try {
    const request = await fetch(baseUrl + `posts/${idPost}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(postContentUpdated),
    });

    const response = await request.json();

    if (request.ok) {
      toast(
        "Post atualizado com sucesso!",
        "O post selecionado foi atualizado com sucesso, agora aparecerá no seu feed com as informações atualizadas."
      );
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast(
        "Post não atualizado!",
        "O post selecionado não foi atualizado por inconsistências no método de atualização, tente novamente."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

/*ok*/ async function getPosts() {
  const user = getLocalStorage();

  try {
    const request = await fetch(baseUrl + "posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const response = await request.json();

    if (request.ok) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

/*ok*/ async function deletePost(idPost) {
  const user = getLocalStorage();

  try {
    const request = await fetch(baseUrl + "posts/" + idPost, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (request.ok) {
      toast(
        "Post deletado com sucesso!",
        "O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed"
      );
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      toast(
        "Post não foi deletado!",
        "O post selecionado para exlusão não foi deletado, verifique seu login e tente novamente"
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export {
  login,
  register,
  getMyProfile,
  updateMyProfile,
  deleteUser,
  createPost,
  updatePost,
  getPosts,
  deletePost,
};
