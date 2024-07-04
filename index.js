const password_display = document.querySelector("[display_final_password]");
const copy_button = document.querySelector("[copy_button]");
const copy_button_msg = document.querySelector("[data_copymsg]");
const password_length_display = document.querySelector("[password_length_indicator]");
const inputslider = document.querySelector("[length_slider]");
const all_checkbox = document.querySelectorAll("input[type=checkbox]");
const uppercase_check = document.querySelector("#uppercase");
const lowercase_check = document.querySelector("#lowercase");
const numbers_check = document.querySelector("#numbers");
const symbols_check = document.querySelector("#symbols");
const strength_indicator_circle = document.querySelector("[strength_indicator_color]");
const pass_generate_button = document.querySelector("[generate_password_button]");

let symbols_list = "!@#$%^&*()_+|}{[]?/>.<,~`";
let password="";
let passwordlength=10;//by default
let checkcount =0; //by deafulty one checkbox is checked

function handleslidebar(){
    inputslider.value = passwordlength;
    password_length_display.innerText = passwordlength;
    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ( (passwordlength - min) * 100/(max-min) + "% 100%" );
}


function setindicatorcolor(color){
    strength_indicator_circle.style.backgroundColor = color;
    strength_indicator_circle.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
setindicatorcolor("#CCCCCC");
function generateradnominteger(min , max){
    return Math.floor(Math.random() * (max - min))+min; 
}

function getrandomnumber(){
    return generateradnominteger(0,9);
}
function getrandomlowercase(){
    return String.fromCharCode(generateradnominteger(96,123)) ;
}
function getrandomuppercase(){
    return String.fromCharCode(generateradnominteger(65,90)) ;
}
function getrandomsymbol(){
    const rndsymb = generateradnominteger(0,symbols_list.length);
    return symbols_list.charAt(rndsymb);
}
function strengthchecker(){
    let hasupper = false;
    let haslower = false;
    let hasnumber = false;
    let hassymbol = false;
    if(uppercase_check.checked){
        hasupper = true;
    };
    if(lowercase_check.checked){
        haslower = true;
    };
    if(numbers_check.checked){
        hasnumber = true;
    };
    if(symbols_check.checked){
        hassymbol = true;
    };
    
    if (hasupper && haslower && (hasnumber || hassymbol) && passwordlength >= 8) {
        setindicatorcolor("#0f0");
      } else if (
        (haslower || hasupper) &&
        (hasnumber || hassymbol) &&
        passwordlength >= 6
      ) {
        setindicatorcolor("#ff0");
      } else {
        setindicatorcolor("#f00");
      }
}


async function copytoclipboard(){
    try{
        await navigator.clipboard.writeText(password_display.value);
        copy_button_msg.innerText = "COPIED";
    }
    catch(e){
        copy_button_msg.innerText = "copy failed";
    }
    copy_button_msg.classList.add("copied-msg")
} 


function handlecheckboxchange() {
    checkcount = 0;
        all_checkbox.forEach((checkbox)=>{
            if(checkbox.checked){
                checkcount++;
            }
        }
            
        )
    
        // Adjust password length if it's less than the number of checked checkboxes
        if (passwordlength < checkcount) {
            passwordlength = checkcount;
            handleslidebar();
        }
    }

all_checkbox.forEach((checkbox) => {
    checkbox.addEventListener("change", handlecheckboxchange);
});

function shufflepassowrd(array){
    //fisher yates algorithm
    for(let i = array.length-1; i > 0 ; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=>str += el);
    return str;
}


// inputslider.addEventListener('input',(e)=>
// {
//     passwordlength = e.target.value;
//     handleslidebar();
// })
inputslider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleslidebar();
});

copy_button.addEventListener('click',()=> {
    if(password_display.value){
        copytoclipboard(); 
        copy_button_msg.classList.add("copy-msg-visible");
        setTimeout(()=>
            copy_button_msg.classList.remove("copy-msg-visible"),2000
            );
        
          
    }
    
});


pass_generate_button.addEventListener('click',()=> 
    {   
        password="";
        console.log("START")
        console.log(checkcount);
        //checking if the input checkbox field is empty or not
        if(checkcount==0)
            return;
        if(checkcount > passwordlength)
            {
                passwordlength = checkcount;
                handleslidebar();
            }
        console.log("verificaton done")
        //checking of the checkbox checked
        password_array=[];
        if (uppercase_check.checked) {
            password_array.push(getrandomuppercase);
        }
        if (lowercase_check.checked) {
            password_array.push(getrandomlowercase);
        }
        if (numbers_check.checked) {
            password_array.push(getrandomnumber);
        }
        if (symbols_check.checked) {
            password_array.push(getrandomsymbol);
        }
    
        //compulsory addition
    
        for(let i = 0;i<password_array.length;i++){
            password += password_array[i]();
        }
    
        //remaning addition
        for(i=0;i< (passwordlength - password_array.length);i++){
            let randomindex = generateradnominteger(0, password_array.length);
            password += password_array[randomindex]();
        }
    
        password = shufflepassowrd(Array.from(password));
        console.log(password);
        password_display.value=password;
        strengthchecker();
    })

