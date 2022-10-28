export function toast(title, message) {
  const body = document.querySelector("body");

  const container = document.createElement("div");
  container.classList.add("toast-container");

  const divTitle = document.createElement("div");
  divTitle.classList.add("title-container");

  const icon = document.createElement("img");
  icon.alt = `Mensagem de ${title}`;

  const h3 = document.createElement("h3");
  h3.classList.add("font4-medium");
  h3.innerText = title;

  if (
    title == "Sua conta foi criada com sucesso!" ||
    title == "Post deletado com sucesso!" ||
    title == "Você fez login com sucesso!" ||
    title == "Post atualizado com sucesso!" ||
    title == "Post criado com sucesso!" 

  ) {
    icon.src = "/src/assets/check.png";
    h3.classList.add(`text-green`);
  } else {
    icon.src = "/src/assets/errorIcon.png";
    h3.classList.add(`text-alert`);
  }

  const span = document.createElement("span");
  span.classList.add('font5-regular', 'text-gray2')
  span.innerHTML = message;

  divTitle.append(icon, h3);
  container.append(divTitle, span);
  body.appendChild(container);
}
