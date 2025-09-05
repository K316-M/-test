/**
 * 题库系统 JavaScript 功能
 * La Rive Gauche 左岸学习平台
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initQuizPage();
    
    // 视图切换功能
    initViewToggle();
    
    // 筛选功能
    initFilterForm();
    
    // 题目模态框功能
    initQuizModal();
    
    // 解析URL参数并设置相应的筛选条件
    parseUrlParams();
});

/**
 * 初始化题库页面
 */
function initQuizPage() {
    // 检查用户是否已登录，更新UI
    checkUserLoginStatus();
    
    // 加载题目数据
    loadQuizData();
}

/**
 * 检查用户登录状态并更新UI
 */
function checkUserLoginStatus() {
    // 模拟检查登录状态
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    // 更新UI元素
    const loginBtn = document.querySelector('.btn[data-bs-target="#loginModal"]');
    const registerBtn = document.querySelector('.btn[data-bs-target="#registerModal"]');
    
    if (isLoggedIn && loginBtn && registerBtn) {
        // 替换登录/注册按钮为用户信息
        const navbarNav = document.getElementById('navbarNav');
        const authButtons = loginBtn.parentElement;
        
        if (navbarNav && authButtons) {
            const userDropdown = document.createElement('div');
            userDropdown.className = 'd-flex';
            userDropdown.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle me-1"></i>
                        ${localStorage.getItem('username') || '用户'}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>个人资料</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-journal-text me-2"></i>我的学习</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-star me-2"></i>收藏题目</a></li>
                        <li><a class="dropdown-item" href="#"><i class="bi bi-clock-history me-2"></i>历史记录</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>退出登录</a></li>
                    </ul>
                </div>
            `;
            
            // 替换登录/注册按钮
            authButtons.parentNode.replaceChild(userDropdown, authButtons);
            
            // 添加退出登录事件
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            });
        }
    }
}

/**
 * 加载题目数据
 */
function loadQuizData() {
    // 这里应该是从API获取数据
    // 现在使用模拟数据
    console.log('加载题目数据...');
    
    // 如果有筛选条件，应用筛选
    applyFilters();
}

/**
 * 初始化视图切换功能
 */
function initViewToggle() {
    const viewGridBtn = document.getElementById('viewGrid');
    const viewListBtn = document.getElementById('viewList');
    const quizGrid = document.getElementById('quizGrid');
    const quizList = document.getElementById('quizList');
    
    if (viewGridBtn && viewListBtn && quizGrid && quizList) {
        // 网格视图按钮点击事件
        viewGridBtn.addEventListener('click', function() {
            viewGridBtn.classList.add('active');
            viewListBtn.classList.remove('active');
            quizGrid.style.display = 'flex';
            quizList.style.display = 'none';
            
            // 保存用户偏好
            localStorage.setItem('quizViewPreference', 'grid');
        });
        
        // 列表视图按钮点击事件
        viewListBtn.addEventListener('click', function() {
            viewListBtn.classList.add('active');
            viewGridBtn.classList.remove('active');
            quizList.style.display = 'block';
            quizGrid.style.display = 'none';
            
            // 保存用户偏好
            localStorage.setItem('quizViewPreference', 'list');
        });
        
        // 加载用户偏好的视图
        const viewPreference = localStorage.getItem('quizViewPreference');
        if (viewPreference === 'list') {
            viewListBtn.click();
        } else {
            viewGridBtn.click();
        }
    }
}

/**
 * 初始化筛选表单
 */
function initFilterForm() {
    const filterForm = document.getElementById('filterForm');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });
        
        // 监听考试类型变化，动态更新科目选项
        const examTypeInputs = document.querySelectorAll('input[name="examType"]');
        examTypeInputs.forEach(input => {
            input.addEventListener('change', updateSubjectOptions);
        });
    }
}

/**
 * 根据考试类型更新科目选项
 */
function updateSubjectOptions() {
    const examType = document.querySelector('input[name="examType"]:checked').value;
    const subjectSelect = document.getElementById('subject');
    
    if (subjectSelect) {
        // 清空现有选项，保留"全部科目"
        while (subjectSelect.options.length > 1) {
            subjectSelect.remove(1);
        }
        
        // 根据考试类型添加不同的科目选项
        let subjects = [];
        
        if (examType === 'spm') {
            subjects = [
                { value: 'math', text: '数学' },
                { value: 'addmath', text: '高级数学' },
                { value: 'physics', text: '物理' },
                { value: 'chemistry', text: '化学' },
                { value: 'biology', text: '生物' },
                { value: 'chinese', text: '华文' },
                { value: 'english', text: '英文' },
                { value: 'malay', text: '马来文' },
                { value: 'history', text: '历史' },
                { value: 'geography', text: '地理' }
            ];
        } else if (examType === 'uec') {
            subjects = [
                { value: 'math', text: '数学' },
                { value: 'addmath', text: '高级数学' },
                { value: 'physics', text: '物理' },
                { value: 'chemistry', text: '化学' },
                { value: 'biology', text: '生物' },
                { value: 'chinese', text: '华文' },
                { value: 'english', text: '英文' },
                { value: 'malay', text: '马来文' },
                { value: 'history', text: '历史' },
                { value: 'geography', text: '地理' },
                { value: 'commerce', text: '商业学' },
                { value: 'accounting', text: '簿记与会计' },
                { value: 'economics', text: '经济学' }
            ];
        } else if (examType === 'mock') {
            subjects = [
                { value: 'math', text: '数学' },
                { value: 'science', text: '科学' },
                { value: 'languages', text: '语文' },
                { value: 'humanities', text: '人文' },
                { value: 'comprehensive', text: '综合测试' }
            ];
        } else if (examType === 'preexam') {
            subjects = [
                { value: 'math', text: '数学' },
                { value: 'addmath', text: '高级数学' },
                { value: 'physics', text: '物理' },
                { value: 'chemistry', text: '化学' },
                { value: 'biology', text: '生物' },
                { value: 'chinese', text: '华文' },
                { value: 'english', text: '英文' },
                { value: 'malay', text: '马来文' },
                { value: 'history', text: '历史' },
                { value: 'geography', text: '地理' }
            ];
        }
        
        // 添加新选项
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.value;
            option.textContent = subject.text;
            subjectSelect.appendChild(option);
        });
    }
}

/**
 * 应用筛选条件
 */
function applyFilters() {
    // 获取筛选条件
    const examType = document.querySelector('input[name="examType"]:checked').value;
    const subject = document.getElementById('subject').value;
    const difficultyEasy = document.getElementById('difficultyEasy').checked;
    const difficultyMedium = document.getElementById('difficultyMedium').checked;
    const difficultyHard = document.getElementById('difficultyHard').checked;
    const year = document.getElementById('year').value;
    
    // 构建筛选参数
    const filters = {
        examType,
        subject,
        difficulty: {
            easy: difficultyEasy,
            medium: difficultyMedium,
            hard: difficultyHard
        },
        year
    };
    
    console.log('应用筛选条件:', filters);
    
    // 这里应该调用API获取筛选后的数据
    // 现在只是模拟筛选效果
    simulateFilteredResults(filters);
}

/**
 * 模拟筛选结果
 */
function simulateFilteredResults(filters) {
    // 显示加载状态
    const quizGrid = document.getElementById('quizGrid');
    const quizList = document.getElementById('quizList');
    
    if (quizGrid && quizList) {
        // 模拟加载延迟
        quizGrid.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">加载中...</span></div><p class="mt-3">正在加载题目...</p></div>';
        quizList.innerHTML = '';
        
        setTimeout(() => {
            // 根据筛选条件更新页面标题
            updatePageTitle(filters);
            
            // 恢复原始内容（实际应用中应该是渲染新数据）
            // 这里只是演示，实际应用中应该根据API返回的数据重新渲染
            location.reload();
        }, 1000);
    }
}

/**
 * 更新页面标题
 */
function updatePageTitle(filters) {
    const quizTitle = document.querySelector('.quiz-title');
    const quizSubtitle = document.querySelector('.quiz-header .lead');
    
    if (quizTitle && quizSubtitle) {
        let title = '题库系统';
        let subtitle = '全面覆盖SPM和统考各科目题目，助你高效备考';
        
        // 根据筛选条件更新标题
        if (filters.examType === 'spm') {
            title = 'SPM题库';
            subtitle = 'SPM各科目题目集合，助你备战SPM考试';
        } else if (filters.examType === 'uec') {
            title = '统考题库';
            subtitle = '统考各科目题目集合，助你备战统考';
        } else if (filters.examType === 'preexam') {
            title = '预考题库';
            subtitle = '最新预考题集合，助你提前适应考试环境';
        } else if (filters.examType === 'mock') {
            title = '模拟测试题库';
            subtitle = '模拟测试题目集合，检验你的学习成果';
        }
        
        // 如果选择了特定科目，更新标题
        if (filters.subject !== 'all') {
            const subjectName = document.querySelector(`#subject option[value="${filters.subject}"]`)?.textContent;
            if (subjectName) {
                title += ` - ${subjectName}`;
            }
        }
        
        quizTitle.textContent = title;
        quizSubtitle.textContent = subtitle;
    }
}

