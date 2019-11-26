
var screen = {width:1000,height:900}
var margins = {top:10,right:25,left:55,bottom:50}


var mapPromise = d3.json("https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson")


var statePromise = d3.csv("/stateData/stateData.csv")
var stateData = []

var planPromise = d3.csv("/stateData/stateDatapt2.csv")
var geoPromis = d3.json("us-states.json")

var planData = []
var statePopData = []
var geoData = {}
var newData =[]


var buttonData = [{ tag: "All the standards", call: "yes"},
                  { tag: "Certification", call: "Certification"},
                  { tag: "Funding for CSC k-12", call: "Funding"},
                  { tag: "Higher Education Requirement", call: "Highered"},
                  { tag: "Incentives", call: "Preserviceincentives"},
                  { tag: "Standards for Education", call: "Standards"},
                  { tag: "State Plan", call: "Stateplan"},
                  { tag: "State Position", call: "Statepos"},
                  { tag: "HS Graduation Requirement", call: "gradReqt"},
                  { tag: "Required in HS", call: "reqHS"}]


var geo = function(data)
{
    
    geoData = data
    
}

var success = function(data)
{
    

    
    stateData = data.filter(filterTheStates)
    
    statePopData = data.filter(filterTotalStates)
    planData = planData.filter(filterPlanStates)
    
    stateData= stateData.map(editEMP)
    statePopData = statePopData.map(editEMP)
    

    

    

    for (items in stateData)
        {
            
            
            makeData(stateData[items], items)
            
        
           
        }
    for (i in planData)
        {
            
         
            makeCount(planData[i])
            
            
        }
    
   console.log(planData)
    setup()
    
   
    
}

var fail = function(data)
{
    
    console.log("404 not found")
    
    
    
}
var fill = function(data)
{
    
    planData = data
    
    

    
    
}
var mapIt = function(data)
{
    
    
    geoData = data
    
    
}
geoPromis.then(geo, fail)
mapPromise.then(mapIt, fail)
planPromise.then(fill,fail)
statePromise.then(success, fail)










// filter functions for thy data
var filterTheStates = function(state)
{
    

    
    if (state.OCC_CODE == "15-0000" && state.ST != "GU" && state.ST != "PR" && state.ST != "VI")
        {
            return state

        }
    

}

var filterTotalStates = function(state)
{
    

    
    if (state.OCC_CODE == "00-0000" && state.ST != "GU" && state.ST != "PR" && state.ST != "VI")
        {
            return state

        }
    

}

var filterPlanStates = function(state)
{
    

    
    if (state.Statename != "Territory" && state.Statename != "District of Columbia")
        {
            return state

        }
    

}







// edit the object
var makeData = function(state, i)
{
    
    
    for (items in planData)
        {
            
            if (planData[items].Statename == state.STATE)
                {
                    
                    planData[items].totEmp = statePopData[i].totalEmp
                    planData[items].cscEmp = state.totalEmp
                    var avgEmp = (state.totalEmp / statePopData[i].totalEmp) * 100
                    planData[items].avgEmp = avgEmp
                    
                }
            
            
            
            
        }
    
    
    
    
    
}




// trn stff into integers
var editEMP = function(state)
{
    var totEmp = ""
    var empSplit = state.TOT_EMP.split(",")
    for (items in empSplit)
        {
            totEmp =  totEmp + empSplit[items] 
        }
        
        
   totalEmp = parseInt(totEmp) 
   totalEmp = totalEmp
    
    
    
    
    state.totalEmp = totalEmp
    return state
    
    
    
    
    
}






// makes the "yes:" parameter in our state objects
var makeCount = function(state)
{
    
        count = 0
        
        if (state.Stateplan != "No")
        {
            
            count = count+1
            
            
        }
        
        if (state.Funding != "No")
        {
            
            count = count+1
            
            
        }
    
        if (state.Standards != "No")
        {
            
            count = count+1
            
            
        }
        if (state.Certification != "No")
        {
            
            count = count+1
            
            
        }
    
        if (state.Highered != "No")
        {
            
            count = count+1
            
            
        }
        if (state.Preserviceincentives != "No")
        {
            
            count = count+1
            
            
        }
        if (state.Statepos != "No")
        {
            
            count = count+1
            
            
        }
        if (state.gradReqt != "No")
        {
            
            count = count+1
            
            
        }     
        if (state.reqHS != "No")
        {
            
            count = count+1
            
            
        }     
    
        state.yes = count
    
}




