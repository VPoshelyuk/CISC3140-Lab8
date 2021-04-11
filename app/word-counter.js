//declare HTML elements as JS variables
const input = document.getElementById('input');
const words = document.getElementById('words');
const characters = document.getElementById('characters');
const charactersNoSpaces = document.getElementById('characters-no-spaces');
const exportBox = document.getElementById('export-button');
//on input into textarea eleement
input.addEventListener('input', function() {
    words.innerText = `${input.value.match(/\S+/g)?.length || 0} words`;//show words count obtained using regex
    characters.innerText = `${input.value.split('\n').join('').length} characters`;//show characters count obtained using regex
    let charCount = input.value.split(/\s+/).join('').length;//save sanititzed characters number into a variable
    charactersNoSpaces.innerText = `${charCount} characters(excluding spaces)`;//show sanitized characters count
    if(charCount > 0) {//if no characters are inputted, don't show export button
        exportBox.style.display = "block";
    } else {
        exportBox.style.display = "none";
    }
}, false);
//on click on the export button
exportBox.addEventListener('click', function() {
    let sanitizedInput = input.value.replace(/\n/g, "\r\n");//sanitize input to keep linebreaks in .txt file
    sanitizedInput = `${sanitizedInput}
        \n\n\nStats:
        --->   ${words.innerText}
        --->   ${characters.innerText}
        --->   ${charactersNoSpaces.innerText}
    `//add stats at the end of the text
    let blob = new Blob([sanitizedInput], { type: "text/plain"});//create txt blob
    //create an anchor and assign all the required properties to export textarea text
    let anchor = document.createElement("a");
    anchor.download = "your-text.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none";
    //add anchor to HTML, programmatically click it and remove when done
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}, false);