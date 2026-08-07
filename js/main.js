    const preview = document.querySelector('.card-bg')
    const cardInp = document.querySelectorAll('.cardNum')
    const fullName = document.getElementById('fullName')
    const displayNum = document.querySelectorAll('.card-number>span')
    const displayName = document.getElementById('card-name-display')
    const cadrNumFocus = document.querySelector('.form-group>.input-box')
    const focusClass = document.querySelectorAll('.focus')
    const expire = document.getElementById('expire')
    const years = document.getElementById('years')
    const month = document.getElementById('month')
    const monthop = document.querySelectorAll('#month>option')
    const currenYear = new Date().getFullYear()
    const displayEx = document.getElementById('card-expiry-display')
    const cvv2 = document.getElementById('cvv2')
    const cvvLine = document.querySelector('.cvv-line>span')

    function removeFocus() {
        for (let i = 0; i < 3; i++) {
            focusClass[i].style.opacity = 0
        }
        preview.classList.remove('turnBack')

    }

    cadrNumFocus.addEventListener('click', () => {
        preview.classList.remove('turnBack')
        cardInp[0].focus()
        if (displayNum[0].parentElement.getAttribute('data-status') == 'cardNum') {
            focusClass[0].style.opacity = 1
            focusClass[1].style.opacity = 0
            focusClass[2].style.opacity = 0
        }
    })

    cardInp.forEach((val, i) => {

        val.addEventListener('click', (e) => {
            e.stopPropagation()
            val.focus()
            preview.classList.remove('turnBack')
            focusClass[1].style.opacity = 0
            focusClass[0].style.opacity = 1
            focusClass[2].style.opacity = 0

            focusClass[0].style.opacity = 1
        })

        val.addEventListener('input', (e) => {

            if (val.value.length >= 4) {
                if (i < 3) {
                    val.nextElementSibling.focus()
                }
                else {
                    fullName.focus()
                }

            }

            if (val.value.length > 4) {
                val.value = val.value.slice(0, 4)
            }

            displayNum.forEach((span) => {
                span.innerText = ''
            })

            cardInp.forEach((inp, index) => {
                if (inp.value == '') displayNum[index + 1].innerText = '####'

                displayNum[index + 1].innerText += inp.value
            })

        })

        val.addEventListener('keydown', (e) => {
            if (e.keyCode == 8) {
                if (val.value == '') val.previousElementSibling.focus()
            }
        })
    })


    /////////full name

    fullName.addEventListener('focus', () => {
        focusClass[1].style.opacity = 1
        focusClass[0].style.opacity = 0
        focusClass[2].style.opacity = 0
        preview.classList.remove('turnBack')
    })

    fullName.addEventListener('keyup', (e) => {
        console.log(fullName.value);
        if (fullName.value == '') {
            displayName.innerText = 'full name'
        }

        else displayName.innerText = fullName.value

        console.log(e.keyCode);
        if (e.keyCode == 13) {
            expire.focus()
        }

    })



    ////////////expires
    for (let i = currenYear; i <= currenYear + 15; i++) {
        const op = document.createElement('option')
        op.innerHTML = i
        years.appendChild(op)
    }

    const yearop = document.querySelectorAll('#years>option')
    let tempMonth = ''
    let tempYear = ''

    month.addEventListener('change', (e) => {
        tempMonth = e.target.value
        expire.value = tempMonth + ' / ' + tempYear
        displayEx.innerText = expire.value
        expire.style.border = ''

        if (tempYear != 0) {
            cvv2Fo()
            flag = false
        }
    })

    years.addEventListener('change', (e) => {
        tempYear = e.target.value
        expire.value = tempMonth + ' / ' + tempYear
        displayEx.innerText = expire.value
        expire.style.border = ''
        if (tempMonth != 0) {
            cvv2Fo()
            flag = false
        }
    })
    let flag = true
    month.addEventListener('click', () => {
        flag = true
        if (flag) {
            preview.classList.remove('turnBack')
        }
        focusClass[1].style.opacity = 0
        focusClass[0].style.opacity = 0
        focusClass[2].style.opacity = 1
    })
    years.addEventListener('click', () => {
        if (flag) {
            preview.classList.remove('turnBack')
        }
        focusClass[1].style.opacity = 0
        focusClass[0].style.opacity = 0
        focusClass[2].style.opacity = 1
    })


    let mymonth = ''
    expire.addEventListener('click', () => {
        preview.classList.remove('turnBack')
        focusClass[1].style.opacity = 0
        focusClass[0].style.opacity = 0
        focusClass[2].style.opacity = 1
    })


    expire.addEventListener('input', () => {

        mymonth = expire.value.slice(0, 2)


        if (expire.value.length == 2) {
            dateEx(mymonth)
            expire.value = mymonth + ' / '
        }


        if (Number(mymonth) > 12 || Number(mymonth) == 0) {
            expire.style.border = '2px solid red'
            displayEx.innerText = 'MM / YYYY'
        } else {
            expire.style.border = ''
        }
        if (expire.value.length > 9) {
            expire.value = expire.value.slice(0, 9)
        }


        let year = expire.value.slice(5, 9)
        if (year.length == 4) {
            dateEx2(year)
            if (Number(year) < 2026 || Number(year) > 2041) {
                expire.style.border = '2px solid red'
                displayEx.innerText = 'MM / YYYY'
            } else {
                expire.style.border = ''
            }
        }

        if (Number(mymonth) > 0 && Number(mymonth) <= 12) {
            displayEx.innerText = expire.value
        }
    })


    expire.addEventListener('keydown', (e) => {
        if (e.keyCode == 8) {
            if (expire.value.length == 6) {
                expire.value = expire.value.slice(0, 5)
                displayEx.innerText = expire.value
            }

            if (expire.value.length == 5) {
                expire.value = expire.value.slice(0, 2)
                displayEx.innerText = expire.value
            }

            if (expire.value == '') {
                displayEx.innerText = 'MM / YYYY'
                expire.style.border = ''
            }
        }

        if (e.keyCode == 13) {

            cvv2Fo()

        }
    })


    function dateEx(month2) {
        monthop.forEach((val, i) => {
            if (month2 == val.value) {
                month.value = val.label
                val.setAttribute('selected', 'selected')
            }

        })
    }
    function dateEx2(year2) {
        yearop.forEach((val, i) => {
            if (year2 == val.value) {
                val.setAttribute('selected', 'selected')
            }

        })
    }

    ///////cvv2
    function cvv2Fo() {
        cvv2.focus()
        preview.classList.add('turnBack')
    }
    cvv2.addEventListener('focus', () => {
        preview.classList.add('turnBack')

    })

    cvv2.addEventListener('input', () => {
        console.log(cvv2.value);
        cvvLine.innerText = cvv2.value
        cvvLine.style.width = 'fit-content'
    })

    myRand()
    function myRand() {
        let randNum = (Math.floor(Math.random() * 25)) + 1
        preview.style.backgroundImage = `url(https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${randNum}.jpeg)`
    }