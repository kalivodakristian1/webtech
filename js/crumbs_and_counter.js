function crumbsAndCounter() {
  // ===== bread crumbs =====
  let lastVisitedPage = document.title
  let lastVisitedPageLink = window.location.href
  var lastVisitedAll = JSON.parse(localStorage.getItem("lastVisited"));
  let lastVisitedAllLinks = JSON.parse(localStorage.getItem("lastVisitedLinks"))
  let index, indexLink

  if (lastVisitedAll === null) lastVisitedAll = []
  if (lastVisitedAllLinks === null) lastVisitedAllLinks = []
  index = lastVisitedAll.indexOf(lastVisitedPage)
  indexLink = lastVisitedAllLinks.indexOf(lastVisitedPageLink)

  if (index !== -1) {
    lastVisitedAll.splice(index, 1)
  }
  if (indexLink !== -1) {
    lastVisitedAllLinks.splice(indexLink, 1)
  }
  lastVisitedAll.unshift(lastVisitedPage)
  lastVisitedAllLinks.unshift(lastVisitedPageLink)
  localStorage.setItem("lastVisitedLinks", JSON.stringify(lastVisitedAllLinks))
  localStorage.setItem("lastVisited", JSON.stringify(lastVisitedAll))



  index = lastVisitedAll.length - 1
  let crumbsAndCounter
  while (index >= 0) {
    crumbsAndCounter = document.getElementById("crumbsAndCounter")
    let anchor = document.createElement("a")
    anchor.href = lastVisitedAllLinks[index]
    anchor.innerHTML = lastVisitedAll[index]
    crumbsAndCounter.appendChild(anchor)
    if (index !== 0) {
      let separator = document.createElement("span")
      separator.innerHTML = " >> "
      crumbsAndCounter.appendChild(separator)
    }
    index--
  }

  // ===== counter of visits =====
  let visits = localStorage.getItem("visits")
  if (visits === null) {
    visits = 1
  }
  else {
    visits++
  }
  let counter = document.createElement("p")
  counter.innerHTML = "pocet navstiveni: " + visits
  crumbsAndCounter.appendChild(counter)
  localStorage.setItem("visits", visits)
}