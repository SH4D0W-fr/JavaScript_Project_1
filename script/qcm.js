(() => { // On créé une fonction anonyme (IIFE) pour éviter de polluer l'espace global
    const answers = {
        1: "C",
        2: "B",
        3: "B",
        4: "B",
        5: "C",
        6: "B",
        7: "B",
        8: "B",
        9: "B",
        10: "C",
        11: "B",
        12: "D",
        13: "C",
        14: "B",
        15: "B",
        16: "B",
        17: "C",
        18: "B",
        19: "C",
        20: "C"
    }; // On définit les réponses correctes pour chaque question du QCM

    const totalQuestions = Object.keys(answers).length;
    let quizForm;
    let scoreOutput;
    let correctionsOutput;

    const init = () => {
        quizForm = document.forms["qcm-form"];
        scoreOutput = document.getElementById("score-output");
        correctionsOutput = document.getElementById("corrections-output");

        if (!quizForm || !scoreOutput || !correctionsOutput) {
            console.error("Impossible d'initialiser le QCM : éléments manquants.");
            return;
        }

        quizForm.addEventListener("change", handleAnswerChange);
        document.getElementById("corrections-btn")?.addEventListener("click", showCorrections); // On ajoute un listener pour le bouton "Corriger"
    };

    const handleAnswerChange = (event) => {
        if (!event.target.matches("input[type=radio]")) {
            return;
        }
        clearOptionStyles(event.target.name);
        scoreOutput.textContent = "Clique sur « Corriger » pour afficher ta note."; // On invite à cliquer sur "Corriger" pour voir sa note
        correctionsOutput.innerHTML = "";
    };

    const showCorrections = () => {
        if (!quizForm || !correctionsOutput || !scoreOutput) {
            return;
        }

        let score = 0;
        Object.entries(answers).forEach(([question, expected]) => {
            const { selected, isCorrect } = highlightQuestion(question, expected);
            if (isCorrect) {
                score++;
            }
        });

        scoreOutput.textContent = `Résultat : ${score}/${totalQuestions}`; // On affiche le score obtenu sur le total de questions
        correctionsOutput.innerHTML = "";
    };

    const clearOptionStyles = (questionName) => {
        getQuestionInputs(questionName).forEach((input) => {
            input.closest(".qcm-option")?.classList.remove("correct", "wrong", "answer");
        });
    };

    const highlightQuestion = (question, expected) => {
        const inputs = getQuestionInputs(question);
        if (!inputs.length) {
            return { selected: null, isCorrect: false };
        }

        let selected = null;
        inputs.forEach((input) => {
            input.closest(".qcm-option")?.classList.remove("correct", "wrong", "answer");
            if (input.checked) {
                selected = input;
            }
        });

        const correctInput = inputs.find((input) => normalizeValue(input.value) === expected) || null;

        if (!selected) {
            correctInput?.closest(".qcm-option")?.classList.add("answer"); // On met en évidence la bonne réponse même si aucune n'est sélectionnée
            return { selected: null, isCorrect: false };
        }

        if (normalizeValue(selected.value) === expected) {
            correctInput?.closest(".qcm-option")?.classList.add("correct"); // On met en évidence la bonne réponse si elle est sélectionnée
            return { selected, isCorrect: true };
        }

        selected.closest(".qcm-option")?.classList.add("wrong"); // On met en évidence la réponse sélectionnée comme incorrecte
        correctInput?.closest(".qcm-option")?.classList.add("answer"); // On met en évidence la correction
        return { selected, isCorrect: false };
    };

    const getQuestionInputs = (questionName) => {
        if (!quizForm) {
            return [];
        }
        return Array.from(quizForm.querySelectorAll(`input[name="${questionName}"]`));
    };

    const getOptionText = (input) => {
        const span = input.nextElementSibling;
        return span ? span.textContent.trim() : input.value.toUpperCase(); // On récupère le texte associé à une option
    };

    const normalizeValue = (value) => (value || "").trim().toUpperCase();

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();