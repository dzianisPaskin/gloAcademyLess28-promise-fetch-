//функция фильтрации по типу, type = typeInput.value, ...values = dataInput.value
const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  //функция скрытия блоков
  hideAllResponseBlocks = () => {
		//получаем массив всех блоков dialog__response-block
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
		//скрываем все блоки
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },

	//функция показывает блок ответа
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//скрываем все блоки
    hideAllResponseBlocks();
		//показываем blockSelector
    document.querySelector(blockSelector).style.display = "block";
		//если передан spanSelector
    if (spanSelector) {
			//добавляем в span с селектором spanSelector текст msgText
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  //вывод сообщения об ошибке, msgText = catch(e)
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  //вывод типа данных, msgText = alertMsg
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  //выоводим "Пока что нечего показать."
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  //type = typeInput.value; values = dataInput.value
  tryFilterByType = (type, values) => {
    try {
      //получаем результат вызова функции filterByType и преобразуем в строку
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");

      const alertMsg = valuesArray.length
        ? //если type данных есть в values
          `Данные с типом ${type}: ${valuesArray}`
        : //иначе выводим
          `Отсутствуют данные типа ${type}`;
      //запускаем функцию
      showResults(alertMsg);
      //если в values нет type number string boolean
    } catch (e) {
      //выводим результат вызова функции
      showError(`Ошибка: ${e}`);
    }
  };
//получаем button
const filterButton = document.querySelector("#filter-btn");

//навешиваем обработчик события click на кнопку
filterButton.addEventListener("click", (e) => {
  //получаем select
  const typeInput = document.querySelector("#type");
  //получаем input
  const dataInput = document.querySelector("#data");

  //если данные в input не введены
  if (dataInput.value === "") {
    //выводим пользовательское сообщение
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //запускаем функцию
    showNoResults();
    //иначе
  } else {
    //если ошибок нет, устанавливаем сообщение в виде пустой строки. Пока сообщение об ошибке не пустое, форма не пройдет проверку и не будет отправлена.
    dataInput.setCustomValidity("");
    //отменяем действие submit по умолчанию
    e.preventDefault();
    //запускаем функцию
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
