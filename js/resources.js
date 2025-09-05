/**
 * La Rive Gauche 左岸学习平台 - 学习资源页面脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 初始化AI助手
    initAiAssistant();

    // 资源筛选功能
    initResourceFilter();

    // 资源详情模态框
    initResourceDetailModal();

    // 模拟用户登录状态
    checkUserLoginStatus();
});

/**
 * 初始化AI助手功能
 */
function initAiAssistant() {
    const aiButton = document.getElementById('aiAssistantButton');
    const aiDialog = document.getElementById('aiAssistantDialog');
    const closeAiButton = document.getElementById('closeAiAssistant');
    const aiInput = document.getElementById('aiAssistantInput');
    const sendButton = document.getElementById('sendToAiAssistant');
    const aiBody = document.getElementById('aiAssistantBody');

    // 拖拽功能
    let isDragging = false;
    let offsetX, offsetY;

    // 显示/隐藏AI助手
    if (aiButton && aiDialog) {
        aiButton.addEventListener('click', function() {
            aiDialog.classList.toggle('show');
            if (aiDialog.classList.contains('show')) {
                aiInput.focus();
            }
        });

        // 关闭AI助手
        if (closeAiButton) {
            closeAiButton.addEventListener('click', function() {
                aiDialog.classList.remove('show');
            });
        }

        // 拖拽开始
        aiDialog.querySelector('.ai-assistant-header').addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - aiDialog.getBoundingClientRect().left;
            offsetY = e.clientY - aiDialog.getBoundingClientRect().top;
            aiDialog.style.cursor = 'grabbing';
        });

        // 拖拽中
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            // 确保对话框不会被拖出视口
            const maxX = window.innerWidth - aiDialog.offsetWidth;
            const maxY = window.innerHeight - aiDialog.offsetHeight;
            
            aiDialog.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            aiDialog.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        });

        // 拖拽结束
        document.addEventListener('mouseup', function() {
            isDragging = false;
            aiDialog.style.cursor = 'default';
        });

        // 发送消息
        if (sendButton && aiInput) {
            sendButton.addEventListener('click', sendMessage);
            aiInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // 发送消息函数
    function sendMessage() {
        const message = aiInput.value.trim();
        if (message === '') return;

        // 添加用户消息
        addMessage('user', message);
        aiInput.value = '';

        // 模拟AI思考
        setTimeout(() => {
            // 根据用户消息生成AI回复
            let aiResponse = generateAiResponse(message);
            addMessage('ai', aiResponse);
        }, 1000);
    }

    // 添加消息到对话框
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';

        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="user-avatar"></div>
                <div class="message-content">${content}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="ai-avatar"></div>
                <div class="message-content">${content}</div>
            `;
        }

        aiBody.appendChild(messageDiv);
        aiBody.scrollTop = aiBody.scrollHeight;
    }

    // 根据用户输入生成AI回复
    function generateAiResponse(userMessage) {
        // 将用户消息转为小写以便匹配
        const lowerMessage = userMessage.toLowerCase();
        
        // 资源推荐相关问题
        if (lowerMessage.includes('推荐') || lowerMessage.includes('建议') || lowerMessage.includes('学习资源')) {
            if (lowerMessage.includes('数学') || lowerMessage.includes('math')) {
                return '根据你的兴趣，我推荐以下数学学习资源：<br>1. <b>SPM数学函数与微积分讲义</b> - 详细讲解函数、导数和积分的概念及应用<br>2. <b>SPM数学公式速查手册</b> - 包含所有必备公式，便于快速查阅<br>3. <b>统考数学历年试题解析</b> - 帮助你熟悉考试题型和解题思路';
            } else if (lowerMessage.includes('物理') || lowerMessage.includes('physics')) {
                return '为你推荐以下物理学习资源：<br>1. <b>统考物理力学视频教程</b> - 通过动画和实验演示讲解力学基本原理<br>2. <b>统考物理电磁学讲义</b> - 系统讲解电场、磁场、电磁感应等重要概念<br>3. <b>统考物理公式大全</b> - 涵盖所有章节的重要公式，配有使用场景说明';
            } else if (lowerMessage.includes('化学') || lowerMessage.includes('chemistry')) {
                return '为你推荐以下化学学习资源：<br>1. <b>SPM化学有机化学练习题</b> - 包含100道有机化学练习题<br>2. <b>统考化学实验操作指南</b> - 详细讲解实验步骤和注意事项<br>3. <b>化学方程式速记手册</b> - 整理常见化学反应方程式';
            } else {
                return '我可以为你推荐各科目的学习资源。请告诉我你感兴趣的科目（如数学、物理、化学、生物、华文、英文等），我会为你提供针对性的资源推荐。';
            }
        }
        // 学习方法相关问题
        else if (lowerMessage.includes('如何学习') || lowerMessage.includes('学习方法') || lowerMessage.includes('学习技巧')) {
            return '高效学习的几个关键步骤：<br>1. <b>制定明确的学习计划</b>，设定短期和长期目标<br>2. <b>分块学习</b>，每次专注25-30分钟，然后短暂休息<br>3. <b>主动复习</b>，使用间隔重复法巩固记忆<br>4. <b>练习题实战</b>，通过做题检验理解程度<br>5. <b>寻求反馈</b>，定期评估学习效果并调整方法<br><br>你想了解哪个科目的具体学习方法？';
        }
        // 考试相关问题
        else if (lowerMessage.includes('spm') || lowerMessage.includes('统考')) {
            return '备考SPM和统考的建议：<br>1. <b>熟悉考试大纲</b>，了解各科目的考点分布<br>2. <b>制定复习计划</b>，合理分配各科目的学习时间<br>3. <b>刷历年真题</b>，熟悉出题思路和答题技巧<br>4. <b>模拟考试训练</b>，提前适应考试环境和时间压力<br>5. <b>查漏补缺</b>，针对薄弱环节加强练习<br><br>我们平台提供了丰富的备考资源，包括历年试卷、模拟题和各科讲义，欢迎探索使用！';
        }
        // 网站功能相关问题
        else if (lowerMessage.includes('网站') || lowerMessage.includes('功能') || lowerMessage.includes('使用')) {
            return '左岸学习平台提供以下核心功能：<br>1. <b>题库系统</b>：SPM和统考全科题库，可在线做题并获得即时反馈<br>2. <b>学习资源</b>：各科讲义、视频教程、公式总结等学习材料<br>3. <b>论坛社区</b>：与其他学生交流学习经验，讨论难题<br>4. <b>时间管理</b>：帮助你规划学习时间，提高学习效率<br>5. <b>AI学习助手</b>：即时回答问题，提供学习建议<br><br>你想了解哪个功能的详细使用方法？';
        }
        // 默认回复
        else {
            return '你好！我是你的学习小精灵，可以帮你：<br>1. 推荐适合你的学习资源<br>2. 解答学习过程中的疑问<br>3. 提供学习方法和备考建议<br>4. 介绍网站功能的使用方法<br><br>请告诉我你需要什么帮助？';
        }
    }
}

/**
 * 初始化资源筛选功能
 */
function initResourceFilter() {
    const examTypeSelect = document.getElementById('examType');
    const subjectSelect = document.getElementById('subject');
    const resourceTypeSelect = document.getElementById('resourceType');
    const sortBySelect = document.getElementById('sortBy');
    const resetFilterBtn = document.getElementById('resetFilter');
    const applyFilterBtn = document.getElementById('applyFilter');

    // 重置筛选条件
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function() {
            if (examTypeSelect) examTypeSelect.value = 'all';
            if (subjectSelect) subjectSelect.value = 'all';
            if (resourceTypeSelect) resourceTypeSelect.value = 'all';
            if (sortBySelect) sortBySelect.value = 'newest';
        });
    }

    // 应用筛选条件
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            // 获取筛选条件
            const examType = examTypeSelect ? examTypeSelect.value : 'all';
            const subject = subjectSelect ? subjectSelect.value : 'all';
            const resourceType = resourceTypeSelect ? resourceTypeSelect.value : 'all';
            const sortBy = sortBySelect ? sortBySelect.value : 'newest';

            // 模拟筛选结果，实际项目中应该发送请求到服务器
            console.log('应用筛选条件：', {
                examType,
                subject,
                resourceType,
                sortBy
            });

            // 显示筛选中状态
            applyFilterBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 筛选中...';
            
            // 模拟加载延迟
            setTimeout(() => {
                // 恢复按钮状态
                applyFilterBtn.innerHTML = '应用筛选';
                
                // 显示筛选成功提示
                showToast('筛选条件已应用');
            }, 1000);
        });
    }

    // 考试类型变化时更新科目选项
    if (examTypeSelect) {
        examTypeSelect.addEventListener('change', function() {
            updateSubjectOptions(this.value);
        });
    }

    // 资源类型标签切换
    const resourceTabs = document.getElementById('resourceTabs');
    if (resourceTabs) {
        const tabLinks = resourceTabs.querySelectorAll('.nav-link');
        tabLinks.forEach(tab => {
            tab.addEventListener('click', function() {
                // 如果有资源类型选择器，更新其值
                if (resourceTypeSelect) {
                    const tabId = this.getAttribute('id');
                    if (tabId === 'all-tab') {
                        resourceTypeSelect.value = 'all';
                    } else if (tabId === 'notes-tab') {
                        resourceTypeSelect.value = 'notes';
                    } else if (tabId === 'videos-tab') {
                        resourceTypeSelect.value = 'video';
                    } else if (tabId === 'practice-tab') {
                        resourceTypeSelect.value = 'practice';
                    } else if (tabId === 'papers-tab') {
                        resourceTypeSelect.value = 'pastpaper';
                    } else if (tabId === 'formulas-tab') {
                        resourceTypeSelect.value = 'formula';
                    }
                }
            });
        });
    }
}

/**
 * 根据考试类型更新科目选项
 * @param {string} examType - 考试类型
 */
function updateSubjectOptions(examType) {
    const subjectSelect = document.getElementById('subject');
    if (!subjectSelect) return;

    // 清空当前选项
    subjectSelect.innerHTML = '<option value="all" selected>全部科目</option>';

    // 添加通用科目
    const commonSubjects = [
        { value: 'math', text: '数学' },
        { value: 'physics', text: '物理' },
        { value: 'chemistry', text: '化学' },
        { value: 'biology', text: '生物' },
        { value: 'chinese', text: '华文' },
        { value: 'english', text: '英文' },
        { value: 'malay', text: '马来文' }
    ];

    // 根据考试类型添加特定科目
    if (examType === 'spm') {
        commonSubjects.push(
            { value: 'history', text: '历史' },
            { value: 'geography', text: '地理' },
            { value: 'moral', text: '道德教育' }
        );
    } else if (examType === 'uec') {
        commonSubjects.push(
            { value: 'history', text: '历史' },
            { value: 'geography', text: '地理' },
            { value: 'commerce', text: '商业' },
            { value: 'accounting', text: '会计' }
        );
    }

    // 添加选项到下拉菜单
    commonSubjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.value;
        option.textContent = subject.text;
        subjectSelect.appendChild(option);
    });
}

/**
 * 初始化资源详情模态框
 */
function initResourceDetailModal() {
    // 获取所有资源卡片上的"查看详情"按钮
    const detailButtons = document.querySelectorAll('.resource-card .btn-primary');
    const resourceDetailModal = document.getElementById('resourceDetailModal');
    
    if (detailButtons.length > 0 && resourceDetailModal) {
        detailButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 获取资源卡片信息
                const card = this.closest('.resource-card');
                const title = card.querySelector('.card-title').textContent;
                const description = card.querySelector('.card-text').textContent;
                const resourceType = card.querySelector('.resource-type').textContent;
                const resourceSubject = card.querySelector('.resource-subject').textContent;
                
                // 更新模态框内容
                const modalTitle = resourceDetailModal.querySelector('.modal-title');
                const modalHeader = resourceDetailModal.querySelector('.resource-header h4');
                const modalSubject = resourceDetailModal.querySelector('.resource-subject');
                const modalType = resourceDetailModal.querySelector('.resource-type');
                
                if (modalTitle) modalTitle.textContent = '资源详情';
                if (modalHeader) modalHeader.textContent = title;
                if (modalSubject) modalSubject.textContent = resourceSubject;
                if (modalType) modalType.textContent = resourceType;
                
                // 显示模态框
                const modal = new bootstrap.Modal(resourceDetailModal);
                modal.show();
            });
        });
    }
}

/**
 * 检查用户登录状态
 */
function checkUserLoginStatus() {
    // 模拟检查用户登录状态，实际项目中应该从服务器获取
    const isLoggedIn = false; // 假设用户未登录
    
    // 获取学习统计卡片
    const learningStatsCard = document.querySelector('.card:has(.card-header:contains("我的学习统计"))');
    
    if (learningStatsCard) {
        const cardBody = learningStatsCard.querySelector('.card-body');
        
        if (cardBody) {
            if (isLoggedIn) {
                // 用户已登录，显示学习统计信息
                cardBody.innerHTML = `
                    <div class="mb-3">
                        <h6 class="mb-2">已学习资源</h6>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                        </div>
                        <small class="text-muted">已学习 26/40 个资源</small>
                    </div>
                    <div class="mb-3">
                        <h6 class="mb-2">学习时长</h6>
                        <p class="mb-0">本周：12小时30分钟</p>
                        <p class="mb-0">总计：156小时45分钟</p>
                    </div>
                    <div class="d-grid">
                        <a href="#" class="btn btn-outline-primary">查看详细统计</a>
                    </div>
                `;
            }
            // 如果用户未登录，保持原有内容不变
        }
    }
}

/**
 * 显示提示消息
 * @param {string} message - 提示消息内容
 */
function showToast(message) {
    // 创建提示元素
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '1070';
    
    const toastElement = document.createElement('div');
    toastElement.className = 'toast align-items-center text-white bg-primary border-0';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    
    toastElement.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    document.body.appendChild(toastContainer);
    
    // 显示提示
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    toast.show();
    
    // 提示消失后移除元素
    toastElement.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toastContainer);
    });
}