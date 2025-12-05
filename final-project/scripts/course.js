const courses = [
    { code: 'CSE111', title: 'Programming with Functions', credits: 2, category: 'CSE', completed: true },
    { code: 'CSE210', title: 'Programming with Classes', credits: 2, category: 'CSE', completed: true },
    { code: 'CSEPC110', title: 'Intro to Programming', credits: 2, category: 'CSE', completed: true },
    { code: 'WDD130', title: 'Web Fundamentals', credits: 2, category: 'WDD', completed: true },
    { code: 'WDD131', title: 'Dynamic Web Fundamentals', credits: 2, category: 'WDD', completed: true },
    { code: 'WDD231', title: 'Web Frontend Dev II', credits: 2, category: 'WDD', completed: false }, 
];

function createCourseTag(course) {
    const tag = document.createElement('span');
    tag.classList.add('skill-tag');

    if (course.completed) {
        tag.classList.add('completed');
    } else {
        tag.classList.add('current');
    }

    tag.textContent = `${course.code}: ${course.title}`;
    return tag;
}

function renderCourses(list) {
    const container = document.getElementById('courses-list');
    if (!container) return;

    container.innerHTML = '';
    list.forEach(c => container.appendChild(createCourseTag(c)));

    const total = list.reduce((sum, c) => sum + (c.completed ? c.credits : 0), 0);
    const creditsElement = document.getElementById('totalCredits');
    if (creditsElement) {
        creditsElement.textContent = total;
    }
}

function filterCourses(filter) {
    if (filter === 'all') return courses;
    return courses.filter(c => c.category === filter);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('courses-list')) {
        renderCourses(courses);

        document.querySelectorAll('.filter-controls button').forEach(b => {
            b.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const f = e.currentTarget.dataset.filter;
                const list = filterCourses(f);
                renderCourses(list);
            });
        });
    }
});

