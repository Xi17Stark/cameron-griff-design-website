document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.topic').forEach(topic => {
        const subtopicsContainer = topic.querySelector('.subtopics-container');

        // Initialize the subtopics container to be hidden
        subtopicsContainer.classList.add('hidden');

        topic.addEventListener('mouseenter', () => {
            console.log("Hover detected on topic:", topic); // Log hover event
            const subtopics = topic.getAttribute('data-subtopics').split(', ');

            // Clear previous content
            subtopicsContainer.innerHTML = ''; 

            // Populate subtopics
            subtopics.forEach(subtopic => {
                const subtopicDiv = document.createElement('div');
                subtopicDiv.className = 'subtopic';
                subtopicDiv.textContent = subtopic.trim();
                subtopicsContainer.appendChild(subtopicDiv);
            });

            // Trigger the transition
            subtopicsContainer.classList.remove('hidden'); // Show with fade in
        });

        topic.addEventListener('mouseleave', () => {
            subtopicsContainer.classList.add('hidden'); // Hide with fade out
        });
    });
});