// 个人中心页面脚本

document.addEventListener('DOMContentLoaded', function() {
    // 初始化工具提示
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 初始化AI助手功能
    initAIAssistant();

    // 初始化图表
    initCharts();

    // 初始化学习记录过滤器
    initRecordFilter();

    // 初始化编辑个人资料功能
    initProfileEdit();

    // 初始化学习目标设置功能
    initGoalSetting();
});

// 初始化AI助手功能
function initAIAssistant() {
    const aiToggle = document.getElementById('aiAssistantToggle');
    const aiChat = document.getElementById('aiAssistantChat');
    const aiClose = document.getElementById('aiChatClose');
    const aiSendButton = document.getElementById('aiSendButton');
    const aiMessageInput = document.getElementById('aiMessageInput');
    const aiChatMessages = document.getElementById('aiChatMessages');

    // 显示/隐藏AI助手对话框
    if (aiToggle) {
        aiToggle.addEventListener('click', function() {
            aiChat.classList.toggle('show');
        });
    }

    // 关闭AI助手对话框
    if (aiClose) {
        aiClose.addEventListener('click', function() {
            aiChat.classList.remove('show');
        });
    }

    // 发送消息
    if (aiSendButton && aiMessageInput) {
        aiSendButton.addEventListener('click', sendAIMessage);
        aiMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }

    // 发送消息函数
    function sendAIMessage() {
        const message = aiMessageInput.value.trim();
        if (message) {
            // 添加用户消息
            addMessage('user', message);
            aiMessageInput.value = '';

            // 模拟AI回复
            setTimeout(() => {
                // 根据消息内容生成相关回复
                let reply = getAIReply(message);
                addMessage('ai', reply);
            }, 1000);
        }
    }

    // 添加消息到对话框
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';

        if (type === 'ai') {
            messageDiv.innerHTML = `
                <div class="ai-avatar">
                    <i class="bi bi-robot"></i>
                </div>
                <div class="ai-message-content">
                    <p>${content}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="user-message-content">
                    <p>${content}</p>
                </div>
            `;
        }

        aiChatMessages.appendChild(messageDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    // 根据用户消息生成AI回复
    function getAIReply(message) {
        message = message.toLowerCase();

        // 学习相关问题
        if (message.includes('学习计划') || message.includes('如何学习')) {
            return '根据你的学习记录和目标，我建议你可以增加数学和物理的学习时间。每天保持2小时的专注学习，并定期复习之前的内容。';
        }
        // 考试相关问题
        else if (message.includes('考试') || message.includes('测验')) {
            return '根据你的学习进度，你已经完成了80%的课程内容。建议你现在开始做一些模拟试题，特别是数学和物理的部分。我可以为你推荐一些适合的题目。';
        }
        // 学习资源相关问题
        else if (message.includes('资源') || message.includes('资料')) {
            return '我为你找到了几个与你当前学习内容相关的资源：1. 高中数学三角函数完全指南 2. 物理力学实验视频教程 3. 化学方程式速记口诀。你想查看哪一个？';
        }
        // 时间管理相关问题
        else if (message.includes('时间') || message.includes('管理')) {
            return '根据你的学习习惯，我建议你采用番茄工作法：25分钟专注学习，然后休息5分钟。你可以使用我们的时间管理工具来帮助你追踪学习时间。';
        }
        // 默认回复
        else {
            return '我是你的AI学习助手，可以帮你制定学习计划、推荐学习资源、解答学习问题。有什么我可以帮助你的吗？';
        }
    }

    // 实现AI助手拖拽功能
    if (aiChat) {
        const aiChatHeader = document.querySelector('.ai-chat-header');
        let isDragging = false;
        let offsetX, offsetY;

        aiChatHeader.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - aiChat.getBoundingClientRect().left;
            offsetY = e.clientY - aiChat.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                aiChat.style.left = (e.clientX - offsetX) + 'px';
                aiChat.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }
}

// 初始化图表
function initCharts() {
    // 学习时间分布图表
    const studyTimeCtx = document.getElementById('studyTimeChart');
    if (studyTimeCtx) {
        new Chart(studyTimeCtx, {
            type: 'bar',
            data: {
                labels: ['数学', '物理', '化学', '生物', '华文'],
                datasets: [{
                    label: '本周学习时间（小时）',
                    data: [8, 6, 4, 3, 5],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // 学习进度图表
    const studyProgressCtx = document.getElementById('studyProgressChart');
    if (studyProgressCtx) {
        new Chart(studyProgressCtx, {
            type: 'doughnut',
            data: {
                labels: ['已完成', '进行中', '未开始'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(201, 203, 207, 0.7)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // 每日学习时间图表
    const dailyStudyCtx = document.getElementById('dailyStudyChart');
    if (dailyStudyCtx) {
        new Chart(dailyStudyCtx, {
            type: 'line',
            data: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                datasets: [{
                    label: '每日学习时间（小时）',
                    data: [3, 4, 2, 5, 3, 6, 4],
                    fill: false,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// 初始化学习记录过滤器
function initRecordFilter() {
    const recordFilter = document.getElementById('recordFilter');
    const recordItems = document.querySelectorAll('.study-record-item');

    if (recordFilter) {
        recordFilter.addEventListener('change', function() {
            const selectedValue = this.value;
            
            recordItems.forEach(item => {
                if (selectedValue === 'all') {
                    item.style.display = 'flex';
                } else {
                    const recordType = item.getAttribute('data-type');
                    item.style.display = (recordType === selectedValue) ? 'flex' : 'none';
                }
            });
        });
    }
}

// 初始化编辑个人资料功能
function initProfileEdit() {
    const editProfileForm = document.getElementById('editProfileForm');
    
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(editProfileForm);
            const userData = {
                name: formData.get('userName'),
                school: formData.get('userSchool'),
                grade: formData.get('userGrade'),
                email: formData.get('userEmail'),
                phone: formData.get('userPhone'),
                bio: formData.get('userBio')
            };
            
            // 模拟保存个人资料
            console.log('保存个人资料:', userData);
            
            // 显示成功消息
            alert('个人资料已更新！');
            
            // 关闭模态框
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            editProfileModal.hide();
            
            // 更新页面上的用户信息
            document.querySelector('.user-name').textContent = userData.name;
            document.querySelector('.user-school').textContent = `${userData.school} · ${userData.grade}`;
        });
    }
    
    // 头像上传预览
    const avatarInput = document.getElementById('avatarUpload');
    const avatarPreview = document.querySelector('.avatar-preview img');
    
    if (avatarInput && avatarPreview) {
        avatarInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
}

// 初始化学习目标设置功能
function initGoalSetting() {
    const goalSettingForm = document.getElementById('goalSettingForm');
    
    if (goalSettingForm) {
        goalSettingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(goalSettingForm);
            const goalData = {
                math: formData.get('mathGoal'),
                physics: formData.get('physicsGoal'),
                chemistry: formData.get('chemistryGoal'),
                biology: formData.get('biologyGoal'),
                chinese: formData.get('chineseGoal')
            };
            
            // 模拟保存学习目标
            console.log('保存学习目标:', goalData);
            
            // 显示成功消息
            alert('学习目标已更新！');
            
            // 关闭模态框
            const goalSettingModal = bootstrap.Modal.getInstance(document.getElementById('goalSettingModal'));
            goalSettingModal.hide();
            
            // 更新页面上的学习目标进度条
            updateGoalProgress(goalData);
        });
    }
    
    // 更新学习目标进度条
    function updateGoalProgress(goalData) {
        const goalItems = document.querySelectorAll('.learning-goals .subject-goal-item');
        
        goalItems.forEach(item => {
            const subjectName = item.querySelector('span').textContent.trim();
            const progressBar = item.querySelector('input[type="range"]');
            const progressValue = item.querySelector('span:last-child');
            
            let value = 0;
            
            switch (subjectName) {
                case '数学':
                    value = goalData.math;
                    break;
                case '物理':
                    value = goalData.physics;
                    break;
                case '化学':
                    value = goalData.chemistry;
                    break;
                case '生物':
                    value = goalData.biology;
                    break;
                case '华文':
                    value = goalData.chinese;
                    break;
            }
            
            progressBar.value = value;
            progressValue.textContent = value + '%';
        });
    }
}