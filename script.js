const countriesContainer = document.querySelector('.countries-container')
const dropDownBar = document.querySelector('.drop-down-bar')
const allRegions = document.querySelector('.all-regions')
const darkMode = document.querySelector('.dark-mode')
const header = document.querySelector('.header')
const headerH2 = document.querySelector('h2')
const body = document.querySelector('body')
const input = document.querySelector('.input')
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
    myLocalData = body.classList.contains('dark')
    localStorage.setItem('myData', JSON.stringify(myLocalData))

    sun.classList.toggle('show')
    moon.classList.toggle('hide')
    if (sun.className.includes('show')) {
        modeText.textContent = `Light Mode`
    } else {
        modeText.textContent = `Dark Mode`
    }
})

if (localStorage.myData == 'true') {
    body.classList.add('dark')
    sun.classList.add('show')
    moon.classList.add('hide')
    modeText.textContent = `Light Mode`
} else {
    console.log('It is Light');
}


fetch('https://restcountries.com/v3.1/all').then((res) => {
    res.json().then((data) => {
        data.forEach((country) => {
      
            myCountryKey = country
            localStorage.setItem('myCountry', JSON.stringify(myCountryKey))

            let myLocalCountry = JSON.parse(localStorage.getItem('myCountry'))

            const cardContainer = document.createElement('a')
            cardContainer.href = `https://vivek-chauhan98.github.io/REST-API-Page-2?name=${myLocalCountry.name.common}`
            cardContainer.classList.add('card-container')

            cardContainer.innerHTML = `
        <img src="${myLocalCountry.flags.svg}" alt="" />
        <h3>${myLocalCountry.name.common}</h3>
        <div class="card-text">
            <p><b>Population: </b>${myLocalCountry.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${myLocalCountry.region}</p>
            <p><b>Capital: </b>${myLocalCountry.capital?.[0]}</p>
        </div>
`
            darkMode.addEventListener('click', () => {
                cardContainer.classList.toggle('dark')
            })

            countriesContainer.append(cardContainer)

            const allRegionsList = [headerH2, allRegfilter, africa, antarctic, americas, asia, europe, oceania]
            const reg = ['homePage', 'All Regions', 'Africa', 'Antarctic', 'Americas', 'Asia', 'Europe', 'Oceania']

            localReg = reg
            localStorage.setItem('myReg', JSON.stringify(localReg))
           

            for (let i = 0; i < allRegionsList.length; i++) {
                allRegionsList[i].addEventListener('click', () => {
                    allRegfilter.style.display = 'block'
                    allRegions.classList.remove('show')

                    if (myLocalCountry.region.includes(localReg[i])) {
                        cardContainer.style.display = 'block'
                        filterText.textContent = `Region (${localReg[i]})`
                    }
                    else {
                        cardContainer.style.display = 'none'
                    }

                    if(i == 0 || i == 1) {
                        cardContainer.style.display = 'block'
                        filterText.textContent = 'Filter by Region'
                        allRegions.classList.remove('show')
                        allRegfilter.style.display = 'none'
                    }
                
                myIKey = i
                localStorage.setItem('myi', JSON.stringify(myIKey))
                console.log(myIKey);
                })
            }

            if(localStorage.getItem('myi')) {
                allRegfilter.style.display = 'block'
                let myLocalI = 0
                myLocalI = JSON.parse(localStorage.getItem('myi'))
              
                if (myLocalCountry.region.includes(localReg[myLocalI])) {
                    cardContainer.style.display = 'block'
                    filterText.textContent = `Region (${localReg[myLocalI]})`
                }
                else {
                    cardContainer.style.display = 'none'
                }

                if(myLocalI == 0 || myLocalI == 1) {
                    cardContainer.style.display = 'block'
                    filterText.textContent = 'Filter by Region'
                    allRegions.classList.remove('show')
                    allRegfilter.style.display = 'none'
                }
            }

        
            document.addEventListener('click', () => {
                allRegions.classList.remove('show')
            })

            input.addEventListener('input', () => {
                if (myLocalCountry.name.common.toLowerCase().includes(input.value.toLowerCase())) {
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


