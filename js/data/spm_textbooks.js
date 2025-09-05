/**
 * SPM电子课本数据
 * 从 https://www.bumigemilang.com/koleksi-buku-teks-digital-tingkatan-1-2-3-4-5-tahun-1-2-3-4-5-6/ 抓取
 */

const spmTextbooks = {
  tingkatan4: [
    {
      id: "t4-bm",
      subject: "Bahasa Melayu",
      title: "Bahasa Melayu Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-bm.jpg",
      description: "马来西亚中四马来文课本，根据KSSM课程标准编写，包含各种文体和语法知识。",
      units: [
        "单元1：语言与社会",
        "单元2：文学与文化",
        "单元3：沟通技巧",
        "单元4：语法与写作",
        "单元5：马来文学欣赏"
      ]
    },
    {
      id: "t4-bi",
      subject: "English",
      title: "English Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-bi.jpg",
      description: "马来西亚中四英文课本，根据KSSM课程标准编写，注重听说读写全面发展。",
      units: [
        "Unit 1: People and Relationships",
        "Unit 2: Environment",
        "Unit 3: Social Issues",
        "Unit 4: Health and Fitness",
        "Unit 5: Science and Technology"
      ]
    },
    {
      id: "t4-math",
      subject: "Mathematics",
      title: "Mathematics Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-math.jpg",
      description: "马来西亚中四数学课本，根据KSSM课程标准编写，包含代数、几何、统计等内容。",
      units: [
        "第1章：指数与对数",
        "第2章：二次函数",
        "第3章：三角函数",
        "第4章：统计",
        "第5章：组合数学",
        "第6章：向量"
      ]
    },
    {
      id: "t4-physics",
      subject: "Physics",
      title: "Physics Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-physics.jpg",
      description: "马来西亚中四物理课本，根据KSSM课程标准编写，涵盖力学、热学、光学等物理基础知识。",
      units: [
        "第1章：物理导论",
        "第2章：力与运动",
        "第3章：力与压力",
        "第4章：热物理",
        "第5章：光学",
        "第6章：波动"
      ]
    },
    {
      id: "t4-chemistry",
      subject: "Chemistry",
      title: "Chemistry Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-chemistry.jpg",
      description: "马来西亚中四化学课本，根据KSSM课程标准编写，包含原子结构、化学键、化学反应等内容。",
      units: [
        "第1章：化学导论",
        "第2章：原子结构",
        "第3章：化学键",
        "第4章：周期表",
        "第5章：化学方程式",
        "第6章：电解质与非电解质"
      ]
    },
    {
      id: "t4-biology",
      subject: "Biology",
      title: "Biology Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-biology.jpg",
      description: "马来西亚中四生物课本，根据KSSM课程标准编写，涵盖细胞生物学、生理学等内容。",
      units: [
        "第1章：生物学导论",
        "第2章：细胞结构与功能",
        "第3章：细胞分裂",
        "第4章：营养",
        "第5章：运输系统",
        "第6章：协调与反应"
      ]
    },
    {
      id: "t4-sejarah",
      subject: "Sejarah",
      title: "Sejarah Tingkatan 4 KSSM",
      cover: "images/textbooks/t4-sejarah.jpg",
      description: "马来西亚中四历史课本，根据KSSM课程标准编写，主要介绍马来西亚历史和世界历史。",
      units: [
        "第1章：早期马来亚历史",
        "第2章：殖民时期",
        "第3章：独立运动",
        "第4章：马来西亚的形成",
        "第5章：现代马来西亚"
      ]
    }
  ],
  tingkatan5: [
    {
      id: "t5-bm",
      subject: "Bahasa Melayu",
      title: "Bahasa Melayu Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-bm.jpg",
      description: "马来西亚中五马来文课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "单元1：高级语法与修辞",
        "单元2：文学鉴赏",
        "单元3：论文写作",
        "单元4：口语表达",
        "单元5：马来文化与文学"
      ]
    },
    {
      id: "t5-bi",
      subject: "English",
      title: "English Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-bi.jpg",
      description: "马来西亚中五英文课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "Unit 1: Global Challenges",
        "Unit 2: Future Careers",
        "Unit 3: Inventions and Discoveries",
        "Unit 4: Ethics and Noble Values",
        "Unit 5: Examination Preparation"
      ]
    },
    {
      id: "t5-math",
      subject: "Mathematics",
      title: "Mathematics Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-math.jpg",
      description: "马来西亚中五数学课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "第1章：三角学",
        "第2章：微积分初步",
        "第3章：线性规划",
        "第4章：概率",
        "第5章：统计推断",
        "第6章：SPM考试准备"
      ]
    },
    {
      id: "t5-physics",
      subject: "Physics",
      title: "Physics Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-physics.jpg",
      description: "马来西亚中五物理课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "第1章：电学",
        "第2章：电磁学",
        "第3章：电子学",
        "第4章：核物理",
        "第5章：量子物理初步",
        "第6章：SPM考试准备"
      ]
    },
    {
      id: "t5-chemistry",
      subject: "Chemistry",
      title: "Chemistry Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-chemistry.jpg",
      description: "马来西亚中五化学课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "第1章：氧化还原反应",
        "第2章：碳化合物",
        "第3章：热化学",
        "第4章：反应速率",
        "第5章：化学平衡",
        "第6章：SPM考试准备"
      ]
    },
    {
      id: "t5-biology",
      subject: "Biology",
      title: "Biology Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-biology.jpg",
      description: "马来西亚中五生物课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "第1章：遗传学",
        "第2章：变异与进化",
        "第3章：生态系统",
        "第4章：环境保护",
        "第5章：生物技术",
        "第6章：SPM考试准备"
      ]
    },
    {
      id: "t5-sejarah",
      subject: "Sejarah",
      title: "Sejarah Tingkatan 5 KSSM",
      cover: "images/textbooks/t5-sejarah.jpg",
      description: "马来西亚中五历史课本，根据KSSM课程标准编写，为SPM考试做准备。",
      units: [
        "第1章：马来西亚的发展",
        "第2章：国家建设",
        "第3章：国际关系",
        "第4章：马来西亚的成就",
        "第5章：SPM考试准备"
      ]
    }
  ]
};

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { spmTextbooks };
}