/**
 * La Rive Gauche 左岸学习平台 - 时间管理页面脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化计时器
    initTimer();
    
    // 初始化任务管理
    initTaskManager();
    
    // 初始化音乐播放器
    initMusicPlayer();
    
    // 初始化AI助手
    initAiAssistant();
});

/**
 * 初始化计时器功能
 */
function initTimer() {
    // 获取DOM元素
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('startTimer');
    const pauseButton = document.getElementById('pauseTimer');
    const resetButton = document.getElementById('resetTimer');
    const studyTimeSlider = document.getElementById('studyTime');
    const breakTimeSlider = document.getElementById('breakTime');
    const studyTimeValue = document.getElementById('studyTimeValue');
    const breakTimeValue = document.getElementById('breakTimeValue');
    const timerDisplay = document.querySelector('.timer-display');
    
    // 计时器状态
    let timer;
    let isRunning = false;
    let isPaused = false;
    let isBreakTime = false;
    let totalSeconds = 25 * 60; // 默认25分钟
    let remainingSeconds = totalSeconds;
    let studyDuration = 25; // 默认学习时长25分钟
    let breakDuration = 5; // 默认休息时长5分钟
    
    // 更新时间显示
    function updateDisplay() {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // 当剩余时间少于1分钟时添加警告样式
        if (remainingSeconds < 60) {
            timerDisplay.classList.add('warning');
        } else {
            timerDisplay.classList.remove('warning');
        }
        
        // 更新页面标题，显示剩余时间
        document.title = `(${minutes}:${seconds.toString().padStart(2, '0')}) ${isBreakTime ? '休息时间' : '学习时间'} - La Rive Gauche 左岸`;
    }
    
    // 开始计时器
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            isPaused = false;
            
            startButton.disabled = true;
            pauseButton.disabled = false;
            
            timer = setInterval(function() {
                remainingSeconds--;
                
                if (remainingSeconds < 0) {
                    clearInterval(timer);
                    playAlarm();
                    
                    if (isBreakTime) {
                        // 休息结束，切换到学习时间
                        isBreakTime = false;
                        remainingSeconds = studyDuration * 60;
                        timerDisplay.classList.remove('break-time');
                        showNotification('休息时间结束', '开始新的学习阶段！');
                    } else {
                        // 学习结束，切换到休息时间
                        isBreakTime = true;
                        remainingSeconds = breakDuration * 60;
                        timerDisplay.classList.add('break-time');
                        showNotification('学习时间结束', '休息一下吧！');
                    }
                    
                    updateDisplay();
                    isRunning = false;
                    startButton.disabled = false;
                    pauseButton.disabled = true;
                } else {
                    updateDisplay();
                }
            }, 1000);
        }
    }
    
    // 暂停计时器
    function pauseTimer() {
        if (isRunning && !isPaused) {
            clearInterval(timer);
            isPaused = true;
            isRunning = false;
            startButton.disabled = false;
            startButton.innerHTML = '<i class="fas fa-play"></i> 继续';
        }
    }
    
    // 重置计时器
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isPaused = false;
        isBreakTime = false;
        
        remainingSeconds = studyDuration * 60;
        updateDisplay();
        
        startButton.disabled = false;
        pauseButton.disabled = true;
        startButton.innerHTML = '<i class="fas fa-play"></i> 开始';
        
        timerDisplay.classList.remove('break-time');
        timerDisplay.classList.remove('warning');
        
        // 恢复原始页面标题
        document.title = '时间管理 - La Rive Gauche 左岸';
    }
    
    // 播放提示音
    function playAlarm() {
        // 创建音频上下文
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 设置音量
        gainNode.gain.value = 0.1;
        
        // 设置音调
        oscillator.type = 'sine';
        oscillator.frequency.value = 800;
        
        // 播放声音
        oscillator.start();
        
        // 0.5秒后停止
        setTimeout(function() {
            oscillator.stop();
        }, 500);
    }
    
    // 显示通知
    function showNotification(title, message) {
        // 检查浏览器是否支持通知
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification');
        } else if (Notification.permission === 'granted') {
            // 创建通知
            new Notification(title, {
                body: message,
                icon: '../images/logo.svg'
            });
        } else if (Notification.permission !== 'denied') {
            // 请求权限
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    new Notification(title, {
                        body: message,
                        icon: '../images/logo.svg'
                    });
                }
            });
        }
    }
    
    // 更新学习时长显示
    function updateStudyTimeValue() {
        studyDuration = parseInt(studyTimeSlider.value);
        studyTimeValue.textContent = studyDuration;
        
        // 如果不在运行状态，更新剩余时间
        if (!isRunning && !isBreakTime) {
            remainingSeconds = studyDuration * 60;
            updateDisplay();
        }
    }
    
    // 更新休息时长显示
    function updateBreakTimeValue() {
        breakDuration = parseInt(breakTimeSlider.value);
        breakTimeValue.textContent = breakDuration;
        
        // 如果不在运行状态且处于休息时间，更新剩余时间
        if (!isRunning && isBreakTime) {
            remainingSeconds = breakDuration * 60;
            updateDisplay();
        }
    }
    
    // 添加事件监听器
    if (startButton) {
        startButton.addEventListener('click', startTimer);
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', pauseTimer);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetTimer);
    }
    
    if (studyTimeSlider) {
        studyTimeSlider.addEventListener('input', updateStudyTimeValue);
    }
    
    if (breakTimeSlider) {
        breakTimeSlider.addEventListener('input', updateBreakTimeValue);
    }
    
    // 初始化显示
    updateDisplay();
}

