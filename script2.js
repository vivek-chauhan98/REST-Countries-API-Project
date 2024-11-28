var countryName = new URLSearchParams(window.location.search).get('name')

const image = document.querySelector('img')
const countryNameH2 = document.querySelector('.country-name')
const nativeName = document.querySelector('.native')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const tld = document.querySelector('.tld')
const currency = document.querySelector('.currency')
const languages = document.querySelector('.languages')
const borderTitle = document.querySelector('.border-title')
const backButton = document.querySelector('.back-btn')

const darkMode = document.querySelector('.dark-mode')
const header = document.querySelector('.header')
const headerH2 = document.querySelector('h2')
const body = document.querySelector('body')
const countryDetails = document.querySelector('.country-details')
const borderCountries = document.querySelector('.border-countries')
const allBorders = document.querySelector('.all-borders')

const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')
const modeText = document.querySelector('.mode-text')

backButton.addEventListener('click', () => {
  window.history.back()
})


sun.classList.add('hide')
darkMode.addEventListener('click', () => {    
    body.classList.toggle('dark')
    sun.classList.toggle('hide')
    moon.classList.toggle('hide')
    if(moon.className.includes('hide')) {
        modeText.textContent = `Light Mode`
    }else{
        modeText.textContent = `Dark Mode`
    }
    
})



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => {
  res.json().then(([country]) => {

    image.src = country.flags.svg
    countryNameH2.innerText = country.name.common

    if (country.name.nativeName) {
      nativeName.append(Object.values(country.name.nativeName)[0].common)
    } else {
      nativeName.style.display = 'none'
    }
    population.append(country.population.toLocaleString('en-IN'))

    region.append(country.region)

    if (country.subregion) {
      subRegion.append(country.subregion)
    } else {
      subRegion.style.display = 'none'
    }

    if (country.capital) {
      capital.append(country.capital.join(', '))
    } else {
      capital.style.display = 'none'
    }

    if (country.tld) {
      tld.append(country.tld[0])
    } else {
      tld.style.display = 'none'
    }

    if (country.currencies) {
      currency.append(Object.values(country.currencies)[0].name)
    } else {
      currency.style.display = 'none'
    }

    if (country.languages) {
      languages.append(Object.values(country.languages).join(', '))
    } else {
      languages.style.display = 'none'
    }



    for (let i = 0; i < country.borders.length; i++) {

      fetch(`https://restcountries.com/v3.1/alpha/${country.borders[i]}`).then((res) => {
        res.json().then(([borderCountry]) => {
          const borLists = document.createElement('a')
          borLists.href = `/index2.html?name=${borderCountry.name.common}`
          borLists.textContent = `${borderCountry.name.common}`
          allBorders.append(borLists)
        })
      })
    }


  })
})

