

 document.addEventListener("wheel", function (event) {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  })

  document.addEventListener("keydown", function (event) {
    if (document.activeElement.type === "number") {
      var invalidChars = ["-", "+", "e","E"];
      if (invalidChars.includes(event.key) || event.keyCode === 38 || event.keyCode === 40 ) {
        event.preventDefault();
      }
    }
  })

  document.addEventListener('paste', function (event) {

if(document.activeElement.type === "number"){

  var clipboardData = event.clipboardData || window.clipboardData;
  var pastedText = clipboardData.getData('Text');
  var containsOnlyDigitsAndDot = /^[0-9.]*$/.test(pastedText);
  if (!containsOnlyDigitsAndDot) {
    alert("Only positive numbers and decimal numbers are allowed to paste")
    event.preventDefault(); // Prevent the default paste action  
  }
    }
  })

 if (document.documentElement) {
    var defaultThemeMode = "dark";
    var hasKTName = document.body.hasAttribute("data-kt-name");
    var lsKey = "kt_" + (hasKTName ? name + "_" : "") + "theme_mode_value"
    var themeMode = sessionStorage.getItem(lsKey);
    if (!themeMode) {
      if (defaultThemeMode === "system") {
        themeMode =
          window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } else {
        themeMode = defaultThemeMode;
      }
    }

    document.documentElement.setAttribute("data-theme", themeMode);    

  }



window.addEventListener('online',()=>console.log('Online'));
window.addEventListener('offline',()=>console.log('Offline'));