/**
 * 初始化任务管理功能
 */
function initTaskManager() {
    const taskList = document.getElementById('taskList');
    const saveTaskButton = document.getElementById('saveTask');
    const taskNameInput = document.getElementById('taskName');
    const taskSubjectSelect = document.getElementById('taskSubject');
    const taskDurationInput = document.getElementById('taskDuration');
    const taskPrioritySelect = document.getElementById('taskPriority');
    const addTaskModal = document.getElementById('addTaskModal');
    
    // 如果页面上没有任务列表，则返回
    if (!taskList) return;
    
    // 为现有的删除按钮添加事件监听器
    addDeleteTaskListeners();
    
    // 为现有的复选框添加事件监听器
    addCheckboxListeners();
    
    // 保存任务
    if (saveTaskButton) {
        saveTaskButton.addEventListener('click', function() {
            // 获取表单数据
            const taskName = taskNameInput.value.trim();
            const taskSubject = taskSubjectSelect.value;
            const taskDuration = taskDurationInput.value;
            const taskPriority = taskPrioritySelect.value;
            
            // 验证表单
            if (!taskName || !taskSubject || !taskDuration) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 创建新任务
            const newTaskId = 'task' + Date.now();
            const newTask = document.createElement('li');
            newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
            newTask.innerHTML = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="${newTaskId}">
                    <label class="form-check-label" for="${newTaskId}">${taskName}</label>
                </div>
                <div>
                    <span class="badge bg-primary rounded-pill me-2">${taskSubject}</span>
                    <span class="badge bg-info rounded-pill">${taskDuration}分钟</span>
                    <button class="btn btn-sm btn-outline-danger ms-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            // 添加到任务列表
            taskList.appendChild(newTask);
            
            // 为新任务添加事件监听器
            const deleteButton = newTask.querySelector('.btn-outline-danger');
            if (deleteButton) {
                deleteButton.addEventListener('click', function() {
                    taskList.removeChild(newTask);
                });
            }
            
            const checkbox = newTask.querySelector('.form-check-input');
            if (checkbox) {
                checkbox.addEventListener('change', function() {
                    const label = this.nextElementSibling;
                    if (this.checked) {
                        label.style.textDecoration = 'line-through';
                        label.style.color = '#6c757d';
                    } else {
                        label.style.textDecoration = 'none';
                        label.style.color = '';
                    }
                });
            }
            
            // 重置表单
            taskNameInput.value = '';
            taskSubjectSelect.selectedIndex = 0;
            taskDurationInput.value = '30';
            taskPrioritySelect.selectedIndex = 1;
            
            // 关闭模态框
            const modal = bootstrap.Modal.getInstance(addTaskModal);
            modal.hide();
        });
    }
    
    // 为删除按钮添加事件监听器
    function addDeleteTaskListeners() {
        const deleteButtons = taskList.querySelectorAll('.btn-outline-danger');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const listItem = this.closest('.list-group-item');
                taskList.removeChild(listItem);
            });
        });
    }
    
    // 为复选框添加事件监听器
    function addCheckboxListeners() {
        const checkboxes = taskList.querySelectorAll('.form-check-input');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const label = this.nextElementSibling;
                if (this.checked) {
                    label.style.textDecoration = 'line-through';
                    label.style.color = '#6c757d';
                } else {
                    label.style.textDecoration = 'none';
                    label.style.color = '';
                }
            });
        });
    }
}

/**
 * 初始化音乐播放器功能
 */
