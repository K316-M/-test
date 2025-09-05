/**
 * SPM电子课本展示功能
 */

// 加载电子课本数据
document.addEventListener('DOMContentLoaded', function() {
    // 加载电子课本数据
    loadTextbooks();
});

/**
 * 加载电子课本数据
 */
function loadTextbooks() {
    // 获取中四和中五电子课本容器
    const t4Container = document.getElementById('t4-textbooks');
    const t5Container = document.getElementById('t5-textbooks');
    
    if (!t4Container || !t5Container) return;
    
    // 清空容器
    t4Container.innerHTML = '';
    t5Container.innerHTML = '';
    
    // 加载中四电子课本
    spmTextbooks.filter(book => book.form === 'form4').forEach(book => {
        t4Container.appendChild(createTextbookCard(book));
    });
    
    // 加载中五电子课本
    spmTextbooks.filter(book => book.form === 'form5').forEach(book => {
        t5Container.appendChild(createTextbookCard(book));
    });
}

/**
 * 创建电子课本卡片
 * @param {Object} book - 电子课本数据
 * @returns {HTMLElement} - 电子课本卡片元素
 */
function createTextbookCard(book) {
    // 创建卡片容器
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 col-xl-3';
    
    // 创建卡片
    const card = document.createElement('div');
    card.className = 'card textbook-card h-100';
    
    // 创建卡片内容
    card.innerHTML = `
        <div class="textbook-cover">
            <img src="${book.cover}" alt="${book.title} 封面" class="img-fluid">
        </div>
        <div class="card-body">
            <div class="textbook-subject ${book.subject}">${book.subjectName}</div>
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.description}</p>
        </div>
        <div class="card-footer">
            <button class="btn btn-sm btn-primary view-textbook" data-id="${book.id}" data-bs-toggle="modal" data-bs-target="#textbookModal">查看详情</button>
            <a href="${book.downloadUrl}" class="btn btn-sm btn-outline-primary" target="_blank">下载</a>
        </div>
    `;
    
    // 添加点击事件
    const viewButton = card.querySelector('.view-textbook');
    viewButton.addEventListener('click', function() {
        showTextbookDetails(book);
    });
    
    col.appendChild(card);
    return col;
}

/**
 * 显示电子课本详情
 * @param {Object} book - 电子课本数据
 */
function showTextbookDetails(book) {
    // 获取模态框元素
    const modal = document.getElementById('textbookModal') || createTextbookModal();
    
    // 更新模态框内容
    modal.querySelector('.modal-title').textContent = book.title;
    
    // 构建模态框内容
    let modalBody = `
        <div class="row">
            <div class="col-md-4">
                <img src="${book.cover}" alt="${book.title} 封面" class="img-fluid mb-3">
                <p><strong>科目：</strong>${book.subjectName}</p>
                <p><strong>年级：</strong>${book.form === 'form4' ? '中四 (Form 4)' : '中五 (Form 5)'}</p>
                <p><strong>课程标准：</strong>KSSM</p>
                <div class="d-grid gap-2">
                    <a href="${book.downloadUrl}" class="btn btn-primary" target="_blank">下载电子课本</a>
                </div>
            </div>
            <div class="col-md-8">
                <h5>课本简介</h5>
                <p>${book.description}</p>
                
                <h5 class="mt-4">课程大纲</h5>
                <div class="accordion" id="syllabusAccordion">
    `;
    
    // 添加单元列表
    book.units.forEach((unit, index) => {
        modalBody += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
                        ${unit.title}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#syllabusAccordion">
                    <div class="accordion-body">
                        <ul class="list-group list-group-flush">
        `;
        
        // 添加单元内容
        unit.topics.forEach(topic => {
            modalBody += `<li class="list-group-item">${topic}</li>`;
        });
        
        modalBody += `
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });
    
    modalBody += `
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalBody;
}

/**
 * 创建电子课本详情模态框
 * @returns {HTMLElement} - 模态框元素
 */
function createTextbookModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'textbookModal';
    modal.tabIndex = '-1';
    modal.setAttribute('aria-labelledby', 'textbookModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    // 创建模态框内容
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="textbookModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 电子课本详情将在这里动态加载 -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加到文档中
    document.body.appendChild(modal);
    return modal;
}