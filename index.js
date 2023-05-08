const numbtn = document.querySelectorAll('.numbers');
const opbtn = document.querySelectorAll(".operator")
const actt = document.querySelectorAll(".act")


const inputTxt = document.querySelector('#inputs');
const results = document.querySelector('#results');


numbtn.forEach((num) => {
    num.addEventListener("click", () => {
        if ((inputTxt.textContent + num.value).length < 16) {
            inputTxt.textContent += num.value;
        }
        else {
            alert("fu")
        }
        console.log(num.value);
    });
});


opbtn.forEach((btn) => {
    let value = btn.value;
    btn.addEventListener('click', () => {

        console.log(value)
        if ((inputTxt.textContent + btn.value).length < 16) {
            inputTxt.textContent += `${btn.value}`;
        }
        else {
            alert("fu")
        }
    });

});


actt.forEach((btn) => {
    let id = btn.getAttribute("id")
    btn.addEventListener('click', () => {
        console.log(id);
        switch (id) {
            case "del":
                let newtxt = inputTxt.textContent
                newtxt = newtxt.slice(0, -1)
                console.log(newtxt);
                inputTxt.textContent = newtxt;
                results.textContent = "";
                break;
            case "cls":
                inputTxt.textContent = "";
                results.textContent = "";
                break;

            default:
                results.textContent = calculate(inputTxt.textContent);
                break;
        }
    });
});
function calculate(a) {
    let arrexp = a.split("");
    return (evaluate(arrexp));
}

function isoperator(a) {
    if (a == '/' || a == '-' || a == '%' || a == "+" || a == '*') {
        return true;
    }
}

function evaluate(arrexp) {
    let expn = [];
    expn = arrexp;
    console.log(expn);
    let ans = 0;
    ans = expn[0];
    expn.forEach(element => {
        if (isoperator(element)) {
            index = expn.indexOf(element);
            b = expn[index + 1];
            if (element == '+') {
                ans=add(ans,b);
            }
            else if (element == '*') {
                ans = mun(ans, b);

            }
            else if (element == '/') {

                ans = div(ans, b);
            }
            else if (element == '-'){

                ans = sub(ans, b);
            }
            else if (element == '%'){

                ans = rem(ans, b);
            }
            else
                ans = "error"
        }
    });

    return ans;
}
function add(a, b) {
    return +a + +b;
}
function sub(a, b) {
    return a - b;
}
function div(a, b) {
    return a / b;
}
function mun(a, b) {
    return a * b;
}
function rem(a, b) {
    return a % b;
}