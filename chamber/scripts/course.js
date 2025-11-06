const courses = [
    { code: 'CSE111', title: 'Programming with Functions', credits: 2, category: 'CSE', completed: true },
    { code: 'CSE210', title: 'Programming with Classes', credits: 2, category: 'CSE', completed: true },
    { code: 'CSEPC110', title: 'Introduction to Programming (EQUIV)', credits: 2, category: 'CSE', completed: true },
    { code: 'WDD130', title: 'Web Fundamentals', credits: 2, category: 'WDD', completed: true },
    { code: 'WDD131', title: 'Dynamic Web Fundamentals', credits: 2, category: 'WDD', completed: true },
    { code: 'WDD231', title: 'Web Frontend Development', credits: 2, category: 'WDD', completed: false },
];


function createCard(course) {
    const card = document.createElement('article');
    card.className = 'card' + (course.completed ? ' completed' : '');
    card.innerHTML = `
<h3>${course.code} - ${course.title}</h3>
<p>Credits: ${course.credits}</p>
<p>Category: ${course.category}</p>
<p>State: ${course.completed ? 'Fulfilled' : 'Current'}</p>
`;
    return card;
}


function renderCourses(list) {
    const container = document.getElementById('courses-list');
    container.innerHTML = '';
    list.forEach(c => container.appendChild(createCard(c)));


    const total = list.reduce((sum, c) => sum + (c.credits || 0), 0);
    document.getElementById('totalCredits').textContent = total;
}


function filterCourses(filter) {
    if (filter === 'all') return courses.slice();
    return courses.filter(c => c.category === filter);
}


document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
    document.querySelectorAll('.controls button').forEach(b => {
        b.addEventListener('click', (e) => {
            const f = e.currentTarget.dataset.filter;
            const list = f === 'all' ? courses : filterCourses(f);
            renderCourses(list);
        });
    });
});