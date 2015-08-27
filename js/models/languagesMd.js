var Backbone = require('backbone');

/* use BCP 47 language tags as the key for each language http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry */

module.exports = Backbone.Model.extend({
  defaults: {
    languages: [
      {
        langName: "English",
        langCode: "en",
        /* Use capitalized keys for widely reused text that must be capitalized */
        Next: "Next",
        Back: "Back",
        Skip: "Skip",
        Done: "Done",
        Cancel: "Cancel",
        Items: "Items",
        Stores: "Stores",
        Follow: "Follow",
        About: "About",
        Followers: "Followers",
        Following: "Following",
        Store: "Store",
        Edit: "Edit",
        Delete: "Delete",
        Website: "Website",
        Email: "Email",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Snapchat: "Snapchat",
        nav: {
          searchPlaceholder: "Enter a handle or a keyword",
          myPage: "My Page",
          customizePage:"Customize Page",
          sellItem:"Sell Item",
          purchases:"Purchases",
          sales:"Sales",
          cases:"Cases",
          notifications:"Notifications",
          settings:"Settings",
          about:"About OpenBazaar",
          support:"Support OpenBazaar"
        },
        onboarding: {
          intro: "OpenBazaar is an open source project created by hundreds of people with the primary goal of giving the world free trade",
          chooseLanguage: "Choose Your Language",
          contributors: "%{smart_count} Contributor |||| %{smart_count} Contributors",
          configure: "Configure Your Experience",
          disclaimer_title: "Disclaimer",
          disclaimer_body: "disclaimer text",
          yourCountry: "Your Country",
          localCurrency: "Local Currency",
          timeZone: "Time Zone",
          handle: "Handle",
          knownAs: "You're currently known as:",
          wouldYou: "Would you like to register an easy to remember handle?",
          registerNew: "Register New",
          connectExisting: "Connect Existing",
          avatar: "Avatar",
          chooseAvatar: "Choose Avatar"
        }
      },
      {
        langName: "Spanish",
        langCode: "sp",
        /* this is just for reference. It was created by Google translate, and is probably very inaccurate. */
        Next: "en Siguiente",
        Back: "Atr�s",
        Skip: "Omitir",
        Done: "Hecho",
        Cancel: "Cancelar",
        Items: "Art�culos",
        Stores: "Tiendas",
        Follow: "Seguir",
        About: "Acerca de",
        Followers: "Seguidores",
        Following: "Despu�s",
        Store: "Tienda",
        Edit: "Editar",
        Delete: "Borrar",
        Website: "Sitio Web",
        Email: "Correo electr�nico",
        Facebook: "Facebook",
        Instagram: "Instagram",
        Snapchat: "Snapchat",
        nav: {
          searchPlaceholder: "Introduzca un mango o una palabra clave",
          myPage: "Mi p�gina",
          customizePage:"Personalizar P�gina",
          sellItem:"Venta de art�culos",
          purchases:"Las compras",
          sales:"Ventas",
          cases:"Casos",
          notifications:"Notificaciones",
          settings:"Ajustes",
          about:"Acerca OpenBazaar",
          support:"Soporte OpenBazaar"
        },
        onboarding: {
          intro: "OpenBazaar es un proyecto de c�digo abierto creado por cientos de personas con el objetivo principal de dar la libre comercio mundial",
          chooseLanguage: "Elige tu idioma",
          contributors: "%{smart_count} Colaboradores |||| %{smart_count} Colaboradores",
          configure: "Configure su Experiencia",
          disclaimer_title: "Nota Legal",
          disclaimer_body: "disclaimer text",
          yourCountry: "Tu pa�s",
          localCurrency: "Moneda Local",
          timeZone: "Zona Horaria",
          handle: "Apodo",
          knownAs: "Est�s conocido como:",
          wouldYou: "�Quieres registrar una f�cil de recordar manejar?",
          registerNew: "Registrar Nuevo",
          connectExisting: "Conecte Existente",
          avatar: "Avatar",
          chooseAvatar: "Elija Avatar"
        }
      }
    ]
  }
});