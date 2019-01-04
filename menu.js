var pageTree = [
    {
        "O nas": "about.html"
    },
    {
        "Hry": {
            "Jozefova hra": "game.html",
            "Kristianova hra": "chriss_puzzle.html",
            "Petrova hra": ""
        }
    },
    {
        "Spolocne zadanie": {
            "text": "articles.html",
            "game ": {
                "game 2": "chriss_puzzle.html",
                "game 3": "chriss_puzzle.html"
            }
        }
    }
]

function menu() {
    var header = document.getElementsByTagName("header")[0];
    var ul = document.createElement("ul");

    pageTree.forEach(function (element) {
        var li = document.createElement("li");
        var a = document.createElement("a");

        for (var data in element) {
            a.innerText = data;
            if (typeof element[data] == "string") {
                a.setAttribute("href", element[data]);
                li.appendChild(a);
            } else {
                //a.className = "dropDown";
                //a.setAttribute("href",".item");
                li.appendChild(a);
                li.className = "dropDown";
                var subUl = document.createElement("ul");
                subUl.className = "item";

                for (var subData in element[data]) {

                    if (typeof element[data][subData] == "string") {
                        var subli = document.createElement("li");
                        //subli.className="item";
                        var suba = document.createElement("a");
                        suba.setAttribute("href", element[data][subData]);
                        suba.innerText = subData;
                        subli.appendChild(suba);
                        subUl.appendChild(subli);
                    } else {
                        var tmpli = document.createElement("li");
                        tmpli.innerText = subData;
                        tmpli.className = "item";
                        subUl.appendChild(tmpli);

                        var subsubUl = document.createElement("ul");
                        subsubUl.className = "sub-item";

                        for (var subsubData in element[data][subData]) {
                            var subsubli = document.createElement("li");
                            //subsubli.className="sub-item";
                            var suba = document.createElement("a");
                            suba.setAttribute("href", element[data][subData][subsubData]);
                            suba.innerText = subsubData;
                            subsubli.appendChild(suba);
                            subsubUl.appendChild(subsubli);
                        }
                        subUl.appendChild(subsubUl);
                    }
                }
                li.appendChild(subUl);
            }
        }
        ul.appendChild(li);
    })
    var nav = document.createElement("div");
    nav.className = "nav";
    nav.appendChild(ul);
    header.appendChild(nav);
}