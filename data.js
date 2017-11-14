function chartGenerate(dataset){
	var datasetA = {
		labels:dataset.labels,
		data:dataset.data,
		borderColor:[dataset.color],
		fill:false
	}
	var ctx = document.getElementById("myChart");
	var myLineChart = new Chart(ctx,{
		type: 'line',
		data:datasetA,
		options:{scales: {
			yAxes: [{
				ticks: {
					stepSize: 15
				}
				}]
			}
		}
	})

	// var ptdatasets = [{
	// 	label:'percentage A/B',  
	// 	data:[
	// 	(datasets[0].data[0])/(datasets[1].data[0]),
	// 	(datasets[0].data[1])/(datasets[1].data[1]),
	// 	(datasets[0].data[2])/(datasets[1].data[2]),
	// 	(datasets[0].data[3])/(datasets[1].data[3])
	// 	],
	// 	borderColor:["green"],
	// 	backgroundColor: ["transparent"]
	// }
	// ]
	//main
	// var ctx = document.getElementById("myChart");
	// var myLineChart = new Chart(ctx,{
	// 	type: 'line',
	// 	data:datasetA,
		// data: {
		// 	labels: ["January", "February", "March", "April"],
		// 	datasets:datasets
		// },
	// 	options:{scales: {
	// 		yAxes: [{
	// 			ticks: {
	// 				stepSize: 15
	// 			}
	// 			}]
	// 		}
	// 	}
	// })
	// var ptCtx = document.getElementById("ptChart");
	// var ptChart = new Chart(ptCtx,{
	// 	type:'line',
	// 	data:{
	// 		labels: ["January", "February", "March", "April"],
	// 		datasets:ptdatasets
	// 	}
	// })

}


$(document).ready(function(){

	var string_one = $('.input.one').val()||"";
	var string_two = $('.input.two').val()||"";
	var string_three = $('.input.three').val()||"";
	var string_four = $('.input.four').val()|"";

	const stringOne,stringTwo,stringThree,stringFour;

	var callUrl = stringOne + string_one +
	stringTwo  + string_two +
	stringThree  + string_three +
	stringFour  +string_four;
	
	$("#actionBtn").on('click',function(){
		$.ajax({
			url:callUrl
		}).done(function(data){
			//debug: show response jason in the console
			console.log(data)
			var __data,__labels;
			if(data!=="" && data.facet_counts){
				var counts = data.facet_counts.facet_ranges.requestTimeBegin.counts;
				//render to the page
				if(counts.length > 0){
					__data = [];__labels=[];
					var _insertContent = "";
					for(var i=0;i<counts.length;i++){
						var _rowStr = counts[i].split(',');
						var _date = new Date(_rowStr[0].replace('z',0));

						var _row = '<tr><td>'+(_date.getMonth()+1) +'/'+_date.getDate() +'/'+ _date.getYear()+'</td>'+
						'<td>'+ _rowStr[i][1] + '</td>'+
						'</tr>';
						__data.push(_rowStr[i][1]);
						__labels.push((_date.getMonth()+1) +'/'+_date.getDate() +'/'+ _date.getYear());
						_insertContent = _insertContent + _row;						
					}
					$(_insertContent).appendTo($("#reportTable"));
					//generate chart
					var datasetA = {
						labels:__labels,
						data:__data,
						color:['red']
					}
					chartGenerate(datasetA);			
				}
			}
		}).fail(function(error){
			alert('error! ' + error)
		})
	})

})