 
// DROP DOWN MENU
function onOpen() {
 DocumentApp.getUi().createMenu("ChatGPT")
 .addItem("Generar apuntes", "generarApuntes")
 .addItem("Re-escribir apuntes", "reescribirApuntes")
 .addItem("Generar imagen", "generarImagen")
  .addToUi();
}
// ****END MENU****
 
// FIXED VARIABLES. Your API and Model Type
var apiKey = "xxxxxxxxxxxxx";
var model = "text-davinci-003"
// ****END VARIABLES****
 
// GENERATE PROMPT
function generarApuntes() {
var doc = DocumentApp.getActiveDocument()
var selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
var body = doc.getBody()
var prompt = "Actua como un profesor experto en informatica. Genera unos apuntes para alumnado universitario a partir de la siguiente idea: " + selectedText;
temperature= 0
maxTokens = 2060
  const requestBody = {
    "model": model,
    "prompt": prompt,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestOptions);
var responseText = response.getContentText();
var json = JSON.parse(responseText);
Logger.log(json['choices'][0]['text'])
para = body.appendParagraph(json['choices'][0]['text'])
}
// ****END PROMPT****

 // GENERATE PROMPT
function reescribirApuntes() {
var doc = DocumentApp.getActiveDocument()
var selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
var body = doc.getBody()
var prompt = "Actua como un profesor experto en informática. Re-escribe el siguiente texto para estudiantes universitarios de 20 años: " + selectedText;
temperature= 0
maxTokens = 2060
  const requestBody = {
    "model": model,
    "prompt": prompt,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestOptions);
var responseText = response.getContentText();
var json = JSON.parse(responseText);
Logger.log(json['choices'][0]['text'])
para = body.appendParagraph(json['choices'][0]['text'])
}
// ****END PROMPT****
 
 
 
// GENERATE IMAGE - SIZE CAN BE 256x256', '512x512', '1024x1024
function generarImagen() {
var doc = DocumentApp.getActiveDocument()
 var selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
 var body = doc.getBody()
 temperature= 0
 maxTokens = 2000
var prompt2 = "Generate images for " + selectedText;
   const requestBody2 = {
     "prompt": prompt2,
     "n": 1,
     "size": "512x512"
   };
   const requestOptions2 = {
     "method": "POST",
     "headers": {
       "Content-Type": "application/json",
       "Authorization": "Bearer "+apiKey
     },
     "payload": JSON.stringify(requestBody2)
   }
 const response2 = UrlFetchApp.fetch("https://api.openai.com/v1/images/generations", requestOptions2);
 var responseText = response2.getContentText();
 var json = JSON.parse(responseText);
 var url1=json['data'][0]['url']
 body.appendImage(UrlFetchApp.fetch(url1).getBlob());
}
// ****END IMAGE****