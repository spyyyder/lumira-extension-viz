define("sap_vix_ext_pipelinebubbledata-src/js/flow", ["sap_vix_ext_pipelinebubbledata-src/js/module"], function(moduleFunc) {
	var flowRegisterFunc = function() {
		var flow = sap.viz.extapi.Flow.createFlow({
			id: "sap.vix.ext.pipelinebubbledata",
			name: "PipelineBubble_Data",
			dataModel: "sap.viz.api.data.CrosstableDataset",
			type: "BorderSVGFlow"
		});

		var element = sap.viz.extapi.Flow.createElement({
			id: "sap.vix.ext.pipelinebubbledata.PlotModule",
			name: "PipelineBubble_Data Module"
		});
		element.implement("sap.viz.elements.common.BaseGraphic", moduleFunc);

		/*Feeds Definition*/
		var ds1 = {
			"id": "sap.vix.ext.pipelinebubbledata.PlotModule.DS1",
			"name": "Stage, Bubble Color & Tooltip",
			"type": "Dimension",
			"min": 0, //minimum number of data container
			"max": 2, //maximum number of data container
			"aaIndex": 1
		};
		element.addFeed(ds1);

		var ms1 = {
			"id": "sap.vix.ext.pipelinebubbledata.PlotModule.MS1",
			"name": "Bubble Height",
			"type": "Measure",
			"min": 0, //minimum number of measures
			"max":  2, //maximum number of measures
			"mgIndex": 1
		};
		element.addFeed(ms1);
		
		var ms2 = {
			"id": "sap.vix.ext.pipelinebubbledata.PlotModule.MS2",
			"name": "Bubble Size",
			"type": "Measure",
			"min": 0, //minimum number of measures
			"max":  2, //maximum number of measures
			"mgIndex": 2
		};
		element.addFeed(ms2);

		element.addProperty({
			name: "colorPalette",
			type: "StringArray",
			supportedValues: "",
			defaultValue: d3.scale.category20().range().concat(d3.scale.category20b().range()).concat(d3.scale.category20c().range())
		});

		flow.addElement({
			"element": element,
			"propertyCategory": "plotArea"
		});
		sap.viz.extapi.Flow.registerFlow(flow);
	};
	flowRegisterFunc.id = "sap.vix.ext.pipelinebubbledata";
	return {
		id: flowRegisterFunc.id,
		init: flowRegisterFunc
	};
});