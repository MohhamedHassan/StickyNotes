//////////////////////////start index page functions
if (document.getElementById("one")) {
    $(".showNav").click(function() {
        $(".icons").toggleClass("d-none d-flex")
    })
let plus = document.getElementById("plus");
let bkGround = document.getElementById("bkGround");
let rows = document.getElementById("rows");
let toDoList = document.getElementById("to-do-list");
let list = document.getElementsByClassName("list");
let alertt = document.getElementById("alertt");
let focus = document.getElementsByClassName("focus");
let clrsContainer = document.getElementsByClassName("clrs-container");
let fonts = document.getElementsByClassName("fonts");
let bdy = document.getElementById("bdy");
let closBcPop = document.getElementById("closBcPop");
let container;
let box;
let that = 0;
let th = 0
let reg = /^\s{1,}$/;
let conIndx = 0
// start show data from local storage
let  bdyContainer ;
 if (localStorage.getItem("bdy") == null) {
      bdyContainer = [{obgi:"images/cork.jpg"}];
    document.body.style.backgroundImage = `url("${bdyContainer[0].obgi}")`;
} else {
    bdyContainer = JSON.parse(localStorage.getItem("bdy"));
    document.body.style.backgroundImage = `url("${bdyContainer[0].obgi}")`;
}
if (localStorage.getItem("container") == null) {
    container = [];
} else {
    container = JSON.parse(localStorage.getItem("container"));
    sho();
    for (let i = 0;i<list.length;i++) list[i].classList.add("invisible");
}
// end show data from local storage
// start add new note
plus.onclick = function() {
    createNote();
   sho();
   hid()
}
// end add new note
// start add new toDoList
toDoList.onclick = function() {
    createToDoList();
   sho();
   hid()
}
// end add new toDoList
// strat hide icons list 
function hid() {
    for (let i = 0;i<list.length;i++) list[i].classList.add("invisible");
    rows.children[rows.children.length-1].children[0].children[0].classList.toggle("invisible");
}
// end icons hide list
// start creat notes
function createNote() {
    let obj = {
        value:"",
               kind:"note",
               color:"black",
               fontSize:"16px",
               textDecoration:"none",
               fontWeight:"100",
               background:"-webkit-gradient(linear, left top, left bottom, from(#ffffcc), to(yellow))",
               
};
    container.push(obj);
    localStorage.setItem("container",JSON.stringify(container));
}
// end creat notes
// start creat toDoList
function createToDoList() {
    let obj = {
        value:"",
        kind:"ToDO",
        background:"-webkit-gradient(linear, left top, left bottom, from(#ffffcc), to(yellow))"
    };
    container.push(obj);
    localStorage.setItem("container",JSON.stringify(container));
}
// end creat toDoList
// start show the grid system form local storage
function sho() {
    box ="";
    for (let i = 0; i < container.length;i++) {
          if (container[i].kind=="note") {
            box += `
                 
            <div class="col-sm-12 col-md-6 col-xl-3 mb-5">
               <div class="h-100">
                    <ul class="text-center bg-dark listt list list-unstyled" > 
                    <li  class="listt"> 
                        <abbr class="listt" title="Click to Bold">
                        <i class="fas fa-bold listt" onclick="bold(this,${i})"></i>
                        </abbr>
                    </li>
                    <li  class="listt"> 
                        <abbr class="listt" title="Click to undeline">
                        <i class="fas fa-underline listt" onclick="decoration(this,${i})"></i>
                        </abbr>
                    </li>
                    <div class="listt position-relative" style="display:inline-block">
                        <li  class="listt fo-si">font size...<i class="fas fa-sort-down listt" onclick="shoFontList(this)"></i></li>
                        <div class="position-absolute fonts d-none" >
                            <p style="font-size:8pt" onclick="whtFont(this,'8pt',${i})">8 (pt)</p>
                            <p style="font-size:10pt" onclick="whtFont(this,'10pt',${i})">10 (pt)</p>
                            <p style="font-size:12pt" onclick="whtFont(this,'12pt',${i})">12 (pt)</p>
                            <p style="font-size:14pt" onclick="whtFont(this,'14pt',${i})">14 (pt)</p>
                            <p style="font-size:16pt" onclick="whtFont(this,'16pt',${i})">16 (pt)</p>
                            <p style="font-size:24pt" onclick="whtFont(this,'24pt',${i})">24 (pt)</p>
                        </div>
                    </div>
                      <div class="listt position-relative" style="display:inline-block">
                            <li  class="listt"> 
                            <abbr class="listt" title="Change  Text Color">
                                <i class="fas fa-palette listt" onclick="clr(this)"></i></abbr>
                            </li>
                            <div class="position-absolute d-none clrs-container" style="right:0;top:30px" >
                                <ul class="list-unstyled d-flex colors" >
                                    <li onclick="whtClr('black',this,${i})"></li>
                                    <li onclick="whtClr('white',this,${i})"></li>
                                    <li onclick="whtClr('rgb(255, 255, 102)',this,${i})"></li>
                                    <li onclick="whtClr('rgb(146, 255, 138)',this,${i})"></li>
                                    <li onclick="whtClr('rgb(118, 217, 255)',this,${i})"></li>
                                    <li onclick="whtClr('rgb(196, 132, 237)',this,${i})"></li>
                                    <li onclick="whtClr('rgb(251, 94, 238)',this,${i})"></li>
                                    <li onclick="whtClr('red',this,${i})"></li>
                                </ul>
                            </div>
                      </div> 
                       <li class="listt" style="margin-left:1.27px" ><i class="fas fa-times" onclick="clos(${i})"></i></li>
                    </ul> 
                    <textarea placeholder="Add a Note" onblur="indx(${i},this)" onfocus="inn(${i},this),foc(${i},this)" onkeydown="kdown(this)" class="nw w-100 listt " style="color:${container[i].color};font-size:${container[i].fontSize};text-decoration:${container[i].textDecoration};font-weight:${container[i].fontWeight};background:${container[i].background};
                    padding:10px;height:90%">${container[i].value}</textarea>
                </div>
            </div>
            `
         } else if (container[i].kind=="ToDO") {
             box += `
                 
             <div class="col-sm-12 col-md-6 col-xl-3 mb-5">
                       <div class="a b listt nw" style="min-height:90%;background-image:${container[i].background};background-color:${container[i].background};text-align:center;margin-top:25px;" >
                            <ul class="listt bg-dark list list-unstyled" style="overflow:hidden" > 
                                <li class="listt float-right">
                                   <i class="fas fa-times " onclick="clos(${i})"></i>
                                
                                </li>
                            </ul> 
                            <input placeholder="To Do List" onkeydown="kdown(this)" onfocus="inn(${i},this),focTwo(${i},this)"  type="text" class="listt  my-2 py-1 px-2" style="border-radius:15px;border:1px solid gray;outline:none;
                            ;width:90%">
                            <div class="content" >
                                    ${container[i].value}
                            
                            </div>
                       </div>
            </div>
             `
          } 
     }
 
   rows.innerHTML = box;
 }
// end show the grid system form local storage
// start show the icons list" 
function inn(k,ii) {
    that=k;
    th=ii;
    //start hide all icons list 
   for (let i = 0;i<list.length;i++) list[i].classList.add("invisible");
    //end hide all icons list 
    // start show icons list on focus
   ii.parentElement.children[0].classList.remove("invisible");
// end show icons list on focus
// start hide all features from icons list
  edit()
  editTow()
    //  end hide all features from icons list
}
function foc(ii,ths) {
    for (let i=0;i<focus.length;i++) focus[i].classList.remove("focus");
    conIndx = ii
    ths.classList.add("focus");
}
function focTwo(ii,ths) {
    for (let i=0;i<focus.length;i++)   focus[i].classList.remove("focus");
    ths.parentElement.classList.add("focus");
    conIndx = ii
}
// end show the icons list
// start hide the icons list on blur
document.documentElement.onclick = function(e) {
   if (! e.target.classList.contains("listt")) {
    for (let i = 0;i<list.length;i++)    list[i].classList.add("invisible");
    for (let i = 0;i<focus.length;i++) focus[i].classList.remove("focus");
   }
   let zee = document.getElementsByClassName("zee")[0]
   if (! e.target.classList.contains("ze") && ! zee.classList.contains("d-none")) {
    zee.classList.add("d-none")
   }

}
// // end hide the icons list on blur
// // start textarea value storage 
function indx(i,th) {
         container[i].value = `${th.value}`;
         localStorage.setItem("container",JSON.stringify(container));
}
// // end textarea  value storage 
// start delete object from the array
 function clos(i) {
    container.splice(i,1);
    sho();
    localStorage.setItem("container",JSON.stringify(container));
}
// end delete object from the array
// start create todolist 
function mkToDo(that,th) {
    if (reg.test(th.value)  || th.value =="") {
           console.log("empty");
    } else {       
        let p = document.createElement("p");
        let icn = document.createElement("i");
        let dv = document.createElement("div");
        let parent = document.createElement("div");
        dv.classList.add("d-flex");
        dv.classList.add("justify-content-between");
        p.innerHTML = th.value;
        icn.classList.add(`${that}`);
        icn.classList.add("del");
        icn.classList.add("fas");
        icn.classList.add("nohover");
        icn .classList.add("fa-window-close");
        icn.setAttribute("onclick","neww(this)");
        dv .classList.add("px-3");
        dv .classList.add("py-2");
        dv.appendChild(p);
        dv.appendChild(icn);
        parent.appendChild(dv);
        th.nextElementSibling.innerHTML += parent.innerHTML;
        container[that].value += parent.innerHTML;
        th.value="";
        localStorage.setItem("container",JSON.stringify(container));
}
}
// end create todolist
// start delete item from to do list
function neww(s) {
    let aa = s.parentElement.parentElement;
     s.parentElement.parentElement.removeChild(s.parentElement);
      container[s.classList.item(0)].value = aa.innerHTML;
     localStorage.setItem("container",JSON.stringify(container));
}
// end delete item from to do list
// start add item to (toDoList) 
document.addEventListener("keydown",function(e) {
    if (e.keyCode === 13) {
        mkToDo(that,th);
    }
});
// end add item to (toDoList) 
// start show colors menu
function clr(th) {
  th.parentElement.parentElement.parentElement.children[1].classList.toggle("d-none")
  // start hide fonts list when colors menue is open 
  editTow()
     // end hide fonts list when colors menue is open 
}
// end show colors menu
// start change textarea color 
function whtClr(cllr,th,i) {
    container[i].color= `${cllr}`;
 th.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].style.color =
  `${cllr}`;
  localStorage.setItem("container",JSON.stringify(container));
}
// end change textarea color 
// start show font list
function shoFontList(ths) {
    ths.parentElement.parentElement.children[1].classList.toggle("d-none")
      // start hide colors list when colors menue is open 
      edit()
      // end hide fonts list when colors menue is open 
}
// end show font list
// strat change textarea font size
function whtFont(ths,fntSize,i) {
    container[i].fontSize = `${fntSize}`;
   ths.parentElement.parentElement.parentElement.parentElement.children[1].style.fontSize = `${fntSize}`;
   localStorage.setItem("container",JSON.stringify(container)); 
}
// end change textarea font size
// start change text area decoration
function decoration(ths,i) {
    let x = ths.parentElement.parentElement.parentElement.parentElement.children[1];
    if (x.style.textDecoration=="underline") x.style.textDecoration="none";
    else  x.style.textDecoration="underline";
    container[i].textDecoration = x.style.textDecoration;
    // strat hide all features when press on decoration icon
    edit() 
    editTow()
   // strat hide all features when press on decoration icon
    localStorage.setItem("container",JSON.stringify(container));
}
// end change text area decoration
// start make text area value bold
function bold(ths,i) {
 let x = ths.parentElement.parentElement.parentElement.parentElement.children[1];
     if (x.style.fontWeight=="100")  x.style.fontWeight="bold";
     else  x.style.fontWeight="100";
    container[i].fontWeight = x.style.fontWeight;
     // strat hide all features when press on bold icon
     edit()
     editTow()
    // end hide all features when press on bold icon
    localStorage.setItem("container",JSON.stringify(container))
}
// end make text area value bold
// start show icon list on click on the image
function delImg(ths) {
    ths.parentElement.parentElement.children[0].classList.remove("invisible");
}
// end show icon list on click on the image
function edit() {
    for (let i = 0;i<clrsContainer.length;i++) clrsContainer[i].classList.add("d-none");
}
function editTow() {
    for (let i =0;i<fonts.length;i++) fonts[i].classList.add("d-none")
}
// start show background color  menu
bkGround.onclick= function() {
   this.parentElement.children[1].classList.toggle("d-none")
}
// end show background color  menu
// start change notes and to do list background color 
function chngBkGround(clr) {
    for (let i =0;i<focus.length;i++) {
        if (focus[i].classList.contains("focus")) {
            focus[i].style.background =`${clr}`;     
            container[conIndx].background=`${clr}`;
            localStorage.setItem("container",JSON.stringify(container));
        } 
    }
    let nw = document.getElementsByClassName("nw")
    let nww=  document.getElementsByClassName("ss")[0]
    let ff=false
    for (let x = 0;x<nw.length;x++) {
             if(nw[x].classList.contains("focus")) {
                 ff=true
             }      
    }
    if (!ff) {
        nww.style.display="block"
        setTimeout(() => {
          nww.style.display="none"
        },2000)
       }
}
// end change notes and to do list background color 

// start show background image pop up
bdy.onclick = function() {
    let x = closBcPop.parentElement.parentElement.parentElement.classList
   x.remove("d-none");
   x.add("d-flex");
}
// end show background image pop up
// start close background image pop up
closBcPop.onclick = function() {
    let x = closBcPop.parentElement.parentElement.parentElement.classList
   x.remove("d-flex");
   x.add("d-none");
}
// end close background image pop up
// start change the  body background
function chngbody(srcc) {
     document.body.style.backgroundImage = `url('${srcc}')`;
    bdyContainer[0].obgi = `${srcc}`
    localStorage.setItem("bdy",JSON.stringify(bdyContainer));   
}
// end change the  body background
// start the icons list on key down
function kdown(ths) {
    ths.parentElement.children[0].classList.remove("invisible");
}
// end the icons list on key down
}
//////////////////////////end index page functions
// start info page functions
if (document.getElementById("two")) {
    // start scroll function
    $(".navTwo a,.first button,.second button").click(function() {
        $("body,html").animate({
            scrollTop:$( "#" + $(this).data("scroll") ).offset().top - 40
        },500);
    });
    // end scroll function
    // start put class active
    $(window).scroll(function() {
        $(".scr").each(function() {
            if ($(window).scrollTop() >= $(this).offset().top -45) {
                $(".navTwo a").removeClass("active");
                let block = $(this).attr("id");
                 
                 $(`.navTwo a[data-scroll="${block}"]`).addClass("active");
            }
        });
        if ($(window).scrollTop() > 700) {
            $(".fa-sort-up").fadeIn(500);
        } else {
            $(".fa-sort-up").fadeOut(500);
        }
    })
    // end put class active
    // start show nav bar on smalll screen
    $(".fa-bars").click(function() {
        $(".navTwo ul").slideToggle();
    })
    // end show nav bar on smalll screen
    // start scroll to top buttons
    $("footer span,.fa-sort-up").click(function() {
        $("html,body").animate({
            scrollTop:0
        },500);
    });
    // end scroll to top buttons
    // start form validation
    let reg1 = /^\s{2,}$/;
    let reg2 = /^\s?[A-Za-z]{3,}/;
    let reg3 = /^[A-Z][A-Za-z]{2}/;
    let reg4 = /^[1-9][0-9]$/;
    let reg5 = /^[A-Za-z0-9_-]+@(hotmail|gmail|yahoo)\.com$/;
    let userOpinion = true;
    let userEmail = true;
    let userName = true;
    let userAge = true;

    console.log(userAge)
    // start user opinino validation
    $("#opinion").blur(function() {
        if ( reg1.test($("#opinion").val()) || $("#opinion").val().length == 0 ) {
            $("#opinion").next().removeClass("d-none");
            $("#opinion").css("border","3px solid red");
            userOpinion = true
        } 
        if (  reg2.test($("#opinion").val()) == false ) {
               $("#opinion").next().removeClass("d-none");
               $("#opinion").css("border","3px solid red");
               userOpinion = true
        } 
    })
    $("#opinion").keyup(function() {
        if ( reg2.test($("#opinion").val()) ) {
            $("#opinion").next().addClass("d-none");
            $("#opinion").css("border","3px solid green");
            userOpinion = false
        }
    })
    // end user opinino validation
    // start user name validation

   $("#nam").blur(function(){
    if ( reg1.test($("#nam").val()) || $("#nam").val().length == 0 ) {
        $("#nam").next().removeClass("d-none");
        $("#nam").css("border","3px solid red");
        userName = true
    }
    if (  reg3.test($("#nam").val()) == false ) {
        $("#nam").next().removeClass("d-none");
        $("#nam").css("border","3px solid red");
        userName = true
 } 
   });
   $("#nam").keyup(function() {
    if ( reg3.test($("#nam").val()) ) {
        $("#nam").next().addClass("d-none");
        $("#nam").css("border","3px solid green");
        userName = false
    }
});
// end user name validation
// start user age validation
$("#agee").blur(function() {
    if ( reg1.test($("#agee").val()) || $("#agee").val().length == 0 ) {
        $("#agee").next().removeClass("d-none");
        $("#agee").css("border","3px solid red");
        userAge = true
    }
    if (  reg4.test($("#agee").val()) == false ) {
        $("#agee").next().removeClass("d-none");
        $("#agee").css("border","3px solid red");
        userAge = true
 } 
});
$("#agee").keyup(function() {
    if ( reg4.test($("#agee").val()) ) {
        $("#agee").next().addClass("d-none");
        $("#agee").css("border","3px solid green");
        userAge = false
    }
});
// end user age validation
// start user email validation
$("#email").blur(function() {
    if ( reg1.test($("#email").val()) || $("#email").val().length == 0 ) {
        $("#email").next().removeClass("d-none");
        $("#email").css("border","3px solid red");
        userEmail = true
    }
    if (  reg5.test($("#email").val()) == false ) {
        $("#email").next().removeClass("d-none");
        $("#email").css("border","3px solid red");
        userEmail = true
 } 
});
$("#email").keyup(function() {
    if ( reg5.test($("#email").val()) ) {
        $("#email").next().addClass("d-none");
        $("#email").css("border","3px solid green");
        userEmail = false
    }
});
// end user email validation
// start submit form validation 
$("#subb").submit(function(e){
 if (userEmail === true || userName === true ||  userAge === true || userOpinion === true ) {
     e.preventDefault();
     $("#alll").removeClass("d-none")
     $("#opinion,#agee,#nam,#email").blur()
 } 

}) ;
// end submit form validation
// end form validation

}
// end info page functions