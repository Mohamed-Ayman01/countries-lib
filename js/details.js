let jsonFileUrl = "https://mohamed-ayman01.github.io/countries-lib/data.json";

window.addEventListener("load", function () {
  let countryDetails = document.querySelector(".content .container .country");
  let goBack = document.querySelector(".content .container .go-back");

  async function getCountry(queryString) {
    let res = await fetch(jsonFileUrl);
    let arr = await res.json();

    let urlParams = new URLSearchParams(queryString);
    let countryName = urlParams.get("country");

    console.log(countryName);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase() == countryName.toLowerCase()) {
        console.log(countryName);
        let borderCountries = arr[i].borders;
        let borderCountriesLis = [];

        for (let j = 0; j < arr.length; j++) {
          if (borderCountries == undefined) break;

          for (let k = 0; k < borderCountries.length; k++) {
            if (arr[j].alpha3Code == borderCountries[k])
              borderCountriesLis.push(
                `<li class="border-country shadow" data-country="${arr[j].name}">${arr[j].name}</li>`,
              );
          }
        }

        countryDetails.innerHTML = `
        <div class="img-box col-12 col-md-5">
          <img src="${arr[i].flag}" class="w-100">
        </div>

        <div class="info-box col-12 col-md-5 text-capitalize">
          <h2 class="fw-bold mb-4">${arr[i].name}</h2>

          <div class="info d-flex justify-content-between fw-light flex-column flex-sm-row gap-4 gap-sm-0">
            <div class="cont">
              <p><span>native name:</span> ${arr[i].nativeName}</p>
              <p><span>population:</span> ${arr[i].population}</p>
              <p><span>region:</span> ${arr[i].region}</p>
              <p><span>sub region:</span> ${arr[i].subregion}</p>
              <p><span>capital:</span> ${arr[i].capital}</p>
            </div>
            <div class="cont2">
              <p><span>top level domain:</span> ${arr[i].topLevelDomain[0]}</p>
              <p><span>currencies:</span> ${arr[i].currencies.map(
                (currency) => currency.name,
              )}</p>
              <p><span>languages:</span> ${arr[i].languages.map(
                (language) => ` ${language.name}`,
              )}</p>
            </div>
          </div>

          ${
            borderCountries == undefined
              ? ""
              : `<div class="border-countries mt-5 flex-column gap-4 flex-sm-row gap-sm-0">
            <span class="fw-bold">border countries:</span>
            <ul>
              ${borderCountriesLis.join(" ")}
            </ul>
            </div>`
          }
        </div>
        `;

        break;
      }
    }
  }

  getCountry(window.location.search);

  goBack.addEventListener("click", function () {
    window.location = "./../../index.html";
  });
});

window.addEventListener("click", function (e) {
  if (e.target.classList.contains("border-country")) {
    this.window.location = `./index.html?country=${e.target
      .getAttribute("data-country")
      .toLowerCase()}`;
  }
});
