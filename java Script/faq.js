        // FAQ Accordion functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = answer.classList.contains('active');

                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });

                // Open clicked answer if it wasn't active
                if (!isActive) {
                    answer.classList.add('active');
                    question.classList.add('active');
                }