function initMusicPlayer() {
    // 模拟音乐播放器功能
    const playButton = document.querySelector('.player-controls .btn-primary');
    const prevButton = document.querySelector('.player-controls .btn:first-child');
    const nextButton = document.querySelector('.player-controls .btn:last-child');
    const progressBar = document.querySelector('.music-player .progress-bar');
    const playlistItems = document.querySelectorAll('.playlist .list-group-item');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    
    // 音乐播放状态
    let isPlaying = false;
    let currentTrackIndex = 0;
    let progressInterval;
    
    // 音乐列表
    const tracks = [
        { title: '专注学习音乐', artist: '左岸音乐', duration: '4:30' },
        { title: '轻松钢琴曲', artist: '左岸音乐', duration: '3:45' },
        { title: '自然白噪音', artist: '左岸音乐', duration: '5:20' },
        { title: '雨声冥想', artist: '左岸音乐', duration: '6:15' }
    ];
    
    // 播放/暂停音乐
    if (playButton) {
        playButton.addEventListener('click', function() {
            if (isPlaying) {
                // 暂停音乐
                isPlaying = false;
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                clearInterval(progressInterval);
            } else {
                // 播放音乐
                isPlaying = true;
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                
                // 模拟进度条更新
                let progress = parseInt(progressBar.style.width) || 0;
                progressInterval = setInterval(function() {
                    progress += 1;
                    if (progress > 100) {
                        progress = 0;
                        playNextTrack();
                    }
                    progressBar.style.width = progress + '%';
                }, 1000);
            }
        });
    }
    
    // 上一首
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            updateTrackInfo();
            resetProgress();
        });
    }
    
    // 下一首
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            playNextTrack();
        });
    }
    
    // 播放列表项点击
    if (playlistItems.length > 0) {
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // 移除所有项的active类
                playlistItems.forEach(i => i.classList.remove('active'));
                
                // 添加active类到当前项
                this.classList.add('active');
                
                // 更新当前曲目索引和信息
                currentTrackIndex = index;
                updateTrackInfo();
                resetProgress();
                
                // 如果没有播放，开始播放
                if (!isPlaying && playButton) {
                    playButton.click();
                }
            });
        });
    }
    
    // 播放下一首
    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateTrackInfo();
        resetProgress();
        
        // 更新播放列表选中状态
        if (playlistItems.length > 0) {
            playlistItems.forEach(i => i.classList.remove('active'));
            playlistItems[currentTrackIndex].classList.add('active');
        }
    }
    
    // 更新曲目信息
    function updateTrackInfo() {
        if (trackTitle) trackTitle.textContent = tracks[currentTrackIndex].title;
        if (trackArtist) trackArtist.textContent = tracks[currentTrackIndex].artist;
    }
    
    // 重置进度条
    function resetProgress() {
        if (progressBar) progressBar.style.width = '0%';
    }
}

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
        
        // 时间管理相关问题
        if (lowerMessage.includes('时间管理') || lowerMessage.includes('专注') || lowerMessage.includes('计时器')) {
            return '专注计时器使用方法：<br>1. 设置学习时长和休息时长<br>2. 点击"开始"按钮开始计时<br>3. 专注学习，直到计时结束<br>4. 休息时间结束后，开始新的学习周期<br><br>这种方法基于番茄工作法，能有效提高学习效率和专注力。';
        }
        // 任务管理相关问题
        else if (lowerMessage.includes('任务') || lowerMessage.includes('待办') || lowerMessage.includes('添加任务')) {
            return '学习任务管理功能：<br>1. 点击"添加任务"按钮创建新任务<br>2. 填写任务名称、科目、预计时长和优先级<br>3. 完成任务后勾选复选框<br>4. 不需要的任务可以删除<br><br>建议按照优先级和难度合理安排任务，先完成重要且紧急的任务。';
        }
        // 音乐相关问题
        else if (lowerMessage.includes('音乐') || lowerMessage.includes('播放') || lowerMessage.includes('声音')) {
            return '学习音乐推荐：<br>1. <b>专注学习音乐</b> - 节奏平稳，适合长时间学习<br>2. <b>轻松钢琴曲</b> - 舒缓的钢琴曲，减轻学习压力<br>3. <b>自然白噪音</b> - 屏蔽干扰，提高专注力<br>4. <b>雨声冥想</b> - 放松心情，适合休息时段<br><br>研究表明，适当的背景音乐可以提高学习效率，但音量不宜过大。';
        }
        // 学习方法相关问题
        else if (lowerMessage.includes('如何学习') || lowerMessage.includes('学习方法') || lowerMessage.includes('学习技巧')) {
            return '高效学习的几个关键步骤：<br>1. <b>制定明确的学习计划</b>，设定短期和长期目标<br>2. <b>分块学习</b>，每次专注25-30分钟，然后短暂休息<br>3. <b>主动复习</b>，使用间隔重复法巩固记忆<br>4. <b>练习题实战</b>，通过做题检验理解程度<br>5. <b>寻求反馈</b>，定期评估学习效果并调整方法<br><br>你想了解哪个科目的具体学习方法？';
        }
        // 默认回复
        else {
            return '你好！我是你的学习小精灵，可以帮你：<br>1. 使用专注计时器提高学习效率<br>2. 管理学习任务和进度<br>3. 推荐适合学习的背景音乐<br>4. 提供学习方法和时间管理建议<br><br>请告诉我你需要什么帮助？';
        }
    }
}