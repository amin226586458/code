/* ==========================================
   SHEEP BACKGROUND
========================================== */

const sheepBackground =
    document.getElementById("sheepBackground");

const sheepCount = 22;

for (let i = 0; i < sheepCount; i++) {

    const sheep =
        document.createElement("div");

    sheep.className = "sheep";

    sheep.textContent = "🐑";

    sheep.style.top =
        Math.random() * 100 + "%";

    sheep.style.left =
        (-10 - Math.random() * 30) + "%";

    sheep.style.fontSize =
        (20 + Math.random() * 32) + "px";

    sheep.style.opacity =
        0.05 + Math.random() * 0.12;

    const duration =
        18 + Math.random() * 28;

    const delay =
        Math.random() * -40;

    sheep.animate(
        [
            {
                transform:
                    "translateX(0) translateY(0) rotate(0deg)"
            },

            {
                transform:
                    "translateX(30vw) translateY(-25px) rotate(3deg)"
            },

            {
                transform:
                    "translateX(60vw) translateY(20px) rotate(-3deg)"
            },

            {
                transform:
                    "translateX(100vw) translateY(0) rotate(2deg)"
            }
        ],
        {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: "linear"
        }
    );

    sheepBackground.appendChild(sheep);
}


/* ==========================================
   DISPLAY RAW CODES
========================================== */

function displayCode(codeId) {

    const source =
        document.getElementById(codeId);

    const display =
        document.getElementById("display-" + codeId);

    if (!source || !display) {
        return;
    }

    /*
        textContent مهم جدًا هنا.
        نحن لا نستخدم innerHTML.
        لذلك أي HTML داخل الكود سيبقى نصًا فقط.
    */

    display.textContent =
        source.value.trim();
}


/* ==========================================
   LOAD ALL CODES
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    displayCode("code1");
    displayCode("code2");
    displayCode("code3");

});


/* ==========================================
   COPY CODE
========================================== */

async function copyCode(codeId, button) {

    const source =
        document.getElementById(codeId);

    if (!source) {
        return;
    }

    const text =
        source.value.trim();

    try {

        await navigator.clipboard.writeText(text);

        showCopied(button);

    } catch (error) {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        try {
            document.execCommand("copy");
        } catch (copyError) {
            console.error(copyError);
        }

        textarea.remove();

        showCopied(button);
    }
}


/* ==========================================
   COPIED STATE
========================================== */

function showCopied(button) {

    const originalText =
        button.innerText;

    button.innerText =
        "تم النسخ ✓";

    button.classList.add("copied");

    showToast("تم نسخ الكود");

    setTimeout(() => {

        button.innerText =
            originalText;

        button.classList.remove("copied");

    }, 1800);
}


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.innerText =
        message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 1800);
}
