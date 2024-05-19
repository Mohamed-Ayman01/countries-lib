let countryCont = document.querySelector(".container .country-cont");

async function getCountries() {
  let res = await fetch("../data.json");
  let arr = await res.json();

  for (let i = 0; i < 8; i++) {
    let countryBox = document.createElement("div");
    countryBox.classList.add(
      "country-box",
      "p-0",
      "rounded-2",
      "overflow-hidden",
    );

    countryBox.setAttribute("data-country", arr[i].name.toLowerCase())
    
    countryBox.addEventListener("click", function () {
      window.location = `../details/index.html?country=${countryBox.getAttribute("data-country")}`
    });

    countryBox.innerHTML = `
    <div class="img-box">
      <img src="${arr[i].flag}" title="${arr[i].name} flag">
    </div>
    <div class="txt-box text-capitalize p-4">
      <h5 class="mb-3">${arr[i].name}</h5>
      <p class="mb-1"><span class="fw-bold">population:</span> ${arr[i].population}</p>
      <p class="mb-1"><span class="fw-bold">region:</span> ${arr[i].region}</p>
      <p class="mb-1 fw-light"><span class="fw-bold">capital:</span> ${arr[i].capital}</p>
    </div>`;

    countryCont.append(countryBox);
  }
  console.log(arr);
}

window.addEventListener("load", getCountries());

let regionSelect = document.querySelector(".content .filters .select");

regionSelect.addEventListener("click", function () {
  let options = this.querySelector(".options");

  if (!options.classList.contains("show")) {
    options.classList.add("show");

    setTimeout(() => (options.style = "opacity: 1"), 0);
  } else {
    options.style = "opacity: 0";

    setTimeout(() => options.classList.remove("show"), 300);
  }
});

let selectOptions = document.querySelectorAll(
  ".container .filters .select .opt",
);

selectOptions.forEach((element) => {
  element.addEventListener("click", () => {
    let dataVal = element.getAttribute("data-value").toLowerCase();
    regionSelect.querySelector("span").textContent = dataVal;

    countryCont.innerHTML = "";

    async function getCountries() {
      let res = await fetch("../data.json");
      let arr = await res.json();

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].region.toLowerCase() == dataVal) {
          let countryBox = document.createElement("div");
          countryBox.classList.add(
            "country-box",
            "p-0",
            "rounded-2",
            "overflow-hidden",
          );

          countryBox.setAttribute("data-country", arr[i].name.toLowerCase())
    
          countryBox.addEventListener("click", function () {
            window.location = `../details/index.html?country=${countryBox.getAttribute("data-country")}`
          });

          countryBox.innerHTML = `
          <div class="img-box">
            <img src="${arr[i].flag}" title="${arr[i].name} flag">
          </div>
          <div class="txt-box text-capitalize p-4">
            <h5 class="mb-3">${arr[i].name}</h5>
            <p class="mb-1"><span class="fw-bold">population:</span> ${arr[i].population}</p>
            <p class="mb-1"><span class="fw-bold">region:</span> ${arr[i].region}</p>
            <p class="mb-1 fw-light"><span class="fw-bold">capital:</span> ${arr[i].capital}</p>
          </div>`;

          countryCont.append(countryBox);
        }
      }
    }

    getCountries();
  });
});

let searchInput = document.querySelector(
  ".container .filters input[type='text']",
);

searchInput.addEventListener("change", function () {
  let dataVal = this.value.toLowerCase();
  if (dataVal == "") return;

  countryCont.innerHTML = "";

  async function getCountries() {
    let res = await fetch("../data.json");
    let arr = await res.json();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase().includes(dataVal)) {
        let countryBox = document.createElement("div");
        countryBox.classList.add(
          "country-box",
          "p-0",
          "rounded-2",
          "overflow-hidden",
        );

        countryBox.setAttribute("data-country", arr[i].name.toLowerCase())
    
        countryBox.addEventListener("click", function () {
          window.location = `../details/index.html?country=${countryBox.getAttribute("data-country")}`
        });

        countryBox.innerHTML = `
        <div class="img-box">
          <img src="${arr[i].flag}" title="${arr[i].name} flag">
        </div>
        <div class="txt-box text-capitalize p-4">
          <h5 class="mb-3">${arr[i].name}</h5>
          <p class="mb-1"><span class="fw-bold">population:</span> ${arr[i].population}</p>
          <p class="mb-1"><span class="fw-bold">region:</span> ${arr[i].region}</p>
          <p class="mb-1 fw-light"><span class="fw-bold">capital:</span> ${arr[i].capital}</p>
        </div>`;

        countryCont.append(countryBox);
      }
    }

    if (countryCont.innerHTML == "") {
      countryCont.innerHTML = "<h3>no result :(<h3>";
    }
  }
  getCountries();
});
