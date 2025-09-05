/**
 * 论坛页面JavaScript功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 帖子排序功能
    const sortSelect = document.querySelector('select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortPosts(this.value);
        });
    }

    // 标签点击事件
    const tagItems = document.querySelectorAll('.tag-item, .post-tag');
    tagItems.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            filterByTag(this.textContent);
        });
    });

    // 发布新帖子表单验证
    const newPostForm = document.querySelector('#newPostModal form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validatePostForm()) {
                submitNewPost();
            }
        });

        // 发布按钮点击事件
        const publishButton = document.querySelector('#newPostModal .btn-primary');
        if (publishButton) {
            publishButton.addEventListener('click', function() {
                if (validatePostForm()) {
                    submitNewPost();
                }
            });
        }
    }

    // 标签输入处理
    const tagsInput = document.getElementById('postTags');
    if (tagsInput) {
        tagsInput.addEventListener('input', function() {
            validateTags(this.value);
        });
    }

    // 初始化AI助手功能
    initAiAssistant();
});

/**
 * 帖子排序功能
 * @param {string} sortType - 排序类型：newest, hottest, most_replies
 */
function sortPosts(sortType) {
    const postsContainer = document.querySelector('.forum-posts');
    const posts = Array.from(postsContainer.querySelectorAll('.forum-post:not(.sticky-post)'));
    const stickyPosts = Array.from(postsContainer.querySelectorAll('.sticky-post'));
    
    // 根据不同排序类型进行排序
    switch (sortType) {
        case 'newest':
            posts.sort((a, b) => {
                const dateA = new Date(a.querySelector('.post-date').textContent);
                const dateB = new Date(b.querySelector('.post-date').textContent);
                return dateB - dateA; // 降序，最新的在前
            });
            break;
        case 'hottest':
            posts.sort((a, b) => {
                const viewsA = parseInt(a.querySelector('.bi-eye').nextSibling.textContent.trim());
                const viewsB = parseInt(b.querySelector('.bi-eye').nextSibling.textContent.trim());
                return viewsB - viewsA; // 降序，浏览量最多的在前
            });
            break;
        case 'most_replies':
            posts.sort((a, b) => {
                const repliesA = parseInt(a.querySelector('.bi-chat').nextSibling.textContent.trim());
                const repliesB = parseInt(b.querySelector('.bi-chat').nextSibling.textContent.trim());
                return repliesB - repliesA; // 降序，回复最多的在前
            });
            break;
    }
    
    // 清空容器
    postsContainer.innerHTML = '';
    
    // 先添加置顶帖
    stickyPosts.forEach(post => {
        postsContainer.appendChild(post);
    });
    
    // 再添加排序后的普通帖
    posts.forEach(post => {
        postsContainer.appendChild(post);
    });
}

/**
 * 根据标签筛选帖子
 * @param {string} tag - 标签文本
 */
function filterByTag(tag) {
    // 移除#号
    tag = tag.replace('#', '');
    
    // 显示筛选结果提示
    alert(`正在筛选标签: ${tag}\n此功能将在后端实现完成后生效。`);
    
    // 实际项目中，这里应该发送请求到后端获取筛选结果
    // 或者在前端进行筛选，隐藏不包含该标签的帖子
    
    // 模拟筛选效果，高亮包含该标签的帖子
    const posts = document.querySelectorAll('.forum-post');
    posts.forEach(post => {
        const postTags = post.querySelectorAll('.post-tag');
        let hasTag = false;
        
        postTags.forEach(postTag => {
            if (postTag.textContent.replace('#', '').toLowerCase() === tag.toLowerCase()) {
                hasTag = true;
            }
        });
        
        if (hasTag) {
            post.style.borderLeft = '4px solid var(--bs-primary)';
            post.style.backgroundColor = 'rgba(13, 110, 253, 0.03)';
        } else {
            post.style.borderLeft = '';
            post.style.backgroundColor = '';
        }
    });
}

/**
 * 验证发帖表单
 * @returns {boolean} 表单是否有效
 */
