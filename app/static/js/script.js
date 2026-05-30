const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(
                    "show"
                );
            }
        });
    },
    {
        threshold: 0.15
    }
);

const hiddenElements =
    document.querySelectorAll(
        "section"
    );

hiddenElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});
