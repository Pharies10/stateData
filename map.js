
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
    

    
    console.log(geoData)
    

    for (items in stateData)
        {
            
            
            makeData(stateData[items], items)
            
            
           
        }
    
   
    setup()
    
   
    
}

var fail = function(data)
{
    
    console.log("404 not found")
    
    
    
}
var fill = function(data)
{
    
    planData = data
    
    
    console.log(planData)
    
    
}
var mapIt = function(data)
{
    
    
    geoData = data
    
    
}
geoPromis.then(geo, fail)
mapPromise.then(mapIt, fail)
planPromise.then(fill,fail)
statePromise.then(success, fail)


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















// draw the map
var setup = function()
{
    
    var path = d3.geoPath().projection(d3.geoAlbersUsa().translate([screen.width/2, screen.height/2]))
    d3.select("svg")
        .attr("width",screen.width)
        .attr("height",screen.height)
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
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
        if (state == "")
        {
            
            return "white"
            
        }
        
        else if (state.Stateplan == "Yes")
        {
            return "blue"
            
            
            
        }
        else if (state.Stateplan == "No")
        {
                
                return "cyan"
                
                
        }
        else
        {
            
            return "yellow"
            
        }
        
        
    })
        .style("border", "solid")
        .attr("d", path).on("click", function(d){
        
        
        d.properties.name
        
        
    })
  
}