function validatePostForm() {
    const title = document.getElementById('postTitle').value.trim();
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value.trim();
    const tags = document.getElementById('postTags').value.trim();
    
    let isValid = true;
    let errorMessage = '';
    
    // 验证标题
    if (title === '') {
        errorMessage += '请输入帖子标题\n';
        isValid = false;
    } else if (title.length < 5) {
        errorMessage += '标题至少需要5个字符\n';
        isValid = false;
    } else if (title.length > 100) {
        errorMessage += '标题不能超过100个字符\n';
        isValid = false;
    }
    
    // 验证分类
    if (!category) {
        errorMessage += '请选择帖子分类\n';
        isValid = false;
    }
    
    // 验证内容
    if (content === '') {
        errorMessage += '请输入帖子内容\n';
        isValid = false;
    } else if (content.length < 10) {
        errorMessage += '内容至少需要10个字符\n';
        isValid = false;
    }
    
    // 验证标签
    if (tags !== '') {
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        if (tagArray.length > 5) {
            errorMessage += '标签不能超过5个\n';
            isValid = false;
        }
        
        for (const tag of tagArray) {
            if (tag.length > 10) {
                errorMessage += `标签"${tag}"超过10个字符\n`;
                isValid = false;
                break;
            }
        }
    }
    
    if (!isValid) {
        alert(errorMessage);
    }
    
    return isValid;
}

/**
 * 验证标签输入
 * @param {string} tagsInput - 标签输入字符串
 */
function validateTags(tagsInput) {
    const tagsField = document.getElementById('postTags');
    const tagArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (tagArray.length > 5) {
        tagsField.classList.add('is-invalid');
        // 如果有反馈元素，可以显示错误信息
        const feedback = tagsField.nextElementSibling;
        if (feedback && feedback.classList.contains('form-text')) {
            feedback.classList.add('text-danger');
            feedback.textContent = '最多添加5个标签';
        }
    } else {
        tagsField.classList.remove('is-invalid');
        const feedback = tagsField.nextElementSibling;
        if (feedback && feedback.classList.contains('form-text')) {
            feedback.classList.remove('text-danger');
            feedback.textContent = '最多添加5个标签，每个标签不超过10个字符';
        }
        
        // 检查每个标签的长度
        for (const tag of tagArray) {
            if (tag.length > 10) {
                tagsField.classList.add('is-invalid');
                const feedback = tagsField.nextElementSibling;
                if (feedback && feedback.classList.contains('form-text')) {
                    feedback.classList.add('text-danger');
                    feedback.textContent = `标签"${tag}"超过10个字符`;
                }
                break;
            }
        }
    }
}

/**
 * 提交新帖子
 */
function submitNewPost() {
    const title = document.getElementById('postTitle').value.trim();
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value.trim();
    const tags = document.getElementById('postTags').value.trim();
    const attachments = document.getElementById('postAttachment').files;
    
    // 在实际项目中，这里应该发送请求到后端保存帖子
    console.log('提交新帖子:', { title, category, content, tags, attachments });
    
    // 模拟提交成功
    alert('帖子发布成功！页面将刷新以显示最新内容。');
    
    // 关闭模态框
    const modal = bootstrap.Modal.getInstance(document.getElementById('newPostModal'));
    modal.hide();
    
    // 在实际项目中，这里应该重新加载页面或者添加新帖子到列表
    // 模拟刷新页面
    setTimeout(() => {
        // window.location.reload();
        // 为了演示，这里不实际刷新页面
        addNewPostToList(title, category, content, tags);
    }, 500);
}

/**
 * 将新帖子添加到列表（模拟）
 */
