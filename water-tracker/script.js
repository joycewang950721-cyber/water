let goal = 2000
let total 
let list=[]
let streakDays = Number(localStorage.getItem("streakDays"))||0

let lastCompleteDate = localStorage.getItem("lastCompleteDate")

function undateStreak(){
    document.getElementById("streak").innerText = "連續達成" + streakDays +"天"
}


function checkStreak(){

    let today = new Date().toDateString()

    if(lastCompleteDate ===today) return

    let yesterday = new Date(Date.now() - 86400000).toDateString()

    if(lastCompleteDate ===yesterday){
        streakDays++
    }else{
        streakDays = 1
    }

    lastCompleteDate = today
    localStorage.setItem("streakDays", streakDays)
    localStorage.setItem("lastCompleteDate", today)

    updateStreak()
}

function save(){

    const data = {
        total:total,
        list:list,
        date:new Date().toDateString()
    }

    localStorage.setItem("drinkData",JSON.stringify(data)) 
}

function load(){
    const saved = localStorage.getItem("drinkData")
    if(!saved) return

    let data = JSON.parse(saved)

    let today = new Date().toDateString()

    if(data.date !==today){
        localStorage.removeItem("drinkData")
        total = 0
        list = []
        render()
        return
    }

    total = data.total
    list = data.list

    render()

}

function addDrink(){
    let amount = Number(document.getElementById("amount").value)

    let ratio = document.getElementById("drink").value

    let drinkName = document.getElementById("drink").selectedOptions[0].text

    if(!amount) return

    let water = Math.round(amount*ratio)

    total += water

    let item ={
        drink: drinkName,
        amount: amount,
        water:water
    }

    if(total >= goal){
        checkStreak()
    }

    list.push(item)

    localStorage.setItem("total", total)
    render()
    save()
    }

function render(){
    document.getElementById("total").innerText = total + "ml"
    
    let ul = document.getElementById("list")
    ul.innerHTML = ""

    list.forEach((item,index)=>{

        let li = document.createElement("li")

        li.innerText = item.drink + item.amount + "ml，" + "含水量" + item.water + "ml"

        let btn = document.createElement("button")

        btn.innerText = "刪除"
        btn.onclick = function(){
            total -=item.water
            list.splice(index,1)
            
            render()
            save()
        }

        li.appendChild(btn)
        ul.appendChild(li)
    })

    let percent = (total / goal)*100

    if(percent > 100) percent = 100

    document.getElementById("progress-bar").style.width = percent + "%"

    if(percent <50 && percent >= 0){ 
        document.getElementById("progress-bar").style.backgroundColor = "red"
    }
    else if(percent <=99 && percent>=50){
        document.getElementById("progress-bar").style.backgroundColor = "orange"
    }
    else if(percent =100){
        document.getElementById("progress-bar").style.backgroundColor = "green"
    }

    document.getElementById("drinkPercent").innerText = "今日已喝了" + percent +"%"

    updateStreak()
}


function restToday(){
    total = 0
    list = []

    localStorage.removeItem("drinkData")

    render()
}


load()

function showDate(){
    let today = new Date()

    let text = today.getFullYear() + "/" + (today.getMonth()+1) + "/" + today.getDate()

    document.getElementById("date").innerText = text
}

showDate()