/**
 * 初始化题目模态框功能
 */
function initQuizModal() {
    const quizModal = document.getElementById('quizModal');
    
    if (quizModal) {
        // 模态框显示时初始化计时器
        quizModal.addEventListener('shown.bs.modal', function() {
            startQuizTimer();
        });
        
        // 模态框关闭时重置计时器
        quizModal.addEventListener('hidden.bs.modal', function() {
            resetQuizTimer();
        });
        
        // 选项点击效果
        const optionLabels = quizModal.querySelectorAll('.form-check-label');
        optionLabels.forEach(label => {
            label.addEventListener('click', function() {
                // 触发对应的单选按钮点击
                const radioInput = document.getElementById(this.getAttribute('for'));
                if (radioInput) {
                    radioInput.checked = true;
                }
            });
        });
    }
}

/**
 * 开始题目计时器
 */
function startQuizTimer() {
    // 设置初始时间（10分钟）
    let timeLeft = 10 * 60;
    const timerElement = document.getElementById('quizTimer');
    
    if (timerElement) {
        // 清除之前的计时器
        if (window.quizTimerInterval) {
            clearInterval(window.quizTimerInterval);
        }
        
        // 设置新的计时器
        window.quizTimerInterval = setInterval(function() {
            timeLeft--;
            
            // 更新显示
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // 时间到
            if (timeLeft <= 0) {
                clearInterval(window.quizTimerInterval);
                alert('时间到！');
                // 这里可以自动提交答案或关闭模态框
            }
            
            // 时间不多时改变颜色
            if (timeLeft <= 60) {
                timerElement.style.color = '#dc3545';
                timerElement.classList.add('blink');
            }
        }, 1000);
    }
}

/**
 * 重置题目计时器
 */
function resetQuizTimer() {
    if (window.quizTimerInterval) {
        clearInterval(window.quizTimerInterval);
    }
    
    const timerElement = document.getElementById('quizTimer');
    if (timerElement) {
        timerElement.textContent = '10:00';
        timerElement.style.color = '';
        timerElement.classList.remove('blink');
    }
}

/**
 * 解析URL参数并设置相应的筛选条件
 */
function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const examType = urlParams.get('type');
    
    if (examType) {
        // 设置考试类型
        let examTypeInput;
        
        if (examType === 'preexam') {
            examTypeInput = document.getElementById('examTypePreexam');
        } else {
            examTypeInput = document.getElementById(`examType${examType.toUpperCase()}`);
        }
        
        if (examTypeInput) {
            examTypeInput.checked = true;
            
            // 更新科目选项
            updateSubjectOptions();
            
            // 更新页面标题
            const filters = {
                examType: examType,
                subject: 'all'
            };
            updatePageTitle(filters);
        }
    }
}