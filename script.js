const countriesContainer = document.querySelector('.countries-container')
const dropDownBar = document.querySelector('.drop-down-bar')
const allRegions = document.querySelector('.all-regions')
const darkMode = document.querySelector('.dark-mode')
const header = document.querySelector('.header')
const headerH2 = document.querySelector('h2')
const body = document.querySelector('body')
const input = document.querySelector('.input')
const label = document.querySelector('.label')
const downArrow = document.querySelector('.down-arrow')
const cardContainer = document.querySelector('.card-container')
const africa = document.querySelector('.africa')
const antarctic = document.querySelector('.antarctic')
const americas = document.querySelector('.americas')
const asia = document.querySelector('.asia')
const europe = document.querySelector('.europe')
const oceania = document.querySelector('.oceania')
const allRegfilter = document.querySelector('.all')
const filterText = document.querySelector('.fil')
const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')
const modeText = document.querySelector('.mode-text')


dropDownBar.addEventListener('click', (e) => {
    e.stopPropagation()
    allRegions.classList.toggle('show')
})

sun.classList.add('hide')
darkMode.addEventListener('click', () => {    
    body.classList.toggle('dark')
    sun.classList.toggle('show')
    moon.classList.toggle('hide')
    if(sun.className.includes('show')) {
        modeText.textContent = `Light Mode`
    }else{
        modeText.textContent = `Dark Mode`
    }
    
})


fetch('https://restcountries.com/v3.1/all').then((res) => {
res.json().then((data) => {
    data.forEach((country) => {
        const cardContainer = document.createElement('a')
        cardContainer.href = `/cardopen.html?name=${country.name.common}`
        cardContainer.classList.add('card-container')

      

        cardContainer.innerHTML = `
        <img src="${country.flags.svg}" alt="" />
        <h3>${country.name.common}</h3>
        <div class="card-text">
            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>
`
        darkMode.addEventListener('click', () => {
            cardContainer.classList.toggle('dark')
        })

        countriesContainer.append(cardContainer)


        const allRegionsList = [africa, antarctic, americas, asia, europe, oceania]
        const reg = ['Africa', 'Antarctic', 'Americas', 'Asia', 'Europe', 'Oceania']
        for (let i = 0; i < allRegionsList.length; i++) {
            allRegionsList[i].addEventListener('click', () => {
                allRegfilter.style.display = 'block'
                allRegions.classList.remove('show')
                if (country.region.includes(reg[i])) {
                    cardContainer.style.display = 'block'
                    filterText.textContent = `Region (${reg[i]})`
                }
                else {
                    cardContainer.style.display = 'none'
                }
            })
        }

        allRegfilter.addEventListener('click', () => {
            cardContainer.style.display = 'block'
            filterText.textContent = 'Filter by Region'
            allRegions.classList.remove('show')
            allRegfilter.style.display = 'none'
        })

        document.addEventListener('click', () => {
            allRegions.classList.remove('show')
        })

        input.addEventListener('input', () => {
            if(country.name.common.toLowerCase().includes(input.value.toLowerCase())){
                cardContainer.style.display = 'block'
                filterText.textContent = 'Filter by Region'
            }
            else {
                cardContainer.style.display = 'none'
            }
        })

    })
})
})
