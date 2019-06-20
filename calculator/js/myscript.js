$(document).ready(function(){
	
	$("#btnCalculate").click(function(){
		// Input
		var iProcessName = $("#txtProcessName").val();
		var iFte = $("#txtFte").val();
		var iRuleBased = $("#txtRuleBased").val();
		var iStandardInput = $("input[name='optStandardInput']:checked").attr("value");
		var iFreeText = $("input[name='optFreeText']:checked").attr("value");
		var iType = $( "#selType option:selected" ).attr("value");
		var iProcessChange = $("input[name='optProcessChange']:checked").attr("value");
		var iExceptions = $("#txtExceptions").val();
		
		// Constants
		var ruleBasedProcess = $("#txtConsRuleBasedProcess").val();
		var standardInput = $("#txtConsStandardInput").val();
		var freeText = $("#txtConsFreeText").val();
		var type = $("#txtConsType").val();
		var siYes = 0.7;
		var siNo = 0.3;
		var ftYes = 0.5;
		var ftNo = 1;
		var tManualRepetitive = 0.7;
		var tSemiManualRepetitive = 0.7;
		var tAutomated = 0.7;
		var tManualNotRepetitive = 0;
		
		// Output
		var oRuleBased = iFte * ((ruleBasedProcess/100) * (iRuleBased/100));
		//alert(oRuleBased);
		var oStandardInput = iFte * (standardInput/100) * ((iStandardInput == "Yes")? siYes : siNo);
		//alert(oStandardInput);
		var oFreeText = iFte * (freeText/100) * ((iFreeText == "Yes")? ftYes : ftNo);
		//alert(oFreeText);
		var oType = iFte * (type/100) * ((iType == "Manual and Repetitive")?tManualRepetitive:((iType == "Semi Manual and Repetitive")?tSemiManualRepetitive:((iType == "Automated")?tAutomated:tManualNotRepetitive)));
		//alert(oType);
				
		var oFteBenefits;
		var oAutomationPer;
		
		// Calculation Logic
		if(iType == "Manual But Not Repetitive"){
			oFteBenefits = "Non Automatable";
			oAutomationPer = "Not Applicable"; 
		}
		else{
			if(iProcessChange == "No"){
				var sum = oRuleBased + oStandardInput + oFreeText + oType;
				
				oFteBenefits = Math.round((sum - (iFte * (iExceptions/100))) * 10)/10;
			}
			else{
				oFteBenefits = "Not Feasible for Automation";
				oAutomationPer = "Not Applicable"; 
			}
		}
		
		if(oFteBenefits != "Not Feasible for Automation"){
			if(iFte == 0){
				oAutomationPer = "Not Applicable";
			}
			else{
				oAutomationPer = Math.round((oFteBenefits * 100)/iFte);
			}
		}			

		$("#lblFteBenefits").html(oFteBenefits);
		// $("#lblAutomationPer").html(oAutomationPer);
	});
	
	$("#btnReset").click(function(){
		$("#lblFteBenefits").html("NA");
		// $("#lblAutomationPer").html("NA");
	});
		
	$("#btnEdit").click(function(){
		if($(this).find(".glyphicon").hasClass("glyphicon-pencil")){
			$(this).find(".glyphicon").removeClass("glyphicon-pencil").addClass("glyphicon-save");
				$("#txtConsRuleBasedProcess").attr("disabled", false);
				$("#txtConsStandardInput").attr("disabled", false);
				$("#txtConsFreeText").attr("disabled", false);
				$("#txtConsType").attr("disabled", false);
		}
		else{
			$(this).find(".glyphicon").removeClass("glyphicon-save").addClass("glyphicon-pencil");
			$("#txtConsRuleBasedProcess").attr("disabled", true);
			$("#txtConsStandardInput").attr("disabled", true);
			$("#txtConsFreeText").attr("disabled", true);
			$("#txtConsType").attr("disabled", true);
		}
	});
});
