$(document).ready(function(){
	$("#btnCalculateComplexity").click(function(){
		// Input
		var iProcessName = $("#txtProcessName").val();
		var iStructuredInput = $("input[name='optStandardInput']:checked").attr("value");
		var iFreeText = $("#txtFreeText").val()/100;
		var iApplicationType = $("#selAppType option:selected" ).attr("value");
		var iNoOfScreens = $("#selNoScreens option:selected" ).attr("value");
		var iVDICitrix = $("input[name='optVDIScreen']:checked").attr("value");
		
		// Constants
		var freeText = $("#txtConsFreeText").val()/100;
		var standardInput = $("#txtConsStructuredInput").val()/100;
		var inputApplicaions = $("#txtConsInputApps").val()/100;
		var noOfScreens = $("#txtConsNoOfScreens").val()/100;
		
		var siYes = 0.2;
		var siNo = 0.8;
		
		var iaMoreThanOne = 1;
		var iaWindows = 0.25;
		var iaWeb = 0.3;
		var iaMainframesTerminals = 0.75;
		var iaSAP = 0.5;
		var iaNonWindows = 0.75;
		
		var nsRangeOne = 0.1;
		var nsRangeTwo = 0.4;
		var nsRangeThree = 0.75;
		var nsRangeFour = 1.0;
		
		// Output
		var oStructuredInput;
		if(iStructuredInput == "Yes")
			oStructuredInput = siYes * standardInput;
		else
			oStructuredInput = siNo * standardInput;
		
		var oFreeText = iFreeText * freeText; 
		
		var oInputApplications;
		if(iApplicationType == "More than One Input"){
			oInputApplications = iaMoreThanOne * inputApplicaions;
		}
		else if (iApplicationType == "Windows Applications"){
			oInputApplications = iaWindows * inputApplicaions;
		}
		else if (iApplicationType == "Web Applications"){
			oInputApplications = iaWeb * inputApplicaions;
		}
		else if (iApplicationType == "Mainframes/Terminals"){
			oInputApplications = iaMainframesTerminals * inputApplicaions;
		}
		else if (iApplicationType == "SAP"){
			oInputApplications = iaSAP * inputApplicaions;
		}
		else
			oInputApplications = iaNonWindows * inputApplicaions;
		
		var oNoOfScreens;
		if(iNoOfScreens == "0-10"){
			oNoOfScreens = nsRangeOne * noOfScreens;
		}
		else if(iNoOfScreens == "11-20"){
			oNoOfScreens = nsRangeTwo * noOfScreens;
		}
		else if(iNoOfScreens == "21-30"){
			oNoOfScreens = nsRangeThree * noOfScreens;
		}
		else{
			oNoOfScreens = nsRangeFour * noOfScreens;
		}
		
		var oResult = oStructuredInput + oFreeText + oInputApplications + oNoOfScreens;
				
		var oComplexityPer;
		var oComplexityLevel;
		
		// Calculation Logic
		oComplexityPer = Math.round(oResult * 100);
		if(iVDICitrix == "Yes"){
			oComplexityPer = Math.round(oResult * 1.3 * 100);
		}
		
		oComplexityLevel = "NA";
		if(oComplexityPer > 60){
			oComplexityLevel = "High";
		}
		else if (oComplexityPer > 30){
			oComplexityLevel = "Medium";
		}
		else
			oComplexityLevel = "Low";
		
		// $("#lblComplexityPer").html(oComplexityPer);
		$("#lblComplexityLevel").html(oComplexityLevel);
	});
	
	$("#btnReset").click(function(){
		$("#lblComplexityPer").html("NA");
		// $("#lblComplexityLevel").html("NA");
	});	

	$("#btnEdit").click(function(){
		if($(this).find(".glyphicon").hasClass("glyphicon-pencil")){
			$(this).find(".glyphicon").removeClass("glyphicon-pencil").addClass("glyphicon-save");
				$("#txtConsFreeText").attr("disabled", false);
				$("#txtConsStructuredInput").attr("disabled", false);
				$("#txtConsInputApps").attr("disabled", false);
				$("#txtConsNoOfScreens").attr("disabled", false);
		}
		else{
			$(this).find(".glyphicon").removeClass("glyphicon-save").addClass("glyphicon-pencil");
			$("#txtConsFreeText").attr("disabled", true);
			$("#txtConsStructuredInput").attr("disabled", true);
			$("#txtConsInputApps").attr("disabled", true);
			$("#txtConsNoOfScreens").attr("disabled", true);
		}
	});
});
