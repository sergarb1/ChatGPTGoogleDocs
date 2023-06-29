// FIXED VARIABLES. Your API and Model Type
var apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var model = "gpt-3.5-turbo"
// ****END VARIABLES****

// START: DROP DOWN MENU
function onOpen() {
  DocumentApp.getUi().createMenu("ChatGPT")
    .addItem("Generar apuntes", "generarApuntes")
    .addItem("Re-escribir apuntes", "reescribirApuntes")
    .addItem("Generar imagen", "generarImagen")
    .addToUi();
}
// END: DROP DOWN MENU


// START: MODIFICAR SELECCION POR TEXTO RECIBIDO

function reemplazarTextoSeleccionado(textoNuevo) {
  // Obtnego el documento
  var documento = DocumentApp.getActiveDocument();
  // Obtengo la seleccion
  var seleccion = documento.getSelection();
  // Centinela para evitar repetidos si hay varios elementos
  var encontrado = false;
  // Si hay una seleccion
  if (seleccion) {
    var elementos = seleccion.getRangeElements();

    for (var i = 0; i < elementos.length; i++) {
      var elemento = elementos[i];
      var tipo = elemento.getElement().getType();

      //Para depurar DocumentApp.getUi().alert(tipo);

      // Segun el tipo de seleccion, hago una cosa u otra (son problemas de Google App Scripts)
      if (tipo === DocumentApp.ElementType.TEXT) {
        var texto = elemento.getElement().asText();
        var inicio = elemento.getStartOffset();
        var fin = elemento.getEndOffsetInclusive();
        // Borramos texto
        texto.deleteText(inicio, fin);
        // Si es el primero, solo en ese caso, añadimos
        if (!encontrado) {
          texto.insertText(0, textoNuevo);
          encontrado = true;
        }
      } else if (tipo === DocumentApp.ElementType.PARAGRAPH) {
        var parrafo = elemento.getElement().asParagraph();
        // Si no esta encontrado el elemento a sustituir, lo cambiamos
        if (!encontrado) {
          var texto = parrafo.editAsText();
          texto.setText(textoNuevo);
          return;
        }
      }
    }
  }
}
// END: MODIFICAR SELECCION POR TEXTO RECIBIDO***


// START: GENERAR APUNTES

function generarApuntes() {
  // Obtengo el documento
  var doc = DocumentApp.getActiveDocument()
  // Obtengo la seleccion
  var seleccion = doc.getSelection();
  // Si no hay seleccion, mostramos error y paramos
  if (!seleccion) {
    DocumentApp.getUi().alert("Error: No se ha seleccionado ningún texto.");
    return;
  }

  // Obtenemos el texto de la seleccion
  elements = seleccion.getRangeElements().length;
  var selectedText = ""
  // Recorremos la seleccion para leer todos los parrafos
  for (i = 0; i < elements; i++) {
    selectedText += seleccion.getRangeElements()[i].getElement().asText().getText() + "\n";
  }
  // Con el texto seleccionado, fabricamos los mensajes
  var messages = [
    {
      "role": "system",
      "content": "Actua como un profesor experto en informatica. Intenta ser claro y utilizar un vocabulario apropiado para estudiantes de ciclos formativos de informática"
    },
    {
      "role": "user",
      "content": "Explica el siguiente concepto " + selectedText
    }
  ];
  // Parametros a ajustar para Chat GPT
  temperature = 0
  maxTokens = 300
  // Preparamos la peticion
  const requestBody = {
    "model": model,
    "messages": messages,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  var resultado = JSON.parse(response.getContentText());
  var respuesta = resultado.choices[0].message.content;

  reemplazarTextoSeleccionado(respuesta);
  //DocumentApp.getUi().alert(response.getContentText());

}
// END: GENERAR APUNTES

// START: REESCRIBIR TEXTO

function reescribirApuntes() {
  // Obtengo el documento
  var doc = DocumentApp.getActiveDocument()
  // Obtengo la seleccion
  var seleccion = doc.getSelection();
  // Si no hay seleccion, mostramos error y paramos
  if (!seleccion) {
    DocumentApp.getUi().alert("Error: No se ha seleccionado ningún texto.");
    return;
  }
  // Obtenemos el texto de la seleccion
  elements = seleccion.getRangeElements().length;
  var selectedText = ""
  // Recorremos la seleccion para leer todos los parrafos
  for (i = 0; i < elements; i++) {
    selectedText += seleccion.getRangeElements()[i].getElement().asText().getText() + "\n";
  }

  //DocumentApp.getUi().alert(selectedText);
  // Con el texto seleccionado, fabricamos los mensajes
  var messages = [
    {
      "role": "system",
      "content": "Actua como un profesor experto en informatica. Intenta ser claro y utilizar un vocabulario apropiado para estudiantes de ciclos formativos de informática"
    },
    {
      "role": "user",
      "content": " Re-escribe el siguiente texto con un estilo adecuado para alumnado de ciclos formativos, como si fuera para un libro de texto: " + selectedText
    }
  ];
  // Parametros a ajustar para Chat GPT
  temperature = 0
  maxTokens = 1000
  // Preparamos la peticion
  const requestBody = {
    "model": model,
    "messages": messages,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  var resultado = JSON.parse(response.getContentText());
  var respuesta = resultado.choices[0].message.content;

  reemplazarTextoSeleccionado(respuesta);
  // DocumentApp.getUi().alert(response.getContentText());

}
// END: REESCRIBIR TEXTO



//  START: GENERAR IMAGEN - TAMNYO PUEDE SER 256x256', '512x512', '1024x1024
function generarImagen() {
  // Obtenemos documento
  var doc = DocumentApp.getActiveDocument()
  // Obtengo la seleccion
  var seleccion = doc.getSelection();
  // Si no hay seleccion, mostramos error y paramos
  if (!seleccion) {
    DocumentApp.getUi().alert("Error: No se ha seleccionado ningún texto.");
    return;
  }
  // Obtenemos el texto de la seleccion
  var selectedText = seleccion.getRangeElements()[0].getElement().asText().getText()
  var body = doc.getBody()
  temperature = 0
  maxTokens = 2000
  // Generamos prompt
  var prompt2 = "Genera imagenes para el siguiente texto: " + selectedText;
  const requestBody2 = {
    "prompt": prompt2,
    "n": 1,
    "size": "256x256"
  };
  // Preparamos la peticion
  const requestOptions2 = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(requestBody2)
  }
  const response2 = UrlFetchApp.fetch("https://api.openai.com/v1/images/generations", requestOptions2);
  var responseText = response2.getContentText();
  var json = JSON.parse(responseText);
  var url1 = json['data'][0]['url']

  // Anyadimos la imagen al final del documento
  body.appendImage(UrlFetchApp.fetch(url1).getBlob());
  DocumentApp.getUi().alert("Imagen añadida al final del documento.");
}
// END: GENERAR IMAGEN