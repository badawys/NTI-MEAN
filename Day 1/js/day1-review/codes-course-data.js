/**
 * Day 1 JavaScript review.
 * Run with: node codes-course-data.js
 */

// Each object represents one course before a database exists.
const courses = [
  { title: 'JavaScript Essentials', capacity: 25, enrolled: 18, published: true },
  { title: 'Node API', capacity: 20, enrolled: 20, published: true },
  { title: 'MongoDB Foundations', capacity: 24, enrolled: 12, published: false },
];

/**
 * Calculates one course's remaining places.
 * @param {{ capacity: number, enrolled: number }} course - Course numbers used by the calculation.
 * @returns {number} Capacity minus enrolled count.
 */
function getRemainingSeats(course) {
  return course.capacity - course.enrolled;
}

/**
 * Converts a course object into the short label a UI could display.
 * Keeping formatting in a function makes the same output reusable.
 */
function formatCourseLabel(course) {
  return `${course.title} — ${getRemainingSeats(course)} seats`;
}

// filter() selects only items that satisfy both public-catalog conditions.
const openCourses = courses.filter((course) => {
  return course.published && getRemainingSeats(course) > 0;
});

// map() transforms course objects into strings without changing the original array.
const courseLabels = openCourses.map(formatCourseLabel);

// reduce() combines the list into one total, starting from the explicit value 0.
const totalAvailableSeats = openCourses.reduce((total, course) => {
  return total + getRemainingSeats(course);
}, 0);

console.log('Open course labels:', courseLabels);
console.log('Total available seats:', totalAvailableSeats);

// Export values so later lessons can import and test this module.
module.exports = { courses, getRemainingSeats, formatCourseLabel };
