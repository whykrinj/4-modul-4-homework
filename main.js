const languages = [
    "ab", "ace", "ach", "af", "ak", "alz", "am", "ar", "as", "awa", "ay", "az", "ba", "ban", "bbc", "be", "bem", "bew", "bg", 
    "bho", "bik", "bm", "bn", "br", "bs", "bts", "btx", "bua", "ca", "ceb", "cgg", "chm", "ckb", "cnh", "co", "crh", "crs", 
    "cs", "cv", "cy", "da", "de", "din", "doi", "dov", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", 
    "fi", "fj", "fr", "fy", "ga", "gaa", "gd", "gl", "gn", "gom", "gu", "ha", "haw", "he", "hi", "hil", "hmn", "hr", "hrx", 
    "ht", "hu", "hy", "id", "ig", "ilo", "is", "it", "iw", "ja", "jv", "jw", "ka", "kk", "km", "kn", "ko", "kri", "ktu", 
    "ku", "ky", "la", "lb", "lg", "li", "lij", "lmo", "ln", "lo", "lt", "ltg", "luo", "lus", "lv", "mai", "mak", "mg", "mi", 
    "min", "mk", "ml", "mn", "mni-Mtei", "mr", "ms", "ms-Arab", "mt", "my", "ne", "new", "nl", "no", "nr", "nso", "nus", 
    "ny", "oc", "om", "or", "pa", "pa-Arab", "pag", "pam", "pap", "pl", "ps", "pt", "qu", "rn", "ro", "rom", "ru", "rw", 
    "sa", "scn", "sd", "sg", "shn", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw", "szl", 
    "ta", "te", "tet", "tg", "th", "ti", "tk", "tl", "tn", "tr", "ts", "tt", "ug", "uk", "ur", "uz", "vi", "xh", "yi", 
    "yo", "yua", "yue", "zh", "zh-CN", "zh-TW", "zu"
];

function populateLanguageSelect(selectElement) {
    languages.forEach(language => {
        const option = document.createElement("option");
        option.value = language;
        option.textContent = language.toUpperCase();
        selectElement.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sourceLanguageSelect = document.getElementById("source-language");
    const targetLanguageSelect = document.getElementById("target-language");

    populateLanguageSelect(sourceLanguageSelect);
    populateLanguageSelect(targetLanguageSelect);

    sourceLanguageSelect.value = "en"; 
    targetLanguageSelect.value = "ru"; 
});

document.getElementById("translate-button").addEventListener("click", async () => {
    const sourceLang = document.getElementById("source-language").value;
    const targetLang = document.getElementById("target-language").value;
    const textToTranslate = document.getElementById("text-to-translate").value;
    const translatedText = document.getElementById("translated-text");

    if (!textToTranslate) {
        translatedText.value = "Please enter text to translate.";
        return;
    }

    const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
    const options = {
        method: "POST",
        headers: {
            "x-rapidapi-key": "cba450843cmshb97e7edd7b7d6c3p1eaa61jsnd49b12a13c64",
            "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            q: textToTranslate,
            source: sourceLang,
            target: targetLang
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data?.data?.translations?.[0]?.translatedText) {
            translatedText.value = data.data.translations[0].translatedText;
            document.getElementById("speak-translated").disabled = false; 
        } else {
            translatedText.value = "Translation failed. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        translatedText.value = "An error occurred. Please check your API key or input.";
    }
});

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

document.getElementById("speak-source").addEventListener("click", () => {
    const text = document.getElementById("text-to-translate").value;
    if (text) speakText(text);
});

document.getElementById("speak-translated").addEventListener("click", () => {
    const text = document.getElementById("translated-text").value;
    if (text) speakText(text);
});
