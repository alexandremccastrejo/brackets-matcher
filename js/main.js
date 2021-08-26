
const LEFT_BRACKETS = ['{', '[', '('];
const RIGHT_BRACKETS = ['}', ']', ')'];

function bindListeners() {
    var verificationForm = document.getElementById('verificationForm')
    var checkBracketsBtn = document.getElementById('checkBracketsBtn')
    var bracketsInput = document.getElementById('bracketsInput')

    verificationForm.addEventListener('submit', function (e) {
        e.preventDefault()
        processInput()
    }, false)

    checkBracketsBtn.addEventListener('click', processInput, false)
}

function processInput() {

    var bracketsInput = document.getElementById('bracketsInput')
    var verificationResult = document.getElementById('verificationResult')

    verificationResult.classList.remove('text-success')
    verificationResult.classList.remove('text-danger')

    var input = bracketsInput.value;

    if (validateInput(input)) {
        verificationResult.innerHTML = ''

        var isValidInput = true

        for (const character of input) {
            if (LEFT_BRACKETS.includes(character)) {
                let matcher = getMatcher(character, input)

                if (matcher) {
                    input = removeMatches(input, [character, matcher])
                }
            }
        }

        if (input.length == 0) {
            verificationResult.innerHTML = 'The order of brackets is valid'
            verificationResult.classList.add('text-success')
        } else {
            verificationResult.innerHTML = 'The input contain unmatched brackets'
            verificationResult.classList.add('text-danger')
        }
    } else {
        verificationResult.innerHTML = 'Invalid character(s) found. Only backets are allowed'
        verificationResult.classList.add('text-danger')
    }
}

function removeMatches(str, chars) {
    console.log(chars)
    for (const c of chars) {
        str = str.replace(c, '')
    }

    return str
}

function getMatcher(character, input) {
    var matchIndex = LEFT_BRACKETS.indexOf(character)

    if (matchIndex != -1) {
        let search = RIGHT_BRACKETS[matchIndex]
        
        if (input.includes(search)) {
            console.log(search)
            return search;
        } else {
            return null;
        }
    }

    return null;
}

function validateInput(input) {
    const allowedCharacters = [...LEFT_BRACKETS, ...RIGHT_BRACKETS];

    for (const character of input) {
        if (! allowedCharacters.includes(character)) {
            return false;
        }
    }

    return true;
}

window.addEventListener('load', bindListeners, false);
