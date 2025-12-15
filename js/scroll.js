document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    let currentIndex = 0;
    let isScrolling = false;

    const scrollToSection = (index) => {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;

        sections[index].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        currentIndex = index;

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    };

    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;

        if (e.deltaY > 0) {
            scrollToSection(currentIndex + 1);
        } else if (e.deltaY < 0) {
            scrollToSection(currentIndex - 1);
        }
    });

    window.addEventListener("keydown", (e) => {
        if (isScrolling) return;

        if (e.key === "ArrowDown") {
            scrollToSection(currentIndex + 1);
        } else if (e.key === "ArrowUp") {
            scrollToSection(currentIndex - 1);
        }
    });

    window.addEventListener("scroll", () => {
        const fromTop = window.scrollY;
        sections.forEach((section, i) => {
            if (
                section.offsetTop <= fromTop + 100 &&
                section.offsetTop + section.offsetHeight > fromTop + 100
            ) {
                currentIndex = i;
            }
        });
    });
});
