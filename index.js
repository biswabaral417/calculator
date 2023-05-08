const numbtn = document.querySelectorAll('.numbers');
const opbtn = document.querySelectorAll(".operator")
const actt = document.querySelectorAll(".act")


const inputTxt = document.querySelector('#inputs');
const results = document.querySelector('#results');


numbtn.forEach((num) => {
    num.addEventListener("click", () => {
        if ((inputTxt.textContent + num.value).length < 20) {
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
        if ((inputTxt.textContent + btn.value).length < 20) {
            inputTxt.textContent += ` ${btn.value} `;
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
    let arrexp = a.split(" ");
    let pfex = topostfix(arrexp);
    return Math.floor(eval(pfex));
}


function isoperator(a) {
    if (a == '/' || a == '-' || a == '%' || a == "+" || a == '*') {
        return true;
    }
}


function topostfix(arrexp) {
    //put into  postfix array
    let arop = [];
    let postfix = [];

    arrexp.forEach(element => {// 6,/,5,-6*2/6
        if (isoperator(element)) {// - =true
            // console.log("IS OPERATOR :" + element);
            // arop.push(element);

            let prec_elem = precedence(element);
            let prev_elem = 0;
            prev_elem = (arop[(arop.length) - 1]);

            console.log("PREV :" + prev_elem);
            if (!prev_elem) {
                arop.push(element);
            }
            else if (isoperator(prev_elem)) {

                let prec_prev_elem = precedence(prev_elem);

                if (prec_elem > prec_prev_elem) {
                    arop.push(element);
                    console.log(arop);
                }
                else {
                    console.log("arop ini");
                    console.log(arop);
                    let poped = arop.pop();
                    console.log("arop aft pop");
                    console.log(arop);
                    postfix.push(poped);
                    console.log("in postfix" + element);
                    arop.push(element);
                    console.log("arop after push");
                    console.log(arop);
                }

            }
        }
        else {
            // console.log("NOT OPERATOR : " + element)
            postfix.push(element);
        }
    });

    for (let i = (arop.length - 1); i >= 0; i--) {
        console.log(arop);
        postfix.push(arop[i]);
    }

    return postfix;//6,5,/,
    //Array(9) [ "6", "5", "/", "6", "2", "6", "/", "*", "-" ]

}


function precedence(a) {
    if(a=="%"){
        return 3;
    }
    else if (a == "/" || a == '*') {
        return 2;
    }
    else if (a == "+" || a == "-") {
        return 1;
    }
    else {
        return 0;
    }

}


function eval(arr) {
    let pfex=[];
    pfex=arr;
    console.log(pfex)
    let stack=[];
    let ans=0;
    pfex.forEach(element => {
        if (!isoperator(element)) {
            stack.push(element);
        }
        else{
            let b=stack.pop();
            let a=stack.pop();
            switch (element) {
                case "+":
                    ans=add(a,b);
                    stack.push(ans);
                    break;
                case "-":
                    ans=sub(a,b);
                    stack.push(ans);
                    break;
                case "*":
                    ans=mun(a,b);
                    stack.push(ans);
                    break;
                case "/":
                    ans=div(a,b);
                    stack.push(ans);
                    break;
                case "%":
                    ans=rem(a,b);
                    stack.push(ans);
                    break;
                default:
                    break;
            }
        }
    });
    let tans=stack[0];
    return tans;
    
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