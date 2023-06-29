# ChatGPTGoogleDocs
Herramienta para facilitar el uso de ChatGPT mediante la API de Open AI en Google Docs.
La API de OpenAI es de pago (dan unos dolares al comenzar)

Esta aplicación Utiliza "Google App Scripts" y esta inspirada en https://medium.com/illumination/use-chatgpt-in-google-docs-a-step-by-step-guide-to-integrating-gpt-3-with-google-docs-1caed5106473 

El programa ha sido mejorar y adaptado a los modelos de Chat GPT

Para usarla debes:

1) Acceder a tu documento Google Docs
2) Acceder a "Extensions" y ahí a "App Scripts"
3) Copia y pega el codigo de este repositorio (esta en el fichero chatgptdocs.gs)
4) Introduce tu API Key en lugar donde pone XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
5) Selecciona un texto

Problemas conocidos:
1) La selección a veces falla y coge el parrafo completo de la seleccion (en lugar de solo la seleccion)
2) El texto generado como respuesta a ChatGPT, aunque se visualice como varios parrafos, internamente Google Docs los toma como un unico parrafo. Si necesitas que sean varios parrafos, deberas separarlos a mano (por ejemplo, usando "Intros")



