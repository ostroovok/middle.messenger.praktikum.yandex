import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import "./global.scss";

const pages = {
  login: [Pages.LoginPage],
  signUp: [Pages.SignUp],
  chats: [Pages.Chats],
  notFound: [Pages.Error, { title: "404", subTitle: "Не туда попали" }],
  serverError: [Pages.Error, { title: "500", subTitle: "Мы уже фиксим" }],
  profile: [Pages.Profile],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page] ?? Pages.Error;
  const container = document.getElementById("app")!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("login"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
