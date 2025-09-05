
document.addEventListener('DOMContentLoaded', function() {
    // AI助手功能
    const aiAssistantButton = document.getElementById('aiAssistantButton');
    const aiAssistantDialog = document.getElementById('aiAssistantDialog');
    const closeAiAssistant = document.getElementById('closeAiAssistant');
    const aiAssistantInput = document.getElementById('aiAssistantInput');
    const sendToAiAssistant = document.getElementById('sendToAiAssistant');
    const aiAssistantBody = document.getElementById('aiAssistantBody');
    
    // 显示/隐藏AI助手对话框
    aiAssistantButton.addEventListener('click', function() {
        aiAssistantDialog.style.display = 'flex';
    });
    
    closeAiAssistant.addEventListener('click', function() {
        aiAssistantDialog.style.display = 'none';
    });
    
    // 发送消息到AI助手
    function sendMessage() {
        const message = aiAssistantInput.value.trim();
        if (message) {
            // 添加用户消息到对话框
            const userMessageHTML = `
                <div class="ai-message user-message">
                    <div class="ai-avatar"></div>
                    <div class="message-content">
                        ${message}
                    </div>
                </div>
            `;
            aiAssistantBody.innerHTML += userMessageHTML;
            
            // 清空输入框
            aiAssistantInput.value = '';
            
            // 滚动到底部
            aiAssistantBody.scrollTop = aiAssistantBody.scrollHeight;
            
            // 模拟AI回复
            setTimeout(function() {
                simulateAIResponse(message);
            }, 1000);
        }
    }
    
    sendToAiAssistant.addEventListener('click', sendMessage);
    
    aiAssistantInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 模拟AI回复
    function simulateAIResponse(userMessage) {
        let response = "我正在处理你的问题，请稍等...";
        
        // 简单的关键词匹配回复
        if (userMessage.toLowerCase().includes('你好') || userMessage.toLowerCase().includes('hi') || userMessage.toLowerCase().includes('hello')) {
            response = "你好！我是你的学习小精灵，有什么可以帮助你的吗？";
        } else if (userMessage.toLowerCase().includes('谢谢') || userMessage.toLowerCase().includes('thank')) {
            response = "不客气！如果还有其他问题，随时可以问我。";
        } else if (userMessage.toLowerCase().includes('spm') || userMessage.toLowerCase().includes('统考')) {
            response = "我们平台提供全面的SPM和统考备考资源，包括历年真题、模拟试题和详细解析。你需要哪个科目的资料呢？";
        } else if (userMessage.toLowerCase().includes('题库') || userMessage.toLowerCase().includes('练习')) {
            response = "我们的题库系统按科目、难度和类型分类，你可以根据自己的需求选择适合的题目练习。需要我为你推荐一些题目吗？";
        } else if (userMessage.toLowerCase().includes('学习计划') || userMessage.toLowerCase().includes('时间管理')) {
            response = "制定学习计划是提高效率的好方法！你可以在“时间管理”页面设置你的学习计划，我会帮你记录并提醒。需要我帮你制定一个计划吗？";
        } else if (userMessage.toLowerCase().includes('音乐') || userMessage.toLowerCase().includes('专注')) {
            response = "我们有专门的学习音乐推荐功能，可以根据你的喜好推荐适合学习的背景音乐。你喜欢什么类型的音乐呢？";
        } else {
            response = "这是个很好的问题！我需要更多信息来帮助你。你能具体说明一下你的需求吗？";
        }
        
        // 添加AI回复到对话框
        const aiMessageHTML = `
            <div class="ai-message">
                <div class="ai-avatar"></div>
                <div class="message-content">
                    ${response}
                </div>
            </div>
        `;
        aiAssistantBody.innerHTML += aiMessageHTML;
        
        // 滚动到底部
        aiAssistantBody.scrollTop = aiAssistantBody.scrollHeight;
    }
    
    // 使AI助手可拖拽
    const aiAssistantHeader = document.querySelector('.ai-assistant-header');
    makeDraggable(aiAssistantDialog, aiAssistantHeader);
    
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        if (handle) {
            // 如果指定了拖拽把手，则把手触发拖拽事件
            handle.onmousedown = dragMouseDown;
        } else {
            // 否则整个元素触发拖拽事件
            element.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // 获取鼠标初始位置
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // 鼠标移动时调用elementDrag函数
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
            element.style.bottom = 'auto';
            element.style.right = 'auto';
        }
        
        function closeDragElement() {
            // 停止拖拽
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // 轮播图自动播放
    const mainCarousel = document.getElementById('mainCarousel');
    if (mainCarousel) {
        const carousel = new bootstrap.Carousel(mainCarousel, {
            interval: 5000,
            wrap: true
        });
    }
    
    // 用户反馈轮播图
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 8000,
            wrap: true
        });
    }
    
    // 表单验证
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // 注册表单密码确认验证
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (registerPassword && confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (registerPassword.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('密码不匹配');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
        
        registerPassword.addEventListener('input', function() {
            if (registerPassword.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('密码不匹配');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时导航栏效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
});