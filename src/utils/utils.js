//Функция отображения ожидания загрузки(типа спиннер)

function renderLoading(submitButton, loading) {
  const text = "Сохранить";
  const loadingText = "Сохранение...";
  submitButton.innerText = loading ? loadingText : text;
}

export default renderLoading ;
