/**
 * SPM考试时间表展示功能
 */

// 加载考试时间表数据
document.addEventListener('DOMContentLoaded', function() {
    // 加载考试时间表数据
    loadExamSchedule();
    
    // 添加筛选按钮事件
    document.getElementById('filterScience').addEventListener('click', function() {
        filterExamSchedule('science');
    });
    
    document.getElementById('filterCommerce').addEventListener('click', function() {
        filterExamSchedule('commerce');
    });
    
    document.getElementById('filterMockExam').addEventListener('click', function() {
        filterExamSchedule('mock_exam');
    });
    
    document.getElementById('filterAll').addEventListener('click', function() {
        filterExamSchedule('all');
    });
});

/**
 * 加载考试时间表数据
 */
function loadExamSchedule() {
    const tableBody = document.getElementById('examScheduleTable').querySelector('tbody');
    if (!tableBody) return;
    
    // 清空表格
    tableBody.innerHTML = '';
    
    // 获取最新的考试时间表数据
    const latestSchedule = spmExamSchedule.sort((a, b) => new Date(b.year) - new Date(a.year))[0];
    
    // 处理所有考试数据
    let allExams = [];
    
    // 添加口试考试
    if (latestSchedule.oral_exams) {
        latestSchedule.oral_exams.forEach(exam => {
            allExams.push({
                date: exam.period || exam.date,
                time: '-',
                subject: exam.subject,
                subject_type: exam.subject_type,
                exam_type: exam.exam_type,
                duration: '-'
            });
        });
    }
    
    // 添加实践考试
    if (latestSchedule.practical_exams) {
        latestSchedule.practical_exams.forEach(exam => {
            allExams.push({
                date: exam.date,
                time: '-',
                subject: exam.subject,
                subject_type: exam.subject_type,
                exam_type: exam.exam_type,
                duration: '-'
            });
        });
    }
    
    // 添加听力考试
    if (latestSchedule.listening_exams) {
        latestSchedule.listening_exams.forEach(exam => {
            allExams.push({
                date: exam.date,
                time: '-',
                subject: exam.subject,
                subject_type: exam.subject_type,
                exam_type: exam.exam_type,
                duration: '-'
            });
        });
    }
    
    // 添加笔试考试
    if (latestSchedule.written_exams) {
        latestSchedule.written_exams.forEach(dateGroup => {
            if (dateGroup.exams && Array.isArray(dateGroup.exams)) {
                dateGroup.exams.forEach(exam => {
                    allExams.push({
                        date: dateGroup.date,
                        time: exam.time,
                        subject: exam.subject,
                        subject_type: exam.subject_type,
                        exam_type: exam.exam_type,
                        duration: '-'
                    });
                });
            }
        });
    }
    
    // 按日期排序
    allExams.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA - dateB === 0) {
            // 如果日期相同，按时间排序
            const timeA = a.time.split(' - ')[0];
            const timeB = b.time.split(' - ')[0];
            return timeA.localeCompare(timeB);
        }
        return dateA - dateB;
    });
    
    // 添加到表格
    allExams.forEach(exam => {
        const row = document.createElement('tr');
        
        // 设置科目类型的数据属性
        row.dataset.subjectType = exam.subject_type || 'other';
        
        // 根据科目类型设置行的类
        if (exam.subject_type === 'science') {
            row.classList.add('table-info');
        } else if (exam.subject_type === 'commerce') {
            row.classList.add('table-warning');
        }
        
        // 添加单元格
        row.innerHTML = `
            <td>${exam.date}</td>
            <td>${exam.time}</td>
            <td>${exam.subject}</td>
            <td>${getExamTypeLabel(exam.exam_type)}</td>
            <td>${exam.duration || '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

/**
 * 筛选考试时间表
 * @param {string} type - 筛选类型：'science', 'commerce', 'mock_exam', 'all'
 */
function filterExamSchedule(type) {
    const rows = document.getElementById('examScheduleTable').querySelectorAll('tbody tr');
    
    // 更新筛选按钮样式
    document.getElementById('filterScience').className = 'btn btn-sm btn-outline-light me-2';
    document.getElementById('filterCommerce').className = 'btn btn-sm btn-outline-light me-2';
    document.getElementById('filterMockExam').className = 'btn btn-sm btn-outline-light me-2';
    document.getElementById('filterAll').className = 'btn btn-sm btn-outline-light';
    
    // 设置当前选中的按钮样式
    document.getElementById(type === 'science' ? 'filterScience' : 
                           type === 'commerce' ? 'filterCommerce' : 
                           type === 'mock_exam' ? 'filterMockExam' : 'filterAll')
            .className = 'btn btn-sm btn-light';
    
    // 筛选表格行
    rows.forEach(row => {
        if (type === 'all' || row.dataset.subjectType === type) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * 获取考试类型标签
 * @param {string} examType - 考试类型
 * @returns {string} - 考试类型标签
 */
function getExamTypeLabel(examType) {
    const typeLabels = {
        'oral': '<span class="badge bg-success">口试</span>',
        'practical': '<span class="badge bg-info">实践考试</span>',
        'listening': '<span class="badge bg-warning">听力考试</span>',
        'written': '<span class="badge bg-primary">笔试</span>',
        'mock_exam': '<span class="badge bg-danger">预考题</span>'
    };
    
    return typeLabels[examType] || examType;
}