// returns the number ti develop the color
var makeColor = function(state)
{
    
    if (state.cscEmp < 10000)
        {
            
            return 1
            
            
        }
    else if (state.cscEmp >= 10000 && state.cscEmp < 50000)
        {
            
            return 2
            
        }
    else if (state.cscEmp >= 50000 && state.cscEmp < 100000)
        {
            
            return 4
            
        }  
    else if (state.cscEmp >= 100000 && state.cscEmp < 200000)
        {
            
            return 6
            
        }   
    else{
        
        
        return 8
        
        
    }
    
    
    
    
    
    
    
    
}



// for all the traits
var colorGen = function(state, blue, red, grey)
{
        var color = makeColor(state)
        if (state.yes < 4)
        { 
            return red(color)   
        }
        
        else if (state.yes == 4)
        {
            return grey(color)
        }
     
        else
        {
            return blue(color)
        }
    
    
    
}

// for each individual trait
var colorGen2 = function(state, what, blue, red, grey)
{
        var color = makeColor(state)
      
        if (state[what] == "No")
        { 
            return red(color)   
        }
        
        else if (state[what] == "Yes")
        {
            return blue(color)
        }
     
        else
        {
            return grey(color)
        }
    
    
    
}












//used to tell at what it is talking about this time
var drawMeaning = function(definition, red, blue, grey)
{
    
    d3.select("svg")
        .append("g")
        .attr("id", "colorLegend")
        .attr("transform", "translate("+(100)+","+ (50) +")")
    
    
    
    
    var meaning = d3.select("#colorLegend")
                .selectAll("g")
                .data(definition)
                .enter()
                .append("g").attr("transform", function(c, i){
                    
                    
                    return "translate(30," + (i*34) + ")"
                    
                    
                    
                })
   
    meaning.append("rect").attr("width", 30).attr("height", 30).attr("fill", function(c,i){
        
        
        if(i==0)
        {
                
            return red(c.colorName)
                
                
        }
        else if (i==1)
        {
            return grey(c.colorName)
        }
        else
        {
            
            return blue(c.colorName)
            
            
        }
    })
    
    meaning.append("text").text(function(c){
        
        return c.meaning
        
        
        
    }).attr("x", 40).attr("y", 20).attr("fill", "black") 
    

    
    
    
    
    
    
    
}



// use to draw legend
var drawLegend = function(colors, red, blue, grey)
{
    

    
    
    

    
    
    d3.select("svg")
        .append("g")
        .attr("id", "legend")
        .attr("transform", "translate("+(screen.width-500)+","+ (50) +")")
    
    var yes = d3.select("#legend")
                .selectAll("g")
                .data(colors)
                .enter()
                .append("g").attr("transform", function(c, i){
                    
                    
                    return "translate(30," + (i*34) + ")"
                    
                    
                    
                })
 
 
            
 
    yes.append("rect").attr("width", 30).attr("height", 30).attr("fill", function(c){return red(c.color)})
    yes.append("rect").attr("width", 30).attr("height", 30).attr("x", 40).attr("fill", function(c){ return grey(c.color)})
    yes.append("rect").attr("width", 30).attr("height", 30).attr("x", 80).attr("fill", function(c){return blue(c.color)})
    

    
    yes.append("text").text(function(c){
        
        return c.amount
        
        
        
    }).attr("x", 120).attr("y", 20).attr("fill", "black") 
    
}




