
var screen = {width:1000,height:900}
var margins = {top:10,right:25,left:55,bottom:50}





var statePromise = d3.csv("/stateData/stateData.csv")
var stateData = []

var planPromise = d3.csv("/stateData/stateDatapt2.csv")
var planData = []
var statePopData = []

var newData =[]







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
    
    console.log(planData)
    setup(newData)
    
   
    
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


