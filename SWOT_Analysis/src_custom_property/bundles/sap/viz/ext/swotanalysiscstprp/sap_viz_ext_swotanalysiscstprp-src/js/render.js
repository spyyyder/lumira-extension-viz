define("sap_viz_ext_swotanalysiscstprp-src/js/render", [], function() {
	/*
	 * This function is a drawing function; you should put all your drawing logic in it.
	 * it's called in moduleFunc.prototype.render
	 * @param {Object} data - proceessed dataset, check dataMapping.js
	 * @param {Object} container - the target d3.selection element of plot area
	 * @example
	 *   container size:     this.width() or this.height()
	 *   chart properties:   this.properties()
	 *   dimensions info:    data.meta.dimensions()
	 *   measures info:      data.meta.measures()
	 */
	var render = function(data, container) {
	// TODO: add your own visualization implementation code below ...
		//console.log(data);
		var cateEnvir = data.meta.dimensions(0)[0];
		var description = data.meta.dimensions(0)[1];
		// var swatcontent = data.meta.dimensions('Description');
		var measure =  data.meta.measures(0);
		var sectioncolor = this.properties().colorPalette;
		
		//var sectioncolor = ["#BDD673", "#91C1E8", "#E07A5E", "#D8AFD6"]; // move to preview.html
		var priority_order = ["Strengths", "Weaknesses", "Opportunities", "Threats"];
		
		var categoryData = d3.nest()
	          .key(function(d){ return d[cateEnvir] || d.Category; })
	          .sortKeys(function(a,b) { return priority_order.indexOf(a) - priority_order.indexOf(b); })
	          .entries(data);
	          
	   var arrowText = [{key:"Internal Factors"},{key:"External Factors"}];   
	          
	    var cateTitle = categoryData.map(function(d){  return d.key;  }),
			arrowText = arrowText.map(function(d){  return d.key;  });
		// console.log(cateTitle);
		// console.log(arrowText);
		
		clearEmpty(categoryData);
		clearEmpty(arrowText);
		// console.log(categoryData);
		// console.log(arrowText);
		
		var margin = {	top: 20,	right: 40,	bottom: 30,	left: 20 },
			width = this.width() - margin.left - margin.right,
			height = this.height() - margin.top - margin.bottom;
		
		container.selectAll("div").remove(); //First remove any existing <p> element  
		
		var svg = container.style("width", width + margin.left + margin.right)
				.style("height", height + margin.top + margin.bottom);
		
		var swot_form = svg.append("div").attr("class", "sap_viz_ext_swotanalysis");
		var showBG = svg.append("div").attr("class", "sap_viz_ext_swotanalysis_checkbox");
		
		showBG.append("input").attr("type", "checkbox")
					.attr("id","showBG").attr("value","false")
					.on("click", function(){
						if(this.checked){
							 svg.selectAll("div.contentSection")	
								 .style("background-color", function(d,i){
									return sectioncolor[i];
								});
						}else{
							swot_form.selectAll("div.contentSection")	
								 .style("background-color","white");
						}
					});
		showBG.append("label").attr("for", "showBG").text("Show Background Color");
		showBG.append("br");
		
		showBG.append("input").attr("type", "checkbox")
			.attr("id","fontColor").attr("value","black")
			.attr("checked","checked")
			.on("click", function(){
				d3.select(this).attr("checked", function(){
						d3.select(this).attr("checked", function(){
							if(this.checked){
								svg.selectAll("span")	
									 .style("color","#111");
							}else{
								svg.selectAll("span")	
									 .style("color","#fff");
							}
						});
				});
			});
		showBG.append("label").attr("for", "fontColor").text("Dark Text");
			// <label for="switch-id">Holiday</label>

		var content_sec = swot_form.selectAll("div.contentSection")
				.data(categoryData)
				.enter()
				.append("div")
				.attr("class", "contentSection")
				.style("background-color", function(d,i){
					return (sectioncolor && showBG.select("input#showBG").attr("checked"))?sectioncolor[i]:"white";
				})
				.attr("id", function(d){
					return d.key;
				});
				
		content_sec.append("div")
				.attr("class", "capitalLet float_right")
				.append("span")
				.text(function(d){
					return d.key.split("")[0];
				 });
				
		content_sec.append("p")
				.append("span")
				.attr("class", "blueTitle")
				.text(function(d){
					return d.key;
				 });
		
		var content_desp = content_sec.append("ul")
		 		.attr("class", "description")
		 		.selectAll("li")
		 		.data(function(d){ 
		 			var validArray = [];
		 			for(var i in d.values){
		 				if(d.values[i][measure]){ validArray.push(d.values[i]); }
		 			}
		 			return validArray;
		 		})
		 		.enter()
		 		.append("li")
		 		.append("span")
    			.text(function(d) { return d[description]|| d.Description; });
    	
    	var arrow = svg.append("div")
			.attr("class", "sap_viz_ext_swotanalysis_maintitle")
			.selectAll("div.sap_viz_ext_swotanalysis_maintitle")
			.data(arrowText)
			.enter()
			.append("div")
			.attr("class", "envirArrow")
			.style("top", function(d,i){
				var secHeight = 100,
					titleHeight = d3.select(this).node().getBoundingClientRect().height/2;
				if(i<1){
					secHeight = d3.select('div.contentSection#' + cateTitle[i]).node().getBoundingClientRect().height/2;
				}else{
					secHeight = d3.select('div.contentSection#' + cateTitle[0]).node().getBoundingClientRect().height +  d3.select('div.contentSection#' + cateTitle[i*2]).node().getBoundingClientRect().height/2;
				}
				return secHeight-titleHeight + 'px';
			})
			.append("p")
			.attr("class", "arrowText")
			.text(function(d){ return d;});

	};
	
	function clearEmpty(data){
		for (var i in data){
			if(data[i].key === ""){
				data.splice(i, 1);
			}
		} // clear useless data group
		return data;
	}

	return render;
});