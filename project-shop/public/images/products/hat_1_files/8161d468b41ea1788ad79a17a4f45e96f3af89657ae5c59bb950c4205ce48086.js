window.optimizely.push({type:"load",data:{changes:[{"dependencies": [], "type": "custom_code", "id": "CA448364-B89B-4F71-842A-AD9204A44C1E", "value": function($){var utils = optimizely.get('utils');
utils.waitForElement('#delivery-and-returns-portal').then(function() {
	document.querySelector("[data-testid='deliveryAndReturns__freeDelivery']").remove();
});
}}]}});