function addNewPostToList(title, category, content, tags) {
    const postsContainer = document.querySelector('.forum-posts');
    const firstPost = postsContainer.querySelector('.forum-post:not(.sticky-post)');
    
    // 创建新帖子元素
    const newPost = document.createElement('div');
    newPost.className = 'card mb-3 forum-post';
    newPost.style.backgroundColor = '#f8f9fa'; // 高亮新帖子
    newPost.style.animation = 'fadeIn 1s';
    
    // 获取分类显示名称
    let categoryName = '其他';
    switch (category) {
        case 'study_exp': categoryName = '学习经验'; break;
        case 'exam_info': categoryName = '考试资讯'; break;
        case 'question_discuss': categoryName = '题目讨论'; break;
        case 'school_life': categoryName = '学校生活'; break;
        case 'college_plan': categoryName = '升学规划'; break;
    }
    
    // 处理标签
    let tagsHtml = '';
    if (tags) {
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        tagsHtml = tagArray.map(tag => `<a href="#" class="post-tag">#${tag}</a>`).join(' ');
    }
    
    // 设置帖子内容
    const currentDate = new Date().toISOString().split('T')[0]; // 格式：YYYY-MM-DD
    const contentPreview = content.length > 100 ? content.substring(0, 100) + '...' : content;
    
    newPost.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center mb-2">
                <span class="badge bg-info text-dark me-2">新帖</span>
                <h5 class="card-title mb-0">
                    <a href="#" class="post-title">${title}</a>
                </h5>
            </div>
            <div class="post-meta mb-3">
                <div class="d-flex align-items-center">
                    <img src="https://via.placeholder.com/30" alt="当前用户" class="rounded-circle me-2">
                    <span class="post-author">当前用户</span>
                    <span class="mx-2">·</span>
                    <span class="post-date">${currentDate}</span>
                    <span class="mx-2">·</span>
                    <span class="post-category">${categoryName}</span>
                </div>
            </div>
            <p class="card-text">${contentPreview}</p>
            ${tagsHtml ? `<div class="post-tags mb-3">${tagsHtml}</div>` : ''}
            <div class="post-stats d-flex align-items-center">
                <span class="me-3"><i class="bi bi-eye"></i> 0</span>
                <span class="me-3"><i class="bi bi-chat"></i> 0</span>
                <span><i class="bi bi-hand-thumbs-up"></i> 0</span>
            </div>
        </div>
    `;
    
    // 添加到列表顶部（置顶帖之后）
    if (firstPost) {
        postsContainer.insertBefore(newPost, firstPost);
    } else {
        postsContainer.appendChild(newPost);
    }
    
    // 添加标签点击事件
    const newTags = newPost.querySelectorAll('.post-tag');
    newTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            filterByTag(this.textContent);
        });
    });
    
    // 重置表单
    document.getElementById('postTitle').value = '';
    document.getElementById('postCategory').selectedIndex = 0;
    document.getElementById('postContent').value = '';
    document.getElementById('postTags').value = '';
    document.getElementById('postAttachment').value = '';
}

/**
 * 初始化AI助手功能
 */
function initAiAssistant() {
    // 获取AI助手相关元素
    const aiButton = document.getElementById('aiAssistantButton');
    const aiDialog = document.getElementById('aiAssistantDialog');
    const closeButton = document.getElementById('closeAiAssistant');
    const aiInput = document.getElementById('aiAssistantInput');
    const sendButton = document.getElementById('sendToAiAssistant');
    const aiBody = document.getElementById('aiAssistantBody');
    
    // 显示/隐藏AI助手对话框
    if (aiButton && aiDialog) {
        aiButton.addEventListener('click', function() {
            aiDialog.classList.toggle('active');
            if (aiDialog.classList.contains('active')) {
                aiInput.focus();
            }
        });
    }
    
    // 关闭AI助手对话框
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            aiDialog.classList.remove('active');
        });
    }
    
    // 发送消息到AI助手
    if (sendButton && aiInput) {
        // 按钮点击发送
        sendButton.addEventListener('click', function() {
            sendMessageToAI();
        });
        
        // 回车键发送
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessageToAI();
            }
        });
    }
    
    // 使AI助手对话框可拖动
    if (aiDialog) {
        makeDialogDraggable(aiDialog);
    }
    
    /**
     * 发送消息到AI助手
     */
    function sendMessageToAI() {
        const message = aiInput.value.trim();
        if (message === '') return;
        
        // 添加用户消息到对话框
        addMessage('user', message);
        
        // 清空输入框
        aiInput.value = '';
        
        // 显示AI正在输入
        showAITyping();
        
        // 模拟AI回复（实际项目中应该发送请求到后端）
        setTimeout(() => {
            // 移除正在输入提示
            const typingElement = aiBody.querySelector('.ai-typing');
            if (typingElement) {
                aiBody.removeChild(typingElement);
            }
            
            // 根据用户消息生成AI回复
            let aiResponse = '';
            
            // 简单的关键词匹配（实际项目中应使用更复杂的NLP或调用AI API）
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('你好') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
                aiResponse = '你好！我是学习小精灵，有什么可以帮助你的吗？';
            } 
            else if (lowerMessage.includes('spm') || lowerMessage.includes('统考')) {
                aiResponse = '关于考试备考，我建议你制定一个详细的学习计划，并利用我们平台上的题库和资源进行针对性练习。你需要哪个科目的具体帮助呢？';
            }
            else if (lowerMessage.includes('数学')) {
                aiResponse = '数学学习需要理解概念和大量练习。我们平台上有针对SPM和统考的数学题库，包含了各种难度的题目。你可以先从基础概念开始，然后逐步挑战更难的题目。需要我为你推荐一些数学学习资源吗？';
            }
            else if (lowerMessage.includes('物理') || lowerMessage.includes('化学') || lowerMessage.includes('生物')) {
                aiResponse = '理科学习需要理解原理和公式，并通过实验和练习加深理解。我们平台上有详细的讲义和实验视频，可以帮助你更好地掌握这些科目。你有什么具体的问题吗？';
            }
            else if (lowerMessage.includes('论坛') || lowerMessage.includes('发帖')) {
                aiResponse = '在论坛上发帖很简单！点击页面上方的"发布新帖子"按钮，填写标题、选择分类、编写内容并添加相关标签，然后点击发布即可。记得遵守论坛规则哦！';
            }
            else if (lowerMessage.includes('时间管理') || lowerMessage.includes('学习计划')) {
                aiResponse = '良好的时间管理对学习非常重要。我建议你使用我们平台的时间管理功能，设置学习目标和时间段，我会帮你监督执行。你可以尝试番茄工作法，每25分钟专注学习，然后休息5分钟。要了解更多时间管理技巧吗？';
            }
            else {
                aiResponse = '谢谢你的提问！我正在学习中，目前还不能完全理解你的问题。你可以尝试更具体地描述你的需求，或者浏览我们的论坛和题库获取相关信息。';
            }
            
            // 添加AI回复
            addMessage('ai', aiResponse);
            
            // 滚动到底部
            aiBody.scrollTop = aiBody.scrollHeight;
        }, 1000);
    }
    
    /**
     * 添加消息到对话框
     * @param {string} type - 消息类型：'user' 或 'ai'
     * @param {string} text - 消息内容
     */
    function addMessage(type, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
        
        if (type === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
                <div class="user-avatar"></div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="ai-avatar"></div>
                <div class="message-content">${text}</div>
            `;
        }
        
        aiBody.appendChild(messageDiv);
        aiBody.scrollTop = aiBody.scrollHeight;
    }
    
    /**
     * 显示AI正在输入的提示
     */
    function showAITyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message ai-typing';
        typingDiv.innerHTML = `
            <div class="ai-avatar"></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        aiBody.appendChild(typingDiv);
        aiBody.scrollTop = aiBody.scrollHeight;
    }
    
    /**
     * 使对话框可拖动
     * @param {HTMLElement} element - 要使其可拖动的元素
     */
    function makeDialogDraggable(element) {
        const header = element.querySelector('.ai-assistant-header');
        if (!header) return;
        
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        header.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // 获取鼠标位置
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // 鼠标移动时调用函数
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // 计算新位置
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // 设置元素的新位置
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // 停止移动
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}