window.onload = function() {
    let languages = document.getElementsByClassName("language")
    for (let i = 0; i < languages.length; i++) {
        let name = languages[i].id;
        let degree = languages[i].innerHTML;
        let html = "";
        let htmlhead = "<text>"+ name +"</text>";
        for (let j = 0; j < 10; j++) {
            if (j <= (degree - 1)){
                html = html + "<image class='languagesimage' src='icon/circle1.png'></image>"
            }else{
                html = html + "<image class='languagesimage' src='icon/circle0.png'></image>"
            }
        }
        html = "<div class = 'divlanguageimage'>"+html+"</div>";
        languages[i].innerHTML = htmlhead + html;
    }
    var aboutme1 = document.getElementsByClassName("content");
    aboutme = aboutme1[0].innerHTML;
}
function personal(){
    let element = document.getElementsByClassName("content")[0];
    element.innerHTML = aboutme;
}
var aboutme = ""
function topoint(timestring){
    return timestring.split("y")[0]+"."+timestring.split("y")[1].split("m")[0]+"."+timestring.split("y")[1].split("m")[1];
}
function loadbloglist(){
    let http = new XMLHttpRequest();
    http.open("GET","Markdownblog\/",true);
    http.send(null);
    http.onreadystatechange = function(){
        if(http.readyState == 4){
            if(http.status == 200||http.status == 0){
                let reg = /<li><a href=\"\/Markdownblog\/.*?\.md/g;
                let list = http.responseText.match(reg);
                let html = ""
                for(let i=0; i<list.length; i++){
                    let name = list[i].split("\/")[2]
                    html = html + "<div class='blogdiv' onclick='loadblog(\""+name+"\")'><div>"+name.split(".")[0].split("-")[0]+"</div><div>"+topoint(name.split(".")[0].split("-")[1])+"</div></div>"
                };
                let element = document.getElementsByClassName("content")[0];
                element.innerHTML = "";
                html = "<div class='blogdivcontainor'>"+html+"</div>"
                document.getElementsByClassName("content")[0].innerHTML = html;
            }else{
                alert(http.status);
            }
        }
    };
}
function loadblog(name){
    let http = new XMLHttpRequest();
    console.log(name);
    http.open("GET","Markdownblog\/"+name,true);
    http.send(null);
    http.onreadystatechange = function(){
        if(http.readyState == 4){
            if(http.status == 200||http.status == 0){
                var markdown = http.responseText;
                let element = document.getElementsByClassName("content")[0];
                element.innerHTML = "";
                let content = document.getElementsByClassName("content")[0];
                let https = new XMLHttpRequest();
                https.open("GET","markdown.css",true);
                https.send(null);
                var markdowncss;
                https.onreadystatechange = function(){
                    if(http.readyState == 4){
                        if(http.status == 200||http.status == 0){
                            var markdowncss1 = https.responseText;
                        }else{
                            console.log(https.status)
                        }
                        markdowncss = markdowncss1
                        content.innerHTML = "<div style='padding:5%;'><style scoped>"+markdowncss+"</style>"+marked(markdown)+"</div>";
                    }
                }
            }else{
                console.log(http.status);
            }
        }
    };

}