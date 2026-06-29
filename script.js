const surveyForm = document.getElementById('survey-form');

function collectFormData(form) {
	return {
		idvprasanje1: form.elements.idvprasanje1.value.trim(),
		idvprasanje2: form.elements.idvprasanje2.value.trim(),
		idvprasanje3: form.elements.idvprasanje3.value,
		idvprasanje4: form.elements.idvprasanje4.value,
		idvprasanje5: form.elements.idvprasanje5.value.trim(),
		idvprasanje6: form.elements.idvprasanje6.value,
	};
}

if (surveyForm) {
	surveyForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const responseData = collectFormData(surveyForm);
		window.formResponseData = responseData;
		console.log('Form response data:', responseData);
	});
}
