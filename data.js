//fake data
var datasets = [
{
    	label:'line A',          
        data: [0, 200, 12, 50],
        borderColor:['red'],
        fill:false
    },
    {
    	label:'line B',          
        data: [150, 20, 10,100],
        borderColor:["green"],
        fill:false
    }
]

var ptdatasets = [{
	label:'percentage A/B',  
	data:[
		(datasets[0].data[0])/(datasets[1].data[0]),
		(datasets[0].data[1])/(datasets[1].data[1]),
		(datasets[0].data[2])/(datasets[1].data[2]),
		(datasets[0].data[3])/(datasets[1].data[3])
	 ],
	  borderColor:["green"],
     backgroundColor: ["transparent"]
	}
]

//main
var ctx = document.getElementById("myChart");
var myLineChart = new Chart(ctx,{
	type: 'line',
	data: {
		labels: ["January", "February", "March", "April"],
		datasets:datasets
	},
	options:{scales: {
		yAxes: [{
			ticks: {
				stepSize: 15
			}
			}]
		}
	}
})

var ptCtx = document.getElementById("ptChart");
var ptChart = new Chart(ptCtx,{
	type:'line',
	data:{
		labels: ["January", "February", "March", "April"],
		datasets:ptdatasets
	}
})