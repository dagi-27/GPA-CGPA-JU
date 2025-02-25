const gradePoints = {
    'A': 4.0,
    'A-': 3.75,
    'B+': 3.5,
    'B': 3.0,
    'B-': 2.75,
    'C+': 2.5,
    'C': 2.0,
    'C-': 1.75,
    'D': 1.0,
    'F': 0.0
};

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`${tabName}-section`).classList.add('active');
    event.target.classList.add('active');

    // Add calculator-active class to container when calculator is in use
    document.querySelector('.container').classList.add('calculator-active');
}

function generateCourseInputs() {
    const courseCount = parseInt(document.getElementById('courseCount').value);
    const courseInputs = document.getElementById('courseInputs');
    const errorMsg = document.getElementById('courseCountError');
    
    if (!courseCount) {
        errorMsg.classList.add('show');
        return;
    }
    errorMsg.classList.remove('show');
    
    courseInputs.innerHTML = '';

    if (courseCount < 1 || courseCount > 10) {
        alert('Please enter a number between 1 and 10');
        return;
    }

    for (let i = 0; i < courseCount; i++) {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <div class="course-header">Course ${i + 1}</div>
            <div class="course-input-group">
                <div class="input-group">
                    <label class="required-field">Course Name</label>
                    <input type="text" class="course-name" placeholder="Enter course name" required>
                </div>
                <div class="input-group">
                    <label class="required-field">Grade</label>
                    <select class="grade-select" required>
                        <option value="">Select Grade</option>
                        <option value="4.0">A (4.0)</option>
                        <option value="3.75">A- (3.75)</option>
                        <option value="3.5">B+ (3.5)</option>
                        <option value="3.0">B (3.0)</option>
                        <option value="2.75">B- (2.75)</option>
                        <option value="2.5">C+ (2.5)</option>
                        <option value="2.0">C (2.0)</option>
                        <option value="1.75">C- (1.75)</option>
                        <option value="1.0">D (1.0)</option>
                        <option value="0">F (0.0)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label class="required-field">Credit Hours</label>
                    <input type="number" class="credit" min="1" max="6" required placeholder="Enter credit hours">
                </div>
            </div>
        `;
        courseInputs.appendChild(courseItem);
    }

    const calculateBtn = document.createElement('button');
    calculateBtn.className = 'action-btn';
    calculateBtn.innerHTML = 'Calculate GPA';
    calculateBtn.onclick = calculateGPA;
    courseInputs.appendChild(calculateBtn);

    // Hide footer when generating course inputs
    document.querySelector('.container').classList.add('calculator-active');
}

function updateGradePoint(select) {
    const gradePoint = select.value;
    const courseItem = select.closest('.course-item');
    const gradePointDisplay = courseItem.querySelector('.grade-point-display');
    
    if (gradePointDisplay) {
        gradePointDisplay.textContent = gradePoint;
    }
}

function calculateGPA() {
    const courses = document.querySelectorAll('.course-item');
    let totalPoints = 0;
    let totalCredits = 0;
    let courseDetails = [];

    for (let course of courses) {
        const courseName = course.querySelector('.course-name').value;
        const grade = course.querySelector('.grade-select').value;
        const credit = parseFloat(course.querySelector('.credit').value);

        if (!courseName || !grade || isNaN(credit) || credit <= 0) {
            alert('Please fill in all course details correctly');
            return;
        }

        totalPoints += parseFloat(grade) * credit;
        totalCredits += credit;
        
        courseDetails.push({
            name: courseName,
            grade: grade,
            credit: credit
        });
    }

    const gpa = totalPoints / totalCredits;
    const resultDiv = document.getElementById('gpaResult');
    
    resultDiv.classList.remove('pass', 'fail');
    
    let statusMessage = '';
    if (gpa < 1.7) {
        resultDiv.classList.add('fail');
        statusMessage = '<div class="status-message">Warning: Below Academic Standing</div>';
    } else {
        resultDiv.classList.add('pass');
        statusMessage = '<div class="status-message">Good Academic Standing</div>';
    }

    let resultHTML = `
        <div class="gpa-summary">Your GPA is: ${gpa.toFixed(2)}</div>
        ${statusMessage}
        <div class="course-summary">
            <h3>Course Details:</h3>
            <div class="course-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Grade</th>
                            <th>Credit Hours</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    courseDetails.forEach(course => {
        resultHTML += `
            <tr>
                <td>${course.name}</td>
                <td>${course.grade}</td>
                <td>${course.credit}</td>
            </tr>
        `;
    });

    resultHTML += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2"><strong>Total Credits:</strong></td>
                            <td><strong>${totalCredits}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;

    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('show');
}

function generateSemesterInputs() {
    const semesterCount = parseInt(document.getElementById('semesterCount').value);
    const semesterInputs = document.getElementById('semesterInputs');
    const errorMsg = document.getElementById('semesterCountError');
    
    if (!semesterCount) {
        errorMsg.classList.add('show');
        return;
    }
    errorMsg.classList.remove('show');
    
    semesterInputs.innerHTML = '';

    if (semesterCount < 1 || semesterCount > 8) {
        alert('Please enter a number between 1 and 8');
        return;
    }

    for (let i = 0; i < semesterCount; i++) {
        const semesterItem = document.createElement('div');
        semesterItem.className = 'semester-item';
        semesterItem.innerHTML = `
            <div class="course-header">Semester ${i + 1}</div>
            <div class="course-input-group">
                <div class="grade-group">
                    <label class="required-field">GPA:</label>
                    <input type="number" class="semester-gpa" placeholder="Enter GPA" 
                           step="0.01" min="0" max="4" required>
                </div>
                <div class="credit-group">
                    <label class="required-field">Credit Hours:</label>
                    <input type="number" class="semester-credit" 
                           placeholder="Total Credit Hours" min="1" required>
                </div>
            </div>
        `;
        semesterInputs.appendChild(semesterItem);
    }

    const calculateBtn = document.createElement('button');
    calculateBtn.className = 'action-btn calculate-btn';
    calculateBtn.innerHTML = '<span>Calculate CGPA</span>';
    calculateBtn.onclick = calculateCGPA;
    semesterInputs.appendChild(calculateBtn);

    // Hide footer when generating semester inputs
    document.querySelector('.container').classList.add('calculator-active');
}

function calculateCGPA() {
    const semesterItems = document.querySelectorAll('.semester-item');
    let totalPoints = 0;
    let totalCredits = 0;
    let semesterDetails = [];

    for (let i = 0; i < semesterItems.length; i++) {
        const gpa = parseFloat(semesterItems[i].querySelector('.semester-gpa').value);
        const credit = parseFloat(semesterItems[i].querySelector('.semester-credit').value);

        if (isNaN(gpa) || isNaN(credit) || gpa < 0 || gpa > 4 || credit <= 0) {
            alert('Please enter valid GPA and credit hours for all semesters');
            return;
        }

        totalPoints += gpa * credit;
        totalCredits += credit;
        
        semesterDetails.push({
            semester: i + 1,
            gpa: gpa,
            credits: credit,
            qualityPoints: (gpa * credit).toFixed(2)
        });
    }

    const cgpa = totalPoints / totalCredits;
    const resultDiv = document.getElementById('cgpaResult');
    
    // Remove any existing status classes
    resultDiv.classList.remove('pass', 'fail');
    
    let statusMessage = '';
    if (cgpa < 1.7) {
        resultDiv.classList.add('fail');
        statusMessage = '<div class="status-message">Academic Status: Dismissal</div>';
    } else {
        resultDiv.classList.add('pass');
        statusMessage = '<div class="status-message">Academic Status: Good Standing</div>';
    }

    // Create detailed result HTML
    let resultHTML = `
        <div class="gpa-summary">Your CGPA is: ${cgpa.toFixed(2)}</div>
        ${statusMessage}
        <div class="course-summary">
            <h3>Semester Details:</h3>
            <div class="course-table">
                <table>
                    <thead>
                        <tr>
                            <th>Semester</th>
                            <th>GPA</th>
                            <th>Credit Hours</th>
                            <th>Quality Points</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    semesterDetails.forEach(sem => {
        resultHTML += `
            <tr>
                <td>Semester ${sem.semester}</td>
                <td>${sem.gpa.toFixed(2)}</td>
                <td>${sem.credits}</td>
                <td>${sem.qualityPoints}</td>
            </tr>
        `;
    });

    resultHTML += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2"><strong>Total</strong></td>
                            <td><strong>${totalCredits}</strong></td>
                            <td><strong>${totalPoints.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="total-credits">
                <div>Total Credit Hours: ${totalCredits}</div>
                <div>Total Quality Points: ${totalPoints.toFixed(2)}</div>
            </div>
        </div>
    `;

    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.add('show');
}

// Add input validation for required fields
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('input', () => {
        const errorMsg = document.getElementById(`${input.id}Error`);
        if (input.value.trim()) {
            errorMsg.classList.remove('show');
        }
    });
});

// Add this function to reset the calculator
function resetCalculator() {
    document.querySelector('.container').classList.remove('calculator-active');
    document.getElementById('courseInputs').innerHTML = '';
    document.getElementById('semesterInputs').innerHTML = '';
    document.getElementById('gpaResult').innerHTML = '';
    document.getElementById('cgpaResult').innerHTML = '';
    document.getElementById('courseCount').value = '';
    document.getElementById('semesterCount').value = '';
}

// Add reset functionality to the logo
document.querySelector('.logo').addEventListener('click', resetCalculator); 