// works the trasitions between the buttons
var transition = function(type, red, blue, grey)
{
    
    
     
        d3.select("#map")
            .selectAll("path")
            .transition()
            .duration(700)
            .style("fill", function(d){
            
                    d3.select("#colorLegend").remove()
            
            
                    var name = d.properties.name
                    var state = ""
                    for (i in planData)
                    {
                     if (planData[i].Statename == name)
                    {
                
                        var state = planData[i]
                
                
                    }
            
            
                    }                                               
                                                                           
                   if (type.call=="yes")
                       {
                        var yesNoMaybe = [{colorName: 6, meaning: "Less than 4 of the standards met by state"},
                                            {colorName: 6, meaning: "4 standards met by state"},
                                            {colorName: 6, meaning: "More than 4 of the standards met by state"}]
        
        
        
                        drawMeaning(yesNoMaybe, red, blue, grey)
                           
                        var color = colorGen(state, blue, red, grey)
                    
                        return color 
                           
                           
                           
                           
                       }
                    else{
                        
                        
                        
                        var yesNoMaybe = [{colorName: 6, meaning: "Does not have " + type.tag},
                                        {colorName: 6, meaning: "Other"},
                                        {colorName: 6, meaning: "Has " + type.tag}]
                        drawMeaning(yesNoMaybe, red, blue, grey)
                        
                        
                        var color = colorGen2(state, type.call, blue, red, grey)
                        
                        return color
                        
                        
                        }
                                                                           
                                                                           
             })






}


// makes the buttons at first
var makeButtons = function(red, blue, grey)
{
    
    
    d3.select("#btnHolder")
        .selectAll("div")
        .data(buttonData)
        .enter()
        .append("div").append("button").text(function(b){
        
        return b.tag
        
        
    }).on("click", function(d){
        

        transition(d, red, blue, grey)
        
        
        
        
    })
    
    
    

    
}









// draw the map
var setup = function()
{
    
    
    
    var blueScale = d3.scaleOrdinal(d3.schemeBlues[9])
    var redScale = d3.scaleOrdinal(d3.schemeReds[9])
    var greyScale = d3.scaleOrdinal(d3.schemeGreys[9])
    for (i= 0; i < 9; i++)
        {
            greyScale(i)
            redScale(i)
            blueScale(i)
         
            
            
        }
    
    

    
    var colorsUsed = [{ amount: "Under 10,000 CSC Jobs", color: 1}, 
                      { amount: "Between 10,000 and 50,000 CSC Jobs", color: 2}, 
                      { amount: "Between 50,000 and 100,000 CSC Jobs", color: 4},
                      { amount: "Between 100,000 and 200,000 CSC Jobs", color: 6},
                      { amount: "Over 200,000 CSC Jobs", color: 8}]
        
    var yesNoMaybe = [{colorName: 6, meaning: "Less than 4 of the standards met by state"},
                        {colorName: 6, meaning: "4 standards met by state"},
                        {colorName: 6, meaning: "More than 4 of the standards met by state"}]
        
        
        
    drawMeaning(yesNoMaybe, redScale, blueScale, greyScale)
        

    
    
    drawLegend(colorsUsed, redScale, blueScale, greyScale)
    
    
    var path = d3.geoPath().projection(d3.geoAlbersUsa().translate([screen.width/2, screen.height/2]))
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .append("g")
        .attr("id", "map")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path").attr("class", "state")
        .style("stroke", "black")
        .style("fill", function(d){
        
        
        var name = d.properties.name
        var state = ""
        for (i in planData)
        {
            if (planData[i].Statename == name)
            {
                
                var state = planData[i]
                
                
            }
            
            
        }
        var color = colorGen(state, blueScale, redScale, greyScale)
        return color
        
    })
        .style("border", "solid")
        .attr("d", path).on("click", function(d){
        
        d3.selectAll("#infoHolder *").remove()        
        var name = d.properties.name
        var state = ""
        for (i in planData)
        {
            if (planData[i].Statename == name)
            {
                
                var state = planData[i]
                
                
            }
            
            
        }
        
        d3.select("#infoHolder").append("div").attr("id", "stateName").text(state.Statename)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text(state.Stateabbv)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a Certification: " + state.Certification)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Funding for k-12 CSC programs: " + state.Funding)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a CSC Higher Education Requirement: " + state.Highered)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a Incentives for k-12 CSC Education: " + state.Preserviceincentives)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has set Standards for CSC k-12 Education: " + state.Standards)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a State Plan in place for CSC k-12 Education: " + state.Stateplan)
           d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a State Position in place for CSC k-12 Education: " + state.Statepos)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a High School Graduation Reqirement of CSC: " + state.gradReqt)
            d3.select("#infoHolder").append("div").attr("class", "stateInfo").text("Has a reqirement for High Schools to teach CSC: " + state.reqHS)
      
        
        
        
    })
  
     makeButtons(redScale, blueScale, greyScale)
    
    
    
    
    
    
}






