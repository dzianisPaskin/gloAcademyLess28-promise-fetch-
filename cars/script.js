fetch("./cars.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${respose.status}`);
    }
    return response.json();
  })
  .then((data) => initialize(data))
  .catch((err) => console.error(`Fetch problem: ${err.message}`));

const initialize = (cars) => {
  const select = document.querySelector(".select");
  const selectedText = document.createElement("h1");
  const div = document.querySelector(".wrap");
  const model = document.querySelector(".model");
  const price = document.querySelector(".price");
  selectedText.textContent = select.value;
  div.append(selectedText);

  select.addEventListener("change", (e) => {
    e.preventDefault();

    if (select.value === "volvo") {
      cars.cars.forEach((el) => {
        if (el.brand === "volvo") {
          selectedText.remove();
          model.textContent = "Тачка " + el.brand + " " + el.model;
          price.textContent = el.price;
          div.append(model);
          div.append(price);
          fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
              title: "car",
              body: el,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
        }
      });
    } else if (select.value === "bmw") {
      cars.cars.forEach((el) => {
        if (el.brand === "bmw") {
          selectedText.remove();
          model.textContent = "Тачка " + el.brand + " " + el.model;
          price.textContent = el.price;
          div.append(model);
          div.append(price);

          fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
              title: "car",
              body: el,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
        }
      });
    } else {
      model.remove();
      price.remove();
      selectedText.textContent = select.value;
      div.append(selectedText);
    }
  });
};
