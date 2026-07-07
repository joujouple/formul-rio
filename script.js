// Dados dos alunos
const initialStudents = [
    {
        id: 1,
        name: "Ana Silva Santos",
        email: "ana.silva@school.com",
        phone: "(11) 98765-4321",
        birthDate: "2008-03-15",
        registrationDate: "2024-01-10",
        turma: "1º A",
        curso: "Front End"
    },
    {
        id: 2,
        name: "Bruno Costa Oliveira",
        email: "bruno.costa@school.com",
        phone: "(11) 97654-3210",
        birthDate: "2009-07-22",
        registrationDate: "2024-01-12",
        turma: "1º B",
        curso: "Back End"
    },
    {
        id: 3,
        name: "Carla Mendes Ferreira",
        email: "carla.mendes@school.com",
        phone: "(11) 96543-2109",
        birthDate: "2008-11-08",
        registrationDate: "2024-01-15",
        turma: "2º A",
        curso: "Full Stack"
    },
    {
        id: 4,
        name: "Diego Alves Martins",
        email: "diego.alves@school.com",
        phone: "(11) 95432-1098",
        birthDate: "2009-05-30",
        registrationDate: "2024-01-18",
        turma: "1º A",
        curso: "Front End"
    },
    {
        id: 5,
        name: "Eduarda Rocha Gomes",
        email: "eduarda.rocha@school.com",
        phone: "(11) 94321-0987",
        birthDate: "2008-09-12",
        registrationDate: "2024-01-20",
        turma: "2º B",
        curso: "Mobile"
    },
    {
        id: 6,
        name: "Felipe Nascimento Ribeiro",
        email: "felipe.nascimento@school.com",
        phone: "(11) 93210-9876",
        birthDate: "2009-02-25",
        registrationDate: "2024-01-22",
        turma: "1º B",
        curso: "Data Science"
    }
];

let students = [...initialStudents];
let editingId = null;
let searchTerm = '';

// Elementos do DOM
const form = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const birthDateInput = document.getElementById('birthDate');
const turmaInput = document.getElementById('turma');
const cursoInput = document.getElementById('curso');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const studentsGrid = document.getElementById('students-grid');
const totalStudentsSpan = document.getElementById('total-students');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const noResults = document.getElementById('no-results');

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    renderStudents();
    setupSearchListener();
});

// Configurar listener de pesquisa
function setupSearchListener() {
    searchInput.addEventListener('input', function() {
        searchTerm = this.value.toLowerCase();
        
        if (searchTerm) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        
        renderStudents();
    });

    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchTerm = '';
        clearSearchBtn.style.display = 'none';
        renderStudents();
        searchInput.focus();
    });
}

// Filtrar alunos baseado na pesquisa
function getFilteredStudents() {
    if (!searchTerm) {
        return students;
    }
    
    return students.filter(student => {
        return student.name.toLowerCase().includes(searchTerm) ||
               student.email.toLowerCase().includes(searchTerm);
    });
}

// Obter classe CSS para o badge do curso
function getCourseClass(curso) {
    const classes = {
        'Front End': 'frontend',
        'Back End': 'backend',
        'Full Stack': 'fullstack',
        'Mobile': 'mobile',
        'Data Science': 'datascience',
        'DevOps': 'devops'
    };
    return classes[curso] || '';
}

// Renderizar todos os alunos
function renderStudents() {
    const filteredStudents = getFilteredStudents();
    studentsGrid.innerHTML = '';
    
    if (filteredStudents.length === 0) {
        noResults.style.display = 'block';
        studentsGrid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        studentsGrid.style.display = 'grid';
        
        filteredStudents.forEach((student, index) => {
            const card = createStudentCard(student, index);
            studentsGrid.appendChild(card);
        });
    }
    
    updateTotal();
}

// Criar card do aluno
function createStudentCard(student, index) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.style.animationDelay = index * 50 + 'ms';

    // Formatar datas
    const birthDate = new Date(student.birthDate);
    const registrationDate = new Date(student.registrationDate);
    const birthDateFormatted = birthDate.toLocaleDateString('pt-BR');
    const registrationDateFormatted = registrationDate.toLocaleDateString('pt-BR');
    
    const courseClass = getCourseClass(student.curso);

    card.innerHTML = `
        <div class="student-header">
            <div class="student-name">${student.name}</div>
            <div class="student-actions">
                <button class="btn btn-edit btn-small" onclick="editStudent(${student.id})">✏️ Editar</button>
                <button class="btn btn-delete btn-small" onclick="deleteStudent(${student.id})">🗑️ Deletar</button>
            </div>
        </div>

        <div class="student-info">
            <span class="student-info-icon">📧</span>
            <span>${student.email}</span>
        </div>

        <div class="student-info">
            <span class="student-info-icon">📱</span>
            <span>${student.phone}</span>
        </div>

        <div class="student-info">
            <span class="student-info-icon">🎂</span>
            <span>${birthDateFormatted}</span>
        </div>

        <div class="student-info">
            <span class="student-info-icon">🏫</span>
            <span>${student.turma}</span>
        </div>

        <div class="student-info">
            <span class="student-info-icon">💻</span>
            <span class="course-badge ${courseClass}">${student.curso}</span>
        </div>

        <div class="student-divider"></div>

        <div class="student-registration">
            Cadastrado em: ${registrationDateFormatted}
        </div>
    `;

    return card;
}

// Adicionar/Atualizar aluno
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!nameInput.value || !emailInput.value || !phoneInput.value || !birthDateInput.value || !turmaInput.value || !cursoInput.value) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    if (editingId) {
        const student = students.find(s => s.id === editingId);
        if (student) {
            student.name = nameInput.value;
            student.email = emailInput.value;
            student.phone = phoneInput.value;
            student.birthDate = birthDateInput.value;
            student.turma = turmaInput.value;
            student.curso = cursoInput.value;
        }
        editingId = null;
        cancelEdit();
    } else {
        const newId = Math.max(...students.map(s => s.id), 0) + 1;
        const today = new Date().toISOString().split('T')[0];
        
        students.push({
            id: newId,
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            birthDate: birthDateInput.value,
            registrationDate: today,
            turma: turmaInput.value,
            curso: cursoInput.value
        });
    }

    form.reset();
    searchInput.value = '';
    searchTerm = '';
    clearSearchBtn.style.display = 'none';
    renderStudents();
});

// Editar aluno
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        nameInput.value = student.name;
        emailInput.value = student.email;
        phoneInput.value = student.phone;
        birthDateInput.value = student.birthDate;
        turmaInput.value = student.turma;
        cursoInput.value = student.curso;
        editingId = id;
        formTitle.textContent = 'Editar Aluno';
        cancelBtn.style.display = 'block';
        nameInput.focus();
    }
}

// Cancelar edição
function cancelEdit() {
    form.reset();
    editingId = null;
    formTitle.textContent = 'Adicionar Novo Aluno';
    cancelBtn.style.display = 'none';
}

cancelBtn.addEventListener('click', cancelEdit);

// Deletar aluno
function deleteStudent(id) {
    if (confirm('Tem certeza que deseja deletar este aluno?')) {
        students = students.filter(s => s.id !== id);
        renderStudents();
    }
}

// Atualizar total de alunos
function updateTotal() {
    const filteredStudents = getFilteredStudents();
    totalStudentsSpan.textContent = filteredStudents.length;